import * as dotenv from "dotenv";
import express from "express";
import { products } from "./products.js";
import OpenAI from "openai";
dotenv.config();

const router = express.Router();

// Get all products
router.get("/products", (_req, res) => {
	res.json(products);
});

router.get("/search", async (req, res) => {
	const q = (req.query.q || "").toString().trim();
	if (!q) return res.json(products);
	try {
		const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
		// Get embeddings for all products
		const productTexts = products.map((p) => `${p.name}. ${p.description}`);
		const productEmbeddingsResponse = await openai.embeddings.create({
			model: "text-embedding-ada-002",
			input: productTexts,
		});
		const productEmbeddings = productEmbeddingsResponse.data.map(
			(e) => e.embedding
		);
		// Get embedding for query
		const queryEmbeddingResponse = await openai.embeddings.create({
			model: "text-embedding-ada-002",
			input: q,
		});
		const queryEmbedding = queryEmbeddingResponse.data[0].embedding;
		function cosineSimilarity(a: number[], b: number[]): number {
			let dot = 0.0,
				normA = 0.0,
				normB = 0.0;
			for (let i = 0; i < a.length; i++) {
				dot += a[i] * b[i];
				normA += a[i] * a[i];
				normB += b[i] * b[i];
			}
			return dot / (Math.sqrt(normA) * Math.sqrt(normB));
		}
		// Score and sort products
		const scored = products.map((p, i) => ({
			product: p,
			score: cosineSimilarity(queryEmbedding, productEmbeddings[i]),
		}));
		scored.sort((a, b) => b.score - a.score);
		// Return top 10 relevant products with score > 0.2
		const top = scored
			.filter((s) => s.score > 0.2)
			.slice(0, 10)
			.map((s) => s.product);
		res.json(top);
	} catch {
		// Fallback to keyword search if error
		const qLower = q.toLowerCase();
		const filtered = products.filter(
			(p) =>
				p.name.toLowerCase().includes(qLower) ||
				p.description.toLowerCase().includes(qLower)
		);
		res.json(filtered);
	}
});

export default router;

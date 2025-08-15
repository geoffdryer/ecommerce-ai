import express from "express";
import { products } from "./products.js";

const router = express.Router();

// Get all products
router.get("/products", (_req, res) => {
	res.json(products);
});

export default router;

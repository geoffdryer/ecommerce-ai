import express from "express";
import cors from "cors";
import router from "./routes.js";
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
// Health check
app.get("/", (_req, res) => {
    res.send("AI Search API is running");
});
app.use("/api", router);
// TODO: Add /api/search endpoint using LangChain + OpenAI
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

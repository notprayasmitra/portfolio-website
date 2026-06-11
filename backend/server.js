import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors({ origin: "https://localhost:3000" }))

app.get("/api/commits", async (req, res) => {
    try {
        const response = await fetch(
            `https://katib.jasoncameron.dev/v2/commits/latest?username=${process.env.GITHUB_USERNAME}&limit=4`, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
                }
            }
        )
        const data = await response.json()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
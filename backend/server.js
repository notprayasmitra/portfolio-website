import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/api/commits", async (req, res) => {
    try {
        const response = await fetch(
            `https://api.github.com/search/commits?q=author:${process.env.GITHUB_USERNAME}&sort=committer-date&order=desc&per_page=5`, 
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.cloak-preview"
                }
            }
        );
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/repos", async (req, res) => {
    try {
        const response = await fetch(
            `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos?sort=pushed&per_page=4`,
            { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
        );
        const repos = await response.json();
        
        if (!Array.isArray(repos)) {
            return res.json([]);
        }

        res.json(repos.map(r => ({
            id: r.id,
            name: r.name,
            html_url: r.html_url,
            pushed_at: r.pushed_at
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
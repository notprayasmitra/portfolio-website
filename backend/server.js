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
            `https://katib.jasoncameron.dev/commits/latest?username=${process.env.GITHUB_USERNAME}`,
            { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
        );
        const data = await response.json();

        const latest = {
            repo: data.repo?.split("/")[1] || "repo",
            message: data.messageHeadline,
            url: data.commitUrl,
            additions: data.additions,
            deletions: data.deletions,
        };
        const parents = (data.parentCommits || []).map((c) => ({
            repo: data.repo?.split("/")[1] || "repo",
            message: c.messageHeadline,
            url: c.commitUrl,
            additions: c.additions,
            deletions: c.deletions,
        }));

        res.json([latest, ...parents]);
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
        if (!Array.isArray(repos)) return res.json([]);

        res.json(repos.map((r) => ({
            id: r.id,
            name: r.name,
            html_url: r.html_url,
            pushed_at: r.pushed_at,
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/languages", async (req, res) => {
    try {
        // GraphQL: fetch language breakdown across your top repos in one request
        const query = `
            query ($username: String!) {
                user(login: $username) {
                    repositories(first: 20, orderBy: { field: PUSHED_AT, direction: DESC }, privacy: PUBLIC, isFork: false) {
                        nodes {
                            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
                                edges {
                                    size
                                    node {
                                        name
                                        color
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables: { username: process.env.GITHUB_USERNAME },
            }),
        });

        const { data, errors } = await response.json();
        if (errors) return res.status(500).json({ error: errors[0].message });

        // Aggregate byte sizes across all repos per language
        const totals = {};
        for (const repo of data.user.repositories.nodes) {
            for (const { size, node } of repo.languages.edges) {
                if (!totals[node.name]) {
                    totals[node.name] = { size: 0, color: node.color };
                }
                totals[node.name].size += size;
            }
        }

        const grandTotal = Object.values(totals).reduce((sum, l) => sum + l.size, 0);

        // Sort languages by size in descending order nad keep the top 6 to compute percentages
        const languages = Object.entries(totals)
            .sort((a, b) => b[1].size - a[1].size)
            .slice(0, 6)
            .map(([name, { size, color }]) => ({
                lang: name,
                color,
                percentage: parseFloat(((size / grandTotal) * 100).toFixed(1)),
            }));

        res.json(languages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
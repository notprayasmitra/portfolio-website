import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/api/commits", async (req, res) => {
    try {
        const query = `
            query ($username: String!) {
                user(login: $username) {
                    repositories(first: 4, orderBy: { field: PUSHED_AT, direction: DESC }, privacy: PUBLIC, isFork: false) {
                        nodes {
                            name
                            url
                            defaultBranchRef {
                                target {
                                    ... on Commit {
                                        history(first: 1) {
                                            nodes {
                                                messageHeadline
                                                commitUrl
                                                additions
                                                deletions
                                            }
                                        }
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

        const commits = data.user.repositories.nodes
            .filter((repo) => repo.defaultBranchRef?.target?.history?.nodes?.length > 0)
            .map((repo) => {
                const commit = repo.defaultBranchRef.target.history.nodes[0];
                return {
                    repo: repo.name,
                    message: commit.messageHeadline,
                    url: commit.commitUrl,
                    additions: commit.additions,
                    deletions: commit.deletions,
                };
            });

        res.json(commits);
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
        // GraphQL: fetch language breakdown across your first 100 repos in one request
        const query = `
            query ($username: String!) {
                user(login: $username) {
                    repositories(first: 100, orderBy: { field: PUSHED_AT, direction: DESC }, privacy: PUBLIC, isFork: false) {
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

app.get("/health", (req, res) => res.status(200).send("OK"));

app.use(express.static(path.join(__dirname, "../frontend/dist")));app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
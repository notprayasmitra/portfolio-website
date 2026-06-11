import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

function RecentCommitsWidget() {
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        fetch(`https://katib.jasoncameron.dev/v2/commits/latest?username=${GITHUB_USERNAME}&limit=4`, {
            headers: { 
                Authorization: `Bearer ${GITHUB_TOKEN}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setCommits(data.commits)
            })
            .catch((err) => console.log("Error:", err))
    }, [])

    return (
        <div className="widget">
            <p className="widget-title">↯ Recent Commits</p>
            <div className="commits-list">
                {commits.map((c, i) => (
                    <p key={i} className="commit-item">
                        <span className="accent">{c.repo}:</span> {c.message}
                    </p>
                ))}
            </div>
            <a href="https://github.com/notprayasmitra" target="_blank" rel="noreferrer" className="widget-link">
                View on Github <FaArrowRight size={12} />
            </a>
        </div>
    )
}

function LatestReposWidget() {
    const [repos, setRepos] = useState([])

    useEffect(() => {
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=4`, {
            headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
        })
            .then((res) => res.json())
            .then((data) => setRepos(data))
    }, [])

    return (
        <div className="widget">
            <p className="widget-title">⊟ Latest Repos</p>
            <div className="repos-list">
                {repos.map((repo) => (
                    <div key={repo.id} className="repo-item">
                        <a href={repo.html_url} target="_blank" rel="noreferrer" className="accent">
                            {repo.name}
                        </a>
                        <span className="widget-sub">{new Date(repo.pushed_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Widgets() {
    return (
        <div className="widgets-grid">
            <RecentCommitsWidget />
            <LatestReposWidget />
        </div>
    )
}

export default Widgets;
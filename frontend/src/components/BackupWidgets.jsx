import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";

import "../styles/components/backup-widgets.css"

const GITHUB_COLORS = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    HTML: "#e34c26",
    CSS: "#563d7c",
};

const HARDCODED_LANGUAGES = [
    { lang: "TypeScript", percentage: 58.2 },
    { lang: "JavaScript", percentage: 24.1 },
    { lang: "HTML", percentage: 10.4 },
    { lang: "CSS", percentage: 7.3 },
];

function getPositionedLanguages(languages) {
    let currentLeft = 0;
    return languages.map(({ lang, percentage }) => {
        const centerOffset = currentLeft + percentage / 2;
        currentLeft += percentage;
        return { lang, percentage, centerOffset };
    });
}

const positionedLanguages = getPositionedLanguages(HARDCODED_LANGUAGES);

function RecentCommitsWidget() {
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/commits`)
            .then((res) => res.json())
            .then((data) => {
                const items = data.items || [];
                const processedCommits = items.map((c) => ({
                    repo: c.repository?.name || (c.repository?.full_name ? c.repository.full_name.split('/')[1] : "repo"),
                    message: c.commit.message,
                    url: c.html_url,
                }));
                setCommits(processedCommits);
            })
            .catch((err) => console.log("Error fetching commits:", err));
    }, []);

    return (
        <div className="widget">
            <div className="widget-header">
                <p className="widget-title">↯ Recent Commits</p>
                <a href="https://github.com/notprayasmitra" target="_blank" rel="noreferrer" className="widget-link">
                    View on Github <FaArrowRight size={12} />
                </a>
            </div>
            <div className="commits-list">
                {commits.map((c, i) => (
                    <p key={i} className="commit-item">
                        <span className="accent">{c.repo}:</span> {c.message}
                    </p>
                ))}
            </div>
        </div>
    );
}

function LatestReposWidget() {
    const [repos, setRepos] = useState([]);
    const [hoveredLang, setHoveredLang] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/api/repos")
            .then((res) => res.json())
            .then((data) => setRepos(data || []))
            .catch((err) => console.log("Error fetching repos:", err));
    }, []);

    return (
        <div className="widget">
            <p className="widget-title">⊟ Latest Repos</p>
            <div className="repos-list">
                {repos.map((repo) => (
                    <div key={repo.id} className="repo-item">
                        <a href={repo.html_url} target="_blank" rel="noreferrer" className="accent">
                            {repo.name}
                        </a>
                        <span className="widget-sub">
                            {"— "}{new Date(repo.pushed_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                    </div>
                ))}
            </div>

            <div className="language-bar-outer">
                {hoveredLang && (
                    <div 
                        className="language-tooltip" 
                        style={{ left: `${hoveredLang.leftOffset}%` }}
                    >
                        <span 
                            className="tooltip-dot" 
                            style={{ backgroundColor: GITHUB_COLORS[hoveredLang.lang] || "#555" }} 
                        />
                        <span className="tooltip-text">
                            {hoveredLang.lang}
                            <span className="tooltip-percentage">{hoveredLang.percentage}%</span>
                        </span>
                    </div>
                )}

                <div className="language-bar">
                    {positionedLanguages.map(({ lang, percentage, centerOffset }) => (
                        <div 
                            key={lang} 
                            className="language-progress" 
                            style={{ 
                                width: `${percentage}%`, 
                                backgroundColor: GITHUB_COLORS[lang] || "#555" 
                            }} 
                            onMouseEnter={() => setHoveredLang({ lang, percentage, leftOffset: centerOffset })}
                            onMouseLeave={() => setHoveredLang(null)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function BackupWidgets() {
    return (
        <div className="widgets-grid">
            <RecentCommitsWidget />
            <LatestReposWidget />
        </div>
    );
}

export default BackupWidgets;
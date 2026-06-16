import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import "../styles/components/homepage-widgets.css";

import { FaAnchor, FaArrowTrendUp } from "react-icons/fa6";

function getPositionedLanguages(languages) {
    let currentLeft = 0;
    return languages.map(({ lang, percentage, color }) => {
        const centerOffset = currentLeft + percentage / 2;
        currentLeft += percentage;
        return { lang, percentage, color, centerOffset };
    });
}

function RecentCommitsWidget() {
    const [commits, setCommits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/api/commits")
            .then((res) => res.json())
            .then((data) => {
                setCommits(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error fetching commits:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="widget">
            <div className="widget-header">
                <p className="widget-title"><FaArrowTrendUp size={13}/> Recent Commits</p>
                <a href="https://github.com/notprayasmitra" target="_blank" rel="noreferrer" className="widget-link">
                    View on Github <FaArrowRight size={12} />
                </a>
            </div>
            <div className="commits-list">
                {loading && <p className="widget-sub">Loading...</p>}
                {commits.map((c, i) => (
                    <a key={i} href={c.url} target="_blank" rel="noreferrer" className="commit-item-link">
                        <p className="commit-item">
                            <span className="accent">{c.repo}:</span>{" "}
                            <span className="commit-message">{c.message}</span>
                            <span className="commit-stats">
                                <span className="stat-add">+{c.additions}</span>
                                {" / "}
                                <span className="stat-del">-{c.deletions}</span>
                            </span>
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
}

function LatestReposWidget() {
    const [repos, setRepos] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [hoveredLang, setHoveredLang] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/api/repos")
            .then((res) => res.json())
            .then((data) => setRepos(data || []))
            .catch((err) => console.log("Error fetching repos:", err));

        fetch("http://localhost:3001/api/languages")
            .then((res) => res.json())
            .then((data) => setLanguages(data || []))
            .catch((err) => console.log("Error fetching languages:", err));
    }, []);

    const positionedLanguages = getPositionedLanguages(languages);

    return (
        <div className="widget">
            <div className="widget-header">
                <p className="widget-title"><FaAnchor size={13} /> Latest Repos</p>
                <div className="language-info">
                    <span className="lang-info-icon">ⓘ</span>
                    <div className="lang-info-tooltip">
                        {languages.map(({ lang, color, percentage }) => (
                            <div key={lang} className="legend-item">
                                <span className="legend-dot" style={{ backgroundColor: color }} />
                                <span className="legend-name">{lang}</span>
                                <span className="legend-pct">{percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

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
                    <div className="language-tooltip" style={{ left: `${hoveredLang.leftOffset}%` }}>
                        <span className="tooltip-dot" style={{ backgroundColor: hoveredLang.color }} />
                        <span className="tooltip-text">
                            {hoveredLang.lang}
                            <span className="tooltip-percentage">{hoveredLang.percentage}%</span>
                        </span>
                    </div>
                )}
                <div className="language-bar">
                    {positionedLanguages.map(({ lang, percentage, color, centerOffset }) => (
                        <div
                            key={lang}
                            className="language-progress"
                            style={{ width: `${percentage}%`, backgroundColor: color }}
                            onMouseEnter={() => setHoveredLang({ lang, percentage, color, leftOffset: centerOffset })}
                            onMouseLeave={() => setHoveredLang(null)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function GitHubWidgets() {
    return (
        <div className="widgets-grid">
            <RecentCommitsWidget />
            <LatestReposWidget />
        </div>
    );
}

export default GitHubWidgets;
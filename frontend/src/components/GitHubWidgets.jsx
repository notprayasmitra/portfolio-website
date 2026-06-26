import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import "../styles/components/homepage-widgets.css";

import { GitHubCalendar } from "react-github-calendar";
import { FaAnchor, FaArrowTrendUp } from "react-icons/fa6";

function getPositionedLanguages(languages) {
    let currentLeft = 0;
    return languages.map(({ lang, percentage, color }) => {
        const centerOffset = currentLeft + percentage / 2;
        currentLeft += percentage;
        return { lang, percentage, color, centerOffset };
    });
}

function GitHubHeatmapWidget() {
    const calendarThemes = {
        Latte: {
            light: ["#eff1f5", "#95cc89", "#4a9e3d", "#2e7323", "#145009"],
        },
        Frappe: {
            dark: ["#303446", "#0e4429", "#0d8846", "#1cb83d", "#2be74a"],
        },
        Macchiato: {
            dark: ["#24273a", "#0e4429", "#0d8846", "#1cb83d", "#2be74a"],
        },
        Mocha: {
            dark: ["#1e1e2e", "#0e4429", "#0d8846", "#1cb83d", "#2be74a"],
        },
    };

    const [activeTheme, setActiveTheme] = useState(
        () => localStorage.getItem("theme") || "Mocha"
    );

    useEffect(() => {
        const handler = () => {
            setActiveTheme(localStorage.getItem("theme") || "Mocha");
        };

        window.addEventListener("themechange", handler);
        window.addEventListener("storage", handler);
        return () => {
            window.removeEventListener("themechange", handler);
            window.removeEventListener("storage", handler);
        };
    }, []);

    const theme = calendarThemes[activeTheme];
    const colorScheme = activeTheme === "Latte" ? "light" : "dark";

    return (
        <div className="github-calendar-wrapper">
            <h3>Github Contribution</h3>
            <GitHubCalendar
                username="notprayasmitra"
                theme={theme}
                colorScheme={colorScheme}
                blockSize={13}
                blockMargin={5}
                fontSize={12}
                hideTotalCount={false}
                hideColorLegend={false}
                showWeekdayLabels={false}
            />
        </div>
    );
}

function RecentCommitsWidget() {
    const [commits, setCommits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/commits")
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
        fetch("/api/repos")
            .then((res) => res.json())
            .then((data) => setRepos(data || []))
            .catch((err) => console.log("Error fetching repos:", err));

        fetch("/api/languages")
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
        <section className="widgets-section github-hide-mobile">
            <div className="widgets-grid">
                <RecentCommitsWidget />
                <LatestReposWidget />
            </div>
            <GitHubHeatmapWidget />
        </section>
    );
}

export default GitHubWidgets;
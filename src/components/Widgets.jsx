import { useState, useEffect } from "react";

import { FaArrowRight } from "react-icons/fa6";

function RecentCommitsWidget() {
    const [commits, setCommits] = useState;

    useEffect(() => {
        fetch("")
            .then((res) => res.json())
            .then((data) => {
                const pushEvents = data
                    .filter((e) => e.type === "PushEvent")
                    .flatMap((e) =>
                        e.payload.commits.map((c) => ({
                            repo: e.repo.name.split("/")[1],
                            message: c.message,
                        }))
                    )
                    .slice(0, 4)
                setCommits(pushEvents)
            })
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
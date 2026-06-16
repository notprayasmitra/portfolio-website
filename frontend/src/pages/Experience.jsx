import { useEffect, useRef, useState } from "react";
import "../styles/pages/experience.css";
import { FaArrowRight } from "react-icons/fa6";

const experienceData = [
    {
        id: 1,
        role: "Software Engineer Intern",
        org: "Indian Oil Corporation Ltd. (IOCL)",
        orgUrl: "https://iocl.com",
        duration: "May 2026 – Ongoing",
        description: [
            "Built and maintained core UI components for the Noctalia shell project.",
            "Developed REST APIs using ASP.NET and C#.",
            "Managed database schemas and queries in MySQL.",
        ],
        tags: [".NET", "ASP.NET", "C#", "SOAP APIs", "MySQL", "IIS"],
    },
    {
        id: 2,
        role: "Software Engineer Intern",
        org: "SAARC Masts Pvt. Ltd.",
        orgUrl: "#",
        duration: "June 2025 – September 2025",
        description: [
            "Built and maintained core UI components for the Noctalia shell project.",
            "Developed REST APIs using ASP.NET and C#.",
            "Managed database schemas and queries in MySQL.",
        ],
        tags: ["React", "Next.js", "Node.js", "Express.js", "BetterAuth", "REST APIs", "PostgreSQL", "MongoDB"],
    },
    {
        id: 3,
        role: "Open Source Contributor",
        org: "Noctalia",
        orgUrl: "#",
        duration: "January 2026 – May 2026",
        description: [
            "Built and maintained core UI components for the Noctalia shell project.",
            "Developed REST APIs using ASP.NET and C#.",
            "Managed database schemas and queries in MySQL.",
        ],
        tags: ["Quickshell", "QML", "Shell Scripts", "Custom Modules"],
    },
    {
        id: 4,
        role: "Technical Co-Head",
        org: "GeeksforGeeks",
        orgUrl: "#",
        duration: "December 2025 – Present",
        description: [
            "Built and maintained core UI components for the Noctalia shell project.",
            "Developed REST APIs using ASP.NET and C#.",
            "Managed database schemas and queries in MySQL.",
        ],
        tags: ["Quickshell", "QML", "Shell Scripts", "Custom Modules"],
    },
    {
        id: 5,
        role: "Associate Student Ambassador",
        org: "Microsoft",
        orgUrl: "#",
        duration: "January 2026 – Present",
        description: [
            "Built and maintained core UI components for the Noctalia shell project.",
            "Developed REST APIs using ASP.NET and C#.",
            "Managed database schemas and queries in MySQL.",
        ],
        tags: ["Quickshell", "QML", "Shell Scripts", "Custom Modules"],
    },
];

function TimelineLeft({ progress, activeIndex }) {
    const totalStops = experienceData.length;
    
    // Hard lines locked onto a permanent absolute horizontal axis
    const startY = 20;
    const endY = 380;
    const lineLength = endY - startY;
    const targetX = 25; // Unified track center line anchoring point

    return (
        <div className="timeline-container">
            <svg
                className="timeline-svg"
                viewBox="0 0 180 400"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* 1. Base Guide Track */}
                <line
                    x1={targetX}
                    y1={startY}
                    x2={targetX}
                    y2={endY}
                    stroke="var(--border, #222235)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                />
                
                {/* 2. Active Progress Filler Line */}
                <line
                    x1={targetX}
                    y1={startY}
                    x2={targetX}
                    y2={endY}
                    stroke="var(--accent, #a8ff78)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    pathLength="1"
                    style={{
                        strokeDasharray: 1,
                        strokeDashoffset: 1 - progress,
                        transition: "stroke-dashoffset 0.12s linear",
                        filter: "drop-shadow(0 0 4px var(--accent, #a8ff78))",
                    }}
                />

                {/* 3. Generating Responsive Anchors Dynamic Map */}
                {experienceData.map((item, i) => {
                    const stopProgress = i / (totalStops - 1);
                    const y = startY + stopProgress * lineLength;
                    
                    const isActive = i === activeIndex;
                    const isPassed = i <= activeIndex;
                    
                    // Extracts short strings safely
                    const shortOrg = item.org.includes("(") 
                        ? item.org.split("(")[1].replace(")", "") 
                        : item.org.split(" ")[0];

                    return (
                        <g key={i} className={`timeline-node-group ${isActive ? "active" : ""}`}>
                            {/* Pulse Tracker Ring */}
                            {isActive && (
                                <circle
                                    cx={targetX}
                                    cy={y}
                                    r="10"
                                    fill="none"
                                    stroke="var(--accent, #a8ff78)"
                                    strokeWidth="1.25"
                                    className="pulse-ring"
                                />
                            )}
                            
                            {/* Intersection Circle Node */}
                            <circle
                                cx={targetX}
                                cy={y}
                                r={isActive ? 6 : 4}
                                fill={isPassed ? "var(--accent, #a8ff78)" : "var(--bg-secondary, #13131e)"}
                                stroke={isPassed ? "var(--accent, #a8ff78)" : "var(--border, #222235)"}
                                strokeWidth="2"
                                style={{
                                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                                }}
                            />

                            {/* Organization Text Node */}
                            <text
                                x={targetX + 22}
                                y={y - 2}
                                className="svg-label-org"
                                fill={isActive ? "var(--accent, #a8ff78)" : "var(--text-muted, #6b7280)"}
                            >
                                {shortOrg}
                            </text>

                            {/* Timeline Context Text Node */}
                            <text
                                x={targetX + 22}
                                y={y + 11}
                                className="svg-label-year"
                                fill="var(--text-muted, #4b5563)"
                            >
                                {item.duration.split("–")[0].trim()}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

function Experience() {
    const trackRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Update progress bar on scroll
        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = track;
            const maxScroll = scrollWidth - clientWidth;
            setProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
        };
        track.addEventListener("scroll", handleScroll, { passive: true });

        // Use IntersectionObserver to detect which card is actually visible
        const cards = Array.from(track.querySelectorAll(".exp-card"));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = cards.indexOf(entry.target);
                        if (idx !== -1) setActiveIndex(idx);
                    }
                });
            },
            {
                root: track,         // observe within the scroll track
                threshold: 0.9,      // card must be 90% visible to activate
            }
        );

        cards.forEach((card) => observer.observe(card));

        return () => {
            track.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <main className="page experience-page">
            <div className="exp-page-layout">
                <div className="exp-left">
                    <TimelineLeft progress={progress} activeIndex={activeIndex} />
                </div>
                <div className="exp-right">
                    <h2 className="exp-right-title">
                        Experience — Scroll for more <FaArrowRight size={16} />
                    </h2>
                    <div className="exp-cards-track" ref={trackRef}>
                        {experienceData.map((item, idx) => (
                            <div
                                key={item.id}
                                className={`exp-card ${idx === activeIndex ? "exp-card--active" : ""}`}
                            >
                                <div className="exp-card-header">
                                    <span className="exp-card-number">0{item.id}</span>
                                </div>
                                <h3 className="exp-card-role">{item.role}</h3>
                                <a href={item.orgUrl} target="_blank" rel="noreferrer" className="exp-card-org accent">
                                    {item.org}
                                </a>
                                <span className="exp-card-duration">{item.duration}</span>
                                <ul className="exp-card-desc">
                                    {item.description.map((point, i) => (
                                        <li key={i} className="individual-points">{point}</li>
                                    ))}
                                </ul>
                                <div className="exp-card-tags">
                                    {item.tags.map((tag) => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Experience;
import { useEffect, useRef, useState } from "react";
import "../styles/pages/experience.css";
import { FaArrowRight } from "react-icons/fa6";

const experienceData = [
    {
        id: 1,
        role: "Software Engineer Intern",
        org: "Indian Oil Corporation Ltd. (IOCL)",
        orgUrl: "https://iocl.com",
        duration: "May 2026 - Ongoing",
        description: [
            "Developed middleware, web applications and forms using ASP.NET, C#, and MySQL.",
            "Integrated web services with databases for storage and retrieval, and hosted the same on a LAN using IIS.",
            "Designed and maintained relational database schemas for enterprise applications, and performed database administration, query optimization, and data management tasks.",
        ],
        tags: [".NET", "ASP.NET", "C#", "JavaScript", "SOAP APIs", "MySQL", "MariaDB", "IIS"],
    },
    {
        id: 2,
        role: "Open Source Contributor",
        org: "Noctalia",
        orgUrl: "https://noctalia.dev/",
        duration: "Jan 2026 - May 2026",
        description: [
            "Developed and deployed a Pomodoro plugin written in Quickshell utilizing the custom modules of Noctalia Shell.",
            "Integrated features such as - cutomizable sessions of productivity, custom alarm sound and duration, and much more.",
            "Conducted system-level testing across shell components and managed event listeners for real-time desktop UI updates.",
        ],
        tags: ["Quickshell", "QML", "Shell Scripts", "Custom Modules"],
    },
    {
        id: 3,
        role: "Associate Student Ambassador",
        org: "Microsoft",
        orgUrl: "https://mvp.microsoft.com/en-US/studentambassadors",
        duration: "Jan 2026 - Present",
        promotions: [
            { role: "Associate Student Ambassdor", since: "Mar 2026 - Present" },
            { role: "Student Ambassdor", since: "Jan 2026 - Feb 2026" },
        ],
        description: [
            "Organized cloud bootcamps focused on deploying containerized projects utilizing Microsoft Azure.",
            "Led 20+ technical workshops on various topics like Git, Version Control, and modern collaborative engineering workflows.",
            "Spearheaded public upskilling initiatives and technical mentoring sessions.",
        ],
        tags: ["Git/GitHub", "Azure", "Leadership", "Communication", "Mentorship"],
    },
    {
        id: 4,
        role: "Technical Co-Head",
        org: "GeeksforGeeks Student Chapter",
        orgUrl: "https://gfgsrmrmp.vercel.app",
        duration: "Dec 2025 - Present",
        promotions: [
            { role: "Technical Co-Head", since: "May 2026 - Present" },
            { role: "Technical Member", since: "Dec 2025 - April 2026" },
        ],
        description: [
            "Led technical initiatives, and full-stack development projects within the organization.",
            "Coordinated project teams and reviewed contributions across multiple community projects.",
            "Mentored students in competitive programming, web development, git, and software engineering practices.",
        ],
        tags: ["React", "Node.js", "Supabase", "Leadership", "Communication", "Mentorship"],
    },
    {
        id: 5,
        role: "Software Engineer Intern",
        org: "SAARC Masts Pvt. Ltd.",
        orgUrl: "https://www.saarcmaststech.com",
        duration: "Jun 2025 - Sep 2025",
        description: [
            "Developed a psychometric assessment platform for candidate evaluation and reporting.",
            "Built Mentor Connect, featuring calendar integration, meeting and event scheduling, chat, and resource sharing.",
            "Developed full-stack web applications for mentorship, recruitment, and assessment platforms. Designed REST APIs and database models for application data management.",
        ],
        tags: ["React", "Next.js", "Node.js", "Express.js", "BetterAuth", "REST APIs", "PostgreSQL", "MongoDB"],
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
                viewBox="0 0 200 400"
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
                    stroke="var(--accent-purple)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    pathLength="1"
                    style={{
                        strokeDasharray: 1,
                        strokeDashoffset: 1 - progress,
                        transition: "stroke-dashoffset 0.12s linear",
                        filter: "drop-shadow(0 0 4px var(--accent-pink))",
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
                                    stroke="var(--accent-purple)"
                                    strokeWidth="1.25"
                                    className="pulse-ring"
                                />
                            )}
                            
                            {/* Intersection Circle Node */}
                            <circle
                                cx={targetX}
                                cy={y}
                                r={isActive ? 6 : 4}
                                fill={isPassed ? "var(--accent-purple)" : "var(--accent-purple, #13131e)"}
                                stroke={isPassed ? "var(--accent-purple)" : "var(--accent-purple, #222235)"}
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
                                fill={isActive ? "var(--accent-pink)" : "var(--accent-purple, #6b7280)"}
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

        // NEW: Intercept vertical wheel scroll and translate it horizontally
        const handleWheel = (e) => {
            // e.deltaY is positive when scrolling down, negative when scrolling up
            if (e.deltaY !== 0) {
                e.preventDefault(); // Prevents the main page body from scrolling up/down
                track.scrollBy({
                    left: e.deltaY * 1.2, // Multiply to tweak scroll sensitivity speed
                    behavior: "auto"       // "auto" prevents stuttering during rapid wheel inputs
                });
            }
        };
        // Crucial: passive must be false so e.preventDefault() actually works
        track.addEventListener("wheel", handleWheel, { passive: false });

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
                threshold: 0.7,      // card must be 70% visible to activate
            }
        );

        cards.forEach((card) => observer.observe(card));

        // Cleanup listeners on component unmount
        return () => {
            track.removeEventListener("scroll", handleScroll);
            track.removeEventListener("wheel", handleWheel); // NEW: Clean up wheel listener
            observer.disconnect();
        };
    }, []);

    const scrollToCard = (index) => {
        if (!trackRef.current) return;
        const cardWidth = trackRef.current.scrollWidth / experienceData.length;
        trackRef.current.scrollTo({
            left: index * cardWidth,
            behavior: "smooth"
        });
    };

    return (
        <main className="page experience-page">
            <div className="exp-page-layout">
                <div className="exp-left">
                    <TimelineLeft progress={progress} activeIndex={activeIndex} />

                    <div className="exp-side-metrics">
                        {/* Section 1: Active Focus */}
                        <div className="metric-box">
                            <span className="metric-accent">Active Focus</span>
                            <p className="metric-text">Full-Stack Architectures, Distributed APIs & Shell Scripts Contributor</p>
                        </div>
                        
                        {/* Section 2: Milestones */}
                        <div className="metric-box">
                            {/* FIXED: Heading is now outside the chips flex wrapper */}
                            <span className="metric-accent">Milestones</span>
                            
                            {/* The chips are neatly bundled together in their own container */}
                            <div className="focus-sectors" style={{ marginTop: "0.5rem" }}>
                                <span className="sector-chip">2 Internships</span>
                                <span className="sector-chip">2 Leadership Initiatives</span>
                                <span className="sector-chip">1 Open Source Contribution</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="exp-right">
                    <div className="exp-header-block">
                        <h2 className="exp-right-title">
                            Experience
                            <span className="index-counter">({activeIndex + 1}/{experienceData.length})</span>
                        </h2>
                    </div>
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
                                {item.promotions && (
                                    <div className="exp-card-promotions">
                                        {item.promotions.map((p, i) => (
                                            <div key={i} className="promotion-row">
                                                <div className={`promotion-dot ${i === 0 ? "promotion-dot--current" : ""}`} />
                                                <div className="promotion-info">
                                                    <span className="promotion-role">{p.role}</span>
                                                    <span className="promotion-since">{p.since}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Only show duration if no promotions */}
                                {!item.promotions && (
                                    <span className="exp-card-duration">{item.duration}</span>
                                )}
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
                    <div className="track-controls-bar">
                        <div className="pagination-indicators">
                            {experienceData.map((_, i) => (
                                <button 
                                    key={i} 
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={`dot ${i === activeIndex ? "dot--active" : ""}`}
                                    onClick={() => scrollToCard(i)}
                                />
                            ))}
                        </div>
                        <div className="scroll-hint-text">
                            Scroll or click dots to explore <FaArrowRight size={11} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Experience;
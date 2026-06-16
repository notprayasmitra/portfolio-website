import "../styles/pages/experience.css";

import { FaArrowRight } from "react-icons/fa6";

const experienceData = [
    {
        id: 1,
        role: "",
        org: "Noctalia",
        githubUrl: "https://github.com/notprayasmitra",
        orgUrl: "https://noctalia.dev",
        duration: "Jan 2024 – Present",
        description: "Built and maintained core UI components for the Noctalia shell project.",
        tags: ["React", "TypeScript", "CSS"],
    },
    {
        id: 2,
        role: "Full Stack Intern",
        org: "Some Company",
        orgUrl: "#",
        duration: "Jun 2023 – Aug 2023",
        description: "Worked on MERN stack applications and REST APIs.",
        tags: ["MongoDB", "Express", "React", "Node.js"],
    },
    {
        id: 3,
        role: "Open Source Contributor",
        org: "GitHub",
        orgUrl: "https://github.com/notprayasmitra",
        duration: "2022 – Present",
        description: "Contributing to various open source repositories.",
        tags: ["Git", "JavaScript", "Python"],
    },
];

function Experience() {
    return (
        <main className="page">
            <div className="exp-page-layout">

                <div className="exp-left">
                </div>

                <div className="exp-right">
                    <h2 className="exp-right-title">Experience - Scroll for more <FaArrowRight size={16} /></h2>
                    <div className="exp-cards-track">
                        {experienceData.map((item) => (
                            <div key={item.id} className="exp-card">
                                <div className="exp-card-header">
                                    <span className="exp-card-number">0{item.id}</span>
                                    <span className="exp-card-duration">{item.duration}</span>
                                </div>
                                <h3 className="exp-card-role">{item.role}</h3>
                                
                                    href={item.orgUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="exp-card-org accent"
                                <a href={item.orgUrl} target="_blank" rel="noreferrer" className="exp-card-org accent">
                                    {item.org} ↗
                                </a>
                                <p className="exp-card-desc">{item.description}</p>
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
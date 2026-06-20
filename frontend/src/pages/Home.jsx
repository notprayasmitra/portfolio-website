import "../styles/pages/home.css";
import "../styles/components/featured-projects.css";
import "../styles/components/tech-stack.css";

import { FaGithub, FaLinkedin, FaReddit, FaExternalLinkAlt, FaArrowRight, FaTrophy, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiPython,
  SiSupabase,
  SiPostgresql,
  SiMysql,
  SiNextdotjs,
  SiFlask,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"

import { personalLinks, experiences, featuredProjects, achievements, responsibilities } from "../data";

import GitHubWidgets from "../components/GitHubWidgets";
import Widgets from "../components/Widgets";

const stack = [
    { label: "JavaScript", icon: <SiJavascript /> },
    { label: "TypeScript", icon: <SiTypescript /> },
    { label: "React", icon: <SiReact /> },
    { label: "Node.js", icon: <SiNodedotjs /> },
    { label: "Express", icon: <SiExpress /> },
    { label: "MongoDB", icon: <SiMongodb /> },
    { label: "Git", icon: <SiGit /> },
    { label: "Python", icon: <SiPython /> },
    { label: "Supabase", icon: <SiSupabase /> },
    { label: "PostgreSQL", icon: <SiPostgresql /> },
    { label: "MySQL", icon: <SiMysql /> },
    { label: "Next.js", icon: <SiNextdotjs /> },
    { label: "Java", icon: <FaJava /> },
    { label: "Flask", icon: <SiFlask /> },
]

function Home() {
  return (
    <main className="page">
        <section className="hero">
            <h1>Hey! I'm <span className="accent">Prayas Mitra</span></h1>
            <p className="hero-bio">I'm currently a CS undergrad, a developer, and a student leader keen on building software, communities, and exploring new technologies that create value for people. I've written software that is trusted by the group of developers working on{" "}<a href="https://noctalia.dev" target="_blank" rel="noreferrer" className="hero-bio-link">Noctalia Shell</a>{" "}. Currently working on an AI Agent that automates everyday tasks.</p>
            <div className="hero-links">
                <a href={personalLinks.github} target="_blank" rel="noreferrer"><FaGithub />GitHub</a>
                <span className="divider">|</span>
                <a href={personalLinks.linkedin} target="_blank" rel="noreferrer"><FaLinkedin />LinkedIn</a>
                <span className="divider">|</span>
                <a href={personalLinks.reddit} target="_blank" rel="noreferrer"><FaReddit />Reddit</a>
                <span className="divider">|</span>
                <Link to="/about" className="about-link">
                    More about me <FaArrowRight size={12}/>
                </Link>
            </div>
        </section>
        <section className="tech-section">
            <div className="section-heading">
                <h2>What I work with</h2>
            </div>

            {/* Layout for basic flex */}
            
            <div className="tech-stack">
                {stack.map((item) => (
                    <div key={item.label} className="tech-item">
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            
            {/* Layout for 7-column grid */}

            {/*
            <div className="tech-stack">
                <div className="tech-row">
                    {stack.slice(0, 7).map((item) => (
                    <div key={item.label} className="tech-item">
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                    ))}
                </div>
                <div className="tech-row">
                    {stack.slice(7).map((item) => (
                    <div key={item.label} className="tech-item">
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                    ))}
                </div>
            </div>
            */}
        </section>
        <section className="exp-section">
            <div className="section-heading">
                <h2>Experience</h2>
                <hr className="section-rule" />
            </div>
            <div className="timeline">
                {experiences.map((item) => (
                    <div key={item.id} className="timeline-item">
                        <div className="timeline-header" />
                        <div className="timeline-content">
                            <a href={item.orgUrl} target="_blank" rel="noreferrer" className="accent">
                                {item.orgName} <FaExternalLinkAlt size={11}/>
                            </a>
                            <h3>{item.role}</h3>
                            <span className="timeline-duration">{item.duration}</span>
                            <p className="timeline-desc">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        <section className="featured-section">
            <div className="featured-header">
                <h2>Featured Projects</h2>
                <Link to="/projects" className="view-all">View All <FaArrowRight size={12}/></Link>
            </div>
            <div className="projects-grid">
                {featuredProjects.map((project) => (
                    <a key={project.id} href={project.link} target="_blank" rel="noreferrer" className="project-card">
                        <div className="project-card-top">
                            <div className="traffic-lights">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className="project-stars"><FaStar size={12} /> {project.stars}</span>
                        </div>
                        <p className="project-repo">
                            <span className="accent">{project.repoOwner}</span> / {project.name}
                        </p>
                        <p className="project-repo">{project.description}</p>
                        <div className="project-tags">
                            {project.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </section>
        <section className="responsibilities-section">
            <div className="section-heading">
                <h2>Positions of Responsibility</h2>
                <hr className="section-rule" />
            </div>
            <div className="responsibilities-list">
                {responsibilities.map((item) => (
                    <div key={item.id} className="responsibility-item">
                        <div className="responsibility-left">
                            <div className="timeline-header" />
                        </div>
                        <div className="responsibility-content">
                            <div className="responsibility-top">
                                <h3>{item.title}</h3>
                                <span className="timeline-duration">{item.date}</span>
                            </div>
                            <a href={item.references} target="_blank" rel="noreferrer" className="accent responsibility-org">
                                {item.organization} <FaExternalLinkAlt size={11}/>
                            </a>
                            <p className="responsibility-desc">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        <section className="achievements-section">
            <div className="section-heading">
                <h2>Achivements</h2>
                <hr className="section-rule" />
            </div>
            <div className="achievements-list">
                {achievements.map((item) => (
                    <div key={item.id} className="achievement-item">
                        <h3><FaTrophy size={14}/> {item.title}</h3>
                        <div className="achievement-meta">
                            <span><span className="accent-label">Organization:</span> {item.organization}</span>
                            <span><span className="accent-label">Rank:</span> {item.rank}</span>
                            <span><span className="accent-label">Date:</span> {item.date}</span>
                        </div>
                        <hr className="achievement-divider" />
                        <p className="achievement-desc">{item.description}</p>
                        <div className="achievement-links">
                            {item.links.github && (
                                <a href={item.links.github} target="_blank" rel="noreferrer">
                                    <FaGithub size={13} /> [View Repository]
                                </a>
                            )}
                            {item.links.blog && (
                                <a href={item.links.blog} target="_blank" rel="noreferrer">
                                    <FaExternalLinkAlt size={13} /> [Reference]
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
        <section className="widgets-section dashboard-section">
            <div className="widgets-layout">
                <div className="section-heading">
                    <h2>Dashboard</h2>
                    <hr className="section-rule" />
                </div>
                <Widgets />
                <GitHubWidgets />
            </div>
        </section>
    </main>
  )
}

export default Home;
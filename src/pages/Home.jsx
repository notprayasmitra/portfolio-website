import { FaGithub, FaLinkedin, FaReddit, FaArrowRight } from "react-icons/fa";
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

import { personalInfo } from "../data";
import { personalLinks } from "../data";

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
            <h1>Hey! I'm <span className="accent">{personalInfo.name}</span></h1>
            <p className="hero-bio">{personalInfo.bio}</p>
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
            <h2>What I work with</h2>

            {/* Layout for basic flex */}
            
            {/*
            <div className="tech-stack">
                {stack.map((item) => (
                    <div key={item.label} className="tech-item">
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            */}
            
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
        </section>
    </main>
  )
}

export default Home;
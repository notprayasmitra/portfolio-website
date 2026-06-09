import { FaGithub, FaLinkedin, FaReddit, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import { personalInfo } from "../data";
import { personalLinks } from "../data";

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
    </main>
  )
}

export default Home;
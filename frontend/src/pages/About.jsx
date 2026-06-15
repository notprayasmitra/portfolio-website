import "../styles/pages/about.css";

import profileImg from "../assets/half-sized.jpg";
import { FaGithub, FaLinkedin} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function AboutHero() {
    return (
        <div className="about-hero">
            <div className="about-hero-img-wrapper">
                <img src={profileImg} alt="Prayas Mitra" className="about-hero-img" />
            </div>
            <div className="about-hero-text">
                <p className="about-hero-para">
                    Hi! I'm Prayas Mitra — a full-stack developer and student based in Vadodara, India.
                    I like to build cool things when I'm bored.
                </p>
                <p className="about-hero-para">
                    I primarily work with the <span className="accent">MERN stack</span>, and I'm passionate about
                    developer tooling, open-source workflows, and Linux customization.
                    Some of my recent work includes this portfolio, a{" "}
                    <a href="#" className="timeline-link">CRUD app</a>, and a{" "}
                    <a href="#" className="timeline-link">JavaScript reference repo</a>.
                </p>
                <p className="about-hero-para">
                    Outside of coding, I explore cloud computing, take notes in Obsidian,
                    and tinker with my Arch Linux setup. Feel free to{" "}
                    <a href="mailto:your@email.com" className="timeline-link">shoot me an email</a>{" "}
                    if you'd like to chat.
                </p>
                <div className="about-hero-links">
                    <a href="https://github.com/notprayasmitra" target="_blank" rel="noreferrer" className="about-hero-link">
                        <FaGithub size={14} /> GitHub
                    </a>
                    <span className="about-hero-sep">*</span>
                    <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer" className="about-hero-link">
                        <FaLinkedin size={14} /> LinkedIn
                    </a>
                    <span className="about-hero-sep">*</span>
                    <a href="mailto:notprayasmitra@proton.me" className="about-hero-link">
                        <MdEmail size={16} /> Contact Me
                    </a>
                </div>
            </div>
        </div>
    );
}

const Timeline = () => {
  const storyData = [
    {
      id: 1,
      title: "Lorem ipsum",
      content: (
        <>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <a href="#" className="timeline-link">tempor incididunt</a> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </>
      )
    },
    {
      id: 2,
      title: "Lorem ipsum",
      content: (
        <>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <a href="#" className="timeline-link">tempor incididunt</a> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </>
      )
    },
    {
      id: 3,
      title: "Lorem ipsum",
      content: (
        <>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <a href="#" className="timeline-link">tempor incididunt</a> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </>
      )
    },
    {
      id: 4,
      title: "Lorem ipsum",
      content: (
        <>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <a href="#" className="timeline-link">tempor incididunt</a> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </>
      )
    },
    {
      id: 5,
      title: "Lorem ipsum",
      content: (
        <>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <a href="#" className="timeline-link">tempor incididunt</a> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum</p>
          <p>Lorem ipsum</p>
        </>
      )
    }
  ];

  return (
    <section className="timeline-section">
      <h2 className="timeline-main-title">Story</h2>
      <div className="timeline-container">
        {storyData.map((item, index) => {
          const isEven = index % 2 !== 0;
          return (
            <div 
              key={item.id} 
              className={`timeline-row ${isEven ? 'row-reverse' : 'row-normal'}`}
            >
              <div className="timeline-block">
                <h3 className="timeline-block-title">{item.title}</h3>
                <div className="timeline-block-content">
                  {item.content}
                </div>
                
                <div className="timeline-node">
                  {item.id}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

function About() {
    return (
        <div className="page">
            <div className="about-page">
                <h1 className="about-main-title">About Me</h1>
                <AboutHero />
                <Timeline />
            </div>
        </div>
    );
}

export default About;
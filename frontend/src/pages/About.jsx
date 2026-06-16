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
                    Hi! I'm Prayas Mitra — a full-stack developer and a CS student based in Chennai, India.
                    I like to build things when I'm bored.
                </p>
                <p className="about-hero-para">
                    I primarily work with <span className="accent">full-stack technologies</span>, and I'm passionate about
                    software projects, open-source workflows, and Linux customization.
                    Some of my recent work includes this portfolio, {" "}
                    <a href="https://github.com/notprayasmitra/nldb-engine" className="timeline-link">NLDB Engine</a>, and a{" "}
                    <a href="https://github.com/notprayasmitra/folder-color-switcher" className="timeline-link">TUI App</a>.
                </p>
                <p className="about-hero-para">
                    Outside of programming life, I take interest in writing poems and stories, make random references in {" "}
                    <a href="https://obsidian.md" className="timeline-link">Obsidian</a>,
                    and tinker with my Arch Linux setup. Feel free to{" "}
                    <a href="mailto:notprayasmitra@proton.me" className="timeline-link">shoot me an email</a>{" "}
                    if you'd like to chat.
                </p>
                <div className="about-hero-links">
                    <a href="https://github.com/notprayasmitra" target="_blank" rel="noreferrer" className="about-hero-link">
                        <FaGithub size={14} /> GitHub
                    </a>
                    <span className="about-hero-sep">*</span>
                    <a href="https://linkedin.com/in/notprayasmitra" target="_blank" rel="noreferrer" className="about-hero-link">
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
      title: "Humble Beginnings",
      year: "Late 2020",
      content: (
        <>
          <p>At the age of 13, I was introduced to the world of internet through a static webpage created in basic HTML and minimal CSS. Being fascinated at how such a thing was possible, I delved more into how it was created, and thus began my journey in programming.</p>
        </>
      )
    },
    {
      id: 2,
      title: "Messing with Databases",
      year: "2022",
      content: (
        <>
          <p>While in High School, I was entrusted with managing and maintaining parts of the school's database system. I worked on writing queries, handling operations, and creating utilities in Visual Basic for simplified workflows.</p>
        </>
      )
    },
    {
      id: 3,
      title: "First CRUD App",
      year: "Early 2023",
      content: (
        <>
          <p>Driven by curiosity, I taught myself Python and built my first CRUD application connected to a MySQL database. The project featured a teminal-based interface and utilized Pandas, SQLAlchemy, and Matplotlib for data management and minimal analytics.</p>
        </>
      )
    },
    {
      id: 4,
      title: "Upskilling",
      year: "Mid 2024",
      content: (
        <>
          <p>Upon entering college, I actively explored different technical domains through student communities, clubs, and self-learning. During this period, I experimented with multiple technologies before discovering a strong interest in web development.</p>
        </>
      )
    },
    {
      id: 5,
      title: "My First Internship",
      year: "Mid 2025",
      content: (
        <>
          <p>After being selected for the role of a SWE Intern, I contributed and developed various projects like NetKampus, Mentor Connect, Psychometric Test, etc. while being a part of <a href="https://www.saarcmaststech.com/" target="_blank" rel="noreferrer" className="timeline-link">SAARC Masts Pvt. Ltd.</a> During the internship, I collaborated with mentors and my team member to deliver production-ready software.</p>
        </>
      )
    },
    {
      id: 6,
      title: "Joining GeeksforGeeks",
      year: "Late 2025",
      content: (
        <>
          <p>In December, after a few rounds of interview, I was selected to be a part of the <a href="https://gfgsrmrmp.vercel.app" target="_blank" rel="noreferrer" className="timeline-link">GeeksforGeeks Community</a> in my university. From there, I started my journey in competitive programming.</p>
        </>
      )
    },
    {
      id: 7,
      title: "Becoming Microsoft Student Ambassador",
      year: "Early 2026",
      content: (
        <>
          <p>The latter of the last year went by preparing for the <a href="https://mvp.microsoft.com/studentambassadors" target="_blank" rel="noreferrer" className="timeline-link">Microsoft Student Ambassadorship</a>, and when January rolled around, I received a mail highlighting my selection in the program. I had became part of a global community focused on empowering students through technology. Since then, I have organized learning initiatives, and connected with developers and leaders from diverse backgrounds.</p>
        </>
      )
    },
    {
      id: 8,
      title: "A Milestone in my Hackathon Journey",
      year: "Mid 2026",
      content: (
        <>
          <p>After months of hardwork in the <a href="https://www.guidewire.com/resources/blog/developers/guidewire-devtrails-turns-a-university-hackathon-into-a-real-world-build" target="_blank" rel="noreferrer" className="timeline-link">DEVTrails Hackathon</a>, hosted by Guidewire, we finally stepped out after not being selected in the finals. And although we were saddened and disappointed, we were proud still, since we had reached the Diamond Tier in the hackathon and ranked in the Top 100 teams out of a whopping 4400+ teams.</p>
        </>
      )
    },
    {
      id: 9,
      title: "Leader of a Technical Community",
      year: "Mid 2026",
      content: (
        <>
          <p>In May, I was elected as the Technical Co-Head of GeeksforGeeks in my university. As the Technical Co-Head, I lead technical initiatives, guided project teams, and mentored students in software development, and problem-solving. The role strengthened my leadership, communication, and project management skills while allowing the community to grow alongside.</p>
        </>
      )
    },
    {
      id: 10,
      title: "My Second Internship",
      year: "Mid 2026",
      content: (
        <>
          <p>My second internship required me to travel away form my university and being out of my comfort zone. I travelled to Vadodara, Gujarat to work as an SWE Intern for the Information Systems department of <a href="https://iocl.com/gujarat-refinery" target="_blank" rel="noreferrer" className="timeline-link">Indian Oil Corporation Ltd. (IOCL)</a> where most of my work included managing their databases, creating APIs and making web forms in ASP.NET.</p>
        </>
      )
    },
    {
      id: 11,
      title: "Looking Forward",
      year: "Mid 2026",
      content: (
        <>
          <p>From managing school databases to building full-stack platforms and leading technical communities, every experience has reinforced my goal of creating technology that is both impactful and accessible. I continue exploring software engineering, AI, open source, and entrepreneurship as I grow as a developer.</p>
        </>
      )
    },
  ];

  return (
    <section className="timeline-section">
      <h2 className="timeline-main-title">Story</h2>
      <div className="timeline-wrapper">
        <div className="timeline-spine" />
        {storyData.map((item, index) => {
          const isEven = index % 2 !== 0;
          return (
            <div
              key={item.id}
              className={`timeline-row ${isEven ? "row-reverse" : "row-normal"}`}
            >
              <div className="timeline-block">
                <h3 className="timeline-block-title">{item.title}</h3>
                <span className="timeline-block-year">{item.year}</span>
                <div className="timeline-block-content">
                  {item.content}
                </div>
              </div>

              {/* Center node */}
              <div className="timeline-node">{item.id}</div>

              {/* Empty side for alternating layout */}
              <div className="timeline-spacer" />
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
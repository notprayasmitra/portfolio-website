import "../styles/pages/about.css"

import { aboutInfo } from "../data";

function About() {
  return (
    <main className="page">
      <section className="hero">
        <h1>About Me</h1>
        <p className="hero-bio">{aboutInfo.description}</p>
      </section>
    </main>
  )
}

export default About;
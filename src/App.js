// App.js — portfolio page structure and homepage content
import React, { useState } from "react";
import "devicon/devicon.min.css";
import ParticleExplosion from "./components/effects/ParticleExplosion";
import MiniGameBox from "./sections/interactive/MiniGameBox";
import ContactForm from "./sections/contact/ContactForm";
import NavBar from "./components/navigation/NavBar";
import AnimatedBackground from "./components/effects/AnimatedBackground";
import FloatingShapes from "./components/effects/FloatingShapes";
import EffectsToggle from "./components/navigation/EffectsToggle";
import VideoCarousel from "./sections/projects/VideoCarousel";
import { Helmet } from "react-helmet";
import AboutMe from "./sections/about/AboutMe";
import SkillsEducation from "./sections/skills/SkillsEducation";
import TopButton from "./components/navigation/TopButton";
import AssetGallery2D from "./sections/assets/2DAssetGallery";
import AssetGallery3D from "./sections/assets/3DAssetGallery";
import "./styles/PortfolioEnhancements.css";
import "./styles/PolishControls.css";
import "./styles/LayoutRefinements.css";
import "./styles/HeroRefinements.css";

const skills = [
  {
    category: "Programming Languages",
    icons: [
      { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      { name: "C#", class: "devicon-csharp-plain colored" },
      { name: "C++", class: "devicon-cplusplus-plain colored" },
      { name: "HTML5", class: "devicon-html5-plain colored" },
      { name: "CSS3", class: "devicon-css3-plain colored" },
      { name: "JavaScript", class: "devicon-javascript-plain colored" },
    ],
  },
  {
    category: "Game Engines",
    icons: [
      { name: "Unity", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg" },
      { name: "Unreal Engine", class: "devicon-unrealengine-original colored" },
      { name: "Godot", class: "devicon-godot-plain colored" },
      { name: "Ren'Py", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/renpy/renpy-original.svg" },
    ],
  },
  {
    category: "Design & Multimedia",
    icons: [
      { name: "Blender", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg" },
      { name: "Photoshop", class: "devicon-photoshop-plain colored" },
      { name: "GIMP", class: "devicon-gimp-plain colored" },
      { name: "DaVinci Resolve", src: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg" },
      { name: "Aseprite", src: `${process.env.PUBLIC_URL}/img/skills/aseprite.svg` },
      { name: "Krita", src: `${process.env.PUBLIC_URL}/img/skills/krita.svg` },
      { name: "Spine2D", src: "https://styles.redditmedia.com/t5_2mvt3f/styles/communityIcon_apt5vcye2tw41.png" },
    ],
  },
  {
    category: "Version Control & Project Management",
    icons: [
      { name: "GitHub", class: "devicon-github-original colored" },
      { name: "Git", class: "devicon-git-plain colored" },
      { name: "Trello", class: "devicon-trello-plain colored" },
    ],
  },
  {
    category: "Databases",
    icons: [
      { name: "MySQL", class: "devicon-mysql-plain colored" },
      { name: "Oracle", class: "devicon-oracle-original colored" },
      { name: "SQLite", class: "devicon-sqlite-plain colored" },
    ],
  },
];

// Hero shows a concise sample first; all technologies and the full skills section remain accessible.
const featuredTechnologies = [
  "Unity", "Unreal Engine", "Godot", "C#", "Python", "Java",
  "JavaScript", "React", "C++", "HTML / CSS", "MySQL",
];

function App() {
  const [showAssets, setShowAssets] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);
  const [effectsPaused, setEffectsPaused] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const resumeUrl = "https://drive.google.com/file/d/1f_YqmpuhB_b4VpNf5T6ttGoPCm9yQUBc/view?usp=sharing";

  return (
    <div className={`portfolio-v2${effectsPaused ? " effects-paused" : ""}`}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <TopButton />
      <AnimatedBackground paused={effectsPaused} />
      <FloatingShapes />
      <EffectsToggle paused={effectsPaused} onToggle={() => setEffectsPaused((previous) => !previous)} />
      <NavBar onResumeClick={() => window.open(resumeUrl, "_blank", "noopener,noreferrer")} />

      <main id="home" className="portfolio-main">
        <header className="portfolio-hero portfolio-hero-v8">
          <div className="portfolio-hero-intro-v8">
            <div className="portfolio-hero-portrait-v8">
              <img
                src={`${process.env.PUBLIC_URL}/img/profile-picture.png`}
                alt="Pixel-art portrait of Mingwei Zhang"
                className="rounded-circle profile-pic portfolio-avatar"
                width="260"
                height="260"
              />
            </div>
            <div className="portfolio-hero-copy-v8">
              <p className="portfolio-eyebrow pixel-text">WELCOME TO MY PORTFOLIO</p>
              <h1 className="pixel-text pixel-heading">Mingwei Zhang</h1>
              <p className="pixel-text pixel-subheading software-title">Software &amp; Game Developer</p>
              <p className="portfolio-hero-subtitle">
                Gameplay programming, interactive systems, and software development.
              </p>
              <div className="portfolio-hero-actions">
                <a className="portfolio-action portfolio-action-primary" href="#projects">Explore projects</a>
                <a className="portfolio-hero-secondary-link-v8" href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
                <a className="portfolio-hero-secondary-link-v8" href="https://github.com/mingwzhang" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>

          <div className="portfolio-tech-summary portfolio-tech-summary-v8">
            <button
              type="button"
              className="portfolio-tech-toggle-v8"
              onClick={() => setShowAllTech((previous) => !previous)}
              aria-expanded={showAllTech}
              aria-controls="portfolio-tech-details-v8"
            >
              <span>TECHNOLOGIES I WORK WITH</span>
              <span className="portfolio-tech-toggle-action-v8">{showAllTech ? "Hide tools −" : "Explore tools +"}</span>
            </button>
            <div id="portfolio-tech-details-v8" className="portfolio-tech-details-v8" hidden={!showAllTech}>
              <div className="portfolio-tech-strip" aria-label="Highlighted technologies">
                {featuredTechnologies.map((name) => <span key={name}>{name}</span>)}
              </div>
              <a className="portfolio-all-skills-link" href="#skills-section">See all skills &amp; tools ↓</a>
            </div>
          </div>
        </header>

        <AboutMe />

        <section id="projects" className="portfolio-section portfolio-featured-section" aria-labelledby="portfolio-projects-heading">
          <div className="portfolio-section-heading">
            <span className="portfolio-kicker">01 / SELECTED WORK</span>
            <h2 id="portfolio-projects-heading" className="pixel-text pixel-bold-title">Featured Projects</h2>
            <p>Explore game footage, verified project responsibilities, and links to each release.</p>
          </div>
          <VideoCarousel />
        </section>

        <section id="skills-section" className="portfolio-section portfolio-skills-section" aria-labelledby="portfolio-skills-heading">
          <div className="portfolio-section-heading">
            <span className="portfolio-kicker">02 / TECHNICAL BACKGROUND</span>
            <h2 id="portfolio-skills-heading" className="pixel-text pixel-bold-title">Skills &amp; Education</h2>
            <p>Programming languages, game engines, development tools, and education.</p>
          </div>
          <SkillsEducation skills={skills} />
        </section>

        <section id="more-work" className="portfolio-section portfolio-more-work" aria-labelledby="more-work-heading">
          <div className="portfolio-section-heading">
            <span className="portfolio-kicker">03 / EXPLORE MORE</span>
            <h2 id="more-work-heading" className="pixel-text pixel-bold-title">Interactive Demo &amp; Assets</h2>
            <p>A playable React mini-game and examples of 2D and 3D development work.</p>
          </div>
          <div className="portfolio-demo-panel">
            <div className="portfolio-demo-description">
              <span className="portfolio-kicker">BUILT INTO THIS WEBSITE</span>
              <h3 className="pixel-text">Hit the Target!</h3>
              <p>Try the interactive mini-game. Click or tap the moving target to increase your score.</p>
              <p className="portfolio-muted">An interactive component of this React portfolio.</p>
            </div>
            <div className="portfolio-demo-game"><MiniGameBox /></div>
          </div>
          <button
            type="button"
            className="portfolio-action portfolio-asset-toggle"
            aria-controls="portfolio-asset-galleries"
            aria-expanded={showAssets}
            onClick={() => setShowAssets((previous) => !previous)}
          >
            {showAssets ? "Hide 2D & 3D asset galleries −" : "Explore 2D & 3D asset galleries +"}
          </button>
          {showAssets && (
            <div id="portfolio-asset-galleries" className="portfolio-assets-grid">
              <div className="portfolio-asset-panel"><AssetGallery2D /></div>
              <div className="portfolio-asset-panel"><AssetGallery3D /></div>
            </div>
          )}
        </section>

        <section id="contact" className="portfolio-section portfolio-contact-section" aria-labelledby="portfolio-contact-heading">
          <div className="portfolio-section-heading">
            <span className="portfolio-kicker">04 / GET IN TOUCH</span>
            <h2 id="portfolio-contact-heading" className="pixel-text pixel-bold-title">Contact</h2>
            <p>Feel free to reach out about software engineering, gameplay development, or collaboration.</p>
          </div>
          <div className="portfolio-contact-actions">
            <a href="mailto:mingw.zhang123@gmail.com" className="portfolio-action">Email</a>
            <a href="https://www.linkedin.com/in/mingwei-zhang1/" className="portfolio-action" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <ContactForm />
        </section>
      </main>

      <ParticleExplosion />
      <footer className="footer-note portfolio-footer">
        © {new Date().getFullYear()} Mingwei Zhang — Built with React.
      </footer>
    </div>
  );
}

export default App;

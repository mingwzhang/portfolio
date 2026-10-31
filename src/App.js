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
import GameplayArchitecture from "./sections/architecture/GameplayArchitecture";
import { Helmet } from "react-helmet";
import AboutMe from "./sections/about/AboutMe";
import SkillsEducation from "./sections/skills/SkillsEducation";
import TopButton from "./components/navigation/TopButton";
import AssetGallery2D from "./sections/assets/2DAssetGallery";
import AssetGallery3D from "./sections/assets/3DAssetGallery";
import SlideReveal from "./components/common/SlideReveal";
import { skills, featuredTechnologies } from "./data/portfolio-data";
import "./styles/PortfolioEnhancements.css";
import "./styles/layout-and-controls.css";
import "./styles/navigation-and-skills.css";
import "./styles/typography-and-responsive.css";
import "./styles/skills-readability-hover.css";

function App() {
  const [showAssets, setShowAssets] = useState(true);
  const [showAllTech, setShowAllTech] = useState(true);
  const [effectsPaused, setEffectsPaused] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const resumeUrl = "https://drive.google.com/file/d/1bVhmyGEYZ0FH-HIsXgMh15NRwaEes568/view?usp=sharing";

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
            {/* Keep the full technology list and its skills link together inside the slide. */}
            <SlideReveal id="portfolio-tech-details-v8" open={showAllTech} className="portfolio-tech-slide">
              <div className="portfolio-tech-details-v8 portfolio-tech-list">
                <div className="portfolio-tech-strip" aria-label="Highlighted technologies">
                  {featuredTechnologies.map((name) => <span key={name}>{name}</span>)}
                  <a
                    className="portfolio-all-skills-link"
                    href="#skills-section"
                    onClick={(event) => {
                      event.preventDefault();
                      document.getElementById("skills-section")?.scrollIntoView({
                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                        block: "start",
                      });
                      window.history.replaceState(null, "", "#skills-section");
                    }}
                  >See all skills &amp; tools</a>
                </div>
              </div>
            </SlideReveal>
            {/* The toggle remains below the animated list in both states. */}
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
          </div>
        </header>

        <AboutMe />

        <section id="projects" className="portfolio-section portfolio-featured-section" aria-labelledby="portfolio-projects-heading">
          <div className="portfolio-section-heading">
            <span className="portfolio-kicker">01 / SELECTED WORK</span>
            <h2 id="portfolio-projects-heading" className="pixel-text pixel-bold-title">Featured Projects</h2>
            <p>Explore game footage, my role and contributions, and links to each release.</p>
          </div>
          <VideoCarousel />
        </section>

        <section id="architecture" className="portfolio-section portfolio-architecture-section" aria-labelledby="portfolio-architecture-heading">
          <div className="portfolio-section-heading">
            <span className="portfolio-kicker">02 / BEHIND THE CODE</span>
            <h2 id="portfolio-architecture-heading" className="pixel-text pixel-bold-title">Gameplay Architecture &amp; Design Patterns</h2>
            <p>Engine-independent principles, practical decisions, and reusable approaches to gameplay development.</p>
          </div>
          <GameplayArchitecture />
        </section>

        <section id="skills-section" className="portfolio-section portfolio-skills-section" aria-labelledby="portfolio-skills-heading">
          <div className="portfolio-section-heading">
            <span className="portfolio-kicker">03 / TECHNICAL BACKGROUND</span>
            <h2 id="portfolio-skills-heading" className="pixel-text pixel-bold-title">Skills &amp; Education</h2>
            <p>Programming languages, game engines, development tools, and education.</p>
          </div>
          <SkillsEducation skills={skills} />
        </section>

        <section id="more-work" className="portfolio-section portfolio-more-work" aria-labelledby="more-work-heading">
          <div className="portfolio-section-heading">
            <span className="portfolio-kicker">04 / EXPLORE MORE</span>
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
          <SlideReveal id="portfolio-asset-galleries" open={showAssets} className="portfolio-assets-slide">
            <div className="portfolio-assets-grid">
              <div className="portfolio-asset-panel"><AssetGallery2D /></div>
              <div className="portfolio-asset-panel"><AssetGallery3D /></div>
            </div>
          </SlideReveal>
        </section>

        <section id="contact" className="portfolio-section portfolio-contact-section" aria-labelledby="portfolio-contact-heading">
          <div className="portfolio-section-heading">
            <span className="portfolio-kicker">05 / GET IN TOUCH</span>
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

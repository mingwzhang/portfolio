import React, { useRef, useState } from "react";
import { FaLinkedin, FaChevronUp, FaChevronDown } from "react-icons/fa";
import "./NavBar.css";

const navigation = [
  { label: "Featured Projects", section: "projects" },
  { label: "About Me", section: "about" },
  { label: "Skills & Education", section: "skills-section" },
  { label: "Interactive Demo & Assets", section: "more-work" },
  { label: "Contact", section: "contact" },
];

const NavBar = ({ onResumeClick }) => {
  const [navHidden, setNavHidden] = useState(() => window.innerWidth <= 768);
  const dragStartY = useRef(null);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (window.innerWidth <= 768) setNavHidden(true);
  };

  const beginDrag = (event) => {
    dragStartY.current = event.touches ? event.touches[0].clientY : event.clientY;
  };

  const moveDrag = (event) => {
    if (dragStartY.current === null) return;
    const currentY = event.touches ? event.touches[0].clientY : event.clientY;
    const distance = dragStartY.current - currentY;
    if (distance > 45) { setNavHidden(true); dragStartY.current = null; }
    if (distance < -45) { setNavHidden(false); dragStartY.current = null; }
  };

  return (
    <nav className={`nav-bar ${navHidden ? "hidden" : ""}`} aria-label="Main navigation">
      <div className="nav-container nav-layout-v7">
        <div className="nav-content-v7" id="portfolio-navigation">
          <div className="nav-upper-v7">
            <div className="nav-left">
              <button type="button" className="nav-btn nav-name nav-text" onClick={() => scrollToSection("home")}>Mingwei Zhang</button>
            </div>
            <div className="nav-actions-v7" aria-label="Profile links">
              <button type="button" onClick={onResumeClick} className="nav-btn nav-resume nav-text">Resume 📎</button>
              <a href="https://github.com/mingwzhang" target="_blank" rel="noopener noreferrer" className="nav-btn nav-item nav-text nav-github">GitHub</a>
              <a href="https://www.linkedin.com/in/mingwei-zhang1/" target="_blank" rel="noopener noreferrer" className="nav-btn nav-linkedin nav-text">
                <FaLinkedin size={16} style={{ marginRight: "0.35rem" }} />LinkedIn
              </a>
            </div>
          </div>
          <div className="nav-section-row-v7" aria-label="Portfolio sections">
            {navigation.map(({ label, section }) => (
              <button type="button" key={section} onClick={() => scrollToSection(section)} className="nav-btn nav-item nav-text">{label}</button>
            ))}
          </div>
        </div>
        <button
          type="button"
          className={`nav-toggle-btn ${navHidden ? "nav-hidden" : ""}`}
          onClick={() => setNavHidden((previous) => !previous)}
          onTouchStart={beginDrag}
          onTouchMove={moveDrag}
          onTouchEnd={() => { dragStartY.current = null; }}
          onMouseDown={beginDrag}
          onMouseMove={moveDrag}
          onMouseUp={() => { dragStartY.current = null; }}
          onMouseLeave={() => { dragStartY.current = null; }}
          aria-expanded={!navHidden}
          aria-controls="portfolio-navigation"
          title={navHidden ? "Show menu" : "Hide menu"}
        >
          {navHidden ? <><FaChevronDown aria-hidden="true" /><span className="nav-toggle-text">Show Menu</span></> : <><FaChevronUp aria-hidden="true" /><span className="nav-toggle-text">Hide Menu</span></>}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

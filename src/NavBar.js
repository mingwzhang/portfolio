import React, { useState } from "react";
import { FaLinkedin, FaChevronUp, FaChevronDown } from "react-icons/fa";
import "./NavBar.css"; // Import our nav-specific CSS

const NavBar = ({ onResumeClick }) => {
  const [navHidden, setNavHidden] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleLinkedInClick = (e) => {
    e.preventDefault();
    setTimeout(() => {
      window.open("https://www.linkedin.com/in/mingwei-zhang1/", "_blank");
    }, 200);
  };

  // Touch event handlers for mobile only (simulate hover)
  const handleTouchStart = (e) => {
    e.currentTarget.classList.add("hover");
  };
  const handleTouchEnd = (e) => {
    e.currentTarget.classList.remove("hover");
  };

  return (
    <>
      <nav className={`nav-bar ${navHidden ? "hidden" : ""}`}>
        <div className="nav-container">
          <div className="nav-left">
            <button
              onClick={() => scrollToSection("home")}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className="nav-btn nav-name nav-text"
            >
              Mingwei Zhang
            </button>
          </div>
          <div className="nav-right">
            <button
              onClick={() => scrollToSection("about")}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className="nav-btn nav-item nav-text"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("skills-education")}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className="nav-btn nav-item nav-text"
            >
              Skills/Education
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className="nav-btn nav-item nav-text"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className="nav-btn nav-item nav-text"
            >
              Contact
            </button>
            <a
              href="https://www.linkedin.com/in/mingwei-zhang1/"
              onClick={handleLinkedInClick}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className="nav-btn nav-linkedin nav-text"
            >
              <FaLinkedin size={24} style={{ marginRight: "0.5rem" }} />
              LinkedIn
            </a>
            <button
              onClick={onResumeClick}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className="nav-btn nav-resume nav-text"
            >
              Resume <span role="img" aria-label="document">📎</span>
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile-only toggle button */}
      <button 
        className={`nav-toggle-btn ${navHidden ? "nav-hidden" : ""}`}
        onClick={() => setNavHidden(!navHidden)}
      >
        {navHidden ? <FaChevronDown /> : <FaChevronUp />}
      </button>
    </>
  );
};

export default NavBar;

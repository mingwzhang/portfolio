import React, { useState, useEffect } from "react";
import { FaLinkedin, FaChevronUp, FaChevronDown } from "react-icons/fa";
import "./NavBar.css"; // Import our nav-specific CSS

const NavBar = ({ onResumeClick }) => {
  const [navHidden, setNavHidden] = useState(window.innerWidth <= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dragStartY, setDragStartY] = useState(null);
  const [dragging, setDragging] = useState(false); // Only enable drag when holding toggle button

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Start dragging when toggle button is pressed
  const handleTogglePress = (e) => {
    setDragging(true);
    setDragStartY(e.touches ? e.touches[0].clientY : e.clientY);
  };

  // Handle touch/mouse move (only if dragging is enabled)
  const handleDragMove = (e) => {
    if (!dragging || !dragStartY) return;

    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const dragDistance = dragStartY - currentY;

    if (dragDistance > 50) {
      // Drag Up → Hide Navbar
      setNavHidden(true);
    } else if (dragDistance < -50) {
      // Drag Down → Show Navbar
      setNavHidden(false);
    }
  };

  // Stop dragging when toggle button is released
  const handleDragEnd = () => {
    setDragging(false);
    setDragStartY(null);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`nav-bar ${navHidden ? "hidden" : ""}`}
      onTouchMove={handleDragMove}
      onMouseMove={handleDragMove}
    >
      <div className="nav-container">
        <div className="nav-left">
          <button
            onClick={() => scrollToSection("home")}
            className="nav-btn nav-name nav-text"
          >
            Mingwei Zhang
          </button>
        </div>
        <div className="nav-right">
          <button
            onClick={() => scrollToSection("about")}
            className="nav-btn nav-item nav-text"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("skills-education")}
            className="nav-btn nav-item nav-text"
          >
            Skills & Education
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="nav-btn nav-item nav-text"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="nav-btn nav-item nav-text"
          >
            Contact
          </button>
          <button
            onClick={onResumeClick}
            className="nav-btn nav-resume nav-text"
          >
            Resume{" "}
            <span role="img" aria-label="document">
              📎
            </span>
          </button>
          <a
            href="https://www.linkedin.com/in/mingwei-zhang1/"
            className="nav-btn nav-linkedin nav-text"
          >
            <FaLinkedin size={24} style={{ marginRight: "0.5rem" }} />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Show Toggle Button on Mobile */}
      {isMobile && (
        <button
          className={`nav-toggle-btn ${navHidden ? "nav-hidden" : ""}`}
          onClick={() => setNavHidden(!navHidden)}
          onTouchStart={handleTogglePress}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleTogglePress}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          title={navHidden ? "Show Menu" : "Hide Menu"}
        >
          {navHidden ? (
            <>
              <FaChevronDown style={{ marginRight: "8px" }} />
              <span className="nav-toggle-text">Show Menu</span>
            </>
          ) : (
            <>
              <FaChevronUp style={{ marginRight: "8px" }} />
              <span className="nav-toggle-text">Hide Menu</span>
            </>
          )}
        </button>
      )}
    </nav>
  );
};

export default NavBar;

import React from "react";

const NavBar = ({ onResumeClick }) => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Transparent black
        backdropFilter: "blur(10px)", // Adds glass effect
        padding: "1rem",
        borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      {/* Use a full-width flex container */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "99%",
        }}
      >
        {/* Left side: Your name on the very left */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => scrollToSection("home")}
            className="btn pixel-btn pixel-text nav-text"
            style={{
              fontSize: "1.5rem",
              background: "none",
              border: "none",
              padding: "0.5rem 1rem",
              margin: 0,
              minWidth: "200px",
              textAlign: "left",
            }}
          >
            Mingwei Zhang
          </button>
        </div>

        {/* Right side: Other navigation items flush to the right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.2rem", // reduced gap between buttons
          }}
        >
          <button
            onClick={() => scrollToSection("about")}
            className="btn pixel-btn pixel-text nav-text"
            style={{
              background: "none",
              border: "none",
              padding: "0.5rem 0.5rem",
              margin: 0,
            }}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("skills-education")}
            className="btn pixel-btn pixel-text nav-text"
            style={{
              background: "none",
              border: "none",
              padding: "0.5rem 0.5rem",
              margin: 0,
            }}
          >
            Skills/Education
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="btn pixel-btn pixel-text nav-text"
            style={{
              background: "none",
              border: "none",
              padding: "0.5rem 0.5rem",
              margin: 0,
            }}
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="btn pixel-btn pixel-text nav-text"
            style={{
              background: "none",
              border: "none",
              padding: "0.5rem 0.5rem",
              margin: 0,
            }}
          >
            Contact
          </button>

          {/* Resume Button */}
          <button
            onClick={onResumeClick}
            className="btn pixel-btn pixel-text"
            style={{
              display: "inline-flex",
              alignItems: "center",
              width: "auto",
              padding: "0.5rem 1rem",
              border: "2px dashed #2ecacf",
              color: "rgb(0, 255, 98)",
              fontWeight: "bold",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontSize: "1.1rem",
              transition:
                "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
              margin: 0,
              marginLeft: "2rem",
            }}
          >
            Resume
            <span
              role="img"
              aria-label="document"
              style={{
                fontSize: "1.5em",
                marginLeft: "0.5rem",
                marginTop: "-10px",
              }}
            >
              📎
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

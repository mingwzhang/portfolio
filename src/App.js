// App.js
import React, {useEffect } from "react";
import "devicon/devicon.min.css";
import Typewriter from "typewriter-effect";
import ParticleExplosion from "./ParticleExplosion";
import MiniGameBox from "./MiniGameBox";
import ContactForm from "./ContactForm";
import NavBar from "./NavBar"; // import the nav component
import AnimatedBackground from "./AnimatedBackground";
import FloatingShapes from "./FloatingShapes"; // Import the new component
import VideoCarousel from "./VideoCarousel";
import { Helmet } from "react-helmet";

const skills = [
  {
    category: "Programming Languages",
    icons: [
      {
        name: "Python",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      },
      {
        name: "Java",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      },
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
      {
        name: "Unity",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg",
      },
      { name: "Unreal Engine", class: "devicon-unrealengine-original colored" },
      { name: "Godot", class: "devicon-godot-plain colored" },
      {
        name: "Ren'Py",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/renpy/renpy-original.svg",
      },
    ],
  },
  {
    category: "Design & Multimedia",
    icons: [
      {
        name: "Blender",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg",
      },
      { name: "Photoshop", class: "devicon-photoshop-plain colored" },
      { name: "GIMP", class: "devicon-gimp-plain colored" },
      {
        name: "DaVinci Resolve",
        src: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg",
      },
      {
        name: "Aseprite",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Logo_Aseprite.svg/1200px-Logo_Aseprite.svg.png",
      },
      {
        name: "Krita",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Calligrakrita-base.svg/1200px-Calligrakrita-base.svg.png",
      },
      {
        name: "Spine2D",
        src: "https://styles.redditmedia.com/t5_2mvt3f/styles/communityIcon_apt5vcye2tw41.png",
      },
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

function App() {

  useEffect(() => {
    document.addEventListener("touchstart", () => {}, false);
  }, []);

  return (
    <div>
<Helmet>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
</Helmet>
      {/* Fixed side banner */}
      <AnimatedBackground />
      <FloatingShapes /> {/* Adds 3D-like floating effect */}
      {/* Render the NavBar at the top */}
      <NavBar
  onResumeClick={() =>
    window.open(
      "https://drive.google.com/file/d/1WnNJx3P6rJXduuo34JcGIqvAVfGZPixU/view?usp=sharing",
      "_blank"
    )
  }
/>
      {/* Add padding at the top so the fixed NavBar doesn't cover the content */}
      <div
        id="home"
        className="d-flex flex-column align-items-center text-center"
        style={{ paddingTop: "150px" }}
      >
        {/* Profile Picture */}
        <img
          src={process.env.PUBLIC_URL + "/img/profile-picture.png"}
          alt="Mingwei Zhang"
          className="rounded-circle mb-3 profile-pic"
          width="300"
          height="300"
        />

        {/* Name & Title */}
        <h1 className="pixel-text pixel-heading">Mingwei Zhang</h1>
        <h3 className="pixel-text pixel-subheading software-title">
          Software & Game Developer
        </h3>
        <p className="pixel-text pixel-small fade-in-message">
          🖱️ Feel free to click around!
        </p>
        {/* About Me Section (placed directly here) */}
        <section id="about" className="container" style={{ margin: "40px 0" }}>
          <h2 className="mt-1 text-center pixel-text pixel-bold-title">
            <span className="emoji-large">👤</span> About Me
          </h2>
          <p className="pixel-text">
            <Typewriter
              options={{
                autoStart: true,
                loop: false,
                delay: window.innerWidth <= 768 ? 0 : 0.5, // 0 for instant typing on mobile
                deleteSpeed: Infinity,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    "I'm a dedicated software and game developer with a passion for creating immersive digital experiences. My background in full-stack development and game design has led me to work with technologies like Java, Python, HTML, CSS, and game engines such as Unity and Unreal Engine. Whether I'm building interactive web applications or designing VR games, I enjoy turning complex challenges into simple, effective solutions."
                  )
                  .pauseFor(window.innerWidth <= 768 ? 0 : 1) // Reduce pause time for mobile
                  .typeString("<br/><br/>") // New paragraph
                  .typeString(
                    "Currently, I am advancing my skills through graduate studies at Queens College. I combine creative vision with technical know-how on every project I take on. I value teamwork and continuous learning, and I'm always excited to try new ideas that improve interactive design. Feel free to explore my work and get in touch to share ideas or opportunities. ⬇"
                  )
                  .start();
              }}
            />
          </p>
        </section>

        {/* Skills and Education Section */}
        <div id="skills-education" className="container w-75 mt-3">
          <div className="row">
            {/* Skills Section (Left Column) */}
            <div className="col-md-6">
              <h4 className="mt-1 text-center pixel-text pixel-bold-title">
                <span className="emoji-large">💻</span> Skills
              </h4>
              <div className="row">
                {skills.map((skill, index) => (
                  <div key={index} className="col-12">
                    <div className="card m-1 p-2 text-center">
                      <h6 className="pixel-text">{skill.category}</h6>
                      <div
                        className="d-flex justify-content-center flex-wrap"
                        style={{ width: "100%" }}
                      >
                        {skill.icons.map((icon, idx) => (
                          <div
                            key={idx}
                            className="icon-wrapper m-1 hover-scale"
                          >
                            {icon.src ? (
                              <img src={icon.src} alt={icon.name} />
                            ) : (
                              <i
                                className={`${icon.class}`}
                                title={icon.name}
                              ></i>
                            )}
                            <span className="icon-label">{icon.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section (Right Column) */}
            <div className="col-md-6">
              <h4 className="mt-1 text-center pixel-text pixel-bold-title">
                <span className="emoji-large">🎓</span> Education
              </h4>
              {/* Education Card for Queens College */}
              <div className="card m-1 p-2 text-center">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/img/Queens_College_logo.png"
                    }
                    alt="Queens College Logo"
                    className="icon-wrapper-education queens-college-logo"
                  />

                  <p className="pixel-text" style={{ margin: 0 }}>
                    Master of Arts:
                  </p>
                  <p className="pixel-text" style={{ margin: 0 }}>
                    Computer Science
                  </p>
                  <p className="pixel-text" style={{ margin: "2rem 0 0 0" }}>
                    Expected graduation:
                  </p>
                  <p className="pixel-text" style={{ margin: 0 }}>
                    May 2026
                  </p>
                </div>
              </div>
              {/* Education Card for Stony Brook University */}
              <div className="card m-1 p-2 text-center">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/img/Stony_Brook_U_logo.png"}
                    alt="Stony Brook University Logo"
                    className="icon-wrapper-education stony-brook-logo"
                  />

                  <p className="pixel-text" style={{ margin: 0 }}>
                    Bachelor of Science:
                  </p>
                  <p className="pixel-text" style={{ margin: 0 }}>
                    Double Major in Information Systems and Applied Mathematics
                  </p>
                  <p className="pixel-text" style={{ margin: "2rem 0 0 0" }}>
                    Graduated:
                  </p>
                  <p className="pixel-text" style={{ margin: 0 }}>
                    Aug 2021
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="projects" className="container mt-5 text-center">
          <div className="m-3">
            <h4 className="pixel-text pixel-bold-title">
              <span className="emoji-large">💡</span> Projects
            </h4>
            <div className="d-flex justify-content-center">
              <button
                className="m-2 pixel-text pixel-btn-3d btn-fixed-size"
                onClick={() =>
                  window.open("https://github.com/mingwzhang", "_blank")
                }
              >
                View Code (GitHub)
              </button>
              <button
                className="m-2 pixel-text pixel-btn-3d btn-fixed-size"
                onClick={() =>
                  window.open("https://mindeveloper.itch.io/", "_blank")
                }
              >
                Play Game (itch.io)
              </button>
            </div>
            {/* Outer container: flex with two columns */}
            <div
              className="d-flex justify-content-between align-items-center mt-5"
              style={{ width: "100%" }}
            >
              {/* Left column: Mini Game */}
              <div className="mini-game-column">
                <h5 className="pixel-text">Mini Game: Hit the Target!</h5>
                <MiniGameBox />
              </div>
              {/* Right column: Games and Assets */}
              <div
                className="d-flex flex-column justify-content-between"
                style={{ marginLeft: "1rem" }}
              >
                <div className="games-section shifted-content">
                  <h5 className="pixel-text">Games (Low Budget)</h5>
                  <VideoCarousel />
                </div>
                <div className="asset-section mt-3 d-flex flex-column align-items-center">
                  <h5 className="pixel-text">Asset Display</h5>
                  <div
                    className="another-placeholder mt-3"
                    style={{
                      width: "400px",
                      height: "400px",
                      border: "2px solid #ccc",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Another Placeholder
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The ResumeModal is conditionally rendered based on state.
            It can be placed anywhere in the return statement,
            but placing it here ensures it overlays your page content. */}


        {/* Contact Me Section */}
        <div id="contact" className="mt-5 bottom-spacing pixel-text">
          <ContactForm />
        </div>
      </div>
      <ParticleExplosion />
    </div>
  );
}

export default App;

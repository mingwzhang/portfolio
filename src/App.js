// App.js
import React, { useEffect } from "react";
import "devicon/devicon.min.css";
import ParticleExplosion from "./ParticleExplosion";
import MiniGameBox from "./MiniGameBox";
import ContactForm from "./ContactForm";
import NavBar from "./NavBar"; // import the nav component
import AnimatedBackground from "./AnimatedBackground";
import FloatingShapes from "./FloatingShapes"; // Import the new component
import VideoCarousel from "./VideoCarousel";
import { Helmet } from "react-helmet";
import AboutMe from "./AboutMe";
import SkillsEducation from "./SkillsEducation";
import TopButton from "./TopButton";
import AssetGallery2D from "./2DAssetGallery";
import AssetGallery3D from "./3DAssetGallery";

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
    document.addEventListener("touchstart", () => { }, false);
    let resizeTimeout = null;

  const handler = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // any resize side effects you need
    }, 250);
  };

  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
  
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
      <TopButton />
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

        <AboutMe />
        <SkillsEducation skills={skills} />

        {/* PROJECTS */}
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

            {/* TOP: Mini Game + Video */}
            <div
              className="d-flex justify-content-between align-items-start mt-5 projects-top-row"
              style={{ width: "100%" }}
            >
              <div className="mini-game-column">
                <h5 className="pixel-text">Mini Game: Hit the Target!</h5>
                <MiniGameBox />
              </div>

              <div className="games-section shifted-content" style={{ width: "600px" }}>
                <h5 className="pixel-text">Games (Low Budget)</h5>
                <VideoCarousel />
              </div>
            </div>

            {/* BOTTOM: 2D + 3D side by side */}
            <div
              className="d-flex justify-content-between align-items-start mt-5"
              style={{ width: "100%" }}
            >
              <div style={{ width: "48%" }}>
                <AssetGallery2D />
              </div>

              <div style={{ width: "48%" }}>
                <AssetGallery3D />
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

      {/* Particle explosion background */}
      <ParticleExplosion />
    </div>
  );
}

export default App;

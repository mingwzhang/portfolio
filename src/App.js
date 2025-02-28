import React, { useState } from "react";
import "devicon/devicon.min.css";
import Typewriter from "typewriter-effect";


const skills = [
  {
    category: "Programming Languages",
    icons: [
      {
        name: "Python",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      },
      { name: "C#", class: "devicon-csharp-plain colored" },
      {
        name: "Java",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      },
      { name: "C++", class: "devicon-cplusplus-plain colored" },
      { name: "HTML5", class: "devicon-html5-plain colored" },
      { name: "CSS3", class: "devicon-css3-plain colored" },
      { name: "JavaScript", class: "devicon-javascript-plain colored" },
      { name: "R", class: "devicon-r-original colored" },
      { name: "Lisp", class: "devicon-clisp-plain colored" },
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
      {
        name: "MIT App Inventor",
        class: "devicon-mitappinventor-plain colored",
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
      { name: "MS Access", class: "devicon-msaccess-plain colored" },
    ],
  },
];

function App() {
  const [showResume, setShowResume] = useState(false);
  return (
    <div className="d-flex flex-column align-items-center text-center mt-5 pb-4">

      {/* Profile Picture */}
      <img
        src="/img/profile-picture.png" // Ensure this path is correct
        alt="Mingwei Zhang"
        className="rounded-circle mb-3 profile-pic"
        width="300"
        height="300"
        style={{ marginTop: "20px" }} // Move down slightly
      />

      {/* Name & Title */}
      <h1 className="text-primary pixel-text pixel-heading">Mingwei Zhang</h1>
      <h3 className="text-secondary pixel-text pixel-subheading">
        Software & Game Developer
      </h3>

      {/* Short Bio */}
      <p className="mt-3 w-50 pixel-text">
        <Typewriter
          options={{
            strings: [
              "Dedicated developer with expertise in full-stack development, game design, and front-end technologies.",
              "Passionate about creating interactive applications and immersive experiences.",
            ],
            autoStart: true,
            loop: false, // ✅ Stops after one playthrough
            delay: 50,
            deleteSpeed: Infinity, // ✅ Ensures it doesn’t erase
          }}
        />
      </p>

      {/* Resume & Skills Section Side by Side */}
      <div className="container w-75 mt-4">
        <div className="row">
          {/* Skills Section (Left Side - 40% width) */}
          <div className="col-md-4">
            <h4 className="mt-4 text-center pixel-text">Skills</h4>
            <div className="row">
              {skills.map((skill, index) => (
                <div key={index} className="col-12">
                  <div className="card m-1 p-2 text-center">
                    <h6 className="pixel-text">{skill.category}</h6>
                    <div className="d-flex justify-content-center flex-wrap">
                      {skill.icons.map((icon, idx) =>
                        icon.src ? (
                          <img
                            key={idx}
                            src={icon.src}
                            width="40"
                            height="40"
                            alt={icon.name}
                            className="m-1"
                          />
                        ) : (
                          <i
                            key={idx}
                            className={`${icon.class} display-6 m-1`}
                            title={icon.name}
                          ></i>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Section (Right Side - 60% width) */}
          <div className="col-md-8 text-center">
            <h4 className="pixel-text">Resume</h4>
            {/* Centered Resume Button */}
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary m-2 pixel-text pixel-small btn-fixed-size"
                onClick={() => setShowResume(!showResume)}
              >
                {showResume ? "Hide Resume" : "View Resume"}
              </button>
            </div>

            {/* Expanding Resume Section */}
            <div
              className={`mt-3 iframe-container ${showResume ? "show" : ""}`}
            >
              <iframe
                src="/Zhang-Mingwei-Resume.pdf"
                width="100%"
                height="800px"
                style={{ border: "1px solid #ccc", borderRadius: "10px" }}
                title="Mingwei Zhang Resume"
              ></iframe>
            </div>
            {/* Projects Section */}
            <div className="container w-75 mt-5 text-center">
              <h4 className="pixel-text">Projects</h4> {/* New Title */}
              <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-dark m-2 pixel-text pixel-small btn-fixed-size">
                  <a
                    href="https://github.com/mingwzhang"
                    className="text-decoration-none text-light"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </button>
                <button className="btn btn-danger m-2 pixel-text pixel-small btn-fixed-size">
                  <a
                    href="https://mindeveloper.itch.io/"
                    className="text-decoration-none text-light"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Game Design
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Me Section */}
      <div className="d-flex flex-column align-items-center text-center mt-5 pb-4 bottom-spacing">
        <h4 className="pixel-text">Contact Me</h4>
        <p className="pixel-text">
          Available for collaborations and job opportunities. Get in touch!
        </p>
        <div className="d-flex justify-content-center">
          <a
            href="mailto:mingw.zhang123@gmail.com"
            className="btn btn-outline-primary m-2 pixel-text pixel-small"
          >
            📧 Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/mingwei-zhang1"
            className="btn btn-outline-info m-2 pixel-text pixel-small"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}


export default App;

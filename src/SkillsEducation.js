import React from "react";
import "./SkillsEducation.css";

function SkillsEducation({ skills }) {
  return (
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

          {/* Queens College Card */}
          <div className="card m-1 p-2 text-center">
            <div className="d-flex flex-column align-items-center">
              <img
                src={process.env.PUBLIC_URL + "/img/Queens_College_logo.png"}
                alt="Queens College Logo"
                className="icon-wrapper-education queens-college-logo"
              />
              <p className="pixel-text" style={{ margin: 0 }}>Master of Arts:</p>
              <p className="pixel-text" style={{ margin: 0 }}>Computer Science</p>
              <p className="pixel-text" style={{ margin: "2rem 0 0 0" }}>Expected graduation:</p>
              <p className="pixel-text" style={{ margin: 0 }}>Aug 2026</p>
            </div>
          </div>

          {/* Stony Brook Card */}
          <div className="card m-1 p-2 text-center">
            <div className="d-flex flex-column align-items-center">
              <img
                src={process.env.PUBLIC_URL + "/img/Stony_Brook_U_logo.png"}
                alt="Stony Brook University Logo"
                className="icon-wrapper-education stony-brook-logo"
              />
              <p className="pixel-text" style={{ margin: 0 }}>Bachelor of Science:</p>
              <p className="pixel-text" style={{ margin: 0 }}>
                Double Major in Information Systems and Applied Mathematics
              </p>
              <p className="pixel-text" style={{ margin: "2rem 0 0 0" }}>Graduated:</p>
              <p className="pixel-text" style={{ margin: 0 }}>Aug 2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsEducation;

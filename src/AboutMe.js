import React from "react";
import Typewriter from "typewriter-effect";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section id="about" className="container" style={{ margin: "40px 0" }}>
      <h2 className="mt-1 text-center pixel-text pixel-bold-title">
        <span className="emoji-large">👤</span> About Me
      </h2>

      <p className="pixel-text">
        <Typewriter
          options={{
            autoStart: true,
            loop: false,
            delay: window.innerWidth <= 768 ? 0 : 0.5,
            deleteSpeed: Infinity,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(
                "I’m a developer with a focus on interactive experiences, gameplay systems, and intuitive software design. I work across both code and visual design, using technologies like Python, Java, JavaScript, Unity, Unreal, and Godot."
              )
              .pauseFor(window.innerWidth <= 768 ? 0 : 1)
              .typeString("<br/><br/>")
              .typeString(
                "I’m currently pursuing my M.A. in Computer Science at Queens College, continuously improving my skills through research, experimentation, and practical development work. I’m always open to collaboration and new opportunities."
              )
              .start();
          }}
        />
      </p>
    </section>
  );
}

export default AboutMe;

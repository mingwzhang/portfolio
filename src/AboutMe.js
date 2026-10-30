import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import "./AboutMe.css";

const introduction =
  "I’m a Software & Game Developer with a focus on interactive experiences, gameplay systems, and software development. My experience includes developing gameplay mechanics, character controllers, animation systems, and user interfaces, working with technologies such as C#, Unity, Unreal Engine, Python, and JavaScript.";
const background =
  "Alongside my graduate studies in Computer Science at Queens College, I’ve worked with teams to bring game projects from initial planning to completion under tight deadlines. I expect to graduate with my M.A. in December 2026.";

function AboutMe() {
  const [skipTyping, setSkipTyping] = useState(() =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || false
  );
  const typingFinished = useRef(false);

  useEffect(() => {
    const revealOnClick = () => {
      if (!typingFinished.current) setSkipTyping(true);
    };
    document.addEventListener("click", revealOnClick);
    return () => document.removeEventListener("click", revealOnClick);
  }, []);

  return (
    <section id="about" className="container" aria-labelledby="portfolio-about-heading">
      <h2 id="portfolio-about-heading" className="mt-1 text-center pixel-text pixel-bold-title">
        <span className="emoji-large" aria-hidden="true">👤</span> About Me
      </h2>
      <div className="pixel-text portfolio-about-content">
        {skipTyping ? (
          <>
            {introduction}
            <br /><br />
            {background}
          </>
        ) : (
          <Typewriter
            options={{ autoStart: true, loop: false, delay: 3 }}
            onInit={(typewriter) => {
              typewriter
                .typeString(introduction)
                .pauseFor(150)
                .typeString("<br/><br/>")
                .typeString(background)
                .callFunction(() => { typingFinished.current = true; })
                .start();
            }}
          />
        )}
      </div>
    </section>
  );
}

export default AboutMe;

import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import "./AboutMe.css";

function AboutMe() {
  const [skipTyping, setSkipTyping] = useState(false);
const typingFinished = useRef(false);

useEffect(() => {
  const handlePageClick = () => {
    if (!typingFinished.current) setSkipTyping(true);
  };

  document.addEventListener("click", handlePageClick);

  return () => document.removeEventListener("click", handlePageClick);
}, []);
  return (
    <section id="about" className="container" style={{ margin: "40px 0" }}>
      <h2 className="mt-1 text-center pixel-text pixel-bold-title">
        <span className="emoji-large">👤</span> About Me
      </h2>

<p className="pixel-text">
  {skipTyping ? (
    <>
            I’m a Software & Game Developer with a focus on interactive experiences, gameplay systems, and software development. My experience includes developing gameplay mechanics, character controllers, animation systems, and user interfaces, working with technologies such as C#, Unity, Unreal Engine, Python, and JavaScript.
      <br />
      <br />
Alongside my graduate studies in Computer Science at Queens College, I’ve worked with teams to bring game projects from initial planning to completion under tight deadlines. I expect to graduate with my M.A. in December 2026.   </>
  ) : (
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
            "I’m a Software & Game Developer with a focus on interactive experiences, gameplay systems, and software development. My experience includes developing gameplay mechanics, character controllers, animation systems, and user interfaces, working with technologies such as C#, Unity, Unreal Engine, Python, and JavaScript."
          )
          .pauseFor(window.innerWidth <= 768 ? 0 : 1)
          .typeString("<br/><br/>")
.typeString(
  "Alongside my graduate studies in Computer Science at Queens College, I’ve worked with teams to bring game projects from initial planning to completion under tight deadlines. I expect to graduate with my M.A. in December 2026."
)
          .callFunction(() => {
            typingFinished.current = true;
          })
          .start();
      }}
    />
  )}
</p>
    </section>
  );
}

export default AboutMe;

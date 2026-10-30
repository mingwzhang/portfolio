// ParticleExplosion.js
import React, { useState, useEffect, useRef } from "react";

const ParticleExplosion = () => {
  const [particles, setParticles] = useState([]);
  const intervalRef = useRef(null);
  const currentPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const spawnParticles = (x, y) => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 80;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
        newParticles.push({ id: Date.now() + "-" + i, x, y, dx, dy, color });
      }
      setParticles((prev) => [...prev, ...newParticles]);

      // Remove particles after animation duration (1000ms)
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.some((np) => np.id === p.id))
        );
      }, 1000);
    };

    const handleMouseMove = (e) => {
      currentPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e) => {
      if (intervalRef.current) return; // Prevent multiple intervals
      currentPosition.current = { x: e.clientX, y: e.clientY };
      spawnParticles(e.clientX, e.clientY);
      window.addEventListener("mousemove", handleMouseMove);
      intervalRef.current = setInterval(() => {
        spawnParticles(currentPosition.current.x, currentPosition.current.y);
      }, 100);
    };

    const handleMouseUp = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };

    // Stop particle spawning on visibility change (e.g., when switching tabs)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleMouseUp();
      }
    };

    // Stop particle spawning when window loses focus (e.g., Win+Alt)
    const handleWindowBlur = () => {
      handleMouseUp();
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp);
    window.addEventListener("dragstart", handleMouseUp);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
      window.removeEventListener("dragstart", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.x,
            top: p.y,
            backgroundColor: p.color,
            "--dx": p.dx + "px",
            "--dy": p.dy + "px",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleExplosion;

// ParticleExplosion.js
import React, { useState, useEffect, useRef } from "react";

const ParticleExplosion = () => {
  const [particles, setParticles] = useState([]);
  const intervalRef = useRef(null);
  const currentPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const spawnParticles = (x, y) => {
      const newParticles = [];
      // Spawn 30 particles per interval (adjust as needed)
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 80; // Explosion distance multiplier changed to 80
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
        newParticles.push({ id: Date.now() + "-" + i, x, y, dx, dy, color });
      }
      setParticles((prev) => [...prev, ...newParticles]);

      // Remove particles after animation duration (1000ms in this example)
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.some((np) => np.id === p.id))
        );
      }, 1000);
    };

    const handleMouseMove = (e) => {
      // Update current mouse position
      currentPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e) => {
      // Set initial position on mousedown
      currentPosition.current = { x: e.clientX, y: e.clientY };
      spawnParticles(e.clientX, e.clientY);

      // Listen for mousemove to update cursor position
      window.addEventListener("mousemove", handleMouseMove);

      // Start interval to spawn particles at the updated cursor position
      intervalRef.current = setInterval(() => {
        spawnParticles(
          currentPosition.current.x,
          currentPosition.current.y
        );
      }, 100);
    };

    const handleMouseUp = () => {
      // Clear interval and remove mousemove listener when mouse is released
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };

    // Also stop on drag
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp);
    window.addEventListener("dragstart", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
      window.removeEventListener("dragstart", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
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

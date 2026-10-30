import React, { useEffect, useRef, useState } from "react";
import "./ImpactSparks.css";

// One burst is spawned per pointer press, rather than continuously while held.
const SPARK_COUNT = 15;
const LIFE_MS = 560;

export default function ParticleExplosion() {
  const [impacts, setImpacts] = useState([]);
  const nextId = useRef(0);
  const timers = useRef(new Set());

  useEffect(() => {
    // Use the same timer set throughout this effect and its cleanup.
    const activeTimers = timers.current;
    const handleImpact = (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (event.isPrimary === false) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const id = ++nextId.current;
      const sparks = Array.from({ length: SPARK_COUNT }, (_, index) => {
        const angle = (index / SPARK_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
        const reach = 30 + Math.random() * 52;
        return {
          id: index,
          dx: Math.cos(angle) * reach,
          dy: Math.sin(angle) * reach,
          angle: angle * (180 / Math.PI) + 90,
          delay: Math.floor(Math.random() * 65),
          length: 10 + Math.random() * 12,
        };
      });

      setImpacts((previous) => [...previous.slice(-11), { id, x: event.clientX, y: event.clientY, sparks }]);
      const timeout = window.setTimeout(() => {
        setImpacts((previous) => previous.filter((impact) => impact.id !== id));
        activeTimers.delete(timeout);
      }, LIFE_MS);
      activeTimers.add(timeout);
    };

    window.addEventListener("pointerdown", handleImpact, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handleImpact);
      activeTimers.forEach((timeout) => window.clearTimeout(timeout));
      activeTimers.clear();
    };
  }, []);

  return (
    <div className="impact-effects-layer" aria-hidden="true">
      {impacts.map((impact) => (
        <div key={impact.id} className="impact-origin" style={{ left: impact.x, top: impact.y }}>
          <span className="impact-flash" />
          <span className="impact-ring" />
          {impact.sparks.map((spark) => (
            <span
              key={spark.id}
              className="impact-spark"
              style={{
                "--spark-x": `${spark.dx}px`,
                "--spark-y": `${spark.dy}px`,
                "--spark-angle": `${spark.angle}deg`,
                "--spark-delay": `${spark.delay}ms`,
                "--spark-length": `${spark.length}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

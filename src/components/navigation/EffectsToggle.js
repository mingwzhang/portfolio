import React from "react";

export default function EffectsToggle({ paused, onToggle }) {
  return (
    <button
      type="button"
      className="effects-toggle"
      onClick={onToggle}
      aria-label={paused ? "Resume background animation" : "Pause background animation"}
      aria-pressed={paused}
      title={paused ? "Resume moving stars and shapes" : "Pause moving stars and shapes"}
    >
      {paused ? "▶ Resume background" : "⏸ Pause background"}
    </button>
  );
}

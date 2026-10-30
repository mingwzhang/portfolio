import React from "react";
import "./SlideReveal.css";

// Keep children mounted so grid-row transitions can animate in both directions.
// aria-hidden reflects the open state; CSS hides collapsed content.
export default function SlideReveal({ id, open, className = "", children }) {
  return (
    <div
      id={id}
      className={`slide-reveal ${open ? "slide-reveal-open" : "slide-reveal-closed"} ${className}`.trim()}
      aria-hidden={!open}
    >
      <div className="slide-reveal-inner">{children}</div>
    </div>
  );
}

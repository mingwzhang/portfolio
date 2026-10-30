import React from "react";
import "./SlideReveal.css";

// Keep content mounted while sliding, including on close.
// The hidden state is unfocusable after collapsing, and aria-hidden is updated immediately.
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

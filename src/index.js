import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import LoadingScreen from "./LoadingScreen";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const RootComponent = () => {
  const [loading, setLoading] = useState(true);

  // Prevent consecutive single-finger tap (double-tap) zoom behavior
  useEffect(() => {
    let lastTouchEnd = 0;
    const handleTouchEnd = (event) => {
      const now = Date.now();
      // If two touchend events occur within 300ms, prevent zoom
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
        // Simulate a click so the particle explosion effect still fires
        const simulatedClick = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        event.target.dispatchEvent(simulatedClick);
      }
      lastTouchEnd = now;
    };

    // Attach the listener with passive: false so preventDefault works
    document.addEventListener("touchend", handleTouchEnd, { passive: false });
    return () => {
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return loading ? (
    <LoadingScreen onFinish={() => setLoading(false)} />
  ) : (
    <Router>
      <App />
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);

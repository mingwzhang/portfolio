import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import LoadingScreen from "./LoadingScreen";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const RootComponent = () => {
  const [loading, setLoading] = useState(true);
  const observerErrorHandler = (error) => {
    if (error.message.includes("ResizeObserver loop")) {
      console.warn("ResizeObserver loop error suppressed");
      return;
    }
    console.error(error);
  };

  window.addEventListener("error", observerErrorHandler);
  window.addEventListener("unhandledrejection", (event) =>
    observerErrorHandler(event.reason)
  );


  useEffect(() => {
    // Prevent pinch-to-zoom on mobile
    const handleTouchMove = (event) => {
      if (event.touches.length > 1) {
        event.preventDefault(); // Prevent pinch gesture
      }
    };

    // Prevent double-tap zoom (optional)
    let lastTouchEnd = 0;
    const handleTouchEnd = (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Attach listeners
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
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

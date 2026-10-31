import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import LoadingScreen from "./components/loading/LoadingScreen";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/mobile-pinch-zoom.css";

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

  // Allow the browser to handle pinch gestures natively.
  // The previous global touchmove/touchend listeners prevented mobile zooming.
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

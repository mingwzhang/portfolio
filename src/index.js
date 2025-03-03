import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import LoadingScreen from "./LoadingScreen";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const RootComponent = () => {
  const [loading, setLoading] = useState(true);

  // Remove the 3-second forced timeout so the child can handle its own timing:
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 3000);
  // }, []);

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

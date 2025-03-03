import React, { useEffect, useState, useRef } from "react";
import "./LoadingScreen.css";

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const delayTimeoutRef = useRef(null);

  useEffect(() => {
    // Increase progress every 10ms for a faster loading (approximately 1 second to reach 100%).
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100 && !delayTimeoutRef.current) {
      // Once progress reaches 100, wait 1 second before calling onFinish.
      delayTimeoutRef.current = setTimeout(() => {
        onFinish();
      }, 1000);
    }
    return () => {
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
    };
  }, [progress, onFinish]);

  return (
    <div className="loading-screen">
      <div className="loading-wheel"></div>
      {progress === 100 ? (
        <div className="loading-complete">LOADING COMPLETE</div>
      ) : (
        <div className="loading-text">LOADING {progress}%</div>
      )}
      <div className="loading-bar">
        <div
          className="loading-bar-inner"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingScreen;

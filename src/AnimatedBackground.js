// AnimatedBackground.js
import React, { useEffect, useRef } from "react";
import "./styles.css";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Function to set canvas size using devicePixelRatio
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    

    setCanvasSize();

    // Adjust star count based on screen width (fewer stars on mobile)
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 75 : 150;
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 2 + 0.5,
      size: Math.random() * 2,
    }));

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#121212");
      gradient.addColorStop(1, "#1a1a1a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawStars = () => {
      // Redraw the background (space-themed)
      ctx.fillStyle = "#121212";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Draw stars
      ctx.fillStyle = "white";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const updateStars = () => {
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
    };

    const animate = () => {
      drawBackground();
      drawStars();
      updateStars();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener("orientationchange", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="animated-background" />;
};

export default AnimatedBackground;

import React, { useEffect, useRef } from "react";
import "../../styles/styles.css";

// Stop the animation loop when paused; redraw the existing stars without repositioning them.
export default function AnimatedBackground({ paused = false }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const paintRef = useRef(() => {});
  const animateRef = useRef(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0;
    let height = 0;
    let stars = [];

    const paint = () => {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#121212");
      gradient.addColorStop(1, "#1a1a1a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#fff";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (stars.length === 0) {
        stars = Array.from({ length: width < 768 ? 100 : 150 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: Math.random() * 1.5 + 0.35,
          size: Math.random() * 1.7 + 0.2,
        }));
      } else {
        stars.forEach((star) => {
          if (star.x > width) star.x = Math.random() * width;
          if (star.y > height) star.y = Math.random() * height;
        });
      }
      paint();
    };

    const animate = () => {
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });
      paint();
      rafRef.current = window.requestAnimationFrame(animate);
    };

    paintRef.current = paint;
    animateRef.current = animate;
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);
    return () => {
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
    };
  }, []);

  useEffect(() => {
    window.cancelAnimationFrame(rafRef.current);
    if (paused) paintRef.current();
    else rafRef.current = window.requestAnimationFrame(() => animateRef.current());
    return () => window.cancelAnimationFrame(rafRef.current);
  }, [paused]);

  return <canvas ref={canvasRef} className="animated-background" aria-hidden="true" />;
}

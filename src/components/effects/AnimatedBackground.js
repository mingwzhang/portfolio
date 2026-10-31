import React, { useEffect, useRef } from "react";
import "../../styles/styles.css";
import "./MobileBackgroundFix.css";

// Keep the same starfield, but limit mobile redraws and refresh after pinch zoom.
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
    let backingWidth = 0;
    let backingHeight = 0;
    let stars = [];
    let gradient = null;
    let lastFrameTime = null;
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    const mobileFrameInterval = 1000 / 30;
    const baseFrameInterval = 1000 / 60;

    const paint = () => {
      if (!gradient) return;
      // This gradient is created only on viewport size changes, not every frame.
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      stars.forEach((star) => {
        ctx.moveTo(star.x + star.size, star.y);
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      });
      ctx.fill();
    };

    const resize = (force = false) => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const nextBackingWidth = Math.round(nextWidth * pixelRatio);
      const nextBackingHeight = Math.round(nextHeight * pixelRatio);
      const dimensionsChanged = width !== nextWidth || height !== nextHeight;

      if (!force && !dimensionsChanged &&
          backingWidth === nextBackingWidth && backingHeight === nextBackingHeight) return;

      width = nextWidth;
      height = nextHeight;
      backingWidth = nextBackingWidth;
      backingHeight = nextBackingHeight;
      // Reset the backing pixels, including after zoom returns to its original scale.
      canvas.width = backingWidth;
      canvas.height = backingHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (!gradient || dimensionsChanged) {
        gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#121212");
        gradient.addColorStop(1, "#1a1a1a");
      }

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

    const animate = (now) => {
      const elapsed = lastFrameTime === null ? baseFrameInterval : now - lastFrameTime;
      // Native requestAnimationFrame remains unchanged on desktop. On touch devices,
      // update the canvas at about 30 FPS rather than painting every display refresh.
      if (isMobile && lastFrameTime !== null && elapsed < mobileFrameInterval - 1) {
        rafRef.current = window.requestAnimationFrame(animate);
        return;
      }

      // Preserve the original star speed at different refresh rates and at 30 FPS.
      // Clamp long gaps (for example, when returning to this browser tab).
      const movementStep = Math.min(Math.max(elapsed, 0), 64) / baseFrameInterval;
      stars.forEach((star) => {
        star.y += star.speed * movementStep;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });
      lastFrameTime = now;
      paint();
      rafRef.current = window.requestAnimationFrame(animate);
    };

    paintRef.current = paint;
    animateRef.current = (now) => {
      lastFrameTime = null;
      animate(now);
    };
    resize(true);

    const viewport = window.visualViewport;
    let pinchWasActive = false;
    let resizeFrame = null;
    let forceRefresh = false;

    const scheduleResize = (force = false) => {
      if (force) forceRefresh = true;
      if (resizeFrame !== null) return;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = null;
        const shouldForce = forceRefresh;
        forceRefresh = false;
        resize(shouldForce);
      });
    };

    const handleZoom = () => {
      if (!viewport) return;
      if (viewport.scale > 1.01) {
        pinchWasActive = true;
      } else if (pinchWasActive) {
        pinchWasActive = false;
        // Repaint the canvas backing store once the browser is back at 100%.
        scheduleResize(true);
      }
    };
    const handleWindowResize = () => scheduleResize(false);

    viewport?.addEventListener("resize", handleZoom);
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("orientationchange", handleWindowResize);
    return () => {
      window.cancelAnimationFrame(rafRef.current);
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
      viewport?.removeEventListener("resize", handleZoom);
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("orientationchange", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    window.cancelAnimationFrame(rafRef.current);
    if (paused) paintRef.current();
    else rafRef.current = window.requestAnimationFrame((now) => animateRef.current(now));
    return () => window.cancelAnimationFrame(rafRef.current);
  }, [paused]);

  return <canvas ref={canvasRef} className="animated-background" aria-hidden="true" />;
}

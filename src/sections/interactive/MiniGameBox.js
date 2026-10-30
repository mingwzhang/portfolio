// MiniGameBox.js — moving target mini-game
// Position using BOTH measured dimensions so the whole target stays visible.
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./MiniGameBox.css";

const FRAME_SIZE = 50;
const TARGET_SCALE = 1.5;
const TARGET_SIZE = FRAME_SIZE * TARGET_SCALE;
const TOTAL_BREAK_FRAMES = 9;
const ANIMATION_SPEED = 150;
const EDGE_PADDING = 9;
const SCORE_CLEARANCE = 52;

const MiniGameBox = () => {
  const [score, setScore] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ top: SCORE_CLEARANCE, left: EDGE_PADDING });
  const [isVisible, setIsVisible] = useState(true);
  const [isBreaking, setIsBreaking] = useState(false);
  const [breakFrame, setBreakFrame] = useState(0);

  const containerRef = useRef(null);
  const movementTimerRef = useRef(null);
  const breakIntervalRef = useRef(null);
  const respawnTimeoutRef = useRef(null);

  const clearMovementTimer = () => {
    if (movementTimerRef.current !== null) {
      clearTimeout(movementTimerRef.current);
      movementTimerRef.current = null;
    }
  };

  const clearBreakTimers = () => {
    if (breakIntervalRef.current !== null) {
      clearInterval(breakIntervalRef.current);
      breakIntervalRef.current = null;
    }
    if (respawnTimeoutRef.current !== null) {
      clearTimeout(respawnTimeoutRef.current);
      respawnTimeoutRef.current = null;
    }
  };

  const moveTarget = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // The game area is wider than it is tall on desktop. Never use width
    // when calculating the vertical movement limit.
    const maxLeft = Math.max(0, container.clientWidth - TARGET_SIZE - EDGE_PADDING);
    const maxTop = Math.max(0, container.clientHeight - TARGET_SIZE - EDGE_PADDING);
    const minLeft = Math.min(EDGE_PADDING, maxLeft);
    const minTop = Math.min(SCORE_CLEARANCE, maxTop);

    setTargetPosition({
      left: Math.round(minLeft + Math.random() * Math.max(0, maxLeft - minLeft)),
      top: Math.round(minTop + Math.random() * Math.max(0, maxTop - minTop)),
    });
  }, []);

  const scheduleNextMove = useCallback(() => {
    clearMovementTimer();
    const delay = 1000 + Math.random() * 1000;
    movementTimerRef.current = setTimeout(() => {
      moveTarget();
      scheduleNextMove();
    }, delay);
  }, [moveTarget]);

  useEffect(() => {
    moveTarget();
    scheduleNextMove();

    // Reposition after a layout change so the target cannot remain clipped.
    const container = containerRef.current;
    const observer = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => moveTarget())
      : null;
    if (container && observer) observer.observe(container);
    window.addEventListener("resize", moveTarget);

    return () => {
      clearMovementTimer();
      clearBreakTimers();
      observer?.disconnect();
      window.removeEventListener("resize", moveTarget);
    };
  }, [moveTarget, scheduleNextMove]);

  const handleTargetClick = (event) => {
    event.stopPropagation();
    if (!isVisible || isBreaking) return;

    setScore((previous) => previous + 1);
    setIsVisible(false);
    setIsBreaking(true);
    setBreakFrame(0);
    clearMovementTimer();
    clearBreakTimers();

    let frame = 0;
    breakIntervalRef.current = setInterval(() => {
      frame += 1;
      if (frame < TOTAL_BREAK_FRAMES) {
        setBreakFrame(frame);
        return;
      }

      clearInterval(breakIntervalRef.current);
      breakIntervalRef.current = null;
      respawnTimeoutRef.current = setTimeout(() => {
        moveTarget();
        setIsBreaking(false);
        setIsVisible(true);
        scheduleNextMove();
      }, ANIMATION_SPEED);
    }, ANIMATION_SPEED);
  };

  const positionStyle = {
    position: "absolute",
    top: targetPosition.top,
    left: targetPosition.left,
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    transform: `scale(${TARGET_SCALE})`,
    transformOrigin: "top left",
    imageRendering: "pixelated",
    userSelect: "none",
  };

  return (
    <div ref={containerRef} className="mini-game-container">
      {isVisible && (
        <img
          src={`${process.env.PUBLIC_URL}/img/target_circle.png`}
          alt="Moving target — click to score"
          onClick={handleTargetClick}
          draggable={false}
          onDragStart={(event) => event.preventDefault()}
          style={{ ...positionStyle, cursor: "crosshair", touchAction: "manipulation" }}
        />
      )}

      {isBreaking && (
        <div
          aria-hidden="true"
          style={{
            ...positionStyle,
            pointerEvents: "none",
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/target_circle_break.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `-${breakFrame * FRAME_SIZE}px 0px`,
          }}
        />
      )}

      <div className="mini-game-score" aria-live="polite" style={{ userSelect: "none" }}>
        Score: {score}
      </div>
    </div>
  );
};

export default MiniGameBox;

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./MiniGameBox.css";

const MiniGameBox = () => {
  // Score and position state
  const [score, setScore] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ top: 0, left: 0 });

  // Control states for display and break animation
  const [isVisible, setIsVisible] = useState(true);
  const [isBreaking, setIsBreaking] = useState(false);
  const [breakFrame, setBreakFrame] = useState(0);

  // Refs for timers
  const movementTimerRef = useRef(null);
  const breakIntervalRef = useRef(null);
  const respawnTimeoutRef = useRef(null);

  // Sprite settings
  const totalFrames = 9; // spritesheet has 9 frames
  const frameWidth = 50; // frame width in pixels
  const frameHeight = 50; // frame height in pixels
  const animationSpeed = 150; // ms between frames; extra frame delay is the same value

  // Delay settings for auto-move repositioning (1 to 2 seconds)
  const minAutoMoveInterval = 1000; // min delay (ms)
  const maxAutoMoveInterval = 2000; // max delay (ms)

  // Scale factor for target image
  const scaleFactor = 1.5;

  // Clear any active movement timer
  const clearMovementTimer = () => {
    if (movementTimerRef.current) {
      clearTimeout(movementTimerRef.current);
      movementTimerRef.current = null;
    }
  };

  // Clear break animation timers
  const clearBreakTimers = () => {
    if (breakIntervalRef.current) {
      clearInterval(breakIntervalRef.current);
      breakIntervalRef.current = null;
    }
    if (respawnTimeoutRef.current) {
      clearTimeout(respawnTimeoutRef.current);
      respawnTimeoutRef.current = null;
    }
  };

  // Create a stable moveTarget function.
  const moveTarget = useCallback(() => {
    const boxSize = 500; // Updated box size
    const top = Math.random() * (boxSize - frameHeight * scaleFactor);
    const left = Math.random() * (boxSize - frameWidth * scaleFactor);
    setTargetPosition({ top, left });
  }, [frameHeight, frameWidth, scaleFactor]);

  // Schedule the next move with a random delay.
  // Always clear any previous timer before scheduling a new one.
  const scheduleNextMove = useCallback(() => {
    clearMovementTimer();
    const randomDelay =
      Math.random() * (maxAutoMoveInterval - minAutoMoveInterval) +
      minAutoMoveInterval;
    movementTimerRef.current = setTimeout(() => {
      moveTarget();
      scheduleNextMove(); // schedule recursively
    }, randomDelay);
  }, [minAutoMoveInterval, maxAutoMoveInterval, moveTarget]);

  // Set up the auto-move timer on mount.
  useEffect(() => {
    moveTarget(); // set initial position
    scheduleNextMove();
    return () => {
      clearMovementTimer();
      clearBreakTimers();
    };
  }, [moveTarget, scheduleNextMove]);

  // Handle clicking the target.
  const handleTargetClick = (e) => {
    e.stopPropagation();
    if (!isVisible) return;

    setScore((prev) => prev + 1);
    // Start break animation without immediately hiding the target image.
    setIsBreaking(true);

    // Optionally, delay hiding the target image just a bit.
    setTimeout(() => {
      setIsVisible(false);
    }, 10); // a 10ms delay can be enough to cover the blink

    clearMovementTimer();
    clearBreakTimers();
    setBreakFrame(0);
    breakIntervalRef.current = setInterval(() => {
      setBreakFrame((prevFrame) => {
        if (prevFrame < totalFrames - 1) {
          return prevFrame + 1;
        } else {
          clearInterval(breakIntervalRef.current);
          breakIntervalRef.current = null;
          respawnTimeoutRef.current = setTimeout(() => {
            moveTarget();
            setIsBreaking(false);
            setIsVisible(true);
            scheduleNextMove();
          }, animationSpeed);
          return prevFrame;
        }
      });
    }, animationSpeed);
  };

  return (
    <div className="mini-game-container">
      {/* Main Target */}
      {isVisible && (
        <img
          src={process.env.PUBLIC_URL +"/img/target_circle.png"}
          alt="Target"
          onClick={handleTargetClick}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          style={{
            position: "absolute",
            top: targetPosition.top,
            left: targetPosition.left,
            width: `${frameWidth}px`,
            height: `${frameHeight}px`,
            transform: `scale(${scaleFactor})`,
            transformOrigin: "top left",
            imageRendering: "pixelated",
            cursor: "crosshair",
            userSelect: "none",
          }}
        />
      )}

      {/* Break Animation */}
      {isBreaking && (
        <div
          style={{
            position: "absolute",
            top: targetPosition.top,
            left: targetPosition.left,
            width: `${frameWidth}px`,
            height: `${frameHeight}px`,
            transform: `scale(${scaleFactor})`,
            transformOrigin: "top left",
            imageRendering: "pixelated",
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/target_circle_break.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `-${breakFrame * frameWidth}px 0px`,
          }}
        />
      )}

      {/* Score Display */}
      <div
        className="mini-game-score"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "#333",
          userSelect: "none",
        }}
      >
        Score: {score}
      </div>
    </div>
  );
};

export default MiniGameBox;

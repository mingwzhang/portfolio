// FloatingShapes.js
import React, { useEffect, useState } from "react";
import "./styles.css";

const FloatingShapes = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const numShapes = 10;
    const shapeTypes = ["polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"];
    const isMobile = window.innerWidth < 768;
    const sizeRanges = isMobile 
      ? [25, 40, 60, 75, 100, 125, 150] 
      : [50, 80, 120, 150, 200, 250, 300];
    
    const generateUniquePositions = (count) => {
      const positions = [];
      while (positions.length < count) {
        let newTop = Math.random() * 100;
        let newLeft = Math.random() * 100;

        // Ensure the new position is not too close to existing ones
        const tooClose = positions.some(
          (pos) =>
            Math.abs(pos.top - newTop) < 10 && Math.abs(pos.left - newLeft) < 10
        );

        if (!tooClose) {
          positions.push({ top: newTop, left: newLeft });
        }
      }

      return positions;
    };

    // Generate positions before mapping
    const shapePositions = generateUniquePositions(numShapes);

    const newShapes = shapePositions.map((position) => ({
      id: Math.random().toString(36).substr(2, 9),
      size: sizeRanges[Math.floor(Math.random() * sizeRanges.length)],
      top: position.top,
      left: position.left,
      rotateDirection: Math.random() > 0.5 ? "rotateLeft" : "rotateRight",
      floatSpeed: isMobile ? Math.random() * 2 + 1 : Math.random() * 3 + 2,
      rotateSpeed: isMobile ? Math.random() * 8 + 5 : Math.random() * 10 + 8,
      animationDuration: isMobile ? Math.random() * 4 + 4 : Math.random() * 6 + 6,
      shape: shapeTypes[0],
    }));

    setShapes(newShapes);
  }, []);

  return (
    <div className="floating-shapes-container">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`floating-shape ${shape.rotateDirection}`}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            top: `${shape.top}%`,
            left: `${shape.left}%`,
            animationDuration: `${shape.animationDuration}s`,
            clipPath: shape.shape,
            background: "transparent",
            border: "4px solid rgba(82, 255, 171, 0.5)",
            boxShadow:
              "0px 0px 15px rgba(0, 255, 100, 0.6), 0px 0px 25px rgba(0, 255, 100, 0.5)",
            animation: `floatUpDown ${shape.floatSpeed}s infinite alternate ease-in-out, ${shape.rotateDirection} ${shape.rotateSpeed}s infinite linear`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default FloatingShapes;

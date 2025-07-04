import React, { useState, useRef } from "react";

function VideoCarousel() {
  const videos = [
    `${process.env.PUBLIC_URL}/video/AshVideo.mp4`,
    `${process.env.PUBLIC_URL}/video/FFBlazeVideo.mp4`,
    `${process.env.PUBLIC_URL}/video/Project IOTA.mp4`,
  ];

  /*
Failed in mobile after hosting

const videos = [
  `${process.env.PUBLIC_URL}/video/AshVideo.mp4`,
  `${process.env.PUBLIC_URL}/video/FFBlazeVideo.mp4`,
  `${process.env.PUBLIC_URL}/video/Project IOTA.mp4`,

  const videos = [
  "https://mingwzhang.github.io/portfolio/video/AshVideo.mp4",
  "https://mingwzhang.github.io/portfolio/video/FFBlazeVideo.mp4",
  "https://mingwzhang.github.io/portfolio/video/Project%20IOTA.mp4",
];
];

*/
  const containerWidth = 640; // overall carousel container width
  const slideWidth = 512; // actual video width (smaller than container)
  const gap = 20; // gap between slides
  const totalSlideWidth = slideWidth + gap;
  const threshold = 50; // minimum drag distance to change slide
  const clickDragThreshold = 5; // small threshold to determine a drag vs. a click

  const centerOffset = (containerWidth - slideWidth) / 2;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  // Use a ref to mark if a drag (vs. a click) happened
  const wasDraggedRef = useRef(false);

  // Helper function to pause all videos
  const pauseAllVideos = () => {
    const videoElements = document.querySelectorAll("video");
    videoElements.forEach((video) => {
      video.pause();
    });
  };

  const finishDrag = () => {
    // Mark that a drag occurred if the drag offset is significant
    if (Math.abs(dragOffset) > clickDragThreshold) {
      wasDraggedRef.current = true;
    }
    if (dragOffset > threshold) {
      setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
      pauseAllVideos();
    } else if (dragOffset < -threshold) {
      setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
      pauseAllVideos();
    }
    setDragging(false);
    setDragStart(null);
    setDragOffset(0);
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    setDragStart(e.clientX);
    setDragging(true);
    wasDraggedRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!dragging || dragStart === null) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!dragging) return;
    finishDrag();
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    setDragStart(e.touches[0].clientX);
    setDragging(true);
    wasDraggedRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!dragging || dragStart === null) return;
    const offset = e.touches[0].clientX - dragStart;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!dragging) return;
    finishDrag();
  };

  // Prevent video from playing if a drag occurred
  const handleVideoClick = (e) => {
    if (wasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      wasDraggedRef.current = false;
    }
  };

  // Optional arrow navigation
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    pauseAllVideos();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    pauseAllVideos();
  };

  const translateX = centerOffset - currentIndex * totalSlideWidth + dragOffset;

  return (
    <div
      className="video-carousel"
      style={{
        position: "relative",
        margin: "auto",
        overflow: "hidden",
        cursor: dragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // in case the mouse leaves the element
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          display: "flex",
          transform: `translateX(${translateX}px)`,
          transition: dragging ? "none" : "transform 0.3s ease-out",
        }}
      >
        {videos.map((video, idx) => (
          <div
            key={idx}
            style={{
              position: "relative",
              width: `${slideWidth}px`,
              marginRight: `${gap}px`,
              flexShrink: 0,
            }}
          >
            {/* Overlay for video number */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                padding: "5px 10px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                fontSize: "14px",
                zIndex: 2,
                borderRadius: "4px",
              }}
            >
              {idx + 1} / {videos.length}
            </div>
            <video
              src={video}
              controls
              playsInline
              autoPlay={false} // Prevents autoplay, so poster loads
              preload="metadata" // Ensures Safari loads enough metadata for the poster
              width={slideWidth}
              height="480"
              style={{ display: "block", backgroundColor: "#000" }} // Black background fallback
              poster={`${process.env.PUBLIC_URL}/video/${video
                .split("/")
                .pop()
                .replace(".mp4", ".jpg")}`}
              onClick={handleVideoClick}
              onLoadedMetadata={(e) => {
                e.target.volume = 0.25;
              }}
            />
          </div>
        ))}
      </div>
      <div className="prev-button-wrapper">
        <button
          onClick={goToPrevious}
          className="m-2 pixel-text pixel-btn-3d prev-button"
        >
          ←
        </button>
      </div>
      <div className="next-button-wrapper">
        <button
          onClick={goToNext}
          className="m-2 pixel-text pixel-btn-3d next-button"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default VideoCarousel;

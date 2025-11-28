import React, { useState, useRef } from "react";
import "./VideoCarousel.css";

function VideoCarousel() {
  const videos = [
    `${process.env.PUBLIC_URL}/video/!ERRORi.mp4`,
    `${process.env.PUBLIC_URL}/video/AshVideo.mp4`,
    `${process.env.PUBLIC_URL}/video/FFBlazeVideo.mp4`,
    `${process.env.PUBLIC_URL}/video/ProjectIOTA.mp4`,
  ];

  const isMobile = window.innerWidth < 640;
  const slideWidth = isMobile ? window.innerWidth * 0.9 : 600;
  const totalSlideWidth = slideWidth;
  const containerWidth = slideWidth;

  const threshold = 50;
  const clickDragThreshold = 5;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const wasDraggedRef = useRef(false);

  const translateX =
    (containerWidth / 2 - slideWidth / 2) -
    currentIndex * totalSlideWidth +
    dragOffset;

  const pauseAllVideos = () => {
    const videoElements = document.querySelectorAll(".video-element");
    videoElements.forEach((video) => video.pause());
  };

  const finishDrag = () => {
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

  const handleMouseDown = (e) => {
    setDragStart(e.clientX);
    setDragging(true);
    wasDraggedRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!dragging || dragStart === null) return;
    setDragOffset(e.clientX - dragStart);
  };

  const handleMouseUp = () => {
    if (!dragging) return;
    finishDrag();
  };

  const handleTouchStart = (e) => {
    setDragStart(e.touches[0].clientX);
    setDragging(true);
    wasDraggedRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!dragging || dragStart === null) return;
    setDragOffset(e.touches[0].clientX - dragStart);
  };

  const handleTouchEnd = () => {
    if (!dragging) return;
    finishDrag();
  };

  const handleVideoClick = (e) => {
    if (wasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      wasDraggedRef.current = false;
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    pauseAllVideos();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    pauseAllVideos();
  };

  return (
    <div className="carousel-viewport">
      <div
        className={`video-carousel ${dragging ? "dragging" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
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
            <div key={video} className="video-slide">
              <div className="video-slide-number">
                {idx + 1} / {videos.length}
              </div>
              <video
                src={video}
                controls
                playsInline
                preload="metadata"
                autoPlay={false}
                className="video-element"
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
    </div>
  );
}

export default VideoCarousel;

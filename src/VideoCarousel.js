import React, { useState, useRef } from "react";
import "./VideoCarousel.css";

function VideoCarousel() {
  const videos = [
    `${process.env.PUBLIC_URL}/video/!ERRORi.mp4`,
    `${process.env.PUBLIC_URL}/video/AshVideo.mp4`,
    `${process.env.PUBLIC_URL}/video/FFBlazeVideo.mp4`,
    `${process.env.PUBLIC_URL}/video/ProjectIOTA.mp4`,
  ];

  // Track which videos have controls enabled
  const [activated, setActivated] = useState({});
  // Track which videos are currently playing (for overlay)
  const [isPlaying, setIsPlaying] = useState({});
  const videoRefs = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const wasDraggedRef = useRef(false);

  const trackTransform = `translateX(calc(${-currentIndex * 100}% + ${dragOffset}px))`;

  // Pause + reset all videos when slide changes
const pauseAllVideos = () => {
  videoRefs.current.forEach((video, i) => {
    if (video) {
      video.pause();
      video.currentTime = 0;     // reset to start
      video.removeAttribute("controls"); // HIDE PLAYBAR
      video.load();              // RESTORE POSTER
    }
  });

  setIsPlaying({});
  setActivated({});
};


  const finishDrag = () => {
    if (Math.abs(dragOffset) > 5) {
      wasDraggedRef.current = true;
    }

    const THRESHOLD = 50;

    if (dragOffset > THRESHOLD) {
      // swipe right → previous
      setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
      pauseAllVideos();
    } else if (dragOffset < -THRESHOLD) {
      // swipe left → next
      setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
      pauseAllVideos();
    }

    setDragging(false);
    setDragStartX(null);
    setDragOffset(0);
  };

  // mouse drag
  const handleMouseDown = (e) => {
    setDragStartX(e.clientX);
    setDragging(true);
    wasDraggedRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!dragging || dragStartX === null) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!dragging) return;
    finishDrag();
  };

  // touch drag
  const handleTouchStart = (e) => {
    setDragStartX(e.touches[0].clientX);
    setDragging(true);
    wasDraggedRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!dragging || dragStartX === null) return;
    setDragOffset(e.touches[0].clientX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (!dragging) return;
    finishDrag();
  };

  // Click directly on video area
  const handleVideoClick = (e, idx) => {
    if (wasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      wasDraggedRef.current = false;
      return;
    }

    // First-time activation via video click
    if (!activated[idx]) {
      e.preventDefault();
      setActivated((prev) => ({ ...prev, [idx]: true }));
      const videoEl = videoRefs.current[idx];
      if (videoEl) videoEl.play();
    }
    // If already activated, normal controls behavior
  };

  // Click on overlay (big play button)
  const handleOverlayClick = (idx) => {
    setActivated((prev) => ({ ...prev, [idx]: true }));
    const videoEl = videoRefs.current[idx];
    if (videoEl) videoEl.play();
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
          className="video-track"
          style={{
            transform: trackTransform,
            transition: dragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          {videos.map((video, idx) => {
            const poster = `${process.env.PUBLIC_URL}/video/${video
              .split("/")
              .pop()
              .replace(".mp4", ".jpg")}`;

            const playing = !!isPlaying[idx];

            return (
              <div key={idx} className="video-slide">
                <div className="video-slide-number">
                  {idx + 1} / {videos.length}
                </div>

                {/* PLAY OVERLAY:
                    - shown before first play
                    - shown again whenever video is paused or ended
                */}
                {!playing && (
                  <div
                    className="custom-play-overlay"
                    onClick={() => handleOverlayClick(idx)}
                  >
                    ▶
                  </div>
                )}

                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={video}
                  playsInline
                  preload="metadata"
                  className="video-element"
                  poster={poster}
                  controls={activated[idx] === true}
                  onClick={(e) => handleVideoClick(e, idx)}
                  onLoadedMetadata={(e) => {
                    e.target.volume = 0.25;
                  }}
                  onPlay={() =>
                    setIsPlaying((prev) => ({ ...prev, [idx]: true }))
                  }
onPause={() => {
    setIsPlaying((prev) => ({ ...prev, [idx]: false }));
}}
onEnded={() => {
    setIsPlaying((prev) => ({ ...prev, [idx]: false }));
}}
                />
              </div>
            );
          })}
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

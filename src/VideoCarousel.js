import React, { useState, useRef } from "react";
import "./VideoCarousel.css";

function VideoCarousel() {
  const videos = [
    `${process.env.PUBLIC_URL}/video/!ERRORi.mp4`,
    `${process.env.PUBLIC_URL}/video/HSSRR.mp4`,
    `${process.env.PUBLIC_URL}/video/AshVideo.mp4`,
    `${process.env.PUBLIC_URL}/video/FFBlazeVideo.mp4`,
    `${process.env.PUBLIC_URL}/video/ProjectIOTA.mp4`,
  ];

  const [activated, setActivated] = useState({});
  const [isPlaying, setIsPlaying] = useState({});
  const videoRefs = useRef(new Array(videos.length));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const wasDraggedRef = useRef(false);

  const trackTransform = `translateX(calc(${-currentIndex * 100}% + ${dragOffset}px))`;

  const pauseAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.removeAttribute("controls");
        video.load();
      }
    });

    setIsPlaying({});
    setActivated({});
  };

  const finishDrag = () => {
    if (Math.abs(dragOffset) > 5) wasDraggedRef.current = true;

    const THRESHOLD = 50;

    if (dragOffset > THRESHOLD) {
      setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
      pauseAllVideos();
    } else if (dragOffset < -THRESHOLD) {
      setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
      pauseAllVideos();
    }

    setDragging(false);
    setDragStartX(null);
    setDragOffset(0);
  };

  const handleVideoClick = (e, idx) => {
    if (wasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      wasDraggedRef.current = false;
      return;
    }

    if (!activated[idx]) {
      e.preventDefault();
      const videoEl = videoRefs.current[idx];
      if (videoEl) {
        setActivated((prev) => ({ ...prev, [idx]: true }));
        videoEl.play();
      }
    }
  };

  const handleOverlayClick = (idx) => {
    const videoEl = videoRefs.current[idx];
    if (videoEl) {
      setActivated((prev) => ({ ...prev, [idx]: true }));
      videoEl.play();
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
        onMouseDown={(e) => { setDragStartX(e.clientX); setDragging(true); wasDraggedRef.current = false; }}
        onMouseMove={(e) => dragging && dragStartX !== null && setDragOffset(e.clientX - dragStartX)}
        onMouseUp={finishDrag}
        onMouseLeave={finishDrag}
        onTouchStart={(e) => { setDragStartX(e.touches[0].clientX); setDragging(true); wasDraggedRef.current = false; }}
        onTouchMove={(e) => dragging && dragStartX !== null && setDragOffset(e.touches[0].clientX - dragStartX)}
        onTouchEnd={finishDrag}
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

            return (
              <div key={idx} className="video-slide">
                <div className="video-slide-number">
                  {idx + 1} / {videos.length}
                </div>

                {!isPlaying[idx] && (
                  <div
                    className="custom-play-overlay"
                    onClick={() => handleOverlayClick(idx)}
                  ></div>
                )}

                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={video}
                  className="video-element"
                  poster={poster}
                  playsInline
                  preload="metadata"
                  controls={activated[idx] === true}
                  onClick={(e) => handleVideoClick(e, idx)}
                  onLoadedMetadata={(e) => { e.target.volume = 0.25; }}
                  onPlay={() => setIsPlaying((prev) => ({ ...prev, [idx]: true }))}
                  onPause={() => setIsPlaying((prev) => ({ ...prev, [idx]: false }))}
                  onEnded={() => setIsPlaying((prev) => ({ ...prev, [idx]: false }))}
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

import React, { useRef, useState } from "react";

// Project descriptions come from the linked public game pages.
const projects = [
  {
    id: "errori",
    title: "!ERRORi",
    label: "Solo game jam · 2025",
    stack: ["Godot", "2D Platformer"],
    summary: "A five-level platformer set inside a digital world that is falling apart, ending in a boss encounter.",
    role: "Solo developer",
    contribution: "Designed and developed the game independently, including varied platforming levels, combat and movement mechanics.",
    file: "!ERRORi",
    itchUrl: "https://minmakesgames.itch.io/error",
    action: "Play on itch.io",
  },
  {
    id: "hssrr",
    title: "Holly’s Splendid Sugar Rush Rally",
    label: "Collaborative game jam · 2026",
    stack: ["Godot", "Action Platformer"],
    summary: "A candy-themed action platformer made with a collaborator for Brackeys Game Jam 2026.1, later expanded into a full version.",
    role: "Co-creator / collaborative developer",
    contribution: "Collaborated on a released platformer featuring movement, combat, checkpoints, boss encounters and configurable controls.",
    file: "HSSRR",
    itchUrl: "https://minmakesgames.itch.io/hollys-splendid-sugar-rush-rally",
    action: "View full game",
  },
  {
    id: "ash",
    title: "Ash: Protector of Ignicity",
    label: "Team internship project · 2022",
    stack: ["Unity", "C#", "3D Action Adventure"],
    summary: "A third-person adventure in which the player explores environments, activates totems and battles enemies.",
    role: "Gameplay programming, AI and content development",
    contribution: "Contributed C# programming, enemy NPC behavior, creature rigging and animation, and level design for two levels.",
    file: "AshVideo",
    itchUrl: "https://minmakesgames.itch.io/ash-protector-of-ignicity",
    action: "View game page",
  },
  {
    id: "iota",
    title: "Project IOTA",
    label: "Team internship project · 2022",
    stack: ["Unity", "C#", "First-Person Puzzle"],
    summary: "A first-person puzzle and exploration game set inside a space base, with interactable systems and enemy encounters.",
    role: "Gameplay and AI programming",
    contribution: "Programmed player controls, interactions, minigames, health and stamina systems, and enemy NPC AI; also created 3D assets.",
    file: "ProjectIOTA",
    itchUrl: "https://minmakesgames.itch.io/project-iota",
    action: "View game page",
  },
  {
    id: "blaze",
    title: "Fire Fighter BLAZE!!",
    label: "Team collaboration · 2023",
    stack: ["Unreal Engine", "3D Action"],
    summary: "A third-person action game built around high-mobility combat and fighting fire-themed enemies.",
    role: "Development and QA contributor",
    contribution: "Assisted with the later stages of development and quality assurance on a collaborative Unreal Engine project.",
    file: "FFBlazeVideo",
    itchUrl: "https://anoymous1.itch.io/ffblaze",
    action: "View game page",
  },
];

function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Video controls persist after the initial Play click. They must not disappear on pause/seek.
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const videoRef = useRef(null);
  const tabRefs = useRef([]);
  const pointerStart = useRef(null);
  const justSwiped = useRef(false);
  const resumeAfterSeek = useRef(false);
  const current = projects[currentIndex];

  const selectIndex = (index) => {
    videoRef.current?.pause();
    resumeAfterSeek.current = false;
    setHasStarted(false);
    setIsPlaying(false);
    setIsSeeking(false);
    setCurrentIndex((index + projects.length) % projects.length);
  };

  const playSelected = () => {
    if (justSwiped.current) {
      justSwiped.current = false;
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    setHasStarted(true);
    const request = video.play();
    if (request && typeof request.catch === "function") request.catch(() => {});
  };

  const handleTabKeyDown = (event, index) => {
    const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!offset) return;
    event.preventDefault();
    const next = (index + offset + projects.length) % projects.length;
    selectIndex(next);
    tabRefs.current[next]?.focus();
  };

  const handlePointerDown = (event) => {
    // Never interpret an interaction with the native video controls as a project swipe.
    if (hasStarted && event.target.closest("video")) {
      pointerStart.current = null;
      resumeAfterSeek.current = !!videoRef.current && !videoRef.current.paused;
      return;
    }
    pointerStart.current = { x: event.clientX, y: event.clientY };
    justSwiped.current = false;
  };

  const handlePointerUp = (event) => {
    if (!pointerStart.current) return;
    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;
    pointerStart.current = null;
    if (Math.abs(deltaX) >= 65 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      justSwiped.current = true;
      selectIndex(currentIndex + (deltaX < 0 ? 1 : -1));
    }
  };

  const handleSeeked = (event) => {
    // On browsers that briefly pause while scrubbing, continue only if playback
    // was running when the seek began. A deliberately paused video stays paused.
    const shouldResume = resumeAfterSeek.current;
    resumeAfterSeek.current = false;
    const video = event.currentTarget;
    if (shouldResume && video.paused && !video.ended) {
      const request = video.play();
      if (request && typeof request.catch === "function") request.catch(() => {});
    }
  };

  return (
    <div className="featured-project-browser">
      <div className="featured-project-picker" role="tablist" aria-label="Choose a featured project">
        {projects.map((project, index) => (
          <button
            type="button"
            key={project.id}
            role="tab"
            ref={(element) => { tabRefs.current[index] = element; }}
            id={`project-tab-${project.id}`}
            aria-controls="featured-project-panel"
            aria-selected={currentIndex === index}
            tabIndex={currentIndex === index ? 0 : -1}
            className={`featured-project-tab ${currentIndex === index ? "selected" : ""}`}
            onClick={() => selectIndex(index)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            <img src={`${process.env.PUBLIC_URL}/video/${project.file}.jpg`} alt="" loading="lazy" />
            <span>{project.title}</span>
          </button>
        ))}
      </div>

      <div id="featured-project-panel" role="tabpanel" aria-labelledby={`project-tab-${current.id}`} className="featured-project-detail">
        <div className="featured-project-media">
          <div
            className="featured-video-frame"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerStart.current = null; }}
          >
            <video
              key={current.file}
              ref={videoRef}
              src={`${process.env.PUBLIC_URL}/video/${current.file}.mp4`}
              poster={`${process.env.PUBLIC_URL}/video/${current.file}.jpg`}
              preload="none"
              playsInline
              controls={hasStarted}
              onPlay={() => { setHasStarted(true); setIsPlaying(true); }}
              onPause={() => setIsPlaying(false)}
              onSeeking={(event) => {
                setIsSeeking(true);
                if (!event.currentTarget.paused) resumeAfterSeek.current = true;
              }}
              onSeeked={(event) => { setIsSeeking(false); handleSeeked(event); }}
              onEnded={() => { resumeAfterSeek.current = false; setIsPlaying(false); }}
              onLoadedMetadata={(event) => { event.currentTarget.volume = 0.25; }}
              aria-label={`${current.title} gameplay video`}
            />
            {!hasStarted && (
              <button type="button" className="featured-play-button" onClick={playSelected} aria-label={`Play ${current.title} gameplay video`}>
                <span aria-hidden="true">▶</span>
                <span className="featured-play-caption">Play footage</span>
              </button>
            )}
            {hasStarted && !isPlaying && !isSeeking && (
              <button
                type="button"
                className="featured-resume-button-v8"
                onClick={playSelected}
                aria-label={`Resume ${current.title} gameplay video`}
                title="Resume playback"
              >
                <span aria-hidden="true">▶</span> Resume video
              </button>
            )}
          </div>
          <div className="featured-video-controls">
            <button type="button" onClick={() => selectIndex(currentIndex - 1)} aria-label="Previous featured project">← Previous</button>
            <span aria-live="polite">{currentIndex + 1} / {projects.length}</span>
            <button type="button" onClick={() => selectIndex(currentIndex + 1)} aria-label="Next featured project">Next →</button>
          </div>
          <p className="portfolio-muted featured-swipe-hint">Select a thumbnail, use the arrows, or swipe the preview to switch projects.</p>
        </div>

        <article className="featured-project-copy" aria-live="polite">
          <span className="portfolio-kicker">{current.label}</span>
          <h3>{current.title}</h3>
          <p className="featured-project-summary">{current.summary}</p>
          <div className="featured-project-facts">
            <div><span className="featured-fact-label">My role</span><p>{current.role}</p></div>
            <div><span className="featured-fact-label">My contribution</span><p>{current.contribution}</p></div>
          </div>
          <div className="featured-project-tags" aria-label="Project technologies and genres">
            {current.stack.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="featured-project-links">
            <a className="portfolio-action portfolio-action-primary" href={current.itchUrl} target="_blank" rel="noopener noreferrer">{current.action} ↗</a>
          </div>
        </article>
      </div>
      <p className="portfolio-muted featured-profile-link">More projects: <a href="https://minmakesgames.itch.io/" target="_blank" rel="noopener noreferrer">itch.io</a> · <a href="https://github.com/mingwzhang" target="_blank" rel="noopener noreferrer">GitHub</a></p>
    </div>
  );
}

export default VideoCarousel;

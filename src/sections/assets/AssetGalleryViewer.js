import React, { useEffect, useRef, useState } from "react";
import "./2D3DAssetGallery.css";
import "./AssetGalleryViewer.css";

/**
 * Shared, keyboard-accessible gallery for the portfolio's existing 2D / 3D assets.
 * Each category contains { src, description } entries, with no new content claims.
 */
export default function AssetGalleryViewer({ title, type, categories }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const dialogTitleId = `asset-viewer-${type}-title`;
  const images = activeCategory ? categories[activeCategory] : [];
  const selected = images[activeIndex];

  const openCategory = (category, event) => {
    triggerRef.current = event.currentTarget;
    setActiveIndex(0);
    setActiveCategory(category);
  };

  const closeCategory = () => {
    setActiveCategory(null);
    setActiveIndex(0);
  };

  const step = (direction) => {
    setActiveIndex((previous) => (previous + direction + images.length) % images.length);
  };

  useEffect(() => {
    if (!activeCategory) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveCategory(null);
        setActiveIndex(0);
        return;
      }
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((previous) =>
          (previous + (event.key === "ArrowRight" ? 1 : -1) + images.length) % images.length
        );
        return;
      }
      if (event.key !== "Tab") return;

      const buttons = [...dialogRef.current.querySelectorAll('button:not([disabled])')];
      if (!buttons.length) return;
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [activeCategory, images.length]);

  return (
    <div className="asset-browser">
      <h5 className="pixel-text">{title}</h5>
      <ul className="asset-list">
        {Object.entries(categories).map(([category, entries]) => (
          <li key={category}>
            <button
              type="button"
              className="asset-category-button"
              onClick={(event) => openCategory(category, event)}
              aria-label={`View ${category}, ${entries.length} examples`}
            >
              <span>{category}</span>
              <span className="asset-category-count" aria-hidden="true">{entries.length} →</span>
            </button>
          </li>
        ))}
      </ul>

      {activeCategory && selected && (
        <div
          className={type === "2d" ? "modal-bg" : "modal-bg-3d"}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeCategory();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            aria-describedby={`asset-viewer-${type}-hint`}
            className={`${type === "2d" ? "modal-2d" : "modal-3d"} portfolio-asset-dialog`}
          >
            <header className="portfolio-asset-header">
              <div>
                <span className="portfolio-asset-overline">{title} / {activeIndex + 1} of {images.length}</span>
                <h4 className="pixel-text portfolio-asset-heading" id={dialogTitleId}>{activeCategory}</h4>
              </div>
              <button
                type="button"
                ref={closeRef}
                className={type === "2d" ? "modal-exit-btn" : "modal-exit-btn-3d"}
                aria-label="Close asset gallery"
                onClick={closeCategory}
              >✕</button>
            </header>

            <div className="portfolio-asset-feature">
              <img
                key={selected.src}
                src={selected.src}
                alt={selected.description}
                className={type === "2d" ? "portfolio-asset-illustration pixel-art" : "portfolio-asset-illustration"}
              />
            </div>
            <p className="portfolio-asset-caption">{selected.description}</p>

            <div className="portfolio-asset-controls" aria-label="Gallery navigation">
              <button type="button" onClick={() => step(-1)} disabled={images.length <= 1} aria-label="Previous image">← Previous</button>
              <div className="portfolio-asset-pagination" aria-label="Select an image">
                {images.map((entry, index) => (
                  <button
                    key={`${entry.src}-${index}`}
                    type="button"
                    className={index === activeIndex ? "selected" : ""}
                    aria-current={index === activeIndex ? "true" : undefined}
                    aria-label={`Show example ${index + 1}: ${entry.description}`}
                    onClick={() => setActiveIndex(index)}
                  >{index + 1}</button>
                ))}
              </div>
              <button type="button" onClick={() => step(1)} disabled={images.length <= 1} aria-label="Next image">Next →</button>
            </div>
            <p id={`asset-viewer-${type}-hint`} className="portfolio-asset-hint">
              Use ← → to browse and Esc to close. You can also click outside this panel.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

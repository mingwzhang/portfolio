// Interactive Demo section: the target mini-game and 2D/3D asset galleries.
import React, { useState } from "react";
import MiniGameBox from "./MiniGameBox";
import AssetGallery2D from "../assets/2DAssetGallery";
import AssetGallery3D from "../assets/3DAssetGallery";
import SlideReveal from "../../components/common/SlideReveal";

export default function InteractiveDemo() {
  const [showAssets, setShowAssets] = useState(true);

  return (
        <section id="more-work" className="portfolio-section portfolio-more-work" aria-labelledby="more-work-heading">
          <div className="portfolio-section-heading">
            <span className="portfolio-kicker">04 / EXPLORE MORE</span>
            <h2 id="more-work-heading" className="pixel-text pixel-bold-title">Interactive Demo &amp; Assets</h2>
            <p>A playable React mini-game and examples of 2D and 3D development work.</p>
          </div>
          <div className="portfolio-demo-panel">
            <div className="portfolio-demo-description">
              <span className="portfolio-kicker">BUILT INTO THIS WEBSITE</span>
              <h3 className="pixel-text">Hit the Target!</h3>
              <p>Try the interactive mini-game. Click or tap the moving target to increase your score.</p>
              <p className="portfolio-muted">An interactive component of this React portfolio.</p>
            </div>
            <div className="portfolio-demo-game"><MiniGameBox /></div>
          </div>
          <button
            type="button"
            className="portfolio-action portfolio-asset-toggle"
            aria-controls="portfolio-asset-galleries"
            aria-expanded={showAssets}
            onClick={() => setShowAssets((previous) => !previous)}
          >
            {showAssets ? "Hide 2D & 3D asset galleries −" : "Explore 2D & 3D asset galleries +"}
          </button>
          <SlideReveal id="portfolio-asset-galleries" open={showAssets} className="portfolio-assets-slide">
            <div className="portfolio-assets-grid">
              <div className="portfolio-asset-panel"><AssetGallery2D /></div>
              <div className="portfolio-asset-panel"><AssetGallery3D /></div>
            </div>
          </SlideReveal>
        </section>
  );
}

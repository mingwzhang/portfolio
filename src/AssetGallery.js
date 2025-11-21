import React, { useState } from "react";
import "./AssetGallery.css";

function AssetGallery() {
  const [openCategory, setOpenCategory] = useState(null);

  const categories = {
    "Magic Wand": [
      process.env.PUBLIC_URL + "/img/art_assets/3D/MagicWand/VR_MagicWand.gif",
    ],

    "Marble Race": [
      process.env.PUBLIC_URL + "/img/art_assets/3D/MarbleRace/3D_MarbleRace_Model.png",
      process.env.PUBLIC_URL + "/img/art_assets/3D/MarbleRace/3D_MarbleRace_Parts.png",
      process.env.PUBLIC_URL + "/img/art_assets/3D/MarbleRace/VR_MarbleRace_Display1.gif",
      process.env.PUBLIC_URL + "/img/art_assets/3D/MarbleRace/VR_MarbleRace_Display2.gif",
    ],

    Piano: [
      process.env.PUBLIC_URL + "/img/art_assets/3D/Piano/VR_Piano.gif",
      process.env.PUBLIC_URL + "/img/art_assets/3D/Piano/VR_Piano_Hand.png",
    ],

    "Ring Toss": [
      process.env.PUBLIC_URL + "/img/art_assets/3D/RingToss/VR_RingToss.gif",
    ],

    "Sea Snail": [
      process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/3D_SeaSnail_Model.png",
      process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/3D_SeaSnail_Outline.png",
      process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/3D_SeaSnail_Animation.gif",
      process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/VR_Sea1.png",
      process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/VR_Sea2.gif",
    ],

    Terrain: [
      process.env.PUBLIC_URL + "/img/art_assets/3D/Terrain/3D_Terrain.png",
    ],

    "AI Demos": [
      process.env.PUBLIC_URL + "/img/art_assets/3D/AI/VR_MarsRoverAI1.gif",
      process.env.PUBLIC_URL + "/img/art_assets/3D/AI/VR_MarsRoverAI2.gif",
    ],
  };

  return (
    <div className="asset-gallery">
      <div className="asset-link-list">
        <h3 className="pixel-text">3D Asset Categories</h3>
        <ul>
          {Object.keys(categories).map((cat) => (
            <li key={cat} onClick={() => setOpenCategory(cat)}>
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {openCategory && (
        <div
          className="asset-modal-overlay"
          onClick={() => setOpenCategory(null)}
        >
          <div
            className="asset-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="pixel-text">{openCategory}</h2>
              <button onClick={() => setOpenCategory(null)}>X</button>
            </div>

            <div className="modal-content">
              {categories[openCategory].map((src, idx) => (
                <div className="asset-item" key={idx}>
                  <img src={src} alt={openCategory + idx} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssetGallery;

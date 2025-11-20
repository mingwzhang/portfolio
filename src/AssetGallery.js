import React, { useState } from "react";
import "./AssetGallery.css";

function AssetGallery() {
  const [openCategory, setOpenCategory] = useState(null);

  const categories = {
    "Magic Wand": [
      "/art_assets/3D/MagicWand/3D_MagicWand_VR.gif",
    ],
    "Marble Race": [
      "/art_assets/3D/MarbleRace/3D_MarbleRace_Parts.png",
      "/art_assets/3D/MarbleRace/3D_MarbleRace_Model.png",
      "/art_assets/3D/MarbleRace/VR_MarbleRaceDisplay1.gif",
      "/art_assets/3D/MarbleRace/VR_MarbleRaceDisplay2.gif",
    ],
    "Piano": [
      "/art_assets/3D/Piano/VR_Piano.gif",
      "/art_assets/3D/Piano/VR_PianoHand.png",
    ],
    "Ring Toss": [
      "/art_assets/3D/RingToss/VR_RingToss.gif",
    ],
    "Sea Snail": [
      "/art_assets/3D/SeaSnail/3D_SeaSnail_Model.png",
      "/art_assets/3D/SeaSnail/3D_SeaSnail_Outline.png",
      "/art_assets/3D/SeaSnail/3D_SeaSnail_Animation.gif",
    ],
    "Terrain": [
      "/art_assets/3D/Terrain/3D_Terrain.png",
    ],
    "AI Demos": [
      "/art_assets/3D/AI/VR_VehicleFollow.gif",
      "/art_assets/3D/AI/VR_VehicleTargetSelector.gif",
    ],
  };

  return (
    <div className="asset-gallery">

      {/* Link List */}
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

      {/* Modal Window */}
      {openCategory && (
        <div className="asset-modal-overlay" onClick={() => setOpenCategory(null)}>
          <div
            className="asset-modal"
            onClick={(e) => e.stopPropagation()} // stop closing when clicking inside
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

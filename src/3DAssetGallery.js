import React, { useState } from "react";
import "./3DAssetGallery.css";

export default function AssetGallery3D() {
  const [open, setOpen] = useState(null);

  const categories = {
    "Marble Race (Modular)": [
      process.env.PUBLIC_URL + "/img/art_assets/3D/MarbleRace/3D_MarbleRace_Model.png",
      process.env.PUBLIC_URL + "/img/art_assets/3D/MarbleRace/3D_MarbleRace_Parts.png",
      process.env.PUBLIC_URL + "/img/art_assets/3D/MarbleRace/VR_MarbleRace_Display1.gif",
      process.env.PUBLIC_URL + "/img/art_assets/3D/MarbleRace/VR_MarbleRace_Display2.gif",
    ],

    "Piano (Interaction)": [
      process.env.PUBLIC_URL + "/img/art_assets/3D/Piano/VR_Piano.gif",
      process.env.PUBLIC_URL + "/img/art_assets/3D/Piano/VR_Piano_Hand.png",
    ],

    "Ring Toss (Physics & Interaction)": [
      process.env.PUBLIC_URL + "/img/art_assets/3D/RingToss/VR_RingToss.gif",
    ],

    "Sea/Slugs (Sensor System & Model)": [
      process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/3D_SeaSnail_Model.png",
      process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/3D_SeaSnail_Outline.png",
      process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/3D_SeaSnail_Animation.gif",
      process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/VR_Sea1.png",
      process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/VR_Sea2.gif",
    ],

    "Terrain (Gameplay Environment)": [
      process.env.PUBLIC_URL + "/img/art_assets/3D/Terrain/3D_Terrain.png",
    ],

    "Rover (AI Tracker System)": [
      process.env.PUBLIC_URL + "/img/art_assets/3D/AI/VR_MarsRoverAI1.gif",
      process.env.PUBLIC_URL + "/img/art_assets/3D/AI/VR_MarsRoverAI2.gif",
    ],
  };

  return (
    <div>
<h5 className="pixel-text">3D Assets</h5>

      <ul className="asset-list">
        {Object.keys(categories).map((cat) => (
          <li key={cat} onClick={() => setOpen(cat)}>
            {cat}
          </li>
        ))}
      </ul>

      {open && (
        <div className="modal-bg" onClick={() => setOpen(null)}>
<div className="modal-3d" style={{ position: "relative", maxHeight: "80vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <h4 className="pixel-text modal-title">{open}</h4>

            <div className="modal-images">
              {categories[open].map((img, idx) => (
                <img key={idx} src={img} alt="" className="render-img" />
              ))}
            </div>

            <button className="modal-exit-btn" onClick={() => setOpen(false)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}

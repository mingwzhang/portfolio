import React, { useState } from "react";
import "./2D3DAssetGallery.css";

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export default function AssetGallery3D() {
  const [open, setOpen] = useState(null);
  const [clicked, setClicked] = useState({});
  const [hovered, setHovered] = useState({});

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
        <div className="modal-bg-3d" onClick={() => setOpen(null)}>
          <div className="modal-3d" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-3d">
              <h4 className="pixel-text modal-title">{open}</h4>
              <button className="modal-exit-btn-3d" onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="modal-images">
              {categories[open].map((img, idx) => (
                <div
                  className="img-wrapper"
                  key={idx}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setHovered((prev) => ({ ...prev, [idx]: true }));
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setHovered((prev) => ({ ...prev, [idx]: false }));
                      setClicked((prev) => ({ ...prev, [idx]: false }));
                    }
                  }}
                  onClick={() => {
                    if (isMobile) {
                      setHovered({});
                      setClicked((prev) => ({ ...prev, [idx]: !prev[idx] }));
                    } else {
                      if (hovered[idx]) {
                        setClicked((prev) => ({ ...prev, [idx]: !prev[idx] }));
                      }
                    }
                  }}
                >
                  <img src={img} alt="" className="pixel-img-3d" />

                  <div className={`info-icon ${(hovered[idx] && !clicked[idx]) || (isMobile && clicked[idx]) ? "active" : ""}`}>
                    i
                  </div>

                  <div
                    className="asset-hover-text"
                    style={{
                      opacity: isMobile
                        ? (clicked[idx] ? 1 : 0)
                        : (hovered[idx] && !clicked[idx] ? 1 : 0),

                      transform: isMobile
                        ? (clicked[idx] ? "translateY(0)" : "translateY(20px)")
                        : (hovered[idx] && !clicked[idx] ? "translateY(0)" : "translateY(20px)")
                    }}
                  >
                    {imgDescriptions[img] || "No description yet"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const imgDescriptions = {
  [process.env.PUBLIC_URL + "/img/art_assets/3D/MarbleRace/3D_MarbleRace_Model.png"]:
    "Modular VR marble race model built with detachable components.",
  [process.env.PUBLIC_URL + "/img/art_assets/3D/MarbleRace/3D_MarbleRace_Parts.png"]:
    "Individual marble race segments for flexible assembly.",
  [process.env.PUBLIC_URL + "/img/art_assets/3D/MarbleRace/VR_MarbleRace_Display1.gif"]:
    "Runtime physics test of marbles moving through the track.",
  [process.env.PUBLIC_URL + "/img/art_assets/3D/MarbleRace/VR_MarbleRace_Display2.gif"]:
    "Alternate marble path demonstration using the modular pieces.",

  [process.env.PUBLIC_URL + "/img/art_assets/3D/Piano/VR_Piano.gif"]:
    "Interactive VR piano system detecting hand proximity.",
  [process.env.PUBLIC_URL + "/img/art_assets/3D/Piano/VR_Piano_Hand.png"]:
    "Hand collider and finger joint spheres for key detection.",

  [process.env.PUBLIC_URL + "/img/art_assets/3D/RingToss/VR_RingToss.gif"]:
    "Ring toss interaction using real-time physics and collision.",

  [process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/3D_SeaSnail_Model.png"]:
    "Finished sea slug model with texture and materials.",
  [process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/3D_SeaSnail_Outline.png"]:
    "Bone and symmetry layout used for rigging.",
  [process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/3D_SeaSnail_Animation.gif"]:
    "Idle and motion animation tests of the slug rig.",
  [process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/VR_Sea1.png"]:
    "Sensor UI showing sunlight and health values in the environment.",
  [process.env.PUBLIC_URL + "/img/art_assets/3D/SeaSnail/VR_Sea2.gif"]:
    "Slug reacting dynamically to environmental lighting changes.",

  [process.env.PUBLIC_URL + "/img/art_assets/3D/Terrain/3D_Terrain.png"]:
    "Low-poly natural environment used for gameplay scenes.",

  [process.env.PUBLIC_URL + "/img/art_assets/3D/AI/VR_MarsRoverAI1.gif"]:
    "Rover AI tracking logic following the player or target.",
  [process.env.PUBLIC_URL + "/img/art_assets/3D/AI/VR_MarsRoverAI2.gif"]:
    "Waypoint-based navigation system for rover movement.",
};

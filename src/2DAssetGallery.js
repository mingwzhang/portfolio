import React, { useState } from "react";
import "./2D3DAssetGallery.css";

export default function AssetGallery2D() {
  const [open, setOpen] = useState(null);
  const [clicked, setClicked] = useState({});
  const [hovered, setHovered] = useState({});
  const categories = {
    "Character Sprites": [
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/SpriteSheets/character_spritesheet.png",
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/SpriteSheets/character_example.gif",
    ],

    "Enemy Sprites": [
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/Enemy/enemy_dark1.gif",
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/Enemy/enemy_dark2.gif",
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/Enemy/enemy_pig.gif",
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/Enemy/enemy_slime.gif",
    ],

    "Props & Environment Objects": [
      process.env.PUBLIC_URL + "/img/art_assets/2D/Props/Props.png",
    ],

    "Tileset/Tilemap & Example Usage": [
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/TerrainTilemap/Terrain_Tilesheet.png",
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/TerrainTilemap/Terrain_InGame.png",
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/TerrainTilemap/TerrainCorrupted_InGame.png",
    ],

    "Complex Animations": [
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/Animation/komachi_pose.gif",
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/Animation/komachi_run.gif",
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/Animation/komachi_attacklist_melee.gif",
      process.env.PUBLIC_URL +
      "/img/art_assets/2D/Animation/komachi_attacklist_aerial.gif",
    ],
  };

  return (
    <div>
      <h5 className="pixel-text">2D Assets</h5>

      <ul className="asset-list">
        {Object.keys(categories).map((cat) => (
          <li key={cat} onClick={() => setOpen(cat)}>
            {cat}
          </li>
        ))}
      </ul>

      {open && (
        <div className="modal-bg" onClick={() => setOpen(null)}>
          <div
            className="modal-2d"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header with title + close button */}
            <div className="modal-header">
              <h4 className="pixel-text modal-title">{open}</h4>
              <button className="modal-exit-btn" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="modal-images">
              {categories[open].map((img, idx) => (

                <div
                  className="img-wrapper"
                  key={idx}
                  onMouseEnter={() => setHovered(prev => ({ ...prev, [idx]: true }))}
                  onMouseLeave={() => {
                    setHovered(prev => ({ ...prev, [idx]: false }));
                    setClicked(prev => ({ ...prev, [idx]: false }));
                  }}
                  onClick={() => {
                    if (hovered[idx]) {
                      setClicked(prev => ({ ...prev, [idx]: !prev[idx] }));
                    }
                  }}
                >
                  <img src={img} alt="" className="pixel-img" />

                  <div className={`info-icon ${hovered[idx] && !clicked[idx] ? "active" : ""}`}>
                    i
                  </div>

                  <div className="asset-hover-text"
                    style={{
                      opacity: hovered[idx] && !clicked[idx] ? 1 : 0,
                      transform: hovered[idx] && !clicked[idx] ? "translateY(0)" : "translateY(20px)"
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
  [process.env.PUBLIC_URL + "/img/art_assets/2D/SpriteSheets/character_spritesheet.png"]:
    "Full player animation sheet I drew, with frames for movement and combat",
  [process.env.PUBLIC_URL + "/img/art_assets/2D/SpriteSheets/character_example.gif"]:
    "Quick preview of the sprite in motion",

  [process.env.PUBLIC_URL + "/img/art_assets/2D/Enemy/enemy_dark1.gif"]:
    "Corrupted creature",
  [process.env.PUBLIC_URL + "/img/art_assets/2D/Enemy/enemy_dark2.gif"]:
    "Gazer-type eyeball",
  [process.env.PUBLIC_URL + "/img/art_assets/2D/Enemy/enemy_pig.gif"]:
    "Charging boar",
  [process.env.PUBLIC_URL + "/img/art_assets/2D/Enemy/enemy_slime.gif"]:
    "Idle slime",

  [process.env.PUBLIC_URL + "/img/art_assets/2D/Props/Props.png"]:
    "Various props I drew for level decoration and hazards, each made as separate assets",

  [process.env.PUBLIC_URL + "/img/art_assets/2D/TerrainTilemap/Terrain_Tilesheet.png"]:
    "Tile sheet I drew containing a clean grass terrain style and an alternate corrupted style for visual contrast",
  [process.env.PUBLIC_URL + "/img/art_assets/2D/TerrainTilemap/Terrain_InGame.png"]:
    "Example of the clean grassy tile style applied in-game",
  [process.env.PUBLIC_URL + "/img/art_assets/2D/TerrainTilemap/TerrainCorrupted_InGame.png"]:
    "Example of the corrupted tile style in use, showing a more chaotic look",

  [process.env.PUBLIC_URL + "/img/art_assets/2D/Animation/komachi_pose.gif"]:
    "Idle stance with subtle aura animation",
  [process.env.PUBLIC_URL + "/img/art_assets/2D/Animation/komachi_run.gif"]:
    "Running animation for movement or chasing",
  [process.env.PUBLIC_URL + "/img/art_assets/2D/Animation/komachi_attacklist_melee.gif"]:
    "Ground melee combo animations with multiple possible transition paths",
  [process.env.PUBLIC_URL + "/img/art_assets/2D/Animation/komachi_attacklist_aerial.gif"]:
    "Mid-air combo animations with multiple possible transition orders",
};

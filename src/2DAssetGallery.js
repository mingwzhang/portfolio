import React, { useState } from "react";
import "./2D3DAssetGallery.css";

export default function AssetGallery2D() {
  const [open, setOpen] = useState(null);

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
          <img key={idx} src={img} alt="" className="pixel-img" />
        ))}
      </div>
    </div>
  </div>
)}

    </div>
  );
}

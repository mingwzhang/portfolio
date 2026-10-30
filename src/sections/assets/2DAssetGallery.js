import React from "react";
import AssetGalleryViewer from "./AssetGalleryViewer";

const base = `${process.env.PUBLIC_URL}/img/art_assets/2D`;
const image = (path, description) => ({ src: `${base}/${path}`, description });

// Asset paths and captions are grouped by 2D art category.
const categories = {
  "Character Sprites": [
    image("SpriteSheets/character_spritesheet.png", "Full player animation sheet I drew, with frames for movement and combat"),
    image("SpriteSheets/character_example.gif", "Quick preview of the sprite in motion"),
  ],
  "Enemy Sprites": [
    image("Enemy/enemy_dark1.gif", "Corrupted creature"),
    image("Enemy/enemy_dark2.gif", "Gazer-type eyeball"),
    image("Enemy/enemy_pig.gif", "Charging boar"),
    image("Enemy/enemy_slime.gif", "Idle slime"),
  ],
  "Props & Environment Objects": [
    image("Props/Props.png", "Various props I drew for level decoration and hazards, each made as separate assets"),
  ],
  "Tileset/Tilemap & Example Usage": [
    image("TerrainTilemap/Terrain_Tilesheet.png", "Tile sheet I drew containing a clean grass terrain style and an alternate corrupted style for visual contrast"),
    image("TerrainTilemap/Terrain_InGame.png", "Example of the clean grassy tile style applied in-game"),
    image("TerrainTilemap/TerrainCorrupted_InGame.png", "Example of the corrupted tile style in use, showing a more chaotic look"),
  ],
  "Complex Animations": [
    image("Animation/komachi_pose.gif", "Idle stance with subtle aura animation"),
    image("Animation/komachi_run.gif", "Running animation for movement or chasing"),
    image("Animation/komachi_attacklist_melee.gif", "Ground melee combo animations with multiple possible transition paths"),
    image("Animation/komachi_attacklist_aerial.gif", "Mid-air combo animations with multiple possible transition orders"),
  ],
};

export default function AssetGallery2D() {
  return <AssetGalleryViewer title="2D Assets" type="2d" categories={categories} />;
}

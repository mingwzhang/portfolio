import React from "react";
import AssetGalleryViewer from "./AssetGalleryViewer";

const base = `${process.env.PUBLIC_URL}/img/art_assets/3D`;
const image = (path, description) => ({ src: `${base}/${path}`, description });

// Reuses the original gallery's asset paths and factual descriptions.
const categories = {
  "Marble Race (Modular)": [
    image("MarbleRace/3D_MarbleRace_Model.png", "Modular VR marble race model built with detachable components."),
    image("MarbleRace/3D_MarbleRace_Parts.png", "Individual marble race segments for flexible assembly."),
    image("MarbleRace/VR_MarbleRace_Display1.gif", "Runtime physics test of marbles moving through the track."),
    image("MarbleRace/VR_MarbleRace_Display2.gif", "Alternate marble path demonstration using the modular pieces."),
  ],
  "Piano (Interaction)": [
    image("Piano/VR_Piano.gif", "Interactive VR piano system detecting hand proximity."),
    image("Piano/VR_Piano_Hand.png", "Hand collider and finger joint spheres for key detection."),
  ],
  "Ring Toss (Physics & Interaction)": [
    image("RingToss/VR_RingToss.gif", "Ring toss interaction using real-time physics and collision."),
  ],
  "Sea/Slugs (Sensor System & Model)": [
    image("SeaSnail/3D_SeaSnail_Model.png", "Finished sea slug model with texture and materials."),
    image("SeaSnail/3D_SeaSnail_Outline.png", "Bone and symmetry layout used for rigging."),
    image("SeaSnail/3D_SeaSnail_Animation.gif", "Idle and motion animation tests of the slug rig."),
    image("SeaSnail/VR_Sea1.png", "Sensor UI showing sunlight and health values in the environment."),
    image("SeaSnail/VR_Sea2.gif", "Slug reacting dynamically to environmental lighting changes."),
  ],
  "Terrain (Gameplay Environment)": [
    image("Terrain/3D_Terrain.png", "Low-poly natural environment used for gameplay scenes."),
  ],
  "Rover (AI Tracker System)": [
    image("AI/VR_MarsRoverAI1.gif", "Rover AI tracking logic following the player or target."),
    image("AI/VR_MarsRoverAI2.gif", "Waypoint-based navigation system for rover movement."),
  ],
};

export default function AssetGallery3D() {
  return <AssetGalleryViewer title="3D Assets" type="3d" categories={categories} />;
}

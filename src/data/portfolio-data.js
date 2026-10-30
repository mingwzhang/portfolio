// Shared portfolio technology inventories. Edit names, logos, and categories here.
export const skills = [
  {
    category: "Programming Languages",
    icons: [
      { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      { name: "C#", class: "devicon-csharp-plain colored" },
      { name: "C++", class: "devicon-cplusplus-plain colored" },
      { name: "HTML5", class: "devicon-html5-plain colored" },
      { name: "CSS3", class: "devicon-css3-plain colored" },
      { name: "JavaScript", class: "devicon-javascript-plain colored" },
    ],
  },
  {
    category: "Game Engines",
    icons: [
      { name: "Unity", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg" },
      { name: "Unreal Engine", class: "devicon-unrealengine-original colored" },
      { name: "Godot", class: "devicon-godot-plain colored" },
      { name: "Ren'Py", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/renpy/renpy-original.svg" },
    ],
  },
  {
    category: "Design & Multimedia",
    icons: [
      { name: "Blender", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg" },
      { name: "Photoshop", class: "devicon-photoshop-plain colored" },
      { name: "GIMP", class: "devicon-gimp-plain colored" },
      { name: "DaVinci Resolve", src: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg" },
      { name: "Aseprite", src: `${process.env.PUBLIC_URL}/img/skills/aseprite.svg` },
      { name: "Krita", src: `${process.env.PUBLIC_URL}/img/skills/krita.svg` },
      { name: "Spine2D", src: "https://styles.redditmedia.com/t5_2mvt3f/styles/communityIcon_apt5vcye2tw41.png" },
    ],
  },
  {
    category: "Version Control & Project Management",
    icons: [
      { name: "GitHub", class: "devicon-github-original colored" },
      { name: "Git", class: "devicon-git-plain colored" },
      { name: "Trello", class: "devicon-trello-plain colored" },
    ],
  },
  {
    category: "Databases",
    icons: [
      { name: "MySQL", class: "devicon-mysql-plain colored" },
      { name: "Oracle", class: "devicon-oracle-original colored" },
      { name: "SQLite", class: "devicon-sqlite-plain colored" },
    ],
  },
];

// Short technology list used in the expandable hero summary; detailed categories are above.
export const featuredTechnologies = [
  "Unity", "Unreal Engine", "Godot", "C#", "Python", "Java",
  "JavaScript", "React", "C++", "HTML / CSS", "MySQL",
];

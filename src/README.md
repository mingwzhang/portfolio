# Source organization — where to edit

The portfolio is organized by **feature**, with component logic and its CSS stored together.
The public-facing content and retro design have not been intentionally changed in this reorganization.

| I want to edit… | Go to… |
| --- | --- |
| Page sections and their order, hero actions, tech badges | `src/App.js` |
| App startup and loading | `src/index.js`, `src/components/loading/` |
| About Me text and typewriter interaction | `src/sections/about/AboutMe.js` |
| Featured projects, videos, roles, tags, links | `src/sections/projects/VideoCarousel.js` |
| Skills or education cards | `src/sections/skills/SkillsEducation.js`; skill data currently lives in `src/App.js` |
| Playable target mini-game | `src/sections/interactive/MiniGameBox.js` |
| 2D and 3D asset categories, images, captions | `src/sections/assets/` |
| Contact form and messaging | `src/sections/contact/ContactForm.js` |
| Top menu or back-to-top control | `src/components/navigation/` |
| Floating polygons, particles, animated background | `src/components/effects/` |
| Overall retro styling, section layout and responsive rules | `src/styles/` |
| Crosshair image used by global CSS | `src/assets/crosshair.png` |
| Game videos, posters, gallery GIFs and portraits | `public/video/`, `public/img/` (UNCHANGED) |
| Unused, empty legacy components | `src/legacy/` |

**Important:** Keep the `public/` folder as it is. The media references use
`process.env.PUBLIC_URL`, so moving public files would require further changes.

**Styles:** `src/styles/styles.css` is the global stylesheet. `src/styles/PortfolioEnhancements.css`
contains site-wide layout and responsive design. Component-specific CSS lives beside its `.js`.

**Next steps after applying the patch:** run `npm start` and `npm run build`, and verify
navigation, About typing/skip, project videos, galleries, target mini-game, and contact form.

This organization does not add or remove features, assets, or dependencies.

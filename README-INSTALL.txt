FEATURED PROJECTS + SKILLS HOVER UPDATE

Based on the pushed new_change branch.

Replace these two project files:
- src/sections/projects/VideoCarousel.js
- src/styles/typography-and-responsive.css

The existing repo already has these media files (not duplicated in this ZIP):
- public/video/ChocoMilkScramble.mp4
- public/video/ChocoMilkScramble.png
- public/video/Fides Corvi.png

Fides Corvi currently has a static image in the repo, not an MP4, so its
project tab shows that image and the 'View game page' link. No broken play icon.

Includes a seven-project 4-column thumbnail grid on desktop, 3-column on
tablets, and 2-column on phones. Keyboard navigation is unchanged.

To install from the portfolio folder in Windows PowerShell:
Expand-Archive -Path "$env:USERPROFILE\Downloads\portfolio_seven_games_skills_polish.zip" -DestinationPath "." -Force

Then run npm start and npm run build before committing/pushing.
Nothing has been pushed automatically.

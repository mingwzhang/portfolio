OVERVIEW LABEL — REGULAR FONT WEIGHT

This is a targeted, in-place update. It changes only the Overview label font-weight
from bold to regular inside src/styles/typography-and-responsive.css, applying
to all seven Featured Projects. My Role, My Contribution, and the other project
content remain untouched.

1. Download and extract this ZIP into your portfolio's main folder.
2. In VS Code's PowerShell terminal, run:
   powershell -NoProfile -ExecutionPolicy Bypass -File .\fix-overview-label.ps1
3. Review changes: git diff -- src/styles/typography-and-responsive.css
4. Test with npm start.

This does not overwrite the full stylesheet, so it preserves any local cleanup
that has not yet been pushed. You can delete this script and README afterward.

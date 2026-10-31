# Update only the Overview heading weight in the existing portfolio stylesheet.
# The change is applied in place so other local CSS cleanup is preserved.
$ErrorActionPreference = 'Stop'
$path = Join-Path (Get-Location) 'src/styles/typography-and-responsive.css'
if (-not (Test-Path -LiteralPath $path)) {
  throw 'Run this script from the portfolio root folder (the one containing package.json).'
}

$content = [System.IO.File]::ReadAllText($path)
$selector = '\.portfolio-v2\s+#projects\s+\.featured-project-overview\s*>\s*\.featured-detail-label'
$pattern = '(?m)(' + $selector + '\s*\{)([^}]*)(\})'
$matches = [regex]::Matches($content, $pattern)
if ($matches.Count -ne 1) {
  throw 'Could not uniquely identify the Overview label CSS rule. No file was changed.'
}

$match = $matches[0]
$body = $match.Groups[2].Value
if ($body -match 'font-weight\s*:\s*400(?:\s*!important)?\s*;') {
  Write-Host 'Overview label already uses regular weight (400). No changes needed.'
  exit 0
}

if ($body -match 'font-weight\s*:') {
  $body = [regex]::Replace($body, 'font-weight\s*:\s*[^;]+;', 'font-weight: 400 !important;')
} else {
  $eol = if ($content.Contains("`r`n")) { "`r`n" } else { "`n" }
  $body = $body.TrimEnd() + $eol + '  font-weight: 400 !important;' + $eol
}

$replacement = $match.Groups[1].Value + $body + $match.Groups[3].Value
$updated = $content.Remove($match.Index, $match.Length).Insert($match.Index, $replacement)
[System.IO.File]::WriteAllText($path, $updated, (New-Object System.Text.UTF8Encoding($false)))
Write-Host 'Updated Overview label font weight to 400. Other styles are unchanged.'

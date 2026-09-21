# Changelog

All notable changes to lean-deck. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and the project uses [Semantic Versioning](https://semver.org/).

Releasing: bump `version` in `package.json`, add a section below with the same number, merge,
then push a tag `v<version>`. The release workflow checks that the tag, `package.json` and this file agree,
builds the site, and publishes a GitHub Release with the Claude Code skill attached as a zip.

## [Unreleased]

### Added
- **PDF export** — `npm run export:pdf -- <deck>` prints a whole deck to a vector PDF (one slide per 1920×1080 page)
  through the new `?print=1` viewer mode and the Chrome DevTools protocol. No screenshots, no extra dependencies;
  it fails when the page count does not match the slide count.

### Changed
- The background grid is drawn as line paths instead of a CSS gradient. It looks the same on screen
  and no longer turns into coarse tiles in PDF viewers such as Preview.

## [2.0.0] — 2026-09-16

### Added
- **Semantic tokens** (`tokens.ts`) — slides and themes meet through meaning-level names
  (`surface.raised`, `text.soft`, `accent.marker` …). `toSemantic`, `defineTheme` and `toCssVars`
  (`--ld-*` custom properties for anything that is not a React slide).
- **Viz parts** (`viz.tsx`) — 17 infographic components for explaining rather than decorating:
  `Myth`, `Panel`, `Chip`, `Tile`, `Arrow`, `StepRow`, `Bars`, `Fork`, `Doc`, `Stamp`, `Source`, `Lines`, `Row` and more,
  with one spacing scale (`GAP`, `STACK`, `FS`).
- **Viz deck** — every part in use, at `/deck?deck=viz`.
- **Reusable viewer** (`Viewer.tsx`) — any number of decks, `?deck=&i=&theme=&raw=1`, ↑ ↓ theme cycling
  without a reload, `id="slide"` on the frame for capture tools.
- **Claude Code skill** (`skill/lean-deck`) — script → deck → 1920×1080 check → standalone HTML → `<<N>>` cues,
  with `capture.js`, `export_html.py`, `insert_markers.py` and `check_markers.py` (English `## Script` / `(demo …)`
  and Korean `## 본문` / `(시연 …)` scripts both work).
- `npm run check:layout` — every slide of both decks in every theme at 1920×1080: text outside the frame and orphaned last words (Chrome, no extra dependencies).
- `resolveTheme(id)` with a safe fallback; `Slide` / `Deck` types exported from `kit.tsx`.
- Release pipeline: CI on every push and pull request, tag-driven GitHub Releases, `npm run check`.

### Changed
- Gallery page redesigned around the idea: three layers, a live semantic-token switcher, the viz parts, then the themes.
- README rewritten with new renders.
- Demo deck copy tightened so no line ends with a single orphaned word in any theme.

## [1.0.0] — 2026-08-25

### Added
- 17 design-language themes and the `Theme` token object.
- Slide kit: `Statement`, `Base`, `Head`, `Tail`, `Cols`, `Flow`, `Checklist`, `Compare`, `Banner`, `BigStat`, `Card`.
- Typesetting rules: two alignment lines, depth means something, emphasis is not a border, Korean line breaking.
- Theme gallery and a keyboard-driven deck viewer with a bare 1920×1080 `raw` frame.

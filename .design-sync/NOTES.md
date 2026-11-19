# design-sync notes — lean-deck

Target project: `lean-deck` (id in `config.json`). First sync 2026-11-19: 31 components, all with authored previews graded good.

## How this repo is built for the sync
- lean-deck ships as a Next app with **no library build**. `.design-sync/build-lib.sh` (= `cfg.buildCmd`) compiles `src/lean-deck/{kit,viz,themes,tokens}` with `tsc` into `dist/` (gitignored), writes `dist/index.{js,d.ts}`, and a **self-contained `dist/package.json`** (name/version/types). The repo's own `package.json` was deliberately left untouched (it had uncommitted next-16 changes at sync time).
- Because `dist/` is its own package, the converter's package dir is `dist/`: package-relative config paths start with `../` (`srcDir`, `tsconfig`, `docsMap`). `cssEntry` must sit inside `dist/`, so the build script copies `.design-sync/fonts.css` → `dist/fonts.css`.
- Run: `.design-sync/build-lib.sh` then `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./dist/index.js --out ./ds-bundle [--remote .design-sync/.cache/remote-sync.json]`.
- `Viewer.tsx`, `DemoDeck.tsx` and `VizDeck.tsx` are intentionally not in the bundle (app viewer + demo data). If new kit/viz files are added, add them to `build-lib.sh`.
- Fonts: the app loads Inter / JetBrains Mono / Noto Sans KR from Google Fonts in `src/app/layout.tsx`; `fonts.css` mirrors that `@import`. Other theme families (Pretendard, SF Pro, Segoe UI, Roboto, Archivo, Geneva…) are system/fallback fonts in the source too. Not shipped.

## Previews
- There is no provider: every component takes a theme object `t` (`THEMES.<id>`). Previews render a real-size frame (`<div style={{width:1920,height:1080}}><Base t>…`), since components are slide-scale.
- `.design-sync/previews/_fit.ts` (imported by every preview) shrinks each story's frame with CSS `zoom` to fit its card cell. It only lives in the preview cards, never in `_ds_bundle.js`. **It is not part of any grade key**: if you edit it, re-run capture with `--force`-style regrading for all components.
- All cards use `cardMode: column` (grid cells are too narrow for slide-scale frames; `[GRID_OVERFLOW]` fired on every grid card).
- Groups come from regroup stubs `.design-sync/groups/<Group>.md` via `docsMap` (Layout, Typography, Blocks, Viz, Icons).

## Findings in the source (not fixed, reported to user)
- `Accent` is `inline-block`, so when the accent text wraps in `Head`/`Statement`, the trailing `post` (e.g. ".") drops onto its own line. The `DemoDeck` "Cover" slide (`accent="seventeen design languages"`, size 68) shows this. `WJ` does not fix it; a shorter accent does. Documented in `conventions.md`.
- Component `.d.ts` reference `Theme` without defining it (it is a type in `themes.ts`); the design agent is told in `conventions.md` to pass `THEMES.<id>`.

## Known render warns
- `[RENDER_THIN]` on `Glyph` — the cells are SVG-only (no text); screenshot verified fine.

## Re-sync risks
- `_fit.ts` is outside the grade key (see above); a change to it won't re-grade anything automatically.
- `build-lib.sh` hardcodes the four source files; a new source file is silently missing from the bundle.
- `conventions.md` hardcodes the 17 theme ids, spacing/type scale values and 24 glyph names. Re-validate against `Object.keys(window.LeanDeck.THEMES)` and `viz.tsx` when themes or glyphs change.
- `fonts.css` duplicates the Google Fonts URL from `src/app/layout.tsx`; update both together.
- Build assumed Node 26 + network access for `npx tsc` and the Google Fonts `@import` at render time.

# lean-deck

**Say it once. Wear any design language.**

A React slide kit where slides speak in **semantic tokens** and themes answer in values —
seventeen design languages, infographic parts for explaining, and a pipeline that turns a talk
script into a deck, a standalone HTML file and slide cues.

![One slide rendered in glass, paper and neubrutalism](docs/hero.png)

[![release](https://img.shields.io/github/v/release/beyondworks/lean-deck?label=release)](https://github.com/beyondworks/lean-deck/releases)
[![ci](https://github.com/beyondworks/lean-deck/actions/workflows/ci.yml/badge.svg)](https://github.com/beyondworks/lean-deck/actions/workflows/ci.yml)
![license](https://img.shields.io/badge/license-MIT-black)

---

## The idea

A deck is two things that keep getting tangled: *what you say* and *how it looks*.
lean-deck puts a third layer between them — a small vocabulary of **meanings** — and lets a slide
see only that.

![Three layers: deck, semantic tokens, theme](docs/concept.png)

| Layer | Answers | File |
|---|---|---|
| **Deck** | what you say | `YourDeck.tsx` — a plain array of slides |
| **Semantic tokens** | what things mean | `tokens.ts` — `surface.raised`, `text.soft`, `accent.marker` … |
| **Theme** | how it looks | `themes.ts` — seventeen design languages |

A slide asks for `surface.raised`, never `#16161b`. Change the theme id and every answer changes at once;
the deck file is never opened.

---

## Semantic tokens

![Pick a theme; the token names stay and the values move](docs/tokens.png)

| Token | Meaning |
|---|---|
| `surface.page` | the slide background |
| `surface.raised` | an object placed on the surface — a card |
| `surface.inset` | something held inside — a quote, a prior state, a chip |
| `surface.badge` · `surface.well` | the eyebrow pill · the square behind an icon |
| `text.strong` · `text.soft` · `text.mute` | three levels of ink |
| `accent.primary` · `accent.secondary` | the theme's two signal colours |
| `accent.title` · `accent.marker` · `accent.icon` | the accented phrase in a title · bullet and caption bars · icon strokes |
| `status.warn` | a problem, a missing thing |
| `ambient.grid` · `ambient.orbs` | optional background texture |
| `font.body` · `font.mono` | type families |

Write a new theme by meaning — it plugs straight into `THEMES`:

```ts
import { defineTheme } from '@/lean-deck/tokens';

export const ink = defineTheme(
  { id: 'ink', name: 'Ink', mood: 'Newsprint, one red' },
  {
    font:    { body: "'Inter', sans-serif", mono: 'monospace' },
    surface: {
      page:   { background: '#f6f3ea' },
      raised: { background: '#fffdf7', borderRadius: 6 },
      inset:  { background: '#ece7da', borderRadius: 6 },
      badge:  { background: '#111', color: '#fff', borderRadius: 999, padding: '7px 16px' },
      well:   { background: '#ece7da', borderRadius: 8 },
    },
    text:    { strong: '#111', soft: '#111a', mute: '#1117' },
    accent:  { primary: '#c8102e', secondary: '#111', title: { color: '#c8102e' }, marker: '#c8102e', icon: '#c8102e' },
    status:  { warn: { bg: '#fff', border: 'none', color: '#c8102e' } },
    ambient: { grid: null, orbs: null },
  },
);
```

Anything that is not a React slide — a page shell, an exported HTML wrapper, a chart — reads the same
theme through CSS custom properties:

```ts
import { toCssVars } from '@/lean-deck/tokens';
<div style={toCssVars(THEMES.paper)}>…</div>   // --ld-surface-page, --ld-text-soft, --ld-accent-primary …
```

`npm run check:tokens` proves that every built-in theme survives the round trip through the semantic layer.

---

## Viz — parts for explaining, not decorating

Slides next to a speaker should not repeat the speaker. `viz.tsx` draws the thing instead:
contrast as two panels, flow as arrowed steps, amount as bars, a decision as a fork, a file as a document mock.

![viz parts](docs/viz.png)

| Part | Draws |
|---|---|
| `Myth` + `Stamp` | a belief to test, with a verdict |
| `Panel` · `Chip` · `Tile` | a titled card · an item it holds (`dim` = missing, `warn` = a problem) · an object in a space |
| `Arrow` · `StepRow` | a transformation · steps with arrows |
| `Bars` | amounts, last row highlighted |
| `Fork` | one question, two branches |
| `Doc` · `Lines` | a file mock · placeholder text lines |
| `Source` · `Row` | one source line · a horizontal layout with ratios |

One spacing scale keeps every slide balanced — `GAP 32` between cards, `STACK 22` inside a card,
text at `19 / 25 / 29 / 36`. `npm run check:layout` renders both demo decks in every theme at 1920×1080
and fails on text outside the frame or a last line holding a single orphaned word (340 frames, all clean for v2.0.0).

| | |
|---|---|
| ![](docs/viz/1-darkmorphism.png) | ![](docs/viz/2-paper.png) |
| ![](docs/viz/4-neubrutalism.png) | ![](docs/viz/5-apple.png) |
| ![](docs/viz/6-macintosh.png) | ![](docs/viz/3-claymorphism.png) |

---

## Seventeen design languages

![theme gallery](docs/gallery.png)

Identical deck source; only the theme id changed.

| | |
|---|---|
| **Glass** — deep navy, frosted panes, mint glow | **Paper** — ink monochrome on a white page |
| ![](docs/themes/glass.png) | ![](docs/themes/paper.png) |
| **Neumorphism** — light grey, soft extrusion | **Darkmorphism** — dark grey extrusion, teal point |
| ![](docs/themes/neumorphism.png) | ![](docs/themes/darkmorphism.png) |
| **Macintosh** — System 6/7, hard drop shadow | **Claymorphism** — pastel, puffy clay |
| ![](docs/themes/macintosh.png) | ![](docs/themes/claymorphism.png) |
| **Flat** — no depth, colour blocks | **Material** — elevation language |
| ![](docs/themes/flat.png) | ![](docs/themes/material.png) |
| **Fluent** — acrylic, Windows tone | **Apple** — system grey, quiet hierarchy |
| ![](docs/themes/fluent.png) | ![](docs/themes/apple.png) |
| **Minimalism** — hairlines and space | **Darkmode** — true dark, low glare |
| ![](docs/themes/minimalism.png) | ![](docs/themes/darkmode.png) |
| **Card** — everything is a raised card | **Gradient** — colour that moves across the page |
| ![](docs/themes/card.png) | ![](docs/themes/gradient.png) |
| **Typographic** — type does all the work | **Brutalism** — raw structure, visible seams |
| ![](docs/themes/typographic.png) | ![](docs/themes/brutalism.png) |
| **Neubrutalism** — thick borders, hard offset shadow | |
| ![](docs/themes/neubrutalism.png) | |

---

## Run it

```bash
git clone https://github.com/beyondworks/lean-deck.git
cd lean-deck
npm install
npm run dev
```

| URL | What |
|---|---|
| <http://localhost:3000> | the idea, live tokens, viz parts, theme gallery |
| `/deck?deck=demo&theme=glass` | the kit deck |
| `/deck?deck=viz&theme=paper` | the viz deck |
| `…&raw=1` | a bare 1920×1080 frame — screenshots, video, HTML export |
| `…&print=1` | every slide stacked, one page each — what the PDF export prints |

### PDF

With the dev server running, one command prints a deck straight to PDF — one slide per 1920×1080 page,
text kept as text (selectable, sharp at any zoom), no screenshots in between.

```bash
npm run export:pdf -- demo                       # → demo.pdf
npm run export:pdf -- viz viz-paper.pdf --theme paper
```

Options: `--theme <id>` · `--base http://localhost:3000` · `--route /deck`. Needs Google Chrome (`CHROME_BIN` to override).
Gradient-filled accent text prints in the solid accent colour, because PDF viewers such as Preview draw it as a box.

**Keys** — `←` `→` slides · `↑` `↓` theme, same slide · `Home` `End` · `\` fullscreen.
Modifier combinations pass through, so `Cmd+F` and `Cmd+P` still work.

---

## Writing a deck

A deck is an array; each slide is a function of the theme.

```tsx
import { Base, Statement, Head, Tail, type Slide } from '@/lean-deck/kit';
import { Row, Panel, Chip, Arrow } from '@/lean-deck/viz';

export const slides: Slide[] = [
  {
    title: 'Cover',
    render: (t) => (
      <Statement t={t} eyebrow="Q3 review" pre="We shipped" accent="four things" post=" that mattered." />
    ),
  },
  {
    title: 'Before and after',
    cue: 'Search used to time out.',            // the spoken line — anchors the <<N>> cue in a script
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="Search" pre="From timeouts to" accent="40 ms" post="." />
        <Row cols="minmax(0,1fr) auto minmax(0,1fr)">
          <Panel t={t} icon="x" label="Before"><Chip t={t} warn>12 s at p95</Chip></Panel>
          <Arrow t={t} label="new index" />
          <Panel t={t} icon="check" label="After"><Chip t={t} icon="bolt">40 ms at p95</Chip></Panel>
        </Row>
        <Tail t={t}>No new infrastructure.</Tail>
      </Base>
    ),
  },
];
```

Show it with the viewer:

```tsx
import { DeckViewer } from '@/lean-deck/Viewer';
<DeckViewer decks={{ q3: slides }} defaultTheme="paper" />   // /your-route?deck=q3&theme=glass
```

### Kit components (`kit.tsx`)

`Statement` · `Base` · `Head` · `Tail` · `Cols` · `Flow` · `Checklist` · `Compare` · `Banner` · `BigStat` · `Card` · `Tag` `Accent` `Warn`.
Constants: `CARD_PAD` (card inset to text) and `MARK` (a marker to the words after it).

![components](docs/components/slide-7.png)

### Three rules the kit enforces

**Two lines, and only two.** The badge border, the title and every card's left border sit on the first.
Card text, bullet dots, quote bars and caption bars sit on the second, one `CARD_PAD` in; words after a
marker start one `MARK` later. A marker never nudges text off its line.

![alignment](docs/components/slide-4.png)

**Depth means something.** Raised is an object on the surface; inset is a container holding something.
Depth is never used for emphasis.

**Emphasis is not a border.** Emphasis comes from wording, from a label's accent colour, and from the
accented phrase in the title.

### Korean typography

`keep-all` and `line-break: strict` are the default on every text surface, one type scale serves Hangul and
Latin, and a word joiner (`U+2060`, exported as `WJ`) keeps a particle attached to the accented phrase.

```tsx
<Head t={t} eyebrow="예시" pre="셋 다 기능이 아니라" accent="상태" post={`${WJ}입니다.`} />
```

![korean typography](docs/components/slide-8.png)

---

## Claude Code skill — script → deck → HTML → cues

`skill/lean-deck` teaches Claude Code the whole workflow: read a talk script, plan slides in speaking order,
draw with the viz parts, check every slide at 1920×1080, export standalone HTML, and write `<<N>>` cues
back into the script.

```bash
cp -r skill/lean-deck ~/.claude/skills/        # or unzip the skill asset from a release
```

| Script | Does |
|---|---|
| `capture.js` | runs in the viewer page, collects each rendered slide |
| `export_html.py` | receives the captures and writes one self-contained HTML deck (← → · click · F · `#N`) |
| `insert_markers.py` | puts `<<N>>` and `(demo …)` lines before anchor sentences — refuses to run twice |
| `check_markers.py` | verifies cues run 1..N and sums the demo minutes |

Scripts keep spoken text under `## Script` (or `## 본문`); demo lines may be `(demo …)` or `(시연 …)`.

---

## Releases

Versions follow [SemVer](https://semver.org/); changes are listed in [CHANGELOG.md](CHANGELOG.md).

1. Bump `version` in `package.json` and add a matching `## [x.y.z]` section to `CHANGELOG.md`.
2. Merge to `main` — CI runs `npm run check`, builds the site and packages the skill.
3. Push the tag: `git tag vX.Y.Z && git push origin vX.Y.Z`.

The release workflow refuses a tag that does not match `package.json`, then publishes a GitHub Release
with the changelog section as notes and `lean-deck-skill-vX.Y.Z.zip` attached.
Run it by hand from the Actions tab for a dry run that builds everything without publishing.

---

## What is in this repo

```
src/lean-deck/themes.ts     17 themes · Theme type · resolveTheme
src/lean-deck/tokens.ts     semantic layer · toSemantic · defineTheme · toCssVars
src/lean-deck/kit.tsx       frame, title and card components · Slide / Deck types
src/lean-deck/viz.tsx       infographic parts · spacing scale
src/lean-deck/Viewer.tsx    reusable deck viewer
src/lean-deck/DemoDeck.tsx  the kit deck
src/lean-deck/VizDeck.tsx   the viz deck
src/app/                    the site: overview page and /deck
skill/lean-deck/            Claude Code skill and its scripts
scripts/                    token check · release notes · skill packaging
```

Next.js is only the harness. `themes.ts`, `tokens.ts`, `kit.tsx` and `viz.tsx` depend on React alone —
drop them into Vite, Remix, Astro or a Remotion composition unchanged.

## License

MIT — see [LICENSE](LICENSE).

---
name: lean-deck
description: Build presentation and lecture decks with the lean-deck React kit — slides written against semantic tokens so any of 17 design languages can be swapped in by id, infographic parts (viz) for explaining instead of decorating, a 1920×1080 layout check, standalone HTML export, and <<N>> slide cues written back into the talk script. Use for "make a deck from this script", "lecture slides", "switch the deck theme", "export the slides to HTML", "mark slide cues in the script".
user-invocable: true
argument-hint: "[script.md or topic]"
license: MIT
---

# lean-deck — script → deck → HTML → cues

Repository: https://github.com/beyondworks/lean-deck

Slides never name a colour, a shadow or a font. They ask for **semantic tokens**
(`surface.raised`, `text.soft`, `accent.marker` …) and a theme answers with values.
Change the theme id and the whole deck changes design language; the deck file is never touched.

## Files

```
src/lean-deck/themes.ts    17 themes · Theme type · resolveTheme(id)
src/lean-deck/tokens.ts    semantic layer · toSemantic · defineTheme · toCssVars
src/lean-deck/kit.tsx      frame and text components · Slide / Deck types · CARD_PAD · MARK
src/lean-deck/viz.tsx      infographic parts · spacing scale (GAP · STACK · FS)
src/lean-deck/Viewer.tsx   ?deck=&i=&theme=&raw=1 viewer — keys, theme cycling, bare frame
src/lean-deck/<Name>Deck.tsx   one deck = one file = one Slide[] array
skill/lean-deck/scripts/   capture.js · export_html.py · insert_markers.py · check_markers.py
```

Keep private decks (lectures, client work) **outside** the public repo. Symlink the folder into
`src/lean-deck/<key>` and list the symlink and its route in `.git/info/exclude`.

## Semantic tokens

| Token | Meaning |
|---|---|
| `surface.page` | slide background |
| `surface.raised` | an object placed on the surface (card) |
| `surface.inset` | something held inside (quote, prior state, chip) |
| `surface.badge` · `surface.well` | eyebrow pill · icon well |
| `text.strong` · `text.soft` · `text.mute` | three levels of ink |
| `accent.primary` · `accent.secondary` | the theme's two signal colours |
| `accent.title` · `accent.marker` · `accent.icon` | accented title phrase · bullet/caption bars · icon stroke |
| `status.warn` | a problem or a missing thing |
| `ambient.grid` · `ambient.orbs` | optional background texture |
| `font.body` · `font.mono` | type families |

- A new theme is `defineTheme({ id, name, mood }, tokens)` added to `THEMES` and `THEME_ORDER`. No component changes.
- Non-React surfaces (page shells, HTML wrappers, charts) use `toCssVars(theme)` → `--ld-*` custom properties.
- `npm run check:tokens` proves every theme round-trips through the semantic layer.

## Typesetting rules (enforced by kit.tsx — do not hand-pad slides)

1. **Two lines only.** The badge *border*, the title and every card's left border sit on the alignment line.
   Text inside a card, bullet dots, quote bars and caption bars sit on the card text line (`+ CARD_PAD`);
   the words after a dot or bar start one `MARK` later. Markers never push text off its line.
2. **Depth means something.** Raised = an object on the surface. Inset = something held. Never use depth for emphasis.
3. **Emphasis is not a border.** Cards on one layer look the same. Distinguish with label colour, weight or wording.
4. **Korean.** `Base` sets `word-break: keep-all` and `line-break: strict`. Join a particle to the accented
   phrase with U+2060 (`WJ`) so it never wraps alone: ``post={`${WJ}입니다.`}``

## Viz parts (viz.tsx)

| Part | Use it for |
|---|---|
| `Myth` | a belief to test, with a verdict stamp (`o` `x` `tri` `q`) |
| `Panel` | card with an icon + label header; holds `Chip` `Tile` `Doc` `Lines` |
| `Chip` | an item held in a card; `dim` = missing, `warn` = a problem |
| `Tile` | an object placed in a space |
| `Arrow` · `StepRow` | transformation · steps with arrows (keep to four) |
| `Bars` | amounts; the last row is highlighted |
| `Fork` | one question, two branches (fixed width 1440) |
| `Doc` | a file mock — filename row + key/value rows |
| `Stamp` · `Source` | verdict · one source line |
| `Row` | horizontal layout with `cols` ratios |

Spacing — use only these: `GAP 32` between cards · `STACK 22` inside a card ·
text `FS.label 19 / body 25 / item 29 / key 36`. A content block fills roughly half the frame (480–600 px).
A visual used once lives inside its deck file; move it into viz.tsx the second time it is needed.

## Procedure

1. **Read the whole script** — header, demo table and body. Note where screen demos happen.
2. **Plan slides in speaking order.** One slide = one thing that is hard to say with words alone
   (a contrast, a structure, an amount, a flow, a verdict). No fixed "cover → agenda → …" skeleton.
3. **Draw, don't transcribe.** Never put the spoken sentence on screen. Contrast → two panels,
   flow → steps, amount → bars, decision → fork, file → document mock.
4. **Give each slide a `cue`** — a phrase that appears in the paragraph where the slide belongs.
   It anchors the `<<N>>` marker later. It does not have to be the paragraph's first sentence.
5. **Demos.** Put an explaining slide before a demo when it helps; vary how demos are introduced —
   don't repeat the same lead-in paragraph shape more than a couple of times. No slide during the recording itself.
6. **Verify every slide at 1920×1080** — see below. Re-check every slide you change.
7. **Export HTML**, then **write cues into the script**, then **check** them.

## Verify (never skip)

Open `/<route>?deck=<key>&i=<n>&raw=1&theme=<id>` at 1920×1080 and check each slide:
nothing outside the frame, and no text node whose last line holds a single short word.

| You see | Fix |
|---|---|
| content fills only the top third | add a small visual (lines, tiles, day cells) or set `minHeight` |
| a card with a large empty bottom | `marginTop: 'auto'` for the last element, or `justifyContent: 'center'` |
| a title or chip wraps and leaves one word | **shorten the wording first**; then widen `cols` |
| five or more steps squeeze the cards | merge steps down to four |
| an element disappears into the background | use `status.warn` colour or `surface.inset` |
| Korean label tracking looks wide | use `font.body`, not the monospace font |

Headless Chrome is slow against a dev server — build and `next start`, or check in a live browser tab.

## Export HTML

```bash
python3 skill/lean-deck/scripts/export_html.py --out ./out --origin http://localhost:3000 \
  --deck "demo=demo-deck|Demo deck"          # run in the background; it waits for captures
```

Open `/deck?deck=demo&i=0&raw=1` and run `capture.js` in the page (set `PORT` to the printed port).
The exporter writes one self-contained HTML file per deck (← → · click · F fullscreen · `#N` deep link)
and exits when every registered deck has arrived. **Printed slide count must equal the deck length.**

## Cues in the script

Scripts keep spoken text under a body heading — `## Script` (or `## 본문`).

- `<<N>>` sits on its own line right before the sentence where slide N appears.
- `(demo N: what you type → what appears, about N min)` sits on its own line where the demo starts
  (backticks allowed). `(시연 …)` is accepted too.

```bash
python3 skill/lean-deck/scripts/insert_markers.py spec.json   # anchors → cues, refuses to run twice
python3 skill/lean-deck/scripts/check_markers.py talk.md 12   # 1..12 in order, demo minutes summed
```

When the script changes after cues are in, re-check that every cue phrase still appears in its paragraph.

## Writing principles for talk decks

- The slide explains what the speaker says; it is not a caption track.
- Balance first: spacing, margins and layout weight matter more than adding content.
- Zero overflow. When something does not fit, cut words before shrinking type.
- A deck is a function of the theme: never hardcode a value that has a token.

# lean-deck conventions (read first)

lean-deck is a **slide kit**, not an app UI kit. Every component is drawn at slide scale for a **1920×1080 frame** (titles 46–72px, body 21–25px). Build slides, decks and slide-like explainers with it, not dashboards or forms.

## Theme is a prop, not a provider

There is no provider and no CSS class vocabulary. Every component except `Glyph` and `Row` takes a required `t` prop, a theme object. Pass the **same** theme to every component on a slide:

```jsx
const { Base, Head, Cols, Tail, THEMES, resolveTheme } = window.LeanDeck;
const t = THEMES.darkmorphism;          // or resolveTheme('paper')
```

Theme ids (`THEME_ORDER`): glass, paper, neumorphism, darkmorphism, macintosh, claymorphism, flat, material, fluent, apple, minimalism, darkmode, card, gradient, typographic, brutalism, neubrutalism. `resolveTheme(id)` falls back to darkmorphism for an unknown id.

Without `t`, components throw. Without `Base`, text renders in the theme's ink colour on your page background (often white on white).

## Slide structure

1. A sized frame: `<div style={{ width: 1920, height: 1080 }}>`. Scale the whole frame with `transform: scale()` to fit a viewport, never by shrinking font sizes.
2. `Base` fills the frame with the theme's page background, orbs, grid, font and ink. Use `center` for cover and closing slides, and `wide` (1800px content) for 3+ columns, `Compare` or `StepRow`.
3. Inside: `Head` (eyebrow tag + action title) → one content block → optional `Tail` (closing caption) or `Source`.
4. Full-bleed sentence slides use `Statement`, which already includes its own `Base`. Don't wrap it in another `Base`.

```jsx
<div style={{ width: 1920, height: 1080 }}>
  <Base t={t}>
    <Head t={t} eyebrow="The idea" pre="Content and" accent="design language" post=" are separate files." />
    <Cols t={t} items={[
      { idx: 'DECK', title: 'What you say', rows: ['A plain array of slides'] },
      { idx: 'THEME', title: 'How it looks', rows: ['Swapped by id at render time'] },
    ]} />
    <Tail t={t}>Rewriting the deck for a new look is the thing this removes.</Tail>
  </Base>
</div>
```

## Styling rules

- **Never hardcode colours or surfaces.** Read them from the theme: `t.ink.strong | soft | mute`, `t.accent`, `t.accent2`, `t.bar`, `t.card` (raised surface style), `t.cardHi` (inset surface style), `t.iconBox`, `t.iconColor`, `t.warn.{bg,border,color}`, `t.font`, `t.mono`. For your own layout glue, spread the style objects: `style={{ ...t.card }}`.
- **Spacing scale** (exports): `GAP` 32 between cards, `STACK` 22 inside a card, `CARD_PAD` 42 card padding, `MARK` 22 marker-to-text. **Type scale** `FS`: label 19, body 25, item 29, key 36. Use `Txt` with `FS.*` for free text.
- **Depth carries meaning:** raised `Card` = an object; `Card inset` = something held (a quote, a prior state). Never use depth or borders for emphasis. Emphasise with `Accent`, label colour or wording.
- **Title emphasis:** `Head`/`Statement` take `pre` + `accent` + `post`. Keep `accent` short enough for one line. It is an inline-block, so a wrapping accent pushes `post` (e.g. the final ".") onto its own line.
- **Korean:** text uses `word-break: keep-all`. To keep a trailing particle with the accent, start `post` with `WJ` (word joiner): ``post={`${WJ} 않습니다.`}``.
- Layout helper: `Row` (equal columns, or `cols="minmax(0,1.6fr) minmax(0,1fr)"`). `Fork` is fixed at 1440px wide, so give it a `Base center`.

## Where the truth lives

Each component's `components/<group>/<Name>/<Name>.prompt.md` has its props and verified examples; `<Name>.d.ts` is the API. Groups: layout (Base, Row, Card, Panel), typography (Head, Tail, Statement, Tag, Accent, Warn, Label, Txt, Source), blocks (Cols, Flow, Checklist, Compare, Banner, BigStat), viz (Bars, Fork, Myth, Doc, Tile, StepRow, Lines, Stamp, Chip, Arrow), icons (Glyph, Icon; `GlyphName` lists the 24 icon names). `styles.css` only loads the webfonts (Inter, JetBrains Mono, Noto Sans KR). All visual styling comes from the theme object.

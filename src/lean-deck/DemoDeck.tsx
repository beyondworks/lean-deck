'use client';
import React from 'react';
import type { Theme } from './themes';
import { Base, Statement, Head, Tail, Cols, Flow, Checklist, Compare, Banner, BigStat, Card, bleed } from './kit';

export type Slide = { title: string; render: (t: Theme) => React.JSX.Element };

/** 세 칸짜리 형식 카드 — Card 를 직접 조립하는 예 */
function Triptych({ t, cells }: { t: Theme; cells: [string, string][] }) {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'stretch', ...bleed(42) }}>
      {cells.map(([label, body]) => (
        <Card key={label} t={t} style={{ flex: 1 }}>
          <div style={{ fontFamily: t.mono, fontSize: 17, letterSpacing: '.1em', color: t.ink.mute, marginBottom: 20 }}>{label}</div>
          <div style={{ fontSize: 32, fontWeight: 600, color: t.ink.strong, lineHeight: 1.4 }}>{body}</div>
        </Card>
      ))}
    </div>
  );
}

export const demoSlides: Slide[] = [
  {
    title: 'Cover',
    render: (t) => (
      <Statement t={t} eyebrow="lean-deck"
        pre="One slide API," accent="seventeen design languages" post="." size={68}
        sub="Slides never hardcode a colour or a surface. They read theme tokens, so swapping one id restyles the whole deck."
        foot="MIT · React + TypeScript · no runtime dependencies" />
    ),
  },
  {
    title: 'The idea',
    render: (t) => (
      <Base t={t}>
        <Head t={t} eyebrow="The idea" pre="Content and" accent="design language" post=" are separate files." />
        <Cols t={t} items={[
          { idx: 'DECK', title: 'What you say', rows: ['A plain array of slides', 'Written once, never restyled'] },
          { idx: 'THEME', title: 'How it looks', rows: ['Surface, ink, accent, type', 'Swapped by id at render time'] },
        ]} />
        <Tail t={t}>Rewriting the deck for a new look is the thing this removes.</Tail>
      </Base>
    ),
  },
  {
    title: 'Themes',
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="Seventeen themes" pre="Every card carries its own" accent="material" post="." size={48} />
        <Cols t={t} items={[
          { idx: 'SOFT', title: 'Glass · Neumorphism · Darkmorphism · Claymorphism', rows: ['Blur, extrusion, soft shadow'] },
          { idx: 'FLAT', title: 'Flat · Material · Fluent · Apple · Minimalism', rows: ['Elevation and restraint'] },
          { idx: 'LOUD', title: 'Brutalism · Neubrutalism · Macintosh · Typographic', rows: ['Hard edges, no apology'] },
        ]} />
        <Tail t={t}>Also: Paper, Darkmode, Card, Gradient.</Tail>
      </Base>
    ),
  },
  {
    title: 'Tokens',
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="What a theme holds" pre="A token for every" accent="decision a slide can make" post="." size={48} />
        <Flow t={t} steps={[
          { n: '1', title: 'page', code: 'background', desc: 'The ground the slide sits on' },
          { n: '2', title: 'card / cardHi', code: 'raised · inset', desc: 'Surface material — the theme identity' },
          { n: '3', title: 'ink', code: 'strong · soft · mute', desc: 'Three levels of text weight' },
          { n: '4', title: 'accent · bar', code: 'colour · gradient', desc: 'Highlight and rules' },
        ]} />
      </Base>
    ),
  },
  {
    title: 'Alignment',
    render: (t) => (
      <Base t={t}>
        <Head t={t} eyebrow="One alignment line" pre="Tag, title and card text all start at" accent="the same x" post="." size={46} />
        <Banner t={t}>Quotes and captions begin at the accent bar, not after it.</Banner>
        <Tail t={t}>Cards bleed left by their own padding so their text lands on the line.</Tail>
      </Base>
    ),
  },
  {
    title: 'Depth',
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="Depth means something" pre="Raised is a thing;" accent="inset is a container" post="." size={48} />
        <Compare t={t} beforeLabel="Inset — held inside" afterLabel="Raised — placed on top" rows={[
          { label: 'Reads as', before: 'A quote, a prior state, a slot', after: 'An object of its own' },
          { label: 'Used for', before: 'The before column, icon wells', after: 'Every ordinary card' },
          { label: 'Never for', before: 'Emphasis', after: 'Emphasis' },
        ]} />
        <Tail t={t}>Emphasis is carried by wording and label colour, not by depth or borders.</Tail>
      </Base>
    ),
  },
  {
    title: 'Formula',
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="Composing by hand" pre="Card is the primitive;" accent="the rest is layout" post="." size={48} />
        <Triptych t={t} cells={[['SURFACE', 'Card'], ['RHYTHM', 'flex or grid'], ['BLEED', 'bleed(padding)']]} />
        <Tail t={t}>bleed() pulls a card group left so its text keeps the alignment line.</Tail>
      </Base>
    ),
  },
  {
    title: 'Components',
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="What ships" pre="Ten blocks cover" accent="most decks" post="." size={48} />
        <Checklist t={t} cols={2} items={[
          { title: 'Statement', desc: 'A full-bleed sentence — covers and turning points' },
          { title: 'Base + Head + Tail', desc: 'Eyebrow tag, action title, closing caption' },
          { title: 'Cols · Flow · Checklist', desc: 'Cards in a row, numbered steps, ticked list' },
          { title: 'Compare · Banner · BigStat', desc: 'Before/after rows, a pulled quote, one large number' },
        ]} />
      </Base>
    ),
  },
  {
    title: 'Korean typography',
    render: (t) => (
      <Base t={t}>
        <Head t={t} eyebrow="Korean typography" pre="한글은" accent="어절 단위" post="로 끊어집니다." size={48} />
        <Banner t={t}>keep-all 이 기본값이라 낱글자가 줄 끝에 홀로 남지 않습니다.</Banner>
        <Tail t={t}>Latin and Korean share one type scale, so mixed lines keep an even colour.</Tail>
      </Base>
    ),
  },
  {
    title: 'Count',
    render: (t) => (
      <Base t={t}>
        <BigStat t={t} value="17" label="DESIGN LANGUAGES"
          sub="One deck, rendered seventeen ways. Append your own token set and it becomes eighteen." />
      </Base>
    ),
  },
  {
    title: 'Closing',
    render: (t) => (
      <Statement t={t} eyebrow="Take it" pre="Write the deck once." accent="Decide the look later" post="." size={62}
        foot="github.com/beyondworks/lean-deck · MIT" />
    ),
  },
];

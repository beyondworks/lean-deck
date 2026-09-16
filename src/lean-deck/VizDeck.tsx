'use client';
import React from 'react';
import { Base, Statement, Head, Tail, type Slide } from './kit';
import { FS, WJ, Txt, Chip, Arrow, Panel, Myth, Bars, Fork, Doc, Tile, Row, Lines, StepRow, Source } from './viz';

/**
 * The viz deck — every infographic part in viz.tsx, used the way it is meant to be used.
 * Open it at /deck?deck=viz and press ↑ ↓ to watch the same explanation change design language.
 */
export const vizSlides: Slide[] = [
  {
    title: 'Cover',
    cue: 'Explain it, don’t decorate it.',
    render: (t) => (
      <Statement t={t} eyebrow="lean-deck · viz" pre="Explain it," accent="don’t decorate it" post="." size={72}
        sub="Infographic parts for slides that sit next to a speaker. Contrast, flow, size and structure — drawn, not written."
        foot="viz.tsx · 17 parts · one spacing scale" />
    ),
  },
  {
    title: 'How a theme reaches a slide',
    cue: 'A slide asks by meaning.',
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="Semantic tokens" pre="A slide asks by meaning," accent="a theme answers by value" post="." size={52} />
        <StepRow t={t} cols={[1, 1.15, 1, 1]} items={[
          { icon: 'doc', label: 'Deck', title: 'surface.raised' },
          { icon: 'layers', label: 'Semantic token', title: '“an object on the page”' },
          { icon: 'sparkle', label: 'Theme', title: '17 design languages' },
          { icon: 'window', label: 'Slide', title: 'rendered look' },
        ]} />
        <Tail t={t}>Swap the theme id and every answer changes at once. The deck file is never touched.</Tail>
      </Base>
    ),
  },
  {
    title: 'Two beliefs',
    cue: 'Two things people assume about restyling.',
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="Before we start" pre="Two things people" accent="assume" post=" about restyling." size={52} />
        <Row>
          <Myth t={t} idx="BELIEF 1" quote="To restyle, you edit every slide by hand." stamp="Not with tokens" stampKind="x" />
          <Myth t={t} idx="BELIEF 2" quote="Korean text needs its own layout." stamp="Only line breaking" stampKind="tri" />
        </Row>
      </Base>
    ),
  },
  {
    title: 'Hardcoded vs tokens',
    cue: 'What a slide knows about styling.',
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="Inside a slide" pre="The slide stops knowing" accent="what anything looks like" post="." size={50} />
        <Row cols="minmax(0,1fr) auto minmax(0,1fr)">
          <Panel t={t} icon="x" label="Hand-styled slide">
            <Chip t={t} warn style={{ width: '100%' }}>background: #06061a</Chip>
            <Chip t={t} warn style={{ width: '100%' }}>border: 1px solid #34d39955</Chip>
            <Chip t={t} warn style={{ width: '100%' }}>color: rgba(255,255,255,.6)</Chip>
          </Panel>
          <div style={{ display: 'flex', alignItems: 'center' }}><Arrow t={t} label="replace" /></div>
          <Panel t={t} icon="check" label="Token-driven slide">
            <Chip t={t} icon="layers" style={{ width: '100%' }}>surface.page</Chip>
            <Chip t={t} icon="layers" style={{ width: '100%' }}>surface.raised</Chip>
            <Chip t={t} icon="layers" style={{ width: '100%' }}>text.soft</Chip>
          </Panel>
        </Row>
      </Base>
    ),
  },
  {
    title: 'Files touched',
    cue: 'Count the files a new look touches.',
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="A 40-slide deck" pre="Files you touch to" accent="change the look" post="." size={52} />
        <Bars t={t} max={41} rows={[
          { label: 'Styled by hand', value: 40, text: '40' },
          { label: 'Shared stylesheet', value: 1, text: '1+' },
          { label: 'lean-deck', value: 0, text: '0' },
        ]} unit=" files" />
        <Source t={t}>lean-deck: the theme id is a URL parameter — ?theme=paper</Source>
      </Base>
    ),
  },
  {
    title: 'When to add a part',
    cue: 'Does this slide need a new visual?',
    render: (t) => (
      <Base t={t} center>
        <Fork t={t} q="Does this slide need a new visual?"
          left={{ tag: 'Used once', text: 'Build it inside the deck file', icon: 'doc' }}
          right={{ tag: 'Used twice', text: 'Move it into viz.tsx', icon: 'layers' }} />
      </Base>
    ),
  },
  {
    title: 'A theme, read by meaning',
    cue: 'This is what a theme looks like from a slide.',
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="tokens.ts" pre="A theme, read" accent="by meaning" post="." size={52} />
        <Row cols="minmax(0,1.2fr) minmax(0,1fr)">
          <Doc t={t} name={`toSemantic(THEMES.${t.id})`} rows={[
            { k: 'surface.raised', v: String(t.card.background ?? '—'), hi: true },
            { k: 'text.soft', v: t.ink.soft },
            { k: 'accent.primary', v: t.accent, hi: true },
            { k: 'font.body', v: t.font.split(',')[0].replace(/'/g, '') },
          ]} />
          <Panel t={t} icon="window" label="The slide sees only the names">
            <Lines t={t} n={7} hi={[1, 4]} />
            <Txt t={t} soft size={FS.body} style={{ marginTop: 'auto' }}>Values change per theme. Names never do.</Txt>
          </Panel>
        </Row>
      </Base>
    ),
  },
  {
    title: 'What ships',
    cue: 'What is in the box.',
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="In the box" pre="Six files," accent="one way of working" post="." size={52} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 24 }}>
          <Tile t={t} icon="layers" sub="17 design languages" height={180}>themes.ts</Tile>
          <Tile t={t} icon="sparkle" sub="meaning → value" height={180}>tokens.ts</Tile>
          <Tile t={t} icon="desk" sub="frame · title · cards" height={180}>kit.tsx</Tile>
          <Tile t={t} icon="gauge" sub="bars · fork · doc · steps" height={180}>viz.tsx</Tile>
          <Tile t={t} icon="window" sub="keys · raw frame" height={180}>Viewer.tsx</Tile>
          <Tile t={t} icon="bolt" sub="capture · HTML · markers" height={180}>skill/</Tile>
        </div>
      </Base>
    ),
  },
  {
    title: 'Korean line breaking',
    cue: 'Mixed Korean and Latin, same rhythm.',
    render: (t) => (
      <Base t={t} wide>
        <Head t={t} eyebrow="한국어 조판" pre="조사가 줄 끝에" accent="혼자 떨어지지" post={`${WJ} 않습니다.`} size={52} />
        <Row>
          <Panel t={t} icon="pen" label="keep-all · line-break: strict">
            <Txt t={t} size={FS.item} weight={700}>줄은 단어 단위로, 조사는 강조에 붙여서.</Txt>
          </Panel>
          <Panel t={t} icon="check" label="One type scale for both scripts">
            <Txt t={t} size={FS.item} weight={700}>Latin and Hangul share one scale.</Txt>
          </Panel>
        </Row>
      </Base>
    ),
  },
  {
    title: 'Closing',
    render: (t) => (
      <Statement t={t} eyebrow="lean-deck" pre="Say it once." accent="Wear any design language" post="." size={66}
        foot="github.com/beyondworks/lean-deck · MIT" />
    ),
  },
];


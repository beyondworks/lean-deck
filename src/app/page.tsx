'use client';
import { useState } from 'react';
import Link from 'next/link';
import { THEMES, THEME_ORDER } from '@/lean-deck/themes';
import { toCssVars } from '@/lean-deck/tokens';
import { demoSlides } from '@/lean-deck/DemoDeck';
import { vizSlides } from '@/lean-deck/VizDeck';
import type { Slide } from '@/lean-deck/kit';
import type { Theme } from '@/lean-deck/themes';

const INK = '#f4f4f6';
const SOFT = 'rgba(244,244,246,.62)';
const MUTE = 'rgba(244,244,246,.38)';
const LINE = 'rgba(255,255,255,.09)';
const MONO = 'ui-monospace, "JetBrains Mono", monospace';

/** A live 1920×1080 slide, scaled to `w` pixels wide. */
function Preview({ slide, theme, w, radius = 12, style }: { slide: Slide; theme: Theme; w: number; radius?: number; style?: React.CSSProperties }) {
  const s = w / 1920;
  return (
    <div style={{ width: w, height: Math.round(1080 * s), overflow: 'hidden', borderRadius: radius, border: `1px solid ${LINE}`, flexShrink: 0, ...style }}>
      <div style={{ width: 1920, height: 1080, transform: `scale(${s})`, transformOrigin: 'top left', pointerEvents: 'none' }}>
        {slide.render(theme)}
      </div>
    </div>
  );
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: MUTE, marginBottom: 14 }}>{children}</div>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1.2, margin: '0 0 14px' }}>{children}</h2>
);
const Lead = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 17, lineHeight: 1.75, color: SOFT, margin: '0 0 36px', maxWidth: 680 }}>{children}</p>
);
const Section = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <section id={id} style={{ padding: '96px 0', borderTop: `1px solid ${LINE}` }}>{children}</section>
);

const LAYERS = [
  { k: 'Deck', q: 'What you say', v: 'A plain array of slides. Written once, never restyled.', file: 'YourDeck.tsx' },
  { k: 'Semantic tokens', q: 'What things mean', v: 'surface.raised · text.soft · accent.marker — the only words a slide may use.', file: 'tokens.ts' },
  { k: 'Theme', q: 'How it looks', v: 'Seventeen design languages answer those names with values.', file: 'themes.ts' },
];

const HERO: [string, string][] = [
  ['glass', 'polygon(0 0, 38% 0, 30% 100%, 0 100%)'],
  ['paper', 'polygon(38% 0, 70% 0, 62% 100%, 30% 100%)'],
  ['neubrutalism', 'polygon(70% 0, 100% 0, 100% 100%, 62% 100%)'],
];

const SWATCH_KEYS = ['--ld-surface-page', '--ld-surface-raised', '--ld-surface-inset', '--ld-text-strong', '--ld-text-soft', '--ld-accent-primary', '--ld-accent-secondary', '--ld-warn-color'];

export default function Home() {
  const [pick, setPick] = useState('paper');
  const theme = THEMES[pick];
  const vars = toCssVars(theme);
  const tokenSlide = vizSlides[6];

  return (
    <main style={{ minHeight: '100vh', background: '#0b0b0d', color: INK, fontFamily: "'Inter','Noto Sans KR',sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 32px' }}>

        {/* hero */}
        <header style={{ padding: '96px 0 104px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.05fr)', gap: 56, alignItems: 'center' }}>
          <div>
            <Eyebrow>lean-deck · v2</Eyebrow>
            <h1 style={{ fontSize: 58, fontWeight: 800, letterSpacing: '-.035em', lineHeight: 1.04, margin: '0 0 22px' }}>
              Say it once.<br /><span style={{ color: SOFT }}>Wear any design language.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: SOFT, margin: '0 0 34px', maxWidth: 480 }}>
              A React slide kit where slides speak in semantic tokens and themes answer in values.
              Seventeen design languages, infographic parts for explaining, and a pipeline that turns
              a script into a deck, a standalone HTML file and slide cues.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/deck?deck=viz&theme=paper" style={btn(true)}>Open the viz deck</Link>
              <a href="https://github.com/beyondworks/lean-deck" style={btn(false)}>GitHub</a>
              <a href="#skill" style={btn(false)}>Claude Code skill</a>
            </div>
          </div>
          <figure style={{ margin: 0 }}>
            {/* one slide, three design languages — each band is the same render in a different theme */}
            <div style={{ position: 'relative', width: 580, height: Math.round(580 * 1080 / 1920), boxShadow: '0 40px 80px rgba(0,0,0,.5)', borderRadius: 14 }}>
              {HERO.map(([id, clip]) => (
                <div key={id} style={{ position: 'absolute', inset: 0, clipPath: clip }}>
                  <Preview slide={demoSlides[1]} theme={THEMES[id]} w={580} radius={14} />
                </div>
              ))}
            </div>
            <figcaption style={{ display: 'flex', justifyContent: 'space-between', width: 580, marginTop: 14, fontFamily: MONO, fontSize: 12, color: MUTE }}>
              {HERO.map(([id]) => <span key={id}>{id}</span>)}
            </figcaption>
          </figure>
        </header>

        {/* concept */}
        <Section id="concept">
          <Eyebrow>The idea</Eyebrow>
          <H2>Three layers, and a slide only sees the middle one.</H2>
          <Lead>
            A slide never names a colour, a shadow or a font. It asks for <code style={code}>surface.raised</code>,
            not <code style={code}>#16161b</code>. Change the theme and every answer changes at once — the deck file
            is never opened.
          </Lead>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 16 }}>
            {LAYERS.map((l, n) => (
              <div key={l.k} style={{ border: `1px solid ${LINE}`, borderRadius: 14, padding: 26, background: n === 1 ? 'rgba(255,255,255,.045)' : 'transparent' }}>
                <div style={{ fontFamily: MONO, fontSize: 12, color: MUTE, marginBottom: 18 }}>{String(n + 1).padStart(2, '0')} · {l.file}</div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{l.k}</div>
                <div style={{ fontSize: 14, color: n === 1 ? INK : SOFT, fontWeight: 600, marginBottom: 14 }}>{l.q}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.65, color: SOFT }}>{l.v}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* live tokens */}
        <Section id="tokens">
          <Eyebrow>Semantic tokens, live</Eyebrow>
          <H2>Pick a design language. The names stay; the values move.</H2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '8px 0 32px' }}>
            {THEME_ORDER.map((id) => (
              <button key={id} onClick={() => setPick(id)} style={{
                fontFamily: MONO, fontSize: 12.5, padding: '8px 13px', borderRadius: 999, cursor: 'pointer',
                border: `1px solid ${id === pick ? INK : LINE}`, background: id === pick ? INK : 'transparent', color: id === pick ? '#0b0b0d' : SOFT,
              }}>{id}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)', gap: 28, alignItems: 'start' }}>
            <Preview slide={tokenSlide} theme={theme} w={660} />
            <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, overflow: 'hidden' }}>
              {SWATCH_KEYS.map((k) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderBottom: `1px solid ${LINE}` }}>
                  <span style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, background: vars[k], border: `1px solid ${LINE}` }} />
                  <span style={{ fontFamily: MONO, fontSize: 12.5, color: INK, flex: 1 }}>{k.replace('--ld-', '').replace('-', '.')}</span>
                  <span style={{ fontFamily: MONO, fontSize: 11.5, color: MUTE, maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{vars[k]}</span>
                </div>
              ))}
              <div style={{ padding: '12px 16px', fontSize: 13, color: MUTE }}>{theme.name} — {theme.mood}</div>
            </div>
          </div>
        </Section>

        {/* viz */}
        <Section id="viz">
          <Eyebrow>viz.tsx</Eyebrow>
          <H2>Parts for explaining, not decorating.</H2>
          <Lead>
            Contrast as two panels, flow as arrowed steps, amount as bars, a decision as a fork, a file as a document mock.
            One spacing scale keeps every slide balanced — and nothing overflows its card.
          </Lead>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 18 }}>
            {[1, 4, 5, 2].map((n) => (
              <Link key={n} href={`/deck?deck=viz&i=${n}&theme=darkmorphism`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Preview slide={vizSlides[n]} theme={THEMES.darkmorphism} w={563} />
                <div style={{ fontSize: 13.5, color: SOFT, marginTop: 10 }}>{vizSlides[n].title}</div>
              </Link>
            ))}
          </div>
        </Section>

        {/* gallery */}
        <Section id="themes">
          <Eyebrow>{THEME_ORDER.length} design languages</Eyebrow>
          <H2>The same slide, every theme.</H2>
          <Lead>Every tile renders the identical slide source. Open one and press ↑ ↓ to swap the theme under the same content.</Lead>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px,1fr))', gap: 14 }}>
            {THEME_ORDER.map((id) => {
              const t = THEMES[id];
              return (
                <Link key={id} href={`/deck?theme=${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Preview slide={demoSlides[1]} theme={t} w={278} radius={10} />
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 9 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</span>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: MUTE }}>{id}</span>
                  </div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.5, color: MUTE, marginTop: 3 }}>{t.mood}</div>
                </Link>
              );
            })}
          </div>
        </Section>

        {/* use */}
        <Section id="skill">
          <Eyebrow>Use it</Eyebrow>
          <H2>Write a theme by meaning, or hand the whole job to Claude Code.</H2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 18, marginTop: 28 }}>
            <pre style={pre}>{`import { defineTheme } from '@/lean-deck/tokens';

export const ink = defineTheme(
  { id: 'ink', name: 'Ink', mood: 'Newsprint, one red' },
  {
    font:    { body: "'Inter', sans-serif", mono: 'monospace' },
    surface: { page: { background: '#f6f3ea' },
               raised: { background: '#fffdf7', borderRadius: 6 },
               inset:  { background: '#ece7da', borderRadius: 6 },
               badge:  { background: '#111', color: '#fff',
                         borderRadius: 999, padding: '7px 16px' },
               well:   { background: '#ece7da', borderRadius: 8 } },
    text:    { strong: '#111', soft: '#111a', mute: '#1117' },
    accent:  { primary: '#c8102e', secondary: '#111',
               title: { color: '#c8102e' },
               marker: '#c8102e', icon: '#c8102e' },
    status:  { warn: { bg: '#fff', border: 'none', color: '#c8102e' } },
    ambient: { grid: null, orbs: null },
  });`}</pre>
            <pre style={pre}>{`# Claude Code skill — script → deck → HTML → cues
cp -r skill/lean-deck ~/.claude/skills/

# then, in a session:
#   "make a deck from this script with lean-deck"

# every release ships the skill as a zip:
#   github.com/beyondworks/lean-deck/releases`}</pre>
          </div>
        </Section>

        <footer style={{ padding: '40px 0 64px', borderTop: `1px solid ${LINE}`, display: 'flex', justifyContent: 'space-between', fontSize: 13, color: MUTE }}>
          <span>lean-deck · MIT</span>
          <span>React + TypeScript · no runtime dependencies beyond React</span>
        </footer>
      </div>
    </main>
  );
}

const code: React.CSSProperties = { fontFamily: MONO, fontSize: '.92em', background: 'rgba(255,255,255,.07)', padding: '2px 6px', borderRadius: 5, color: INK };
const pre: React.CSSProperties = { margin: 0, padding: 22, borderRadius: 12, border: `1px solid ${LINE}`, background: 'rgba(255,255,255,.03)', fontFamily: MONO, fontSize: 12.5, lineHeight: 1.65, color: SOFT, overflowX: 'auto' };
function btn(primary: boolean): React.CSSProperties {
  return { fontSize: 14, fontWeight: 700, padding: '12px 18px', borderRadius: 10, textDecoration: 'none',
    background: primary ? INK : 'transparent', color: primary ? '#0b0b0d' : INK, border: `1px solid ${primary ? INK : LINE}` };
}

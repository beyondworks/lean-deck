'use client';
import React from 'react';
import type { Theme } from './themes';
import { Card, CARD_PAD, MARK } from './kit';

/**
 * lean-deck viz — infographic parts for explaining, not decorating.
 *
 * Principles
 *  - Don't put the narration on screen. Show the contrast, the flow, the size or the structure instead.
 *  - Spacing and balance come first. Nothing may overflow its card; no single word may wrap alone.
 *  - Typesetting follows kit.tsx — two alignment lines, depth means something
 *    (raised = an object, inset = something held), emphasis is never a border.
 *
 * Spacing scale — use only these
 *  GAP 32   between cards on the same layer
 *  STACK 22 between elements inside a card
 *  FS       label 19 · body 25 · item 29 · key 36
 *  A content block should fill roughly half the frame (480–600 px) so top and bottom margins balance.
 */
export const WJ = '⁠';
export const GAP = 32;
export const STACK = 22;
export const FS = { label: 19, body: 25, item: 29, key: 36 } as const;

const KO: React.CSSProperties = { wordBreak: 'keep-all', overflowWrap: 'normal' };

/* ---------- icons ---------- */
export type GlyphName = 'doc' | 'folder' | 'chat' | 'note' | 'check' | 'x' | 'question' | 'clock' | 'search' | 'layers'
  | 'cloud' | 'team' | 'warn' | 'book' | 'list' | 'gauge' | 'repeat' | 'moon' | 'sun' | 'pen' | 'sparkle' | 'desk' | 'window' | 'bolt';

export function Glyph({ name, size = 26, color = 'currentColor', sw = 2 }: { name: GlyphName; size?: number; color?: string; sw?: number }) {
  const p = { fill: 'none', stroke: color, strokeWidth: sw, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const d: Record<GlyphName, React.ReactNode> = {
    doc: <><path {...p} d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path {...p} d="M14 3v5h5M9 13h6M9 17h6" /></>,
    folder: <path {...p} d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    chat: <path {...p} d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
    note: <><path {...p} d="M5 4h14v11l-5 5H5z" /><path {...p} d="M14 20v-5h5M8 9h8M8 13h5" /></>,
    check: <polyline {...p} points="20 6 9 17 4 12" />,
    x: <><line {...p} x1="18" y1="6" x2="6" y2="18" /><line {...p} x1="6" y1="6" x2="18" y2="18" /></>,
    question: <><path {...p} d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" /><line {...p} x1="12" y1="17" x2="12.01" y2="17" /></>,
    clock: <><circle {...p} cx="12" cy="12" r="9" /><polyline {...p} points="12 7 12 12 15 14" /></>,
    search: <><circle {...p} cx="11" cy="11" r="7" /><line {...p} x1="21" y1="21" x2="16" y2="16" /></>,
    layers: <><polygon {...p} points="12 3 21 8 12 13 3 8" /><polyline {...p} points="3 13 12 18 21 13" /></>,
    cloud: <path {...p} d="M17.5 19H7a5 5 0 1 1 1-9.9A6 6 0 0 1 19.4 11 4 4 0 0 1 17.5 19z" />,
    team: <><circle {...p} cx="9" cy="8" r="3.5" /><path {...p} d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle {...p} cx="17" cy="9" r="2.8" /><path {...p} d="M17 14.5a5 5 0 0 1 4.5 5" /></>,
    warn: <><path {...p} d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><line {...p} x1="12" y1="9" x2="12" y2="13" /><line {...p} x1="12" y1="17" x2="12.01" y2="17" /></>,
    book: <><path {...p} d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z" /><path {...p} d="M4 21a2 2 0 0 1 2-2h14M8 7h8M8 11h6" /></>,
    list: <><line {...p} x1="9" y1="6" x2="20" y2="6" /><line {...p} x1="9" y1="12" x2="20" y2="12" /><line {...p} x1="9" y1="18" x2="20" y2="18" /><circle {...p} cx="4.5" cy="6" r="1" /><circle {...p} cx="4.5" cy="12" r="1" /><circle {...p} cx="4.5" cy="18" r="1" /></>,
    gauge: <><path {...p} d="M3.5 17a9 9 0 1 1 17 0" /><line {...p} x1="12" y1="14" x2="17" y2="9" /></>,
    repeat: <><polyline {...p} points="17 2 21 6 17 10" /><path {...p} d="M3 11V9a3 3 0 0 1 3-3h15" /><polyline {...p} points="7 22 3 18 7 14" /><path {...p} d="M21 13v2a3 3 0 0 1-3 3H3" /></>,
    moon: <path {...p} d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
    sun: <><circle {...p} cx="12" cy="12" r="4" /><path {...p} d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    pen: <path {...p} d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />,
    sparkle: <path {...p} d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
    desk: <><rect {...p} x="3" y="8" width="18" height="4" rx="1" /><path {...p} d="M5 12v8M19 12v8" /></>,
    window: <><rect {...p} x="3" y="4" width="18" height="16" rx="2" /><line {...p} x1="3" y1="9" x2="21" y2="9" /></>,
    bolt: <polygon {...p} points="13 2 4 14 12 14 11 22 20 10 12 10" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>{d[name]}</svg>;
}

/** Inset icon well — square */
export function Icon({ t, name, size = 64, color }: { t: Theme; name: GlyphName; size?: number; color?: string }) {
  return (
    <div style={{ width: size, height: size, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...t.iconBox }}>
      <Glyph name={name} size={Math.round(size * 0.46)} color={color ?? t.iconColor} />
    </div>
  );
}

/* ---------- text pieces ---------- */
export const Label = ({ t, children, color }: { t: Theme; children: React.ReactNode; color?: string }) => (
  // Labels use the body font: monospace Latin fonts have no Hangul, and the fallback widens the tracking
  <span style={{ fontFamily: t.font, fontSize: FS.label, fontWeight: 700, letterSpacing: '.02em', color: color ?? t.accent, ...KO }}>{children}</span>
);
export const Txt = ({ t, size = FS.body, weight = 500, soft, mute, accent, children, style }: {
  t: Theme; size?: number; weight?: number; soft?: boolean; mute?: boolean; accent?: boolean; children: React.ReactNode; style?: React.CSSProperties;
}) => (
  <span style={{ fontSize: size, fontWeight: weight, lineHeight: 1.45, color: accent ? t.accent : mute ? t.ink.mute : soft ? t.ink.soft : t.ink.strong, ...KO, ...style }}>{children}</span>
);

/* ---------- chips · arrows · stamps ---------- */
/** An item held inside a card (inset). `dim` = missing or gone */
export function Chip({ t, icon, children, dim, warn, size = FS.body, style }: { t: Theme; icon?: GlyphName; children: React.ReactNode; dim?: boolean; warn?: boolean; size?: number; style?: React.CSSProperties }) {
  const ic = dim ? t.ink.mute : warn ? t.warn.color : t.accent;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '18px 26px', boxSizing: 'border-box', opacity: dim ? 0.38 : 1, ...t.cardHi, borderRadius: 16, ...style }}>
      {icon && <Glyph name={icon} size={size + 4} color={ic} />}
      <Txt t={t} size={size} weight={600} mute={dim} style={warn ? { color: t.warn.color } : undefined}>{children}</Txt>
    </div>
  );
}

export function Arrow({ t, w = 64, dir = 'right', label }: { t: Theme; w?: number; dir?: 'right' | 'down'; label?: string }) {
  const c = t.ink.mute;
  const svg = dir === 'right'
    ? <svg width={w} height={20} viewBox={`0 0 ${w} 20`}><line x1="2" y1="10" x2={w - 8} y2="10" stroke={c} strokeWidth="2.5" strokeLinecap="round" /><polyline points={`${w - 16},3 ${w - 6},10 ${w - 16},17`} fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    : <svg width={20} height={w} viewBox={`0 0 20 ${w}`}><line x1="10" y1="2" x2="10" y2={w - 8} stroke={c} strokeWidth="2.5" strokeLinecap="round" /><polyline points={`3,${w - 16} 10,${w - 6} 17,${w - 16}`} fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return (
    <div style={{ display: 'flex', flexDirection: dir === 'right' ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: 8, flexShrink: 0 }}>
      {label && <Label t={t} color={t.ink.mute}>{label}</Label>}
      {svg}
    </div>
  );
}

/** Verdict stamp — o true / x false / tri conditional / q undecided */
export function Stamp({ t, kind, children }: { t: Theme; kind: 'o' | 'x' | 'tri' | 'q'; children: React.ReactNode }) {
  const col = kind === 'x' ? t.warn.color : kind === 'q' ? t.ink.mute : t.accent;
  const g: GlyphName = kind === 'o' ? 'check' : kind === 'x' ? 'x' : kind === 'q' ? 'question' : 'warn';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
      <Icon t={t} name={g} size={52} color={col} />
      <Txt t={t} size={FS.item} weight={800} style={{ color: col }}>{children}</Txt>
    </div>
  );
}

/* ---------- card groups ---------- */
/** Raised card with a header row (icon + label) */
export function Panel({ t, icon, label, title, children, style, inset }: {
  t: Theme; icon?: GlyphName; label?: string; title?: React.ReactNode; children?: React.ReactNode; style?: React.CSSProperties; inset?: boolean;
}) {
  return (
    <Card t={t} inset={inset} style={{ display: 'flex', flexDirection: 'column', gap: STACK, minWidth: 0, ...style }}>
      {(icon || label) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {icon && <Icon t={t} name={icon} size={60} />}
          {label && <Label t={t}>{label}</Label>}
        </div>
      )}
      {title && <Txt t={t} size={FS.key} weight={700} style={{ lineHeight: 1.35 }}>{title}</Txt>}
      {children}
    </Card>
  );
}

/** A belief to be tested — quote mark, sentence, optional verdict stamp */
export function Myth({ t, idx, quote, stamp, stampKind = 'q' }: { t: Theme; idx: string; quote: string; stamp?: string; stampKind?: 'o' | 'x' | 'tri' | 'q' }) {
  return (
    <Card t={t} style={{ display: 'flex', flexDirection: 'column', minWidth: 0, gap: 30, minHeight: 400, boxSizing: 'border-box' }}>
      <Label t={t}>{idx}</Label>
      <div style={{ display: 'flex', gap: 16 }}>
        <span style={{ fontSize: 88, lineHeight: 0.8, fontWeight: 800, color: t.accent, fontFamily: 'Georgia, serif' }}>“</span>
        <Txt t={t} size={46} weight={700} style={{ lineHeight: 1.38 }}>{quote}</Txt>
      </div>
      {stamp && <div style={{ marginTop: 'auto' }}><Stamp t={t} kind={stampKind}>{stamp}</Stamp></div>}
    </Card>
  );
}

/** Horizontal bars — length follows value / max; the last row is highlighted */
export function Bars({ t, rows, max, hiLast = true, unit }: { t: Theme; rows: { label: string; value: number; text: string }[]; max: number; hiLast?: boolean; unit?: string }) {
  return (
    <Card t={t} style={{ display: 'flex', flexDirection: 'column', gap: 34, padding: `${CARD_PAD + 8}px ${CARD_PAD}px` }}>
      {rows.map((r, i) => {
        const hi = hiLast && i === rows.length - 1;
        return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '240px 1fr 210px', alignItems: 'center', gap: 28 }}>
            <Txt t={t} size={FS.body} weight={600} soft={!hi}>{r.label}</Txt>
            <div style={{ height: 46, borderRadius: 12, ...t.cardHi, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.max(2.5, (r.value / max) * 100)}%`, borderRadius: 12, background: hi ? t.bar : t.ink.mute, opacity: hi ? 1 : 0.55 }} />
            </div>
            <Txt t={t} size={32} weight={800} style={{ textAlign: 'right', fontFamily: t.mono, color: hi ? t.accent : t.ink.soft }}>{r.text}{unit}</Txt>
          </div>
        );
      })}
    </Card>
  );
}

/** One question, two branches */
export function Fork({ t, q, left, right }: { t: Theme; q: string; left: { tag: string; text: string; icon: GlyphName }; right: { tag: string; text: string; icon: GlyphName } }) {
  const c = t.ink.mute;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card t={t} style={{ padding: `38px ${CARD_PAD + 16}px`, display: 'flex', alignItems: 'center', gap: 24 }}>
        <Icon t={t} name="question" size={68} />
        <Txt t={t} size={40} weight={700}>{q}</Txt>
      </Card>
      {/* connector ends at the centre of each card below (width 1440, GAP → card 704, centres 352 / 1088) */}
      <svg width="1440" height="100" viewBox="0 0 1440 100" style={{ display: 'block' }}>
        <path d="M720 6 V40 H352 V90 M720 40 H1088 V90" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="343,81 352,92 361,81" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="1079,81 1088,92 1097,81" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, width: 1440 }}>
        {[left, right].map((b, i) => (
          <Card key={i} t={t} style={{ display: 'flex', alignItems: 'center', gap: 26, padding: `${CARD_PAD + 6}px ${CARD_PAD}px` }}>
            <Icon t={t} name={b.icon} size={76} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
              <Label t={t}>{b.tag}</Label>
              <Txt t={t} size={36} weight={700}>{b.text}</Txt>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/** Document mock — filename row + key/value rows, held inset */
export function Doc({ t, name, rows, style }: { t: Theme; name: string; rows: { k?: string; v: string; hi?: boolean }[]; style?: React.CSSProperties }) {
  return (
    // stretches with its neighbour; rows spread evenly
    <Card t={t} style={{ padding: 0, overflow: 'hidden', minWidth: 0, display: 'flex', flexDirection: 'column', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: `20px ${CARD_PAD}px` }}>
        <Glyph name="doc" size={24} color={t.accent} />
        <span style={{ fontFamily: t.mono, fontSize: 21, color: t.ink.soft }}>{name}</span>
      </div>
      <div style={{ flex: 1, margin: `0 ${CARD_PAD - 18}px ${CARD_PAD - 18}px`, padding: '26px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', gap: 16, ...t.cardHi, borderRadius: 14 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: r.k ? '190px 1fr' : '1fr', gap: 18, alignItems: 'baseline', paddingLeft: 16 }}>
            {r.k && <Label t={t} color={r.hi ? t.accent : t.ink.mute}>{r.k}</Label>}
            <Txt t={t} size={FS.body} weight={r.hi ? 700 : 500} soft={!r.hi}>{r.v}</Txt>
          </div>
        ))}
      </div>
    </Card>
  );
}

/** One source line — stands on the card text line */
export function Source({ t, children }: { t: Theme; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 34, paddingLeft: CARD_PAD, display: 'flex', alignItems: 'center', gap: MARK - 8 }}>
      <Glyph name="book" size={22} color={t.ink.mute} />
      <span style={{ fontFamily: t.font, fontSize: 18, color: t.ink.mute, ...KO }}>{children}</span>
    </div>
  );
}

/** An object placed in a space — large inset tile. `dim` = not there */
export function Tile({ t, icon, children, sub, dim, height = 200 }: { t: Theme; icon: GlyphName; children: React.ReactNode; sub?: string; dim?: boolean; height?: number }) {
  return (
    <div style={{ height, boxSizing: 'border-box', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center', opacity: dim ? 0.38 : 1, ...t.cardHi, borderRadius: 18, minWidth: 0 }}>
      <Glyph name={icon} size={50} color={dim ? t.ink.mute : t.accent} sw={1.8} />
      <Txt t={t} size={FS.item} weight={700} mute={dim}>{children}</Txt>
      {sub && <Txt t={t} size={20} mute>{sub}</Txt>}
    </div>
  );
}

/** Horizontal layout helper */
export const Row = ({ children, gap = GAP, align = 'stretch', cols }: { children: React.ReactNode; gap?: number; align?: React.CSSProperties['alignItems']; cols?: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: cols ?? `repeat(${React.Children.count(children)},minmax(0,1fr))`, gap, alignItems: align }}>{children}</div>
);

/** Placeholder text lines — `hi` lists the line indexes to highlight */
export function Lines({ t, n, hi, gap = 10, h = 12 }: { t: Theme; n: number; hi?: number[]; gap?: number; h?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: n }, (_, i) => (
        <div key={i} style={{ height: h, borderRadius: h / 2, width: `${[92, 70, 84, 62, 78, 88, 66, 80][i % 8]}%`,
          background: hi?.includes(i) ? t.bar : t.ink.mute, opacity: hi?.includes(i) ? 0.9 : 0.3 }} />
      ))}
    </div>
  );
}

/** Horizontal steps with arrows between cards. `cols` sets relative widths; cards share minHeight 240 */
export function StepRow({ t, items, cols }: { t: Theme; items: { icon: GlyphName; label: string; title: string; warn?: boolean }[]; cols?: number[] }) {
  const tpl = items.map((_, i) => `minmax(0,${cols?.[i] ?? 1}fr)`).join(' auto ');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: tpl, gap: 18 }}>
      {items.map((s, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div style={{ display: 'flex', alignItems: 'center' }}><Arrow t={t} w={40} /></div>}
          <Card t={t} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20, minWidth: 0, minHeight: 240, boxSizing: 'border-box', padding: `${CARD_PAD}px 32px` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Icon t={t} name={s.icon} size={58} color={s.warn ? t.warn.color : undefined} />
              <Label t={t} color={s.warn ? t.warn.color : undefined}>{s.label}</Label>
            </div>
            <Txt t={t} size={FS.item} weight={700} style={s.warn ? { color: t.warn.color } : undefined}>{s.title}</Txt>
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
}

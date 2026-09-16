import type { CSSProperties } from 'react';
import type { Theme } from './themes';

/**
 * Semantic tokens — the names a slide is allowed to think in.
 *
 * A theme answers questions such as "what does a raised object look like?" or
 * "what colour is quiet text?". Slides ask those questions by meaning, never by value,
 * so swapping the theme swaps every answer at once.
 *
 *   surface.page     the slide background
 *   surface.raised   an object placed on the surface (a card)
 *   surface.inset    something held inside (a quote, a prior state, a chip)
 *   surface.badge    the eyebrow pill above a title
 *   surface.well     the inset square behind an icon
 *   text.strong/soft/mute   three levels of ink
 *   accent.primary/secondary  the theme's two signal colours
 *   accent.title     style of the one accented phrase in a title
 *   accent.marker    fill of bullet bars, caption bars and highlighted bars
 *   accent.icon      stroke colour for icons inside wells
 *   status.warn      a problem, a missing thing, a warning chip
 *   ambient.grid/orbs  optional background texture
 *   font.body/mono   type families
 */
export type SemanticTokens = {
  font: { body: string; mono: string };
  surface: { page: CSSProperties; raised: CSSProperties; inset: CSSProperties; badge: CSSProperties; well: CSSProperties };
  text: { strong: string; soft: string; mute: string };
  accent: { primary: string; secondary: string; title: CSSProperties; marker: string; icon: string };
  status: { warn: { bg: string; border: string; color: string } };
  ambient: { grid: { color: string; opacity: number } | null; orbs: { tl: string; br: string } | null };
};

export type ThemeMeta = { id: string; name: string; mood: string };

/** Read a theme by meaning. */
export function toSemantic(t: Theme): SemanticTokens {
  return {
    font: { body: t.font, mono: t.mono },
    surface: { page: t.page, raised: t.card, inset: t.cardHi, badge: t.tag, well: t.iconBox },
    text: { ...t.ink },
    accent: { primary: t.accent, secondary: t.accent2, title: t.heading, marker: t.bar, icon: t.iconColor },
    status: { warn: { ...t.warn } },
    ambient: { grid: t.grid, orbs: t.orbs },
  };
}

/** Write a theme by meaning. The result plugs straight into THEMES — no component changes. */
export function defineTheme(meta: ThemeMeta, s: SemanticTokens): Theme {
  return {
    ...meta,
    font: s.font.body,
    mono: s.font.mono,
    page: s.surface.page,
    grid: s.ambient.grid,
    orbs: s.ambient.orbs,
    ink: { ...s.text },
    accent: s.accent.primary,
    accent2: s.accent.secondary,
    heading: s.accent.title,
    card: s.surface.raised,
    cardHi: s.surface.inset,
    tag: s.surface.badge,
    iconBox: s.surface.well,
    iconColor: s.accent.icon,
    bar: s.accent.marker,
    warn: { ...s.status.warn },
  };
}

const px = (v: unknown) => (typeof v === 'number' ? `${v}px` : typeof v === 'string' ? v : undefined);
const bg = (s: CSSProperties) => px(s.background ?? s.backgroundColor);

/**
 * Flatten a theme into CSS custom properties (`--ld-*`).
 * Use it for anything that is not a React slide — a page shell, an exported HTML wrapper, a chart.
 */
export function toCssVars(t: Theme): Record<string, string> {
  const s = toSemantic(t);
  const vars: Record<string, string | undefined> = {
    '--ld-font-body': s.font.body,
    '--ld-font-mono': s.font.mono,
    '--ld-surface-page': bg(s.surface.page),
    '--ld-surface-raised': bg(s.surface.raised),
    '--ld-surface-inset': bg(s.surface.inset),
    '--ld-radius': px(s.surface.raised.borderRadius),
    '--ld-shadow-raised': (s.surface.raised.boxShadow as string) ?? 'none',
    '--ld-shadow-inset': (s.surface.inset.boxShadow as string) ?? 'none',
    '--ld-border-raised': (s.surface.raised.border as string) ?? 'none',
    '--ld-text-strong': s.text.strong,
    '--ld-text-soft': s.text.soft,
    '--ld-text-mute': s.text.mute,
    '--ld-accent-primary': s.accent.primary,
    '--ld-accent-secondary': s.accent.secondary,
    '--ld-accent-marker': s.accent.marker,
    '--ld-accent-icon': s.accent.icon,
    '--ld-warn-color': s.status.warn.color,
    '--ld-warn-bg': s.status.warn.bg,
  };
  return Object.fromEntries(Object.entries(vars).filter((e): e is [string, string] => e[1] !== undefined));
}

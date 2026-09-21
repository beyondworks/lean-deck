'use client';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { THEME_ORDER, resolveTheme } from './themes';
import type { Deck } from './kit';

/**
 * Deck viewer — `?deck=<key>&i=<index>&theme=<id>&raw=1`
 *
 *   ← →        previous / next slide
 *   ↑ ↓        previous / next theme, same slide
 *   Home End   first / last slide
 *   \          fullscreen
 *   raw=1      a bare 1920×1080 frame with no chrome — for screenshots, video and HTML export
 *   print=1    every slide stacked, one page each — for PDF (scripts/export-pdf.mjs)
 *
 * Modifier combinations are passed through, so Cmd+F and Cmd+P still work.
 * The frame carries id="slide" so capture scripts can read the rendered markup.
 */
export function DeckViewer({ decks, defaultDeck, defaultTheme = 'darkmorphism' }: {
  decks: Record<string, Deck>;
  defaultDeck?: string;
  defaultTheme?: string;
}) {
  const sp = useSearchParams();
  const deckKey = sp.get('deck') ?? defaultDeck ?? Object.keys(decks)[0];
  const slides = decks[deckKey] ?? Object.values(decks)[0];
  const LAST = slides.length - 1;
  const clamp = useCallback((n: number) => Math.max(0, Math.min(Number.isFinite(n) ? n : 0, LAST)), [LAST]);

  const [i, setI] = useState(() => clamp(Number(sp.get('i') ?? '0')));
  const [themeId, setThemeId] = useState(() => resolveTheme(sp.get('theme'), defaultTheme).id);
  const theme = resolveTheme(themeId, defaultTheme);

  const [scale, setScale] = useState(0.66);
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const setParam = (k: string, v: string) => {
    const u = new URL(window.location.href);
    u.searchParams.set(k, v);
    window.history.replaceState(null, '', u);
  };
  const go = useCallback((n: number) => { const v = clamp(n); setI(v); setParam('i', String(v)); }, [clamp]);
  const cycle = useCallback((step: number) => {
    const at = THEME_ORDER.indexOf(themeId);
    const next = THEME_ORDER[(at + step + THEME_ORDER.length) % THEME_ORDER.length];
    setThemeId(next); setParam('theme', next);
  }, [themeId]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); go(i + 1); }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(i - 1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); cycle(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); cycle(-1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(LAST); }
      else if (e.key === '\\' || e.key === '₩') { // ₩ is the backslash key on a Korean layout
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [i, go, cycle, LAST]);

  const slide = slides[i];
  const reset = <style>{`nextjs-portal{display:none!important} html,body{margin:0;padding:0;overflow:hidden}`}</style>;

  // print=1 — every slide stacked as one 1920×1080 page each. scripts/export-pdf.mjs prints this to a vector PDF.
  // Gradient-clipped text (background-clip:text) prints as solid boxes in Preview/CoreGraphics, so it prints in the accent colour.
  if (sp.get('print') === '1') {
    return (
      <div id="deck" data-slides={slides.length}>
        <style>{`nextjs-portal{display:none!important} html,body{margin:0;padding:0;background:#000}
@page{size:1920px 1080px;margin:0}
*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
[style*="background-clip: text"],[style*="background-clip:text"]{background:none!important;color:${theme.accent}!important;-webkit-text-fill-color:${theme.accent}!important}
.page{width:1920px;height:1080px;position:relative;overflow:hidden;break-after:page}
.page:last-child{break-after:auto}`}</style>
        {slides.map((s, n) => <div key={n} className="page">{s.render(theme)}</div>)}
      </div>
    );
  }

  if (sp.get('raw') === '1') {
    return (
      <div style={{ width: 1920, height: 1080, overflow: 'hidden' }}>
        {reset}
        <div id="slide" style={{ width: 1920, height: 1080, position: 'relative' }}>{slide.render(theme)}</div>
      </div>
    );
  }

  const hud: React.CSSProperties = {
    position: 'fixed', bottom: 16, fontFamily: 'ui-monospace,monospace', fontSize: 12,
    color: 'rgba(255,255,255,.38)', pointerEvents: 'none', zIndex: 60,
  };
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', overflow: 'hidden' }}>
      {reset}
      <div id="slide" style={{ width: 1920, height: 1080, position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%,-50%) scale(${scale})`, transformOrigin: 'center center' }}>
        {slide.render(theme)}
      </div>
      <div style={{ ...hud, left: 20 }}>← → slide · ↑ ↓ theme · \ fullscreen</div>
      <div style={{ ...hud, right: 20 }}>
        {String(i + 1).padStart(2, '0')} / {slides.length}
        <span style={{ marginLeft: 14 }}>{theme.name} · {slide.title}</span>
      </div>
    </div>
  );
}

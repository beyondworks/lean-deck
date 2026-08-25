'use client';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { THEMES, THEME_ORDER } from '@/lean-deck/themes';
import { demoSlides } from '@/lean-deck/DemoDeck';

const LAST = demoSlides.length - 1;
const clamp = (n: number) => Math.max(0, Math.min(Number.isFinite(n) ? n : 0, LAST));

function View() {
  const sp = useSearchParams();
  const id = sp.get('theme') ?? 'darkmorphism';
  const theme = THEMES[id] ?? THEMES.darkmorphism;
  const [i, setI] = useState(() => clamp(Number(sp.get('i') ?? '0')));

  const [scale, setScale] = useState(0.66);
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const go = useCallback((n: number) => {
    const v = clamp(n); setI(v);
    const u = new URL(window.location.href); u.searchParams.set('i', String(v));
    window.history.replaceState(null, '', u);
  }, []);

  const cycleTheme = useCallback((step: number) => {
    const at = THEME_ORDER.indexOf(id);
    const next = THEME_ORDER[(at + step + THEME_ORDER.length) % THEME_ORDER.length];
    const u = new URL(window.location.href); u.searchParams.set('theme', next);
    window.location.href = u.toString();
  }, [id]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      // 수식키 조합은 브라우저 몫 — Cmd+F(찾기)·Cmd+P(인쇄)를 가로채지 않는다
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); go(i + 1); }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(i - 1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); cycleTheme(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); cycleTheme(-1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(LAST); }
      else if (e.key === '\\' || e.key === '₩') {   // \ (한글 자판의 ₩ 포함)
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [i, go, cycleTheme]);

  const slide = demoSlides[i];

  // raw=1 — 배율·HUD 없이 1920x1080 원본으로. 이미지 추출용
  if (sp.get('raw') === '1') {
    return (
      <div style={{ width: 1920, height: 1080, overflow: 'hidden' }}>
        <style>{`nextjs-portal{display:none!important} html,body{margin:0;padding:0;overflow:hidden}`}</style>
        <div style={{ width: 1920, height: 1080, position: 'relative' }}>{slide.render(theme)}</div>
      </div>
    );
  }

  const hud: React.CSSProperties = {
    position: 'fixed', bottom: 16, fontFamily: 'ui-monospace,monospace', fontSize: 12,
    color: 'rgba(255,255,255,.35)', pointerEvents: 'none', zIndex: 60,
  };
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', overflow: 'hidden' }}>
      <style>{`nextjs-portal{display:none!important} html,body{margin:0;padding:0;overflow:hidden}`}</style>
      <div style={{ width: 1920, height: 1080, position: 'absolute', left: '50%', top: '50%',
                    transform: `translate(-50%,-50%) scale(${scale})`, transformOrigin: 'center center' }}>
        {slide.render(theme)}
      </div>
      <div style={{ ...hud, left: 20 }}>← → slide · ↑ ↓ theme · \ fullscreen</div>
      <div style={{ ...hud, right: 20 }}>
        {String(i + 1).padStart(2, '0')} / {demoSlides.length}
        <span style={{ marginLeft: 14 }}>{theme.name} · {slide.title}</span>
      </div>
    </div>
  );
}

export default function DeckPage() {
  return <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}><View /></Suspense>;
}

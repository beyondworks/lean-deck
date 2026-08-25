'use client';
import Link from 'next/link';
import { THEMES, THEME_ORDER } from '@/lean-deck/themes';
import { demoSlides } from '@/lean-deck/DemoDeck';

const CARD_W = 344;                 // 미리보기 카드 폭
const SCALE = CARD_W / 1920;        // 1920x1080 슬라이드를 그 폭에 맞춰 축소
const PREVIEW = 1;                  // 미리보기로 쓸 슬라이드 index

export default function Gallery() {
  return (
    <main style={{ minHeight: '100vh', background: '#0b0b0d', color: '#fff', padding: '72px 48px 96px',
                   fontFamily: "'Inter','Noto Sans KR',sans-serif" }}>
      <div style={{ maxWidth: CARD_W * 4 + 16 * 3, margin: '0 auto' }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 10px' }}>lean-deck</h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,.6)', margin: '0 0 44px', maxWidth: 640 }}>
          One slide API, seventeen design languages. Every tile below is the <em>same slide</em> — only the theme id
          changed. Click one to open the deck; <code style={{ fontFamily: 'ui-monospace,monospace' }}>↑ ↓</code> swaps
          the theme under the same content.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, ${CARD_W}px)`, gap: 16, justifyContent: 'center' }}>
          {THEME_ORDER.map((id) => {
            const t = THEMES[id];
            return (
              <Link key={id} href={`/deck?theme=${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,.10)',
                              background: 'rgba(255,255,255,.03)' }}>
                  <div style={{ position: 'relative', width: CARD_W, height: Math.round(1080 * SCALE), overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: 1920, height: 1080,
                                  transform: `scale(${SCALE})`, transformOrigin: 'top left', pointerEvents: 'none' }}>
                      {demoSlides[PREVIEW].render(t)}
                    </div>
                  </div>
                  <div style={{ padding: '12px 16px 15px', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontSize: 14.5, fontWeight: 700 }}>{t.name}</span>
                      <span style={{ fontFamily: 'ui-monospace,monospace', fontSize: 11, color: 'rgba(255,255,255,.38)' }}>{id}</span>
                    </div>
                    <div style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,.45)', marginTop: 5 }}>{t.mood}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

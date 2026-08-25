import Link from 'next/link';
import { THEMES, THEME_ORDER } from '@/lean-deck/themes';

export default function Gallery() {
  return (
    <main style={{ minHeight: '100vh', background: '#0b0b0d', color: '#fff', padding: '72px 48px',
                   fontFamily: "'Inter','Noto Sans KR',sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 10px' }}>lean-deck</h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,.6)', margin: '0 0 44px', maxWidth: 620 }}>
          One slide API, seventeen design languages. Pick a theme to open the demo deck —
          arrow keys move, <code style={{ fontFamily: 'ui-monospace,monospace' }}>↑ ↓</code> swap the theme under the same content.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
          {THEME_ORDER.map((id) => {
            const t = THEMES[id];
            return (
              <Link key={id} href={`/deck?theme=${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,.10)' }}>
                  <div style={{ height: 92, ...t.page, display: 'flex', alignItems: 'center', padding: '0 20px' }}>
                    <span style={{ fontSize: 22, fontWeight: 800, fontFamily: t.font, ...t.heading }}>Aa 가나</span>
                  </div>
                  <div style={{ padding: '14px 20px 18px', background: 'rgba(255,255,255,.03)' }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontFamily: 'ui-monospace,monospace', fontSize: 11, color: 'rgba(255,255,255,.38)', marginTop: 4 }}>{id}</div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.55, color: 'rgba(255,255,255,.45)', marginTop: 8 }}>{t.mood}</div>
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

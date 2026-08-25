'use client';
import React from 'react';
import type { Theme } from './themes';

// lean-deck 슬라이드 킷 — 전부 theme 토큰 구동. 어느 모피즘 테마든 동일 API로 렌더.
export const CODE_BG = 'rgba(125,128,140,0.14)';

/**
 * 조판 규칙 (2026-08-25)
 *  ① 정렬선 — 뱃지 테두리·헤더 타이틀·카드의 왼쪽 테두리가 같은 x(정렬선)에 선다.
 *     카드 안의 글자는 카드 텍스트 라인(정렬선 + PAD)에 선다.
 *  ② 표시는 글자를 밀지 않는다 — 불릿 점은 카드 큰 글씨의 왼쪽에서 시작하고,
 *     인용·꼬리말의 바는 카드 텍스트 라인 안쪽 여백에 걸린다. 글자는 언제나 라인 위.
 *  ③ 깊이 — 양각(t.card)은 표면에 놓인 실체, 음각(t.cardHi)은 안에 담긴 것
 *     (인용문·이전 상태·아이콘 그릇). 깊이로 강조하지 않는다.
 *  ④ 강조 — 카드에 테두리·깊이 차이를 주지 않는다. 같은 층의 카드는 같은 모양이다.
 *     구분이 필요하면 라벨색·글자 굵기·문장 자체로 한다.
 */
export const RAIL = 16;   // 인용 표시(바)와 글자 사이. 바는 카드 테두리에서 CARD_PAD-RAIL 떨어진다
export const CARD_PAD = 42;   // 모든 카드의 안쪽 여백. 카드 안 글자 = 정렬선 + CARD_PAD

export function Base({ t, center, wide, children }: { t: Theme; center?: boolean; wide?: boolean; children: React.ReactNode }) {
  // 한글: 음절 단위 줄바꿈 방지. 하위 요소가 상속받는다
  const KO = { wordBreak: 'keep-all' as const, overflowWrap: 'normal' as const, lineBreak: 'strict' as const };
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...t.page, ...KO, fontFamily: t.font, color: t.ink.strong }}>
      {t.orbs && (
        <>
          <div style={{ position: 'absolute', top: -128, right: -128, width: 640, height: 640, borderRadius: '50%', background: t.orbs.tl, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -128, left: -128, width: 640, height: 640, borderRadius: '50%', background: t.orbs.br, pointerEvents: 'none' }} />
        </>
      )}
      {t.grid && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: t.grid.opacity, backgroundImage: `linear-gradient(${t.grid.color} 1px, transparent 1px), linear-gradient(90deg, ${t.grid.color} 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
      )}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: center ? 'center' : 'stretch', textAlign: center ? 'center' : 'left', padding: '0 104px', maxWidth: wide ? 1800 : 1440, margin: '0 auto' }}>
        {children}
      </div>
    </div>
  );
}

export const Tag = ({ t, children }: { t: Theme; children: React.ReactNode }) => (
  <span style={{ display: 'inline-block', fontSize: 17, letterSpacing: '.02em', ...t.tag }}>{children}</span>
);
export const Accent = ({ t, children }: { t: Theme; children: React.ReactNode }) => (
  <span style={{ display: 'inline-block', fontWeight: 800, ...t.heading }}>{children}</span>
);
export const Warn = ({ t, children }: { t: Theme; children: React.ReactNode }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 9999, ...t.warn }}>{children}</span>
);

// 헤더: eyebrow 태그 + 마침표 액션타이틀(앞=plain, 강조=accent, 뒤=plain)
export function Head({ t, eyebrow, pre, accent, post, size = 52 }: { t: Theme; eyebrow: string; pre?: string; accent?: string; post?: string; size?: number }) {
  return (
    <>
      <div style={{ marginBottom: 26 }}><Tag t={t}>{eyebrow}</Tag></div>
      <h2 style={{ fontSize: size, fontWeight: 800, lineHeight: 1.22, letterSpacing: '-.01em', margin: '0 0 54px', wordBreak: 'keep-all' }}>
        {pre}{pre && ' '}{accent && <Accent t={t}>{accent}</Accent>}{post}
      </h2>
    </>
  );
}

export function Tail({ t, children }: { t: Theme; children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', marginTop: 36, paddingLeft: RAIL + 4 }}>
      <div style={{ position: 'absolute', left: 0, top: 3, bottom: 3, minHeight: 26, width: 4, borderRadius: 4, background: t.bar }} />
      <p style={{ fontSize: 22, lineHeight: 1.6, margin: 0, color: t.ink.soft }}>{children}</p>
    </div>
  );
}

// hi 는 더 이상 카드 외형을 바꾸지 않는다 (기존 덱들이 넘겨 오므로 프로프만 유지)
export const Card = ({ t, inset, style, children }: { t: Theme; hi?: boolean; inset?: boolean; style?: React.CSSProperties; children: React.ReactNode }) => (
  <div style={{ boxSizing: 'border-box', padding: CARD_PAD, ...(inset ? t.cardHi : t.card), ...style }}>{children}</div>
);

// N열 카드 (idx 라벨 + 제목 + 불릿 rows). hi로 강조 열 지정
export function Cols({ t, items }: { t: Theme; items: { idx?: string; title: string; rows?: string[]; hi?: boolean; mono0?: boolean }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length},1fr)`, gap: 24, alignItems: 'stretch' }}>
      {items.map((c, i) => (
        <Card key={i} t={t} hi={c.hi}>
          {c.idx && <p style={{ fontFamily: t.mono, fontSize: 16, letterSpacing: '.1em', margin: '0 0 18px', color: t.accent }}>{c.idx}</p>}
          <p style={{ fontSize: 34, fontWeight: 700, margin: '0 0 22px', color: t.ink.strong, wordBreak: 'keep-all', lineHeight: 1.4 }}>{c.title}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {(c.rows ?? []).map((r, j) => (
              <div key={j} style={{ position: 'relative', paddingLeft: 22 }}>
                <span style={{ position: 'absolute', left: 0, top: 13, width: 7, height: 7, borderRadius: '50%', background: t.accent }} />
                <span style={{ fontSize: 21, lineHeight: 1.6, color: t.ink.soft, wordBreak: 'keep-all', fontFamily: c.mono0 && j === 0 ? t.mono : t.font }}>{r}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

// 가로 N단계 흐름 (n, title, desc, code?, hi?)
export function Flow({ t, steps }: { t: Theme; steps: { n?: string | number; title: string; desc?: string; code?: string; hi?: boolean }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length},1fr)`, gap: 20, alignItems: 'stretch' }}>
      {steps.map((s, i) => (
        <Card key={i} t={t} hi={s.hi} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            {s.n !== undefined && <div style={{ width: 46, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 19, color: t.iconColor, ...t.iconBox }}>{s.n}</div>}
            <span style={{ fontSize: 26, fontWeight: 700, color: t.ink.strong, wordBreak: 'keep-all' }}>{s.title}</span>
          </div>
          {s.code && <div style={{ padding: '11px 14px', marginBottom: 14, fontFamily: t.mono, fontSize: 15, lineHeight: 1.5, whiteSpace: 'pre-line', color: t.accent, background: CODE_BG, borderRadius: 8 }}>{s.code}</div>}
          {s.desc && <p style={{ fontSize: 19, lineHeight: 1.6, margin: 'auto 0 0', color: t.ink.soft, wordBreak: 'keep-all' }}>{s.desc}</p>}
        </Card>
      ))}
    </div>
  );
}

// 체크리스트 (2열 그리드). item: {title, desc}
export function Checklist({ t, items, cols = 2 }: { t: Theme; items: { title: string; desc?: string }[]; cols?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gap: 22 }}>
      {items.map((it, i) => (
        <Card key={i} t={t} style={{ padding: 36, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', ...t.iconBox }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.iconColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <div>
            <p style={{ fontSize: 27, fontWeight: 700, margin: '0 0 9px', color: t.ink.strong, wordBreak: 'keep-all' }}>{it.title}</p>
            {it.desc && <p style={{ fontSize: 20, lineHeight: 1.6, margin: 0, color: t.ink.soft, wordBreak: 'keep-all' }}>{it.desc}</p>}
          </div>
        </Card>
      ))}
    </div>
  );
}

// 거대숫자
export function BigStat({ t, value, label, sub }: { t: Theme; value: string; label?: string; sub?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {label && <span style={{ fontFamily: t.mono, fontSize: 18, letterSpacing: '.08em', color: t.ink.mute }}>{label}</span>}
      <span style={{ fontSize: 200, fontWeight: 800, lineHeight: 0.9, letterSpacing: '-.03em', ...t.heading }}>{value}</span>
      {sub && <span style={{ fontSize: 24, color: t.ink.soft, maxWidth: '34ch', wordBreak: 'keep-all', marginTop: 8 }}>{sub}</span>}
    </div>
  );
}

// 풀폭 배너 (info=accent bar / warn=경고색)
export function Banner({ t, kind = 'info', children }: { t: Theme; kind?: 'info' | 'warn'; children: React.ReactNode }) {
  const warn = kind === 'warn';
  const PAD = CARD_PAD;
  return (
    <div style={{ position: 'relative', boxSizing: 'border-box', padding: `40px ${PAD}px`, ...(warn ? { ...t.card, ...t.warn, borderRadius: (t.card.borderRadius as number) ?? 14 } : t.card) }}>
      <div style={{ position: 'absolute', left: PAD - RAIL, top: 40, bottom: 40, width: 4, borderRadius: 4, background: warn ? (t.warn.color ?? t.bar) : t.bar }} />
      <p style={{ fontSize: 31, lineHeight: 1.55, margin: 0, color: warn ? (t.warn.color ?? t.ink.strong) : t.ink.strong, wordBreak: 'keep-all', fontWeight: 500 }}>{children}</p>
    </div>
  );
}

// Before / After 2열 비교표 (rows: {label, before, after})
export function Compare({ t, beforeLabel = '예전', afterLabel = '지금', rows }: { t: Theme; beforeLabel?: string; afterLabel?: string; rows: { label: string; before: string; after: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr 1fr', gap: 20 }}>
        <span />
        <span style={{ fontSize: 18, fontWeight: 600, color: t.ink.mute }}>{beforeLabel}</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: t.accent }}>{afterLabel}</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '250px 1fr 1fr', gap: 20, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 23, fontWeight: 600, color: t.ink.soft, wordBreak: 'keep-all' }}>{r.label}</div>
          <Card t={t} inset style={{ padding: `30px ${CARD_PAD}px`, display: 'flex', alignItems: 'center' }}><span style={{ fontSize: 22, lineHeight: 1.5, color: t.ink.mute, wordBreak: 'keep-all' }}>{r.before}</span></Card>
          <Card t={t} style={{ padding: `30px ${CARD_PAD}px`, display: 'flex', alignItems: 'center' }}><span style={{ fontSize: 22, lineHeight: 1.5, color: t.ink.strong, fontWeight: 600, wordBreak: 'keep-all' }}>{r.after}</span></Card>
        </div>
      ))}
    </div>
  );
}

// 중앙 대형 스테이트먼트 (표지·거대문구·마무리)
export function Statement({ t, eyebrow, pre, accent, post, sub, foot, size = 64 }: { t: Theme; eyebrow?: string; pre?: string; accent?: string; post?: string; sub?: React.ReactNode; foot?: string; size?: number }) {
  return (
    <Base t={t} center>
      {eyebrow && <div style={{ marginBottom: 30 }}><Tag t={t}>{eyebrow}</Tag></div>}
      <h1 style={{ fontSize: size, fontWeight: 800, lineHeight: 1.16, letterSpacing: '-.02em', margin: '0 0 30px', wordBreak: 'keep-all', maxWidth: '20ch' }}>
        {pre}{pre && ' '}{accent && <Accent t={t}>{accent}</Accent>}{post}
      </h1>
      {sub && <p style={{ fontSize: 26, lineHeight: 1.7, margin: 0, color: t.ink.soft, maxWidth: 920, wordBreak: 'keep-all' }}>{sub}</p>}
      {foot && <p style={{ marginTop: 44, fontSize: 18, color: t.ink.mute }}>{foot}</p>}
    </Base>
  );
}

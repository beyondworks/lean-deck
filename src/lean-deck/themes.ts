import type { CSSProperties } from 'react';

// lean-deck 테마 토큰 — 슬라이드는 색/표면을 하드코딩하지 않고 이 토큰만 참조한다.
// 테마 id만 바꾸면 배경·표면(모피즘)·글자·강조가 통째로 갈아끼워진다.
export type Theme = {
  id: string;
  name: string;
  mood: string;
  font: string;
  mono: string;
  page: CSSProperties;               // 슬라이드 배경
  grid: { color: string; opacity: number } | null; // 미세 그리드 오버레이
  orbs: { tl: string; br: string } | null;          // 코너 앰비언트 웨시
  ink: { strong: string; soft: string; mute: string };
  accent: string;
  accent2: string;
  heading: CSSProperties;            // 액션타이틀 강조 span 스타일
  card: CSSProperties;               // 기본 카드 표면 (모피즘 정체성)
  cardHi: CSSProperties;             // 강조 카드
  tag: CSSProperties;                // 섹션 태그(eyebrow) pill
  iconBox: CSSProperties;            // 카드 내 아이콘 컨테이너
  iconColor: string;
  bar: string;                       // 하단 강조 바 background
  warn: { bg: string; border: string; color: string }; // 경고 칩
};

export const THEMES: Record<string, Theme> = {
  // 1) 글래스모피즘 — 현 vibe-design 딥네이비 + 프로스티드 글래스 + 민트
  glass: {
    id: 'glass', name: 'Glass', mood: 'Deep navy night, frosted panes, mint glow',
    font: "'Noto Sans KR', -apple-system, sans-serif", mono: "'JetBrains Mono', monospace",
    page: { background: '#06061a' },
    grid: { color: 'rgba(255,255,255,0.8)', opacity: 0.025 },
    orbs: { tl: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)', br: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' },
    ink: { strong: '#ffffff', soft: 'rgba(255,255,255,0.62)', mute: 'rgba(255,255,255,0.42)' },
    accent: '#34d399', accent2: '#22d3ee',
    heading: { background: 'linear-gradient(90deg,#34d399,#22d3ee)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' },
    card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 16, backdropFilter: 'blur(6px)' },
    cardHi: { background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.30)', borderRadius: 16, backdropFilter: 'blur(6px)' },
    tag: { background: 'linear-gradient(90deg,#059669,#0d9488)', color: '#d1fae5', borderRadius: 9999, padding: '7px 16px', fontWeight: 600 },
    iconBox: { background: 'rgba(6,182,212,0.15)', borderRadius: 12 }, iconColor: '#67e8f9',
    bar: 'linear-gradient(180deg,#34d399,#22d3ee)',
    warn: { bg: 'rgba(239,68,68,0.10)', border: '1px solid rgba(248,113,113,0.30)', color: '#fca5a5' },
  },

  // 2) Paper — white page, ink monochrome, editorial
  paper: {
    id: 'paper', name: 'Paper', mood: 'Ink monochrome on a white page, editorial',
    font: "'Pretendard Variable','Pretendard','Noto Sans KR',-apple-system,sans-serif", mono: "'JetBrains Mono', monospace",
    page: { background: '#ffffff' },
    grid: { color: 'rgba(10,10,10,0.8)', opacity: 0.03 },
    orbs: { tl: 'radial-gradient(circle, rgba(10,10,10,0.05) 0%, transparent 68%)', br: 'radial-gradient(circle, rgba(10,10,10,0.035) 0%, transparent 70%)' },
    ink: { strong: '#0A0A0A', soft: 'rgba(10,10,10,0.64)', mute: 'rgba(10,10,10,0.42)' },
    accent: '#0A0A0A', accent2: '#0A0A0A',
    heading: { color: '#0A0A0A', borderBottom: '4px solid #0A0A0A', paddingBottom: 2 },
    card: { background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(10,10,10,0.10)', borderRadius: 22 },
    cardHi: { background: '#F2F2F2', border: '1px solid rgba(10,10,10,0.18)', borderRadius: 22 },
    tag: { background: '#0A0A0A', color: '#ffffff', borderRadius: 9999, padding: '7px 16px', fontWeight: 600 },
    iconBox: { background: '#F2F2F2', border: '1px solid rgba(10,10,10,0.10)', borderRadius: 10 }, iconColor: '#0A0A0A',
    bar: '#0A0A0A',
    warn: { bg: 'rgba(10,10,10,0.04)', border: '1px solid rgba(10,10,10,0.20)', color: '#0A0A0A' },
  },

  // 3) 뉴모피즘 — 라이트 그레이 위 소프트 압출(듀얼 섀도우), 테두리 없음
  neumorphism: {
    id: 'neumorphism', name: 'Neumorphism', mood: 'Soft pressed and raised surfaces on light grey',
    font: "'Noto Sans KR', -apple-system, sans-serif", mono: "'JetBrains Mono', monospace",
    page: { background: '#e0e5ec' },
    grid: null, orbs: null,
    ink: { strong: '#42506b', soft: 'rgba(66,80,107,0.72)', mute: 'rgba(66,80,107,0.5)' },
    accent: '#5b6b8c', accent2: '#7c8aa5',
    heading: { color: '#33405c' },
    card: { background: '#e0e5ec', borderRadius: 20, boxShadow: '-8px -8px 16px #ffffff, 8px 8px 18px #a3b1c6' },
    cardHi: { background: '#e0e5ec', borderRadius: 20, boxShadow: 'inset -6px -6px 12px #ffffff, inset 6px 6px 12px #a3b1c6' },
    tag: { background: '#e0e5ec', color: '#5b6b8c', borderRadius: 9999, padding: '9px 18px', fontWeight: 700, boxShadow: '-4px -4px 8px #ffffff, 4px 4px 8px #a3b1c6' },
    iconBox: { background: '#e0e5ec', borderRadius: 12, boxShadow: 'inset -3px -3px 6px #ffffff, inset 3px 3px 6px #a3b1c6' }, iconColor: '#5b6b8c',
    bar: 'linear-gradient(180deg,#7c8aa5,#5b6b8c)',
    warn: { bg: '#e0e5ec', border: 'none', color: '#b45454' },
  },

  // 4) 다크모피즘 — 다크 그레이 위 뉴모픽 압출
  darkmorphism: {
    id: 'darkmorphism', name: 'Darkmorphism', mood: 'Neumorphic extrusion on dark grey, teal point',
    font: "'Noto Sans KR', -apple-system, sans-serif", mono: "'JetBrains Mono', monospace",
    page: { background: '#22252b' },
    grid: null, orbs: null,
    ink: { strong: '#c8cdd6', soft: 'rgba(200,205,214,0.70)', mute: 'rgba(200,205,214,0.45)' },
    accent: '#4fd1c5', accent2: '#63b3ed',
    heading: { color: '#5eead4' },
    card: { background: '#22252b', borderRadius: 18, boxShadow: '-6px -6px 12px #2b2f37, 6px 6px 14px #15171b' },
    cardHi: { background: '#22252b', borderRadius: 18, boxShadow: 'inset -5px -5px 10px #2b2f37, inset 5px 5px 10px #15171b' },
    tag: { background: '#22252b', color: '#4fd1c5', borderRadius: 9999, padding: '9px 18px', fontWeight: 600, boxShadow: '-4px -4px 8px #2b2f37, 4px 4px 8px #15171b' },
    iconBox: { background: '#22252b', borderRadius: 12, boxShadow: 'inset -3px -3px 6px #2b2f37, inset 3px 3px 6px #15171b' }, iconColor: '#4fd1c5',
    bar: 'linear-gradient(180deg,#4fd1c5,#63b3ed)',
    warn: { bg: '#22252b', border: 'none', color: '#f08a8a' },
  },

  // 5) 클래식 매킨토시 — System 6/7: 백지 + 2px 블랙 테두리 + 하드 섀도우 + 각진 모서리
  macintosh: {
    id: 'macintosh', name: 'Classic Macintosh', mood: 'System 6/7 black and white, hard drop shadow',
    font: "'Geneva','Chicago','Helvetica Neue',Arial,sans-serif", mono: "'Monaco','Courier New',monospace",
    page: { background: '#ffffff' },
    grid: { color: 'rgba(0,0,0,0.9)', opacity: 0.06 }, orbs: null,
    ink: { strong: '#000000', soft: 'rgba(0,0,0,0.78)', mute: 'rgba(0,0,0,0.55)' },
    accent: '#000000', accent2: '#000000',
    heading: { background: '#000000', color: '#ffffff', padding: '2px 10px', borderRadius: 0 },
    card: { background: '#ffffff', border: '2px solid #000000', borderRadius: 0, boxShadow: '5px 5px 0 #000000' },
    cardHi: { background: '#ffffff', border: '2px solid #000000', borderRadius: 0, boxShadow: '5px 5px 0 #000000' },
    tag: { background: '#ffffff', color: '#000000', border: '2px solid #000000', borderRadius: 0, padding: '5px 14px', fontWeight: 700, boxShadow: '3px 3px 0 #000000' },
    iconBox: { background: '#000000', borderRadius: 0 }, iconColor: '#ffffff',
    bar: '#000000',
    warn: { bg: '#ffffff', border: '2px solid #000000', color: '#000000' },
  },

  // 6) 클레이모피즘 — 파스텔 그라디언트 + 말랑한 퍼피 카드
  claymorphism: {
    id: 'claymorphism', name: 'Claymorphism', mood: 'Pastel ground, puffy clay cards',
    font: "'Noto Sans KR', -apple-system, sans-serif", mono: "'JetBrains Mono', monospace",
    page: { background: 'linear-gradient(135deg,#fdf2f8 0%,#eef2ff 100%)' },
    grid: null, orbs: null,
    ink: { strong: '#4c1d95', soft: 'rgba(76,29,149,0.70)', mute: 'rgba(76,29,149,0.5)' },
    accent: '#a855f7', accent2: '#ec4899',
    heading: { background: 'linear-gradient(90deg,#a855f7,#ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' },
    card: { background: '#ffffff', borderRadius: 28, boxShadow: 'inset 0 -6px 12px rgba(168,85,247,0.10), inset 0 4px 8px #ffffff' },
    cardHi: { background: '#faf5ff', borderRadius: 28, boxShadow: 'inset 0 -8px 14px rgba(168,85,247,0.16), inset 0 4px 8px #ffffff' },
    tag: { background: '#a855f7', color: '#ffffff', borderRadius: 9999, padding: '9px 18px', fontWeight: 700, boxShadow: '0 8px 16px rgba(168,85,247,0.35)' },
    iconBox: { background: '#f3e8ff', borderRadius: 16, boxShadow: 'inset 0 -3px 6px rgba(168,85,247,0.15)' }, iconColor: '#a855f7',
    bar: 'linear-gradient(180deg,#a855f7,#ec4899)',
    warn: { bg: '#fff1f2', border: '1px solid rgba(244,63,94,0.30)', color: '#e11d48' },
  },

  // 7) 플랫 디자인 — 밝은 단색, 그림자·입체 없음, 단순
  flat: {
    id: 'flat', name: 'Flat', mood: 'Bright solid blocks, no shadow',
    font: "'Noto Sans KR', -apple-system, sans-serif", mono: "'JetBrains Mono', monospace",
    page: { background: '#ffffff' }, grid: null, orbs: null,
    ink: { strong: '#1f2933', soft: 'rgba(31,41,51,0.66)', mute: 'rgba(31,41,51,0.45)' },
    accent: '#14b8a6', accent2: '#f97316',
    heading: { color: '#14b8a6' },
    card: { background: '#eef2f4', borderRadius: 10 },
    cardHi: { background: '#d5f5ef', borderRadius: 10 },
    tag: { background: '#14b8a6', color: '#ffffff', borderRadius: 6, padding: '7px 16px', fontWeight: 700 },
    iconBox: { background: '#14b8a6', borderRadius: 8 }, iconColor: '#ffffff',
    bar: '#14b8a6',
    warn: { bg: '#fdecea', border: 'none', color: '#e0563a' },
  },

  // 8) 머티리얼 디자인 — 백색 표면 + elevation 그림자(종이 겹침) + 구글 컬러
  material: {
    id: 'material', name: 'Material', mood: 'White surfaces, elevation shadow, stacked paper',
    font: "'Roboto','Noto Sans KR',-apple-system,sans-serif", mono: "'Roboto Mono','JetBrains Mono',monospace",
    page: { background: '#f5f5f5' }, grid: null, orbs: null,
    ink: { strong: '#212121', soft: 'rgba(33,33,33,0.62)', mute: 'rgba(33,33,33,0.4)' },
    accent: '#1a73e8', accent2: '#34a853',
    heading: { color: '#1a73e8' },
    card: { background: '#ffffff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' },
    cardHi: { background: '#ffffff', borderRadius: 12, boxShadow: '0 8px 16px rgba(0,0,0,0.14), 0 3px 6px rgba(0,0,0,0.20)' },
    tag: { background: '#1a73e8', color: '#ffffff', borderRadius: 9999, padding: '7px 16px', fontWeight: 600 },
    iconBox: { background: 'rgba(26,115,232,0.12)', borderRadius: 10 }, iconColor: '#1a73e8',
    bar: '#1a73e8',
    warn: { bg: 'rgba(234,67,53,0.08)', border: 'none', color: '#ea4335' },
  },

  // 9) 플루언트 디자인 — 아크릴(반투명 블러) + Mica 라이트 + 윈도우 블루
  fluent: {
    id: 'fluent', name: 'Fluent', mood: 'Acrylic blur and Mica, Windows 11',
    font: "'Segoe UI','Noto Sans KR',-apple-system,sans-serif", mono: "'Cascadia Code','JetBrains Mono',monospace",
    page: { background: 'linear-gradient(135deg,#eaeef4 0%,#dfe6f0 100%)' }, grid: null, orbs: null,
    ink: { strong: '#1b1b1f', soft: 'rgba(27,27,31,0.62)', mute: 'rgba(27,27,31,0.42)' },
    accent: '#0067c0', accent2: '#4cc2ff',
    heading: { color: '#0067c0' },
    card: { background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.7)', borderRadius: 12, backdropFilter: 'blur(20px)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    cardHi: { background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(0,103,192,0.4)', borderRadius: 12, backdropFilter: 'blur(20px)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    tag: { background: '#0067c0', color: '#ffffff', borderRadius: 6, padding: '7px 16px', fontWeight: 600 },
    iconBox: { background: 'rgba(0,103,192,0.12)', borderRadius: 8 }, iconColor: '#0067c0',
    bar: 'linear-gradient(180deg,#0067c0,#4cc2ff)',
    warn: { bg: 'rgba(196,43,28,0.08)', border: '1px solid rgba(196,43,28,0.25)', color: '#c42b1c' },
  },

  // 10) 애플 휴먼 인터페이스 — 라이트 + Vibrancy 반투명, SF, 둥근 모서리
  apple: {
    id: 'apple', name: 'Apple HIG', mood: 'Light, vibrancy, SF, uncluttered',
    font: "-apple-system,'SF Pro Display','Noto Sans KR',sans-serif", mono: "'SF Mono','JetBrains Mono',monospace",
    page: { background: '#f5f5f7' }, grid: null, orbs: null,
    ink: { strong: '#1d1d1f', soft: 'rgba(29,29,31,0.6)', mute: 'rgba(29,29,31,0.4)' },
    accent: '#0071e3', accent2: '#34c759',
    heading: { color: '#0071e3' },
    card: { background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 18, backdropFilter: 'blur(20px)' },
    cardHi: { background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(0,113,227,0.3)', borderRadius: 18, backdropFilter: 'blur(20px)' },
    tag: { background: 'rgba(0,113,227,0.1)', color: '#0071e3', borderRadius: 9999, padding: '7px 16px', fontWeight: 600 },
    iconBox: { background: 'rgba(0,113,227,0.1)', borderRadius: 12 }, iconColor: '#0071e3',
    bar: '#0071e3',
    warn: { bg: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.2)', color: '#ff3b30' },
  },

  // 11) 미니멀리즘 — 여백, 얇은 헤어라인, 절제된 모노, 채움 없음
  minimalism: {
    id: 'minimalism', name: 'Minimalism', mood: 'Whitespace, hairlines, restrained mono',
    font: "'Noto Sans KR', -apple-system, sans-serif", mono: "'JetBrains Mono', monospace",
    page: { background: '#ffffff' }, grid: null, orbs: null,
    ink: { strong: '#111111', soft: 'rgba(17,17,17,0.6)', mute: 'rgba(17,17,17,0.38)' },
    accent: '#111111', accent2: '#111111',
    heading: { color: '#000000' },
    card: { background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 3 },
    cardHi: { background: '#fafafa', border: '1px solid rgba(0,0,0,0.16)', borderRadius: 3 },
    tag: { background: 'transparent', color: '#111111', border: '1px solid rgba(0,0,0,0.16)', borderRadius: 9999, padding: '6px 15px', fontWeight: 500 },
    iconBox: { background: 'transparent', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8 }, iconColor: '#111111',
    bar: '#111111',
    warn: { bg: 'transparent', border: '1px solid rgba(0,0,0,0.2)', color: '#111111' },
  },

  // 12) 다크 모드 — 플랫 다크(압출 아님), 서브틀 테두리, 단일 강조
  darkmode: {
    id: 'darkmode', name: 'Dark mode', mood: 'Flat dark surfaces, subtle borders, blue accent',
    font: "'Noto Sans KR', -apple-system, sans-serif", mono: "'JetBrains Mono', monospace",
    page: { background: '#0f1115' }, grid: { color: 'rgba(255,255,255,0.8)', opacity: 0.02 }, orbs: null,
    ink: { strong: '#e8eaed', soft: 'rgba(232,234,237,0.62)', mute: 'rgba(232,234,237,0.42)' },
    accent: '#7c9cff', accent2: '#a78bfa',
    heading: { color: '#8ab4f8' },
    card: { background: '#1a1d23', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14 },
    cardHi: { background: '#1f2937', border: '1px solid rgba(124,156,255,0.3)', borderRadius: 14 },
    tag: { background: 'rgba(124,156,255,0.15)', color: '#a5b8ff', borderRadius: 9999, padding: '7px 16px', fontWeight: 600 },
    iconBox: { background: 'rgba(124,156,255,0.12)', borderRadius: 10 }, iconColor: '#a5b8ff',
    bar: 'linear-gradient(180deg,#7c9cff,#a78bfa)',
    warn: { bg: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#fca5a5' },
  },

  // 13) 카드 기반 디자인 — 카드가 주인공, 라이트 그레이 위 뚜렷한 elevation
  card: {
    id: 'card', name: 'Card', mood: 'Raised cards carry everything on light grey',
    font: "'Noto Sans KR', -apple-system, sans-serif", mono: "'JetBrains Mono', monospace",
    page: { background: '#eceff3' }, grid: null, orbs: null,
    ink: { strong: '#1f2933', soft: 'rgba(31,41,51,0.64)', mute: 'rgba(31,41,51,0.44)' },
    accent: '#3b82f6', accent2: '#06b6d4',
    heading: { color: '#3b82f6' },
    card: { background: '#ffffff', borderRadius: 16, boxShadow: '0 4px 12px rgba(20,30,50,0.08), 0 1px 3px rgba(20,30,50,0.06)' },
    cardHi: { background: '#ffffff', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 16, boxShadow: '0 12px 28px rgba(59,130,246,0.18), 0 2px 6px rgba(20,30,50,0.08)' },
    tag: { background: '#3b82f6', color: '#ffffff', borderRadius: 9999, padding: '7px 16px', fontWeight: 600 },
    iconBox: { background: 'rgba(59,130,246,0.12)', borderRadius: 12 }, iconColor: '#3b82f6',
    bar: 'linear-gradient(180deg,#3b82f6,#06b6d4)',
    warn: { bg: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626' },
  },

  // 14) 그라데이션 디자인 — 파스텔 그라디언트 배경 + 그라디언트 강조
  gradient: {
    id: 'gradient', name: 'Gradient', mood: 'Pastel gradient ground and gradient accents',
    font: "'Noto Sans KR', -apple-system, sans-serif", mono: "'JetBrains Mono', monospace",
    page: { background: 'linear-gradient(120deg,#e0c3fc 0%,#8ec5fc 100%)' }, grid: null, orbs: null,
    ink: { strong: '#3730a3', soft: 'rgba(55,48,163,0.72)', mute: 'rgba(55,48,163,0.5)' },
    accent: '#7c3aed', accent2: '#2563eb',
    heading: { background: 'linear-gradient(90deg,#7c3aed,#db2777)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' },
    card: { background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: 18 },
    cardHi: { background: '#ffffff', border: '2px solid #7c3aed', borderRadius: 18 },
    tag: { background: 'linear-gradient(90deg,#7c3aed,#2563eb)', color: '#ffffff', borderRadius: 9999, padding: '7px 16px', fontWeight: 700 },
    iconBox: { background: 'linear-gradient(135deg,#7c3aed,#2563eb)', borderRadius: 12 }, iconColor: '#ffffff',
    bar: 'linear-gradient(180deg,#7c3aed,#2563eb)',
    warn: { bg: 'rgba(219,39,119,0.1)', border: '1px solid rgba(219,39,119,0.3)', color: '#be185d' },
  },

  // 15) 타이포그래픽 디자인 — 활자 중심, 룰(선)·샤프, 레드 포인트(스위스)
  typographic: {
    id: 'typographic', name: 'Typographic', mood: 'Type-led, rules, a red point (Swiss)',
    font: "'Helvetica Neue','Inter','Noto Sans KR',sans-serif", mono: "'JetBrains Mono', monospace",
    page: { background: '#ffffff' }, grid: null, orbs: null,
    ink: { strong: '#000000', soft: 'rgba(0,0,0,0.75)', mute: 'rgba(0,0,0,0.5)' },
    accent: '#ff2b2b', accent2: '#000000',
    heading: { color: '#ff2b2b' },
    card: { background: 'transparent', borderTop: '3px solid #000000', borderRadius: 0 },
    cardHi: { background: 'transparent', borderTop: '3px solid #ff2b2b', borderRadius: 0 },
    tag: { background: '#000000', color: '#ffffff', borderRadius: 0, padding: '6px 14px', fontWeight: 700 },
    iconBox: { background: 'transparent', border: '2px solid #000000', borderRadius: 0 }, iconColor: '#000000',
    bar: '#ff2b2b',
    warn: { bg: 'transparent', border: '2px solid #000000', color: '#000000' },
  },

  // 16) 브루탈리즘 — 투박·고대비·기본 폰트(Times)·링크 블루·꾸밈 없음
  brutalism: {
    id: 'brutalism', name: 'Brutalism', mood: 'Raw, high contrast, default Times, link blue',
    font: "'Times New Roman', Times, serif", mono: "'Courier New', monospace",
    page: { background: '#ffffff' }, grid: null, orbs: null,
    ink: { strong: '#000000', soft: '#000000', mute: 'rgba(0,0,0,0.6)' },
    accent: '#0000ee', accent2: '#0000ee',
    heading: { color: '#0000ee', textDecoration: 'underline' },
    card: { background: '#ffffff', border: '3px solid #000000', borderRadius: 0 },
    cardHi: { background: '#ffff00', border: '3px solid #000000', borderRadius: 0 },
    tag: { background: '#0000ee', color: '#ffffff', borderRadius: 0, padding: '5px 14px', fontWeight: 700 },
    iconBox: { background: '#000000', borderRadius: 0 }, iconColor: '#ffffff',
    bar: '#0000ee',
    warn: { bg: '#ffff00', border: '3px solid #000000', color: '#000000' },
  },

  // 17) 네오브루탈리즘 — 볼드 컬러 + 두꺼운 블랙 테두리 + 컬러 하드 오프셋 섀도우
  neubrutalism: {
    id: 'neubrutalism', name: 'Neubrutalism', mood: 'Bold colour, thick black borders, hard offset shadow',
    font: "'Archivo','Inter','Noto Sans KR',sans-serif", mono: "'JetBrains Mono', monospace",
    page: { background: '#fef3c7' }, grid: null, orbs: null,
    ink: { strong: '#000000', soft: 'rgba(0,0,0,0.78)', mute: 'rgba(0,0,0,0.55)' },
    accent: '#ff5c8a', accent2: '#5b8def',
    heading: { background: '#ffe14d', color: '#000000', padding: '2px 10px', borderRadius: 4, border: '2px solid #000000' },
    card: { background: '#ffffff', border: '2px solid #000000', borderRadius: 12, boxShadow: '5px 5px 0 #000000' },
    cardHi: { background: '#ffd6e8', border: '2px solid #000000', borderRadius: 12, boxShadow: '5px 5px 0 #ff5c8a' },
    tag: { background: '#5b8def', color: '#ffffff', border: '2px solid #000000', borderRadius: 8, padding: '6px 14px', fontWeight: 700, boxShadow: '3px 3px 0 #000000' },
    iconBox: { background: '#ffe14d', border: '2px solid #000000', borderRadius: 8 }, iconColor: '#000000',
    bar: '#ff5c8a',
    warn: { bg: '#ffffff', border: '2px solid #000000', color: '#e11d48' },
  },
};

export const THEME_ORDER = [
  'glass', 'paper', 'neumorphism', 'darkmorphism', 'macintosh', 'claymorphism',
  'flat', 'material', 'fluent', 'apple', 'minimalism', 'darkmode', 'card', 'gradient', 'typographic', 'brutalism', 'neubrutalism',
];

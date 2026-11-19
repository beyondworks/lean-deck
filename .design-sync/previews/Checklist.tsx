import React from 'react';
import { Base, Head, Checklist, THEMES } from 'lean-deck';
import './_fit';

export const TwoColumns = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.glass} wide>
      <Head t={THEMES.glass} eyebrow="What ships" pre="Ten blocks cover" accent="most decks" post="." size={48} />
      <Checklist t={THEMES.glass} cols={2} items={[
        { title: 'Statement', desc: 'A full-bleed sentence — covers and turning points' },
        { title: 'Base + Head + Tail', desc: 'Eyebrow tag, action title, closing caption' },
        { title: 'Cols · Flow · Checklist', desc: 'Cards in a row, numbered steps, ticked list' },
        { title: 'Compare · Banner · BigStat', desc: 'Before/after rows, a pulled quote, one large number' },
      ]} />
    </Base>
  </div>
);

export const ThreeColumnsKorean = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.minimalism} wide>
      <Checklist t={THEMES.minimalism} cols={3} items={[
        { title: '색 하드코딩 금지', desc: '토큰만 참조' },
        { title: '카드는 같은 모양', desc: '강조는 글자로' },
        { title: '정렬선은 둘', desc: '정렬선과 카드 텍스트 라인' },
      ]} />
    </Base>
  </div>
);

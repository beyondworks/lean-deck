import React from 'react';
import { Base, Cols, THEMES } from 'lean-deck';
import './_fit';

export const TwoColumns = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.glass}>
      <Cols t={THEMES.glass} items={[
        { idx: 'DECK', title: 'What you say', rows: ['A plain array of slides', 'Written once, never restyled'] },
        { idx: 'THEME', title: 'How it looks', rows: ['Surface, ink, accent, type', 'Swapped by id at render time'] },
      ]} />
    </Base>
  </div>
);

export const ThreeColumnsWide = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.claymorphism} wide>
      <Cols t={THEMES.claymorphism} items={[
        { idx: 'SOFT', title: 'Glass · Neumorphism · Darkmorphism · Claymorphism', rows: ['Blur, extrusion, soft shadow'] },
        { idx: 'FLAT', title: 'Flat · Material · Fluent · Apple · Minimalism', rows: ['Elevation and restraint'] },
        { idx: 'LOUD', title: 'Brutalism · Neubrutalism · Macintosh · Typographic', rows: ['Hard edges, no apology'] },
      ]} />
    </Base>
  </div>
);

export const MonoFirstRow = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.paper}>
      <Cols t={THEMES.paper} items={[
        { idx: '설치', title: '한 줄이면 끝', rows: ['npm i lean-deck', '의존성 없이 React만 있으면 됨'], mono0: true },
        { idx: '테마', title: 'id 하나로 교체', rows: ['?theme=paper', 'URL 파라미터로 바로 전환'], mono0: true },
      ]} />
    </Base>
  </div>
);

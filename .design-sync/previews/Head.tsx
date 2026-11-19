import React from 'react';
import { Base, Head, Cols, Tail, THEMES } from 'lean-deck';
import './_fit';

export const Darkmorphism = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.darkmorphism}>
      <Head t={THEMES.darkmorphism} eyebrow="The idea" pre="Content and" accent="design language" post=" are separate files." />
      <Cols t={THEMES.darkmorphism} items={[
        { idx: 'DECK', title: 'What you say', rows: ['A plain array of slides', 'Written once, never restyled'] },
        { idx: 'THEME', title: 'How it looks', rows: ['Surface, ink, accent, type', 'Swapped by id at render time'] },
      ]} />
      <Tail t={THEMES.darkmorphism}>Rewriting the deck for a new look is the thing this removes.</Tail>
    </Base>
  </div>
);

export const PaperKorean = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.paper}>
      <Head t={THEMES.paper} eyebrow="한국어 조판" pre="한글은" accent="어절 단위" post="로 끊어집니다." size={56} />
      <Tail t={THEMES.paper}>keep-all 이 기본값이라 낱글자가 줄 끝에 홀로 남지 않습니다.</Tail>
    </Base>
  </div>
);

export const Neubrutalism = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.neubrutalism}>
      <Head t={THEMES.neubrutalism} eyebrow="Seventeen themes" pre="Every card carries its own" accent="material" post="." size={48} />
    </Base>
  </div>
);

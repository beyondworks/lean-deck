import React from 'react';
import { Statement, THEMES } from 'lean-deck';
import './_fit';

export const Cover = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Statement t={THEMES.darkmorphism} eyebrow="lean-deck"
      pre="One slide API, seventeen" accent="design languages" post="." size={68}
      sub="Slides never hardcode a colour or a surface. They read theme tokens, so swapping one id restyles the whole deck."
      foot="MIT · React + TypeScript · no runtime dependencies" />
  </div>
);

export const ClosingGradient = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Statement t={THEMES.gradient} eyebrow="Take it" pre="Write the deck once." accent="Decide the look later" post="." size={62}
      foot="github.com/beyondworks/lean-deck · MIT" />
  </div>
);

export const KoreanTypographic = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Statement t={THEMES.typographic} eyebrow="마무리" pre="한 번 쓰고," accent="모양은 나중에" post=" 정하세요." size={70}
      sub="덱 파일은 그대로 두고 테마 id만 바꾸면 됩니다." />
  </div>
);

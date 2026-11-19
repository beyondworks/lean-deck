import React from 'react';
import { Base, Head, StepRow, THEMES } from 'lean-deck';
import './_fit';

export const ThemeToSlide = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.glass} wide>
      <Head t={THEMES.glass} eyebrow="Semantic tokens" pre="A slide asks by meaning," accent="a theme answers by value" post="." size={52} />
      <StepRow t={THEMES.glass} cols={[1, 1.15, 1, 1]} items={[
        { icon: 'doc', label: 'Deck', title: 'surface.raised' },
        { icon: 'layers', label: 'Semantic token', title: '“an object on the page”' },
        { icon: 'sparkle', label: 'Theme', title: '17 design languages' },
        { icon: 'window', label: 'Slide', title: 'rendered look' },
      ]} />
    </Base>
  </div>
);

export const WithWarnStep = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.material} wide>
      <StepRow t={THEMES.material} items={[
        { icon: 'pen', label: '1단계', title: '대본 작성' },
        { icon: 'warn', label: '막히는 곳', title: '슬라이드마다 색 수정', warn: true },
        { icon: 'check', label: '해결', title: '테마 토큰으로 교체' },
      ]} />
    </Base>
  </div>
);

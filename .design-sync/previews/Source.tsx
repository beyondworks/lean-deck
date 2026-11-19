import React from 'react';
import { Base, Bars, Source, THEMES } from 'lean-deck';
import './_fit';

export const UnderBars = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.glass} wide>
      <Bars t={THEMES.glass} max={41} rows={[
        { label: 'Styled by hand', value: 40, text: '40' },
        { label: 'Shared stylesheet', value: 1, text: '1+' },
        { label: 'lean-deck', value: 0, text: '0' },
      ]} unit=" files" />
      <Source t={THEMES.glass}>lean-deck: the theme id is a URL parameter — ?theme=paper</Source>
    </Base>
  </div>
);

export const KoreanPaper = () => (
  <div style={{ width: 1200, height: 260 }}>
    <Base t={THEMES.paper}>
      <Source t={THEMES.paper}>출처: 팀 내부 설문 · 응답 312명</Source>
    </Base>
  </div>
);

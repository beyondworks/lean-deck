import React from 'react';
import { Base, BigStat, THEMES } from 'lean-deck';
import './_fit';

export const Count = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.darkmorphism}>
      <BigStat t={THEMES.darkmorphism} value="17" label="DESIGN LANGUAGES"
        sub="One deck, seventeen ways. Add a theme and there are eighteen." />
    </Base>
  </div>
);

export const ZeroKoreanPaper = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.paper}>
      <BigStat t={THEMES.paper} value="0" label="FILES TOUCHED" sub="테마를 바꿀 때 수정하는 덱 파일 수" />
    </Base>
  </div>
);

export const ValueOnlyGradient = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.gradient} center>
      <BigStat t={THEMES.gradient} value="2.4×" />
    </Base>
  </div>
);

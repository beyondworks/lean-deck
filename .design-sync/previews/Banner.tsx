import React from 'react';
import { Base, Head, Banner, THEMES } from 'lean-deck';
import './_fit';

export const Info = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.fluent}>
      <Head t={THEMES.fluent} eyebrow="Korean typography" pre="한글은" accent="어절 단위" post="로 끊어집니다." size={48} />
      <Banner t={THEMES.fluent}>keep-all 이 기본값이라 낱글자가 줄 끝에 홀로 남지 않습니다.</Banner>
    </Base>
  </div>
);

export const WarnKind = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.darkmorphism}>
      <Banner t={THEMES.darkmorphism} kind="warn">Never hardcode a colour inside a slide — it will not change with the theme.</Banner>
    </Base>
  </div>
);

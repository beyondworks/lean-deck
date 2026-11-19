import React from 'react';
import { Base, Head, Tail, THEMES } from 'lean-deck';
import './_fit';

export const UnderHead = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.fluent}>
      <Head t={THEMES.fluent} eyebrow="Closing caption" pre="Tail sits on the" accent="card text line" post="." size={52} />
      <Tail t={THEMES.fluent}>Emphasis is carried by wording and label colour, not by depth or borders.</Tail>
    </Base>
  </div>
);

export const Korean = () => (
  <div style={{ width: 1200, height: 360 }}>
    <Base t={THEMES.apple}>
      <Tail t={THEMES.apple}>테마 id만 바꾸면 모든 답이 한꺼번에 바뀝니다. 덱 파일은 건드리지 않습니다.</Tail>
    </Base>
  </div>
);

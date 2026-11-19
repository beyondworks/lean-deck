import React from 'react';
import { Base, Accent, THEMES } from 'lean-deck';
import './_fit';

export const InTitleGlass = () => (
  <div style={{ width: 1100, height: 260 }}>
    <Base t={THEMES.glass}>
      <h2 style={{ fontSize: 52, fontWeight: 800, margin: 0 }}>A slide asks by meaning, <Accent t={THEMES.glass}>a theme answers by value</Accent>.</h2>
    </Base>
  </div>
);

export const Neubrutalism = () => (
  <div style={{ width: 1100, height: 260 }}>
    <Base t={THEMES.neubrutalism}>
      <h2 style={{ fontSize: 52, fontWeight: 800, margin: 0 }}>Every card carries its own <Accent t={THEMES.neubrutalism}>material</Accent>.</h2>
    </Base>
  </div>
);

export const MaterialKorean = () => (
  <div style={{ width: 1100, height: 260 }}>
    <Base t={THEMES.material}>
      <h2 style={{ fontSize: 52, fontWeight: 800, margin: 0 }}>조사가 줄 끝에 <Accent t={THEMES.material}>혼자 떨어지지</Accent> 않습니다.</h2>
    </Base>
  </div>
);

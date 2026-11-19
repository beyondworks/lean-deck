import React from 'react';
import { Base, Warn, THEMES } from 'lean-deck';
import './_fit';

export const Darkmode = () => (
  <div style={{ width: 640, height: 200 }}>
    <Base t={THEMES.darkmode} center><Warn t={THEMES.darkmode}>Hardcoded colour</Warn></Base>
  </div>
);

export const Paper = () => (
  <div style={{ width: 640, height: 200 }}>
    <Base t={THEMES.paper} center><Warn t={THEMES.paper}>40개 파일 수정 필요</Warn></Base>
  </div>
);

export const Neubrutalism = () => (
  <div style={{ width: 640, height: 200 }}>
    <Base t={THEMES.neubrutalism} center><Warn t={THEMES.neubrutalism}>Breaks on theme swap</Warn></Base>
  </div>
);

import React from 'react';
import { Base, Tag, THEMES } from 'lean-deck';
import './_fit';

export const Glass = () => (
  <div style={{ width: 640, height: 200 }}>
    <Base t={THEMES.glass} center><Tag t={THEMES.glass}>Semantic tokens</Tag></Base>
  </div>
);

export const Brutalism = () => (
  <div style={{ width: 640, height: 200 }}>
    <Base t={THEMES.brutalism} center><Tag t={THEMES.brutalism}>Before we start</Tag></Base>
  </div>
);

export const PaperKorean = () => (
  <div style={{ width: 640, height: 200 }}>
    <Base t={THEMES.paper} center><Tag t={THEMES.paper}>한국어 조판</Tag></Base>
  </div>
);

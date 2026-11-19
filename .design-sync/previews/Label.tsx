import React from 'react';
import { Base, Label, THEMES } from 'lean-deck';
import './_fit';

export const Accent = () => (
  <div style={{ width: 640, height: 200 }}>
    <Base t={THEMES.glass} center><Label t={THEMES.glass}>SEMANTIC TOKEN</Label></Base>
  </div>
);

export const Muted = () => (
  <div style={{ width: 640, height: 200 }}>
    <Base t={THEMES.apple} center><Label t={THEMES.apple} color={THEMES.apple.ink.mute}>replace</Label></Base>
  </div>
);

export const Korean = () => (
  <div style={{ width: 640, height: 200 }}>
    <Base t={THEMES.claymorphism} center><Label t={THEMES.claymorphism}>한 번만 쓰는 경우</Label></Base>
  </div>
);

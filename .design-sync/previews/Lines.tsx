import React from 'react';
import { Base, Card, Lines, THEMES } from 'lean-deck';
import './_fit';

export const HighlightedLines = () => (
  <div style={{ width: 960, height: 420 }}>
    <Base t={THEMES.glass}>
      <Card t={THEMES.glass}><Lines t={THEMES.glass} n={7} hi={[1, 4]} /></Card>
    </Base>
  </div>
);

export const ThickPaper = () => (
  <div style={{ width: 960, height: 420 }}>
    <Base t={THEMES.paper}>
      <Card t={THEMES.paper}><Lines t={THEMES.paper} n={4} h={20} gap={16} hi={[0]} /></Card>
    </Base>
  </div>
);

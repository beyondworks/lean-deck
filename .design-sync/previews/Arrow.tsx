import React from 'react';
import { Base, Arrow, Chip, THEMES } from 'lean-deck';
import './_fit';

export const RightWithLabel = () => (
  <div style={{ width: 1100, height: 260 }}>
    <Base t={THEMES.glass}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Chip t={THEMES.glass} warn>#06061a</Chip>
        <Arrow t={THEMES.glass} label="replace" />
        <Chip t={THEMES.glass} icon="layers">surface.page</Chip>
      </div>
    </Base>
  </div>
);

export const Down = () => (
  <div style={{ width: 640, height: 420 }}>
    <Base t={THEMES.paper} center>
      <Chip t={THEMES.paper} icon="doc">대본</Chip>
      <div style={{ margin: '12px 0' }}><Arrow t={THEMES.paper} dir="down" w={80} /></div>
      <Chip t={THEMES.paper} icon="window">슬라이드</Chip>
    </Base>
  </div>
);

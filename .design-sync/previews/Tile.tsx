import React from 'react';
import { Base, Tile, THEMES } from 'lean-deck';
import './_fit';

export const WhatShips = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.darkmorphism} wide>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 24 }}>
        <Tile t={THEMES.darkmorphism} icon="layers" sub="17 design languages" height={180}>themes.ts</Tile>
        <Tile t={THEMES.darkmorphism} icon="sparkle" sub="meaning → value" height={180}>tokens.ts</Tile>
        <Tile t={THEMES.darkmorphism} icon="desk" sub="frame · title · cards" height={180}>kit.tsx</Tile>
        <Tile t={THEMES.darkmorphism} icon="gauge" sub="bars · fork · doc · steps" height={180}>viz.tsx</Tile>
        <Tile t={THEMES.darkmorphism} icon="window" sub="keys · raw frame" height={180}>Viewer.tsx</Tile>
        <Tile t={THEMES.darkmorphism} icon="bolt" sub="capture · HTML · markers" height={180}>skill/</Tile>
      </div>
    </Base>
  </div>
);

export const PresentAndMissing = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.paper}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 24 }}>
        <Tile t={THEMES.paper} icon="desk" sub="있음">책상</Tile>
        <Tile t={THEMES.paper} icon="window" sub="있음">모니터</Tile>
        <Tile t={THEMES.paper} icon="book" sub="없음" dim>매뉴얼</Tile>
      </div>
    </Base>
  </div>
);

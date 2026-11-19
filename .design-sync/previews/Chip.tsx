import React from 'react';
import { Base, Chip, THEMES } from 'lean-deck';
import './_fit';

export const WithIcon = () => (
  <div style={{ width: 760, height: 240 }}>
    <Base t={THEMES.glass} center>
      <Chip t={THEMES.glass} icon="layers">surface.raised</Chip>
    </Base>
  </div>
);

export const Warn = () => (
  <div style={{ width: 760, height: 240 }}>
    <Base t={THEMES.darkmorphism} center>
      <Chip t={THEMES.darkmorphism} warn>background: #06061a</Chip>
    </Base>
  </div>
);

export const DimMissing = () => (
  <div style={{ width: 760, height: 240 }}>
    <Base t={THEMES.paper} center>
      <Chip t={THEMES.paper} icon="folder" dim>공유 폴더</Chip>
    </Base>
  </div>
);

export const StackedList = () => (
  <div style={{ width: 760, height: 420 }}>
    <Base t={THEMES.material}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Chip t={THEMES.material} icon="layers" style={{ width: '100%' }}>surface.page</Chip>
        <Chip t={THEMES.material} icon="layers" style={{ width: '100%' }}>surface.raised</Chip>
        <Chip t={THEMES.material} icon="layers" style={{ width: '100%' }}>text.soft</Chip>
      </div>
    </Base>
  </div>
);

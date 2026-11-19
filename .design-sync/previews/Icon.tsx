import React from 'react';
import { Base, Icon, THEMES } from 'lean-deck';
import './_fit';

export const Wells = () => (
  <div style={{ width: 960, height: 240 }}>
    <Base t={THEMES.claymorphism} center>
      <div style={{ display: 'flex', gap: 20 }}>
        <Icon t={THEMES.claymorphism} name="doc" />
        <Icon t={THEMES.claymorphism} name="layers" />
        <Icon t={THEMES.claymorphism} name="sparkle" />
        <Icon t={THEMES.claymorphism} name="team" />
      </div>
    </Base>
  </div>
);

export const SizesAndWarnColor = () => (
  <div style={{ width: 960, height: 240 }}>
    <Base t={THEMES.darkmorphism} center>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <Icon t={THEMES.darkmorphism} name="check" size={48} />
        <Icon t={THEMES.darkmorphism} name="bolt" size={64} />
        <Icon t={THEMES.darkmorphism} name="warn" size={80} color={THEMES.darkmorphism.warn.color} />
      </div>
    </Base>
  </div>
);

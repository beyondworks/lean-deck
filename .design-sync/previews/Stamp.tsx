import React from 'react';
import { Base, Stamp, THEMES } from 'lean-deck';
import './_fit';

export const AllKinds = () => (
  <div style={{ width: 960, height: 420 }}>
    <Base t={THEMES.darkmorphism}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Stamp t={THEMES.darkmorphism} kind="o">True</Stamp>
        <Stamp t={THEMES.darkmorphism} kind="x">Not with tokens</Stamp>
        <Stamp t={THEMES.darkmorphism} kind="tri">Only line breaking</Stamp>
        <Stamp t={THEMES.darkmorphism} kind="q">Undecided</Stamp>
      </div>
    </Base>
  </div>
);

export const KoreanPaper = () => (
  <div style={{ width: 960, height: 420 }}>
    <Base t={THEMES.paper}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Stamp t={THEMES.paper} kind="o">사실</Stamp>
        <Stamp t={THEMES.paper} kind="x">틀림</Stamp>
      </div>
    </Base>
  </div>
);

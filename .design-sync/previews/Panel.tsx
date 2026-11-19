import React from 'react';
import { Base, Row, Panel, Chip, Arrow, THEMES } from 'lean-deck';
import './_fit';

export const HandStyledVsTokens = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.darkmorphism} wide>
      <Row cols="minmax(0,1fr) auto minmax(0,1fr)">
        <Panel t={THEMES.darkmorphism} icon="x" label="Hand-styled slide">
          <Chip t={THEMES.darkmorphism} warn style={{ width: '100%' }}>background: #06061a</Chip>
          <Chip t={THEMES.darkmorphism} warn style={{ width: '100%' }}>border: 1px solid #34d39955</Chip>
          <Chip t={THEMES.darkmorphism} warn style={{ width: '100%' }}>color: rgba(255,255,255,.6)</Chip>
        </Panel>
        <div style={{ display: 'flex', alignItems: 'center' }}><Arrow t={THEMES.darkmorphism} label="replace" /></div>
        <Panel t={THEMES.darkmorphism} icon="check" label="Token-driven slide">
          <Chip t={THEMES.darkmorphism} icon="layers" style={{ width: '100%' }}>surface.page</Chip>
          <Chip t={THEMES.darkmorphism} icon="layers" style={{ width: '100%' }}>surface.raised</Chip>
          <Chip t={THEMES.darkmorphism} icon="layers" style={{ width: '100%' }}>text.soft</Chip>
        </Panel>
      </Row>
    </Base>
  </div>
);

export const TitleOnlyInset = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.apple}>
      <Row>
        <Panel t={THEMES.apple} icon="clock" label="이전" title="회의 전날 밤새 슬라이드 수정" inset />
        <Panel t={THEMES.apple} icon="bolt" label="지금" title="테마 id 하나 바꾸고 퇴근" />
      </Row>
    </Base>
  </div>
);

import React from 'react';
import { Base, Txt, FS, THEMES } from 'lean-deck';
import './_fit';

export const InkLevels = () => (
  <div style={{ width: 960, height: 380 }}>
    <Base t={THEMES.darkmorphism}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Txt t={THEMES.darkmorphism} size={FS.key} weight={700}>Strong — the main point</Txt>
        <Txt t={THEMES.darkmorphism} soft>Soft — supporting text</Txt>
        <Txt t={THEMES.darkmorphism} mute>Mute — captions and meta</Txt>
        <Txt t={THEMES.darkmorphism} accent weight={700}>Accent — the one highlighted word</Txt>
      </div>
    </Base>
  </div>
);

export const ScalePaper = () => (
  <div style={{ width: 960, height: 380 }}>
    <Base t={THEMES.paper}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Txt t={THEMES.paper} size={FS.key} weight={700}>key 36 · 핵심 문장</Txt>
        <Txt t={THEMES.paper} size={FS.item} weight={600}>item 29 · 항목 제목</Txt>
        <Txt t={THEMES.paper} size={FS.body}>body 25 · 본문 설명</Txt>
        <Txt t={THEMES.paper} size={FS.label} mute>label 19 · 라벨</Txt>
      </div>
    </Base>
  </div>
);

import React from 'react';
import { Base, Fork, THEMES } from 'lean-deck';
import './_fit';

export const WhenToAddAPart = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.darkmorphism} center>
      <Fork t={THEMES.darkmorphism} q="Does this slide need a new visual?"
        left={{ tag: 'Used once', text: 'Build it inside the deck file', icon: 'doc' }}
        right={{ tag: 'Used twice', text: 'Move it into viz.tsx', icon: 'layers' }} />
    </Base>
  </div>
);

export const KoreanFlat = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.flat} center>
      <Fork t={THEMES.flat} q="발표를 혼자 하나요?"
        left={{ tag: '혼자', text: '대본에 마커를 넣어 자동 전환', icon: 'note' }}
        right={{ tag: '여럿이', text: '테마를 공유해 같은 모양으로', icon: 'team' }} />
    </Base>
  </div>
);

import React from 'react';
import { Base, Head, Compare, Tail, THEMES } from 'lean-deck';
import './_fit';

export const Depth = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.neumorphism} wide>
      <Head t={THEMES.neumorphism} eyebrow="Depth means something" pre="Raised is a thing;" accent="inset is a container" post="." size={48} />
      <Compare t={THEMES.neumorphism} beforeLabel="Inset — held inside" afterLabel="Raised — placed on top" rows={[
        { label: 'Reads as', before: 'A quote, a prior state, a slot', after: 'An object of its own' },
        { label: 'Used for', before: 'The before column, icon wells', after: 'Every ordinary card' },
        { label: 'Never for', before: 'Emphasis', after: 'Emphasis' },
      ]} />
      <Tail t={THEMES.neumorphism}>Emphasis is carried by wording and label colour, not by depth or borders.</Tail>
    </Base>
  </div>
);

export const DefaultLabelsKorean = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.darkmode} wide>
      <Compare t={THEMES.darkmode} rows={[
        { label: '디자인 변경', before: '슬라이드 40장을 하나씩 수정', after: '테마 id 한 줄 교체' },
        { label: '한글 줄바꿈', before: '조사가 줄 끝에 홀로 남음', after: '어절 단위로 끊김' },
      ]} />
    </Base>
  </div>
);

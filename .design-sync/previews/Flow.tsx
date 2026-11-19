import React from 'react';
import { Base, Head, Flow, THEMES } from 'lean-deck';
import './_fit';

export const TokensWithCode = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.darkmorphism} wide>
      <Head t={THEMES.darkmorphism} eyebrow="What a theme holds" pre="A token for every" accent="decision a slide can make" post="." size={48} />
      <Flow t={THEMES.darkmorphism} steps={[
        { n: '1', title: 'page', code: 'background', desc: 'The ground the slide sits on' },
        { n: '2', title: 'card / cardHi', code: 'raised · inset', desc: 'The surface material' },
        { n: '3', title: 'ink', code: 'strong · soft · mute', desc: 'Three levels of text weight' },
        { n: '4', title: 'accent · bar', code: 'colour · gradient', desc: 'Highlight and rules' },
      ]} />
    </Base>
  </div>
);

export const ThreeStepsKorean = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.paper}>
      <Flow t={THEMES.paper} steps={[
        { n: 1, title: '대본 쓰기', desc: '말할 내용을 슬라이드 배열로 정리' },
        { n: 2, title: '테마 고르기', desc: '17개 디자인 언어 중 하나를 id로 지정' },
        { n: 3, title: '내보내기', desc: 'PDF·이미지·영상으로 바로 출력' },
      ]} />
    </Base>
  </div>
);

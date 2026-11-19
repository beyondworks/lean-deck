import React from 'react';
import { Base, Head, Row, Myth, THEMES } from 'lean-deck';
import './_fit';

export const TwoBeliefs = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.claymorphism} wide>
      <Head t={THEMES.claymorphism} eyebrow="Before we start" pre="Two things people" accent="assume" post=" about restyling." size={52} />
      <Row>
        <Myth t={THEMES.claymorphism} idx="BELIEF 1" quote="To restyle, you edit every slide by hand." stamp="Not with tokens" stampKind="x" />
        <Myth t={THEMES.claymorphism} idx="BELIEF 2" quote="Korean text needs its own layout." stamp="Only line breaking" stampKind="tri" />
      </Row>
    </Base>
  </div>
);

export const StampKinds = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.paper} wide>
      <Row>
        <Myth t={THEMES.paper} idx="통념 1" quote="테마는 색만 바꾼다." stamp="표면까지 바뀜" stampKind="o" />
        <Myth t={THEMES.paper} idx="통념 2" quote="슬라이드는 디자이너만 만든다." />
        <Myth t={THEMES.paper} idx="통념 3" quote="영상용 덱은 따로 만든다." stamp="아직 모름" stampKind="q" />
      </Row>
    </Base>
  </div>
);

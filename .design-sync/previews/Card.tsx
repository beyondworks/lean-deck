import React from 'react';
import { Base, Card, Txt, Label, Row, FS, THEMES } from 'lean-deck';
import './_fit';

export const RaisedAndInset = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.claymorphism} wide>
      <Row>
        <Card t={THEMES.claymorphism}>
          <Label t={THEMES.claymorphism}>RAISED · t.card</Label>
          <div style={{ marginTop: 16 }}><Txt t={THEMES.claymorphism} size={FS.key} weight={700}>An object placed on the page</Txt></div>
        </Card>
        <Card t={THEMES.claymorphism} inset>
          <Label t={THEMES.claymorphism}>INSET · t.cardHi</Label>
          <div style={{ marginTop: 16 }}><Txt t={THEMES.claymorphism} size={FS.key} weight={700}>Something held inside</Txt></div>
        </Card>
      </Row>
    </Base>
  </div>
);

export const SingleGlass = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.glass}>
      <Card t={THEMES.glass}>
        <Txt t={THEMES.glass} size={FS.key} weight={700}>카드는 원시 요소입니다.</Txt>
        <div style={{ marginTop: 14 }}><Txt t={THEMES.glass} soft>나머지는 flex나 grid 배치일 뿐이에요.</Txt></div>
      </Card>
    </Base>
  </div>
);

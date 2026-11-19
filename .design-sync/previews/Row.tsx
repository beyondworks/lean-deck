import React from 'react';
import { Base, Row, Panel, Txt, FS, THEMES } from 'lean-deck';
import './_fit';

export const EqualColumns = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.material} wide>
      <Row>
        <Panel t={THEMES.material} icon="pen" label="keep-all · line-break: strict">
          <Txt t={THEMES.material} size={FS.item} weight={700}>줄은 단어 단위로, 조사는 강조에 붙여서.</Txt>
        </Panel>
        <Panel t={THEMES.material} icon="check" label="One type scale for both scripts">
          <Txt t={THEMES.material} size={FS.item} weight={700}>Latin and Hangul share one scale.</Txt>
        </Panel>
      </Row>
    </Base>
  </div>
);

export const CustomCols = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.darkmode} wide>
      <Row cols="minmax(0,1.6fr) minmax(0,1fr)">
        <Panel t={THEMES.darkmode} icon="doc" label="Main · 1.6fr" title="The wider column carries the argument" />
        <Panel t={THEMES.darkmode} icon="note" label="Aside · 1fr" title="The narrow one a note" />
      </Row>
    </Base>
  </div>
);

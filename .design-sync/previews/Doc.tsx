import React from 'react';
import { Base, Row, Doc, Panel, Lines, Txt, FS, THEMES } from 'lean-deck';
import './_fit';

export const ThemeByMeaning = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.glass} wide>
      <Row cols="minmax(0,1.2fr) minmax(0,1fr)">
        <Doc t={THEMES.glass} name="toSemantic(THEMES.glass)" rows={[
          { k: 'surface.raised', v: 'rgba(255,255,255,0.04)', hi: true },
          { k: 'text.soft', v: 'rgba(255,255,255,0.62)' },
          { k: 'accent.primary', v: '#34d399', hi: true },
          { k: 'font.body', v: 'Noto Sans KR' },
        ]} />
        <Panel t={THEMES.glass} icon="window" label="The slide sees only the names">
          <Lines t={THEMES.glass} n={7} hi={[1, 4]} />
          <Txt t={THEMES.glass} soft size={FS.body} style={{ marginTop: 'auto' }}>Values change per theme. Names never do.</Txt>
        </Panel>
      </Row>
    </Base>
  </div>
);

export const ValuesOnlyKorean = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.fluent}>
      <Doc t={THEMES.fluent} name="회의록_1118.md" rows={[
        { v: '테마는 URL 파라미터로 전환' },
        { v: '다음 주까지 17개 테마 검수', hi: true },
        { v: '영상 내보내기는 보류' },
      ]} />
    </Base>
  </div>
);

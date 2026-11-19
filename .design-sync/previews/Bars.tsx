import React from 'react';
import { Base, Head, Bars, THEMES } from 'lean-deck';
import './_fit';

export const FilesTouched = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.glass} wide>
      <Head t={THEMES.glass} eyebrow="A 40-slide deck" pre="Files you touch to" accent="change the look" post="." size={52} />
      <Bars t={THEMES.glass} max={41} rows={[
        { label: 'Styled by hand', value: 40, text: '40' },
        { label: 'Shared stylesheet', value: 1, text: '1+' },
        { label: 'lean-deck', value: 0, text: '0' },
      ]} unit=" files" />
    </Base>
  </div>
);

export const NoHighlightPaper = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.paper} wide>
      <Bars t={THEMES.paper} max={100} hiLast={false} unit="%" rows={[
        { label: '기획', value: 35, text: '35' },
        { label: '작성', value: 45, text: '45' },
        { label: '디자인', value: 20, text: '20' },
      ]} />
    </Base>
  </div>
);

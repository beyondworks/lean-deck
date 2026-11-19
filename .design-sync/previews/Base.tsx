import React from 'react';
import { Base, Head, Tail, Banner, THEMES } from 'lean-deck';
import './_fit';

export const Glass = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.glass}>
      <Head t={THEMES.glass} eyebrow="Two lines, and only two" pre="Badge border, title and card border sit on" accent="the first" post="." size={46} />
      <Banner t={THEMES.glass}>Card text, bullet dots and accent bars all sit on the second line.</Banner>
      <Tail t={THEMES.glass}>A caption begins exactly where a quote begins — marker first, then the words.</Tail>
    </Base>
  </div>
);

export const CenteredMacintosh = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.macintosh} center>
      <Head t={THEMES.macintosh} eyebrow="center" pre="Base" accent="centres" post=" everything it holds." size={56} />
    </Base>
  </div>
);

export const WideNeumorphism = () => (
  <div style={{ width: 1920, height: 1080 }}>
    <Base t={THEMES.neumorphism} wide>
      <Head t={THEMES.neumorphism} eyebrow="wide" pre="A wide slide gives content" accent="1800px" post=" instead of 1440." size={52} />
      <Banner t={THEMES.neumorphism}>Use wide for three-column grids, comparisons and step rows.</Banner>
    </Base>
  </div>
);

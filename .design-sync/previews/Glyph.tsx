import React from 'react';
import { Glyph } from 'lean-deck';
import './_fit';

export const AllGlyphs = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 40px)', gap: 16, color: '#1f2937' }}>
    {(['doc', 'folder', 'chat', 'note', 'check', 'x', 'question', 'clock', 'search', 'layers', 'cloud', 'team',
      'warn', 'book', 'list', 'gauge', 'repeat', 'moon', 'sun', 'pen', 'sparkle', 'desk', 'window', 'bolt'] as const)
      .map((n) => <Glyph key={n} name={n} size={32} />)}
  </div>
);

export const ColorAndStroke = () => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
    <Glyph name="sparkle" size={48} color="#10b981" />
    <Glyph name="layers" size={48} color="#6366f1" sw={1.5} />
    <Glyph name="bolt" size={48} color="#e11d48" sw={3} />
  </div>
);

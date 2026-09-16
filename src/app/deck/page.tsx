'use client';
import { Suspense } from 'react';
import { DeckViewer } from '@/lean-deck/Viewer';
import { demoSlides } from '@/lean-deck/DemoDeck';
import { vizSlides } from '@/lean-deck/VizDeck';

// /deck?deck=demo|viz&i=0&theme=glass&raw=1
export default function DeckPage() {
  return (
    <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}>
      <DeckViewer decks={{ demo: demoSlides, viz: vizSlides }} defaultDeck="demo" />
    </Suspense>
  );
}

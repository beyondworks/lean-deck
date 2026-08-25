import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'lean-deck — token-driven slide kit',
  description: 'One slide API, seventeen design languages. Swap the theme id, the whole deck changes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, background: '#0b0b0d' }}>{children}</body>
    </html>
  );
}

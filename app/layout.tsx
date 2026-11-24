import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Caveat } from 'next/font/google';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const hand = Caveat({ subsets: ['latin'], variable: '--font-hand' });

export const metadata: Metadata = {
  title: 'Tanvi Bhadane — A little about me',
  description:
    'Personal portfolio of Tanvi Bhadane — engineering graduate interested in technology, data and design. Data analytics, UI/UX and creative projects.',
  keywords: ['Tanvi Bhadane', 'portfolio', 'data analytics', 'UI/UX', 'web development'],
  openGraph: {
    title: 'Tanvi Bhadane — A little about me',
    description:
      'A personal journal-style portfolio: projects, skills and the person behind them.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${hand.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

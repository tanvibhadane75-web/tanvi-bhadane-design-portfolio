import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Caveat } from 'next/font/google';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const hand = Caveat({ subsets: ['latin'], variable: '--font-hand' });

export const metadata: Metadata = {
  title: 'Tanvi Bhadane — Technology, Data & Design Portfolio',
  description:
    'Explore the portfolio of Tanvi Bhadane, an Electronics and Telecommunication engineering graduate interested in UI/UX design, product thinking, data analytics and thoughtful digital experiences.',
  keywords: ['Tanvi Bhadane', 'portfolio', 'data analytics', 'UI/UX', 'web development'],
  openGraph: {
    title: 'Tanvi Bhadane — Technology, Data & Design Portfolio',
    description:
      'A creative journal-style portfolio featuring projects, skills and the person behind them.',
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

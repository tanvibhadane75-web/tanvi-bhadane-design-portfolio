import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Devanagari, Playfair_Display, Caveat } from 'next/font/google';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['400', '500', '600', '700'], variable: '--font-devanagari' });
const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const hand = Caveat({ subsets: ['latin'], variable: '--font-hand' });

export const metadata: Metadata = {
  title: 'Tanvi Bhadane — A Little Journal of a Curious Mind',
  description:
    'A scrapbook-style portfolio by Tanvi Bhadane, an engineering graduate interested in technology, data, design, music, books and building thoughtful digital experiences.',
  keywords: ['Tanvi Bhadane', 'portfolio', 'data analytics', 'UI/UX', 'web development', 'design'],
  openGraph: {
    title: 'Tanvi Bhadane — A Little Journal of a Curious Mind',
    description:
      'Explore selected projects, case notes, creative interests and the person behind the work.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF6EF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${hand.variable} ${devanagari.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

// @ts-expect-error Next.js resolves global CSS imports during bundling.
import './globals.css';
import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';

const sans = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  style: ['normal', 'italic'],
  axes: ['SOFT', 'opsz'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VAARI - Premium Bottled Water | Stay Pure. Stay Hydrated.',
  description: 'VAARI by SATPREM SOLUTIONS delivers pure, RO purified water across Haryana. FSSAI certified, eco-friendly packaging, and white-label solutions for businesses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}

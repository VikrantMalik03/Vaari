import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VAARI - Premium Bottled Water | Stay Pure. Stay Hydrated.',
  description: 'VAARI by SATPREM SOLUTIONS delivers pure, copper-enriched RO water across Delhi NCR. FSSAI certified, eco-friendly packaging, and white-label solutions for businesses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

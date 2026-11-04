'use client';

import { Toaster } from 'sonner';
import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { DeliverySection } from '@/components/delivery-section';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { Navigation } from '@/components/navigation';
import { ProcessSection } from '@/components/process-section';
import { ProductsSection } from '@/components/products-section';
import { MotionProvider } from '@/components/site/motion';
import { TestimonialsSection } from '@/components/testimonials-section';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { WhiteLabelSection } from '@/components/white-label-section';

const TICKER = ['Stay Pure', 'Stay Hydrated', 'With the Goodness of Copper', 'FSSAI Certified', 'Delivered Across Delhi NCR', 'White-Label Solutions'];

function Ticker() {
  return (
    <div className="relative z-10 overflow-hidden bg-ocean py-5 text-white">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span key={i} className="flex items-center font-display text-xl font-light italic sm:text-2xl">
                {item}
                <span className="mx-7 h-1.5 w-1.5 rounded-full bg-copper-light" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <MotionProvider>
      <div aria-hidden className="preloader">
        <img src="/brand/vaari-logo-light.webp" alt="" className="w-44" />
      </div>
      <Navigation />
      <main>
        <HeroSection />
        <Ticker />
        <ProductsSection />
        <ProcessSection />
        <AboutSection />
        <WhiteLabelSection />
        <DeliverySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </MotionProvider>
  );
}

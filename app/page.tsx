'use client';

import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ProductsSection } from '@/components/products-section';
import { DeliverySection } from '@/components/delivery-section';
import { ContactSection } from '@/components/contact-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { Footer } from '@/components/footer';
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <DeliverySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <Toaster position="top-right" richColors />
    </main>
  );
}

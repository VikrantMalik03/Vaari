'use client';

import { Award } from 'lucide-react';
import { Reveal, RiseText, ScrollText } from '@/components/site/motion';

const MISSION =
  'Our mission is to deliver pure, safe, and high-quality drinking water that enriches health and convenience for every customer, while empowering businesses to build their own brand identity through reliable white-label water solutions.';

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-paper py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow mb-6 text-copper-dark">About VAARI</p>
            </Reveal>
            <RiseText
              text="Founded in 2025 with a clear purpose."
              className="text-4xl font-light leading-[1.06] text-ink sm:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
                SATPREM SOLUTIONS was founded to make pure, safe, and reliable drinking water accessible
                to everyone, while helping businesses strengthen their brand identity through custom
                white-label solutions.
              </p>
            </Reveal>
          </div>

          <div className="space-y-10 lg:pt-14">
            <Reveal>
              <h3 className="mb-3 text-2xl font-normal text-ink">Our Story</h3>
              <p className="leading-relaxed text-ink/70">
                The idea for the company came from recognizing a growing need in the market. We saw
                businesses and individuals seeking not just quality water, but a trusted partner who
                could deliver consistency, purity, and personalized service.
              </p>
            </Reveal>
            <div className="h-px bg-ink/10" />
            <Reveal delay={0.1}>
              <h3 className="mb-3 text-2xl font-normal text-ink">What We Do</h3>
              <p className="leading-relaxed text-ink/70">
                <strong className="font-bold text-ink">SATPREM SOLUTIONS</strong>, under its premium water
                brand <strong className="font-bold text-ocean">VAARI</strong>, delivers pure, refreshing, and
                safe drinking water to consumers and businesses alike. We specialize in bottled water
                distribution under our own trusted brand, ensuring every drop reflects the highest
                standards of purity and quality.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="hero-water noise relative mt-20 overflow-hidden rounded-[2rem] px-6 py-16 text-white sm:px-14 lg:mt-32 lg:rounded-[3rem] lg:py-28">
          <p className="eyebrow mb-8 text-aqua">Our Mission</p>
          <ScrollText text={MISSION} className="max-w-5xl font-display text-2xl font-light leading-[1.3] sm:text-4xl lg:text-5xl" />
          <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 py-2.5 pl-3 pr-5 backdrop-blur-sm">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-copper-light text-ink">
              <Award className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold">FSSAI Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { Star } from 'lucide-react';
import { Counter, Reveal, RiseText } from '@/components/site/motion';
import { STATS, TESTIMONIALS } from '@/lib/site-data';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-paper py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-6 text-copper-dark">What Our Customers Say</p>
        </Reveal>
        <RiseText
          text="Trusted by individuals and businesses across Delhi NCR."
          className="max-w-4xl text-4xl font-light leading-[1.06] text-ink sm:text-6xl"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-28px_rgba(10,51,80,0.55)] lg:p-10">
                <div>
                  <div className="flex gap-1" role="img" aria-label="Rated 5 out of 5">
                    {[0, 1, 2, 3, 4].map((n) => (
                      <Star key={n} className="h-4 w-4 fill-copper text-copper" />
                    ))}
                  </div>
                  <blockquote className="mt-6 font-display text-2xl font-light leading-snug text-ink lg:text-3xl">
                    &ldquo;{t.message}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-9 flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-ocean to-ocean-deep font-display text-lg text-white">
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{t.name}</span>
                    <span className="block text-sm text-ink/60">{t.company ?? t.type}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 gap-y-10 border-t border-ink/10 pt-12 lg:grid-cols-4">
          {STATS.map((stat) => (
            <Reveal key={stat.label} y={20}>
              <p className="font-display text-5xl font-light text-ocean lg:text-7xl">
                {stat.text ?? <Counter value={stat.value as number} suffix={stat.suffix} />}
              </p>
              <p className="mt-2 text-sm font-semibold text-ink/65">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

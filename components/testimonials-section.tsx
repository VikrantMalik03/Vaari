'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ReviewCard } from '@/components/review-card';
import { Counter, Reveal, RiseText } from '@/components/site/motion';
import type { PublishedFeedback } from '@/lib/feedback';
import { STATS } from '@/lib/site-data';

const SHOWN_ON_HOME = 4;

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<PublishedFeedback[] | null>(null);

  // The home page stays fast and static, and real reviews load in fresh on each visit.
  useEffect(() => {
    fetch('/api/feedback')
      .then((res) => (res.ok ? res.json() : { feedback: [] }))
      .then((data) => setReviews(data.feedback ?? []))
      .catch(() => setReviews([]));
  }, []);

  return (
    <section id="testimonials" className="bg-paper py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-6 text-copper-dark">What Our Customers Say</p>
        </Reveal>
        <RiseText text="Real reviews from real customers." className="max-w-4xl text-4xl font-light leading-[1.06] text-ink sm:text-6xl" />

        {reviews === null && (
          <div aria-hidden className="mt-14 grid gap-5 md:grid-cols-2">
            {[0, 1].map((n) => (
              <div key={n} className="h-52 animate-pulse rounded-3xl bg-ink/5" />
            ))}
          </div>
        )}

        {reviews?.length === 0 && (
          <Reveal className="mt-14">
            <div className="rounded-3xl border border-dashed border-ink/20 px-7 py-14 text-center">
              <h3 className="text-3xl font-light text-ink">Be the first to share</h3>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink/65">
                We only show feedback from real customers. Tried VAARI? Tell us how it went.
              </p>
            </div>
          </Reveal>
        )}

        {reviews && reviews.length > 0 && (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {reviews.slice(0, SHOWN_ON_HOME).map((review, i) => (
              <Reveal key={review.id} delay={i * 0.1} y={26}>
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-8">
          <Link href="/feedback" className="btn-fill bg-ink text-white">
            {reviews && reviews.length > SHOWN_ON_HOME ? 'Read All Reviews' : 'Share Your Feedback'} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

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

import { Star } from 'lucide-react';
import type { PublishedFeedback } from '@/lib/feedback';

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`h-4 w-4 ${n <= rating ? 'fill-copper text-copper' : 'text-ink/20'}`} />
      ))}
      <span aria-hidden className="ml-1.5 text-xs font-bold text-ink/60">
        {rating}/5
      </span>
    </div>
  );
}

export function ReviewCard({ review }: { review: PublishedFeedback }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-28px_rgba(10,51,80,0.55)] lg:p-7">
      <div>
        <Stars rating={review.rating} />
        <blockquote className="mt-4 whitespace-pre-line break-words leading-relaxed text-ink/85">{review.message}</blockquote>
      </div>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-ocean to-ocean-deep font-display text-white">
          {review.customer_name[0].toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold text-ink">{review.customer_name}</span>
          {review.company_name && <span className="block truncate text-xs text-ink/60">{review.company_name}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

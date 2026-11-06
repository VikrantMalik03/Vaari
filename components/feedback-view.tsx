'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, Send, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { Bubbles, MotionProvider, Reveal, RiseText, scrollToTarget, WaveEdge } from '@/components/site/motion';
import { WhatsAppButton } from '@/components/whatsapp-button';
import type { PublishedFeedback } from '@/lib/feedback';

const EMPTY = { name: '', company: '', message: '', website: '' };
const RATING_WORDS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

const FIELD =
  'peer w-full rounded-none border-0 border-b-2 border-ink/15 bg-transparent pb-2.5 pt-6 text-base text-ink outline-none transition-colors focus:border-copper';
const LABEL =
  'pointer-events-none absolute left-0 top-6 text-base text-ink/55 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:text-copper-dark peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-bold';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`h-4 w-4 ${n <= rating ? 'fill-copper text-copper' : 'text-ink/20'}`} />
      ))}
    </div>
  );
}

function FeedbackForm() {
  const [form, setForm] = useState(EMPTY);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const card = useRef<HTMLDivElement>(null);

  // The card shrinks after sending, so bring the thank-you message into view.
  useEffect(() => {
    if (!sent || !card.current) return;
    scrollToTarget(card.current.getBoundingClientRect().top + window.scrollY - 110);
  }, [sent]);

  const set = (field: keyof typeof EMPTY, value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  const shown = hovered || rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setRatingError(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating, consent }),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSent(true);
    } catch (error) {
      console.error(error);
      toast.error('We could not save your feedback. Please try again in a little while.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={card} className="rounded-[2rem] bg-white p-7 shadow-[0_40px_80px_-40px_rgba(10,51,80,0.45)] sm:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center" role="status">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ocean text-white"
            >
              <Check className="h-8 w-8" />
            </motion.span>
            <h2 className="mt-6 text-3xl font-light text-ink">Thank you, {form.name.split(' ')[0]}</h2>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink/65">
              Our team has received your feedback. It will appear on this page once it has been reviewed.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0, y: -12 }} onSubmit={handleSubmit}>
            <h2 className="text-3xl font-light text-ink">Share your experience</h2>
            <p className="mb-7 mt-1.5 text-sm text-ink/60">Tell us how VAARI has been for you.</p>

            <fieldset>
              <legend className="mb-2 text-xs font-bold text-ink/60">Your rating *</legend>
              <div className="flex items-center gap-1" onMouseLeave={() => setHovered(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <motion.button
                    key={n}
                    type="button"
                    whileHover={{ scale: 1.18 }}
                    whileTap={{ scale: 0.88 }}
                    aria-label={`${n} out of 5: ${RATING_WORDS[n]}`}
                    aria-pressed={rating === n}
                    onMouseEnter={() => setHovered(n)}
                    onClick={() => {
                      setRating(n);
                      setRatingError(false);
                    }}
                    className="grid h-11 w-11 place-items-center rounded-full"
                  >
                    <Star className={`h-8 w-8 transition-colors duration-200 ${n <= shown ? 'fill-copper text-copper' : 'text-ink/25'}`} />
                  </motion.button>
                ))}
                <span className="ml-2 text-sm font-semibold text-ink/65">{RATING_WORDS[shown]}</span>
              </div>
              {ratingError && <p className="mt-1 text-sm font-semibold text-destructive">Please choose a rating.</p>}
            </fieldset>

            <div className="mt-6 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="relative">
                  <input id="fb-name" required minLength={2} maxLength={80} placeholder=" " autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} className={FIELD} />
                  <label htmlFor="fb-name" className={LABEL}>Your Name *</label>
                </div>
                <div className="relative">
                  <input id="fb-company" maxLength={100} placeholder=" " autoComplete="organization" value={form.company} onChange={(e) => set('company', e.target.value)} className={FIELD} />
                  <label htmlFor="fb-company" className={LABEL}>Company (optional)</label>
                </div>
              </div>
              <div className="relative">
                <textarea id="fb-message" required minLength={10} maxLength={1000} rows={4} placeholder=" " value={form.message} onChange={(e) => set('message', e.target.value)} className={`${FIELD} resize-none`} />
                <label htmlFor="fb-message" className={LABEL}>Your Feedback *</label>
              </div>
              {/* Hidden from people. Bots that fill it in are ignored. */}
              <input aria-hidden tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website', e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-ink/70">
                <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#1f7299]" />
                VAARI may publish my name and feedback on this website.
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn-fill mt-8 w-full bg-ink py-5 text-base text-white disabled:opacity-70">
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Submit Feedback
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FeedbackView({ feedback }: { feedback: PublishedFeedback[] }) {
  const average = feedback.length ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length : 0;

  return (
    <MotionProvider>
      <Navigation />
      <main>
        <section className="hero-water noise relative overflow-hidden pb-32 pt-36 text-white lg:pb-40 lg:pt-44">
          <Bubbles count={24} className="absolute inset-0 h-full w-full" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <p className="eyebrow mb-6 text-aqua">Customer Feedback</p>
            <RiseText as="h1" immediate delay={0.15} text="Real words from real customers." className="max-w-4xl text-5xl font-light leading-[1.05] sm:text-7xl" />
            {feedback.length > 0 && (
              <Reveal delay={0.4} y={14}>
                <p className="mt-7 text-lg text-white/80">
                  Rated {average.toFixed(1)} out of 5 from {feedback.length} published {feedback.length === 1 ? 'review' : 'reviews'}
                </p>
              </Reveal>
            )}
          </div>
          <WaveEdge color="#f7fbfc" className="absolute inset-x-0 -bottom-px" />
        </section>

        <section className="bg-paper pb-28 pt-12">
          <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              {feedback.length === 0 ? (
                <Reveal>
                  <div className="rounded-3xl border border-dashed border-ink/20 px-7 py-16 text-center">
                    <h2 className="text-3xl font-light text-ink">Be the first to share</h2>
                    <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink/65">
                      We only show feedback from real customers. Yours could be the first one here.
                    </p>
                  </div>
                </Reveal>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  {feedback.map((item, i) => (
                    <Reveal key={item.id} delay={(i % 2) * 0.1} y={26}>
                      <figure className="flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-28px_rgba(10,51,80,0.55)]">
                        <div>
                          <Stars rating={item.rating} />
                          <blockquote className="mt-4 whitespace-pre-line break-words leading-relaxed text-ink/85">{item.message}</blockquote>
                        </div>
                        <figcaption className="mt-6 flex items-center gap-3">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-ocean to-ocean-deep font-display text-white">
                            {item.customer_name[0].toUpperCase()}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-bold text-ink">{item.customer_name}</span>
                            {item.company_name && <span className="block truncate text-xs text-ink/60">{item.company_name}</span>}
                          </span>
                        </figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>

            <div className="order-1 lg:sticky lg:top-28 lg:order-2">
              <Reveal y={40}>
                <FeedbackForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </MotionProvider>
  );
}

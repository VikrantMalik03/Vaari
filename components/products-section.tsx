'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowRight, Award, Droplets, ShieldCheck, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { scrollToTarget, RiseText } from '@/components/site/motion';
import { PRODUCTS, TWENTY_LITRE_IMAGE, type Product } from '@/lib/site-data';

const EASE = [0.22, 1, 0.36, 1] as const;

const QUALITIES = [
  { icon: ShieldCheck, label: 'RO Purified' },
  { icon: Award, label: 'Copper Enriched' },
  { icon: Droplets, label: '100% Pure' },
];

/** Illustration shown until the real 20 litre photo is added. */
function TwentyLitreIllustration() {
  return (
    <svg viewBox="0 0 300 560" role="img" aria-label="VAARI 20 litre bottle" className="h-full w-auto">
      <defs>
        <linearGradient id="jar-body" x1="0" x2="1">
          <stop offset="0" stopColor="#5fb6d4" stopOpacity="0.75" />
          <stop offset="0.28" stopColor="#c9eef6" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#7fcde3" stopOpacity="0.45" />
          <stop offset="1" stopColor="#2b86ad" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="jar-cap" x1="0" x2="1">
          <stop offset="0" stopColor="#0e4f75" />
          <stop offset="0.4" stopColor="#3ba3c9" />
          <stop offset="1" stopColor="#0a3350" />
        </linearGradient>
      </defs>
      <rect x="112" y="4" width="76" height="40" rx="9" fill="url(#jar-cap)" />
      <rect x="120" y="42" width="60" height="26" fill="#a8dfec" fillOpacity="0.8" />
      <path
        d="M120 66 C120 92 44 96 30 138 C24 156 24 176 24 192 L24 500 C24 536 50 554 84 554 L216 554 C250 554 276 536 276 500 L276 192 C276 176 276 156 270 138 C256 96 180 92 180 66 Z"
        fill="url(#jar-body)"
        stroke="#d9f4fa"
        strokeOpacity="0.65"
        strokeWidth="2"
      />
      {[178, 462].map((y) => (
        <path key={y} d={`M24 ${y} C90 ${y + 16} 210 ${y + 16} 276 ${y}`} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="5" />
      ))}
      <path d="M58 130 C46 170 46 440 58 510" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="9" strokeLinecap="round" />
      <rect x="50" y="218" width="200" height="214" rx="6" fill="#fff" />
      <image href="/logo_vaari.png" x="88" y="230" width="124" height="146" />
      <text x="150" y="412" textAnchor="middle" fontFamily="Georgia, serif" fontSize="28" fill="#0a3350">
        20 L
      </text>
    </svg>
  );
}

function BottleImage({ product }: { product: Product }) {
  const isTwenty = product.image === TWENTY_LITRE_IMAGE;
  const [hasPhoto, setHasPhoto] = useState(false);

  // Checked after mount so a missing photo falls back to the illustration without a broken image.
  useEffect(() => {
    if (!isTwenty) return;
    const probe = new window.Image();
    probe.onload = () => setHasPhoto(true);
    probe.src = TWENTY_LITRE_IMAGE;
  }, [isTwenty]);

  if (isTwenty && !hasPhoto) return <TwentyLitreIllustration />;
  return <img src={product.image} alt={`VAARI ${product.name}`} loading="lazy" className="h-full w-auto" />;
}

export function ProductsSection() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(PRODUCTS.length - 1, Math.floor(v * PRODUCTS.length)));
  });

  const product = PRODUCTS[active];
  const isLight = product.theme === 'light';
  const accent = product.theme === 'copper' ? 'text-copper-light' : isLight ? 'text-ocean-mid' : 'text-aqua';

  const goTo = (index: number) => {
    const el = section.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    scrollToTarget(top + ((index + 0.5) / PRODUCTS.length) * travel);
  };

  const enquire = () => {
    window.dispatchEvent(new CustomEvent('vaari:enquire', { detail: product }));
    scrollToTarget('#contact');
  };

  return (
    <section id="products" ref={section} style={{ height: `${PRODUCTS.length * 90 + 10}vh` }} className="relative">
      <motion.div
        animate={{ backgroundColor: product.background, color: product.foreground }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="screen-h sticky top-0 flex flex-col overflow-hidden pb-4 pt-[84px] lg:pb-6 lg:pt-24"
      >
        <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-5 sm:px-8 lg:grid lg:grid-cols-[1fr_minmax(0,1.1fr)_1fr] lg:items-center lg:gap-6">
          {/* Name and description */}
          <div className="relative z-10">
            <RiseText
              text="The Vaari Range"
              as="h2"
              className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.22em] opacity-70 lg:mb-6"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <p className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] ${accent}`}>
                  {product.line} · {product.size}
                </p>
                <h3 className="font-display text-[2rem] font-light leading-[1.05] sm:text-5xl xl:text-6xl">{product.name}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed opacity-75 lg:mt-5 lg:text-lg">{product.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottle stage */}
          <div className="relative min-h-0 flex-1 self-stretch">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={product.numeral + product.theme}
                aria-hidden
                initial={{ opacity: 0, scale: 0.86, y: 40 }}
                animate={{ opacity: isLight ? 0.2 : 0.3, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -40 }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{ WebkitTextStrokeColor: product.foreground }}
                className="text-outline absolute inset-0 flex select-none items-center justify-center font-display font-black leading-none [font-size:clamp(9rem,min(22vw,40vh),24rem)]"
              >
                {product.numeral}
              </motion.span>
            </AnimatePresence>

            {PRODUCTS.map((item, i) => {
              const offset = i - active;
              return (
                <motion.div
                  key={item.id}
                  aria-hidden={offset !== 0}
                  initial={false}
                  animate={{
                    y: offset === 0 ? '0%' : offset > 0 ? '26%' : '-26%',
                    rotate: offset === 0 ? 0 : offset > 0 ? 9 : -9,
                    scale: offset === 0 ? 1 : 0.8,
                    opacity: offset === 0 ? 1 : 0,
                  }}
                  transition={{ duration: 0.85, ease: EASE }}
                  style={{ height: `${item.heightPct}%` }}
                  className="absolute inset-x-0 bottom-0 flex justify-center"
                >
                  <div className="relative h-full animate-bob drop-shadow-[0_30px_22px_rgba(7,38,58,0.26)]" style={{ animationDelay: `${-i}s` }}>
                    <BottleImage product={item} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Qualities and enquiry */}
          <div className="relative z-10 flex flex-wrap items-center gap-x-4 gap-y-3 pt-3 lg:flex-col lg:items-end lg:gap-6 lg:pt-0 lg:text-right">
            <ul className="hidden space-y-3 lg:block">
              {QUALITIES.map((q) => (
                <li key={q.label} className="flex items-center justify-end gap-2.5 text-sm font-semibold">
                  {q.label}
                  <span className="grid h-9 w-9 place-items-center rounded-full border" style={{ borderColor: 'color-mix(in srgb, currentColor 25%, transparent)' }}>
                    <q.icon className={`h-4 w-4 ${accent}`} />
                  </span>
                </li>
              ))}
            </ul>

            <AnimatePresence mode="wait">
              {product.priceNote && (
                <motion.p
                  key="price"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-2 rounded-full bg-copper-light px-4 py-2 text-xs font-bold text-ink"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {product.priceNote}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              key={product.theme}
              onClick={enquire}
              className={`btn-fill py-3.5 hover:text-white lg:py-4 ${isLight ? 'bg-ink text-white' : 'bg-white text-ink'}`}
            >
              {product.priceNote ? 'Enquire Now' : 'Order Now'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Size ladder */}
        <div className="mx-auto mt-3 w-full max-w-7xl pl-5 pr-[84px] sm:pl-8 sm:pr-[96px] lg:mt-5 xl:px-8">
          <div role="tablist" aria-label="Bottle sizes" className="flex items-end gap-1 sm:gap-2">
            {PRODUCTS.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => goTo(i)}
                className="relative min-w-0 flex-1 px-0.5 pb-2 pt-3 text-center text-[11px] font-bold leading-tight transition-opacity duration-300 sm:px-1 sm:text-sm"
                style={{ opacity: i === active ? 1 : 0.5 }}
              >
                {item.tab}
                <span className="absolute inset-x-0 bottom-0 h-px bg-current opacity-30" />
                {i === active && (
                  <motion.span
                    layoutId="size-marker"
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                    className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-copper"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

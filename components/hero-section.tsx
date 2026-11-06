'use client';

import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Award, Droplets, Leaf, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';
import { Bubbles, Reveal, RiseText, WAVE_PATH, WaveEdge } from '@/components/site/motion';
import { SLOGAN } from '@/lib/site-data';

const EASE = [0.22, 1, 0.36, 1] as const;
const INTRO_DELAY = 0.75; // lines up with the ripple opening the page

const FEATURES = [
  { icon: Droplets, title: 'Pure Water', text: 'Multi-stage RO purification' },
  { icon: Award, title: 'FSSAI Certified', text: 'Food safety compliant' },
  { icon: ShieldCheck, title: 'Quality Assured', text: 'Consistent in every bottle' },
  { icon: Leaf, title: 'Eco-Friendly', text: 'Considered packaging' },
];

/** The range, grouped around the 20 litre bottle. Depth sets how far each one drifts. */
const RANGE = [
  { src: '/bottles/vaari-20l.webp', left: 50, phoneLeft: 50, height: 100, z: 1, depth: 0.3, order: 0 },
  { src: '/bottles/vaari-premium-1l.webp', left: 35, phoneLeft: 27, height: 86, z: 3, depth: 0.6, order: 1 },
  { src: '/bottles/vaari-classic-1l.webp', left: 65, phoneLeft: 73, height: 86, z: 3, depth: 0.6, order: 1 },
  { src: '/bottles/vaari-classic-500ml.webp', left: 22.5, phoneLeft: 12, height: 62, z: 4, depth: 1, order: 2 },
  { src: '/bottles/vaari-classic-200ml.webp', left: 77.5, phoneLeft: 88, height: 48, z: 4, depth: 1, order: 2 },
];

function RangeBottle({
  bottle,
  scroll,
  pointer,
}: {
  bottle: (typeof RANGE)[number];
  scroll: MotionValue<number>;
  pointer: MotionValue<number>;
}) {
  const y = useTransform(scroll, [0, 1], ['0vh', `${-5 - bottle.depth * 9}vh`]);
  const x = useTransform(pointer, [-1, 1], [bottle.depth * -14, bottle.depth * 14]);

  return (
    <motion.div
      className="absolute bottom-0 left-[var(--phone-left)] -translate-x-1/2 lg:left-[var(--left)]"
      style={
        {
          '--left': `${bottle.left}%`,
          '--phone-left': `${bottle.phoneLeft}%`,
          height: `${bottle.height}%`,
          zIndex: bottle.z,
        } as React.CSSProperties
      }
    >
      <motion.div style={{ y, x }} className="h-full">
        <motion.div
          initial={{ y: '26%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: EASE, delay: INTRO_DELAY + 0.1 + bottle.order * 0.16 }}
          className="h-full"
        >
          <img
            src={bottle.src}
            alt=""
            className="h-full w-auto max-w-none animate-bob drop-shadow-[0_22px_22px_rgba(0,12,24,0.35)]"
            style={{ animationDelay: `${-bottle.left / 12}s` }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const stage = useRef<HTMLElement>(null);
  const story = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: stage, offset: ['start start', 'end end'] });
  const { scrollYProgress: storyProgress } = useScroll({ target: story, offset: ['start end', 'end start'] });

  const mx = useMotionValue(0);
  const pointer = useSpring(mx, { stiffness: 60, damping: 18 });
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') mx.set((e.clientX / window.innerWidth) * 2 - 1);
  };

  const copyOpacity = useTransform(p, [0, 0.55], [1, 0]);
  const copyY = useTransform(p, [0, 0.7], ['0vh', '-10vh']);
  const waterY = useTransform(p, [0, 1], ['0vh', '-16vh']);
  const storyY = useTransform(storyProgress, [0, 1], ['6vh', '-6vh']);
  const storyRotate = useTransform(storyProgress, [0, 1], [5, -5]);

  return (
    <div className="relative" onPointerMove={onPointerMove}>
      <section id="home" ref={stage} className="relative h-[240vh]">
        <div className="hero-water noise screen-h sticky top-0 overflow-hidden text-white">
          <Bubbles className="absolute inset-0 h-full w-full" />

          <motion.div style={{ opacity: copyOpacity, y: copyY }} className="absolute inset-x-0 top-[13vh] z-10 px-4 text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: INTRO_DELAY }}
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-aqua sm:text-xs"
            >
              Premium Bottled Water Since 2025
            </motion.p>
            <RiseText
              as="h1"
              immediate
              delay={INTRO_DELAY + 0.1}
              text={SLOGAN}
              className="whitespace-nowrap font-display font-light leading-[1.05] [font-size:clamp(1.75rem,min(8.1vw,13vh),7.5rem)]"
            />
          </motion.div>

          <div
            role="img"
            aria-label="The VAARI range: 20 litre, 1 litre premium, 1 litre, 500 ml and 200 ml bottles"
            className="absolute bottom-[11vh] left-1/2 h-[46vh] w-full max-w-[900px] -translate-x-1/2 lg:bottom-[5vh] lg:h-[60vh]"
          >
            {RANGE.map((bottle) => (
              <RangeBottle key={bottle.src} bottle={bottle} scroll={p} pointer={pointer} />
            ))}
          </div>

          {/* Moving water in front of the bottles. */}
          <motion.div style={{ y: waterY }} aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-[18vh] z-20 h-[32vh] lg:h-[28vh]">
            <svg viewBox="0 0 2400 120" preserveAspectRatio="none" className="absolute left-0 top-0 h-16 w-[200%] animate-wave-slow fill-aqua/20">
              <path d={WAVE_PATH} />
            </svg>
            <svg viewBox="0 0 2400 120" preserveAspectRatio="none" className="absolute left-0 top-5 h-16 w-[200%] animate-wave-fast fill-ocean/60">
              <path d={WAVE_PATH} />
            </svg>
            <div className="absolute inset-x-0 bottom-0 top-[calc(1.25rem+4rem-1px)] bg-ocean/60" />
          </motion.div>

          <motion.div style={{ opacity: copyOpacity }} className="absolute bottom-[7vh] left-[5vw] z-30 hidden w-[20vw] min-w-[240px] lg:block">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: INTRO_DELAY + 0.6 }}
              className="text-[15px] leading-relaxed text-white/85"
            >
              Experience the purity of RO purified water. Every drop is a commitment to your health.
            </motion.p>
          </motion.div>

          <motion.div
            style={{ opacity: copyOpacity }}
            className="absolute inset-x-0 bottom-5 z-30 flex gap-2 pl-4 pr-[80px] lg:inset-x-auto lg:bottom-[7vh] lg:right-[5vw] lg:flex-col lg:items-end lg:gap-3 lg:pl-0 lg:pr-0"
          >
            <motion.a
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: INTRO_DELAY + 0.7 }}
              href="#products"
              className="btn-fill whitespace-nowrap bg-white text-ink hover:text-white max-lg:!px-4 max-lg:!py-3.5"
            >
              View Products <ArrowDownRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: INTRO_DELAY + 0.8 }}
              href="#contact"
              className="btn-fill whitespace-nowrap border border-white/40 text-white [--btn-hover:rgba(255,255,255,0.16)] max-lg:!px-4 max-lg:!py-3.5"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* This section rises over the pinned hero like a tide. */}
      <section className="relative z-30 -mt-[100vh] bg-paper">
        <WaveEdge color="#f7fbfc" className="absolute inset-x-0 bottom-[calc(100%-1px)]" />
        <div ref={story} className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:min-h-screen lg:grid-cols-2 lg:py-28">
          <div>
            <Reveal>
              <p className="eyebrow mb-6 text-copper-dark">Pure. Safe. Refreshing.</p>
            </Reveal>
            <RiseText
              text="Water you can trust, in every single drop."
              className="max-w-xl text-4xl font-light leading-[1.08] text-ink sm:text-5xl xl:text-6xl"
            />
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink/70">
                Our water is purified with a state-of-the-art RO system, using advanced Reverse Osmosis
                filtration technology for crystal-clear, safe drinking water.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
              {FEATURES.map((feature, i) => (
                <Reveal key={feature.title} delay={0.08 * i} y={24}>
                  <div className="group h-full rounded-2xl border border-ink/10 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-ocean/30 hover:shadow-[0_18px_40px_-20px_rgba(10,51,80,0.45)]">
                    <feature.icon className="mb-4 h-6 w-6 text-ocean transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110" />
                    <h3 className="font-sans text-[15px] font-bold tracking-normal text-ink">{feature.title}</h3>
                    <p className="mt-1 text-[13px] leading-snug text-ink/60">{feature.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="relative flex h-[62vh] justify-center lg:h-[80vh]">
            <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square h-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-aqua/50 to-foam" />
            <motion.img
              style={{ y: storyY, rotate: storyRotate }}
              src="/bottles/vaari-premium-1l.webp"
              alt="VAARI Premium Crystal 1 litre bottle"
              loading="lazy"
              className="relative h-full w-auto drop-shadow-[0_30px_24px_rgba(7,38,58,0.28)]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

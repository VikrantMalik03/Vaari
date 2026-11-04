'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowDownRight, ArrowRight, Award, Droplets, Leaf, ShieldCheck } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Bubbles, Reveal, RiseText, WaveEdge } from '@/components/site/motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const INTRO_DELAY = 1.05; // waits for the preloader to lift

const FEATURES = [
  { icon: Droplets, title: 'Pure Water', text: 'Multi-stage RO purification' },
  { icon: Award, title: 'FSSAI Certified', text: 'Food safety compliant' },
  { icon: ShieldCheck, title: 'Quality Assured', text: 'Consistent in every bottle' },
  { icon: Leaf, title: 'Eco-Friendly', text: 'Considered packaging' },
];

/** A scroll timeline with separate end points for desktop and mobile layouts. */
function useTimeline(
  progress: MotionValue<number>,
  isDesktop: MotionValue<number>,
  input: number[],
  desktop: number[],
  mobile: number[],
  unit = '',
) {
  const onDesktop = useTransform(progress, input, desktop);
  const onMobile = useTransform(progress, input, mobile);
  return useTransform([onDesktop, onMobile, isDesktop], ([d, m, flag]) => {
    const value = (flag as number) ? (d as number) : (m as number);
    return unit ? `${value}${unit}` : value;
  });
}

export function HeroSection() {
  const stage = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: stage, offset: ['start start', 'end end'] });

  // Read inside scroll transforms, which only see the values from their first render.
  const isDesktop = useMotionValue(1);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => isDesktop.set(query.matches ? 1 : 0);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [isDesktop]);

  // Pointer parallax on the bottles.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothX = useSpring(mx, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(my, { stiffness: 60, damping: 18 });
  const parallaxX = useTransform(smoothX, [-1, 1], [-16, 16]);
  const parallaxY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const sideParallaxX = useTransform(smoothX, [-1, 1], [26, -26]);
  const tilt = useTransform(smoothX, [-1, 1], [-2.5, 2.5]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    mx.set((e.clientX / window.innerWidth) * 2 - 1);
    my.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  // Scroll timeline: 0 to 0.58 is pinned, then the page rises over the hero and the bottle lands on it.
  const copyOpacity = useTransform(p, [0, 0.16], [1, 0]);
  const copyY = useTransform(p, [0, 0.22], ['0vh', '-9vh']);
  const titleScale = useTransform(p, [0, 0.22], [1, 1.08]);
  const callouts = useTransform(p, [0.24, 0.32, 0.5, 0.58], [0, 1, 1, 0]);
  const calloutShift = useTransform(p, [0.24, 0.34], [28, 0]);

  const bottleY = useTimeline(p, isDesktop, [0, 0.3, 0.58, 1], [0, -16, -16, -17], [0, -16, -16, -30], 'vh');
  const bottleX = useTimeline(p, isDesktop, [0, 0.58, 1], [0, 0, 24], [0, 0, 0], 'vw');
  const bottleScale = useTimeline(p, isDesktop, [0, 0.3, 0.58, 1], [1, 1.2, 1.2, 1.08], [1, 1.2, 1.2, 0.9]);
  const bottleRotate = useTransform(p, [0, 0.3, 0.58, 0.82, 1], [0, -5, 4, 9, 0]);
  const bottleOpacity = useTimeline(p, isDesktop, [0.64, 0.8], [1, 1], [1, 0]);
  const shadowOpacity = useTimeline(p, isDesktop, [0, 0.16, 0.86, 1], [0.5, 0, 0, 0.28], [0.5, 0, 0, 0]);

  const sideOpacity = useTransform(p, [0, 0.2], [1, 0]);
  const leftX = useTransform(p, [0, 0.24], ['0vw', '-22vw']);
  const rightX = useTransform(p, [0, 0.24], ['0vw', '22vw']);
  const leftRotate = useTransform(p, [0, 0.24], [-9, -30]);
  const rightRotate = useTransform(p, [0, 0.24], [9, 30]);
  const sideY = useTransform(p, [0, 0.24], ['0vh', '10vh']);

  const leftTransformX = useMotionTemplate`calc(${leftX} + ${sideParallaxX}px)`;
  const rightTransformX = useMotionTemplate`calc(${rightX} + ${sideParallaxX}px)`;

  return (
    <div className="relative" onPointerMove={onPointerMove}>
      {/* Bottle layer. It stays pinned across the hero and the section it lands on. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
        <div className="screen-h sticky top-0 overflow-hidden">
          <div className="absolute inset-x-0 bottom-[11vh] flex h-[47vh] justify-center lg:bottom-[2vh] lg:h-[58vh]">
            <motion.div
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, ease: EASE, delay: INTRO_DELAY + 0.25 }}
              className="absolute bottom-0 left-1/2 ml-[-29vw] h-[66%] lg:ml-[-19vw] lg:h-[74%]"
            >
              <motion.img
                src="/bottles/vaari-classic-1l.webp"
                alt=""
                style={{ x: leftTransformX, y: sideY, rotate: leftRotate, opacity: sideOpacity }}
                className="h-full w-auto -translate-x-1/2 drop-shadow-[0_24px_30px_rgba(0,12,24,0.45)]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, ease: EASE, delay: INTRO_DELAY + 0.32 }}
              className="absolute bottom-0 left-1/2 ml-[29vw] h-[60%] lg:ml-[19vw] lg:h-[68%]"
            >
              <motion.img
                src="/bottles/vaari-classic-500ml.webp"
                alt=""
                style={{ x: rightTransformX, y: sideY, rotate: rightRotate, opacity: sideOpacity }}
                className="h-full w-auto -translate-x-1/2 drop-shadow-[0_24px_30px_rgba(0,12,24,0.45)]"
              />
            </motion.div>

            <motion.div
              style={{ x: bottleX, y: bottleY, scale: bottleScale, rotate: bottleRotate, opacity: bottleOpacity }}
              className="relative h-full origin-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 120, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.4, ease: EASE, delay: INTRO_DELAY }}
                className="h-full"
              >
                <motion.div style={{ x: parallaxX, y: parallaxY, rotate: tilt }} className="h-full">
                  <img
                    src="/bottles/vaari-premium-1l.webp"
                    alt=""
                    className="h-full w-auto animate-bob drop-shadow-[0_34px_24px_rgba(0,12,24,0.3)]"
                  />
                </motion.div>
              </motion.div>
              <motion.div
                style={{ opacity: shadowOpacity }}
                className="absolute -bottom-3 left-1/2 h-5 w-[90%] -translate-x-1/2 rounded-[50%] bg-ink blur-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pinned hero */}
      <section id="home" ref={stage} className="relative h-[340vh]">
        <div className="hero-water noise screen-h sticky top-0 overflow-hidden text-white">
          <Bubbles className="absolute inset-0 h-full w-full" />

          <motion.div
            style={{ opacity: copyOpacity, y: copyY, scale: titleScale }}
            className="absolute inset-x-0 top-[11vh] z-10 px-4 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: INTRO_DELAY }}
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-aqua sm:text-xs"
            >
              Premium Bottled Water Since 2025
            </motion.p>
            <h1 className="font-display font-light leading-[0.98] [font-size:clamp(3rem,min(8vw,11.6vh),8rem)]">
              <RiseText as="span" immediate delay={INTRO_DELAY + 0.05} text="Stay Pure." className="block" />
              <RiseText
                as="span"
                immediate
                delay={INTRO_DELAY + 0.2}
                text="Stay Hydrated."
                className="block italic text-copper-light"
              />
            </h1>
          </motion.div>

          <motion.div
            style={{ opacity: copyOpacity }}
            className="absolute bottom-[7vh] left-[5vw] z-30 hidden w-[21vw] min-w-[250px] lg:block"
          >
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: INTRO_DELAY + 0.55 }}
              className="text-[15px] leading-relaxed text-white/80"
            >
              Experience the purity of RO purified water. Every drop is a commitment to
              your health.
            </motion.p>
          </motion.div>

          <motion.div
            style={{ opacity: copyOpacity }}
            className="absolute inset-x-0 bottom-5 z-30 flex gap-2 pl-4 pr-[80px] lg:inset-x-auto lg:gap-3 lg:pl-0 lg:pr-0 lg:bottom-[7vh] lg:right-[5vw] lg:flex-col lg:items-end"
          >
            <motion.a
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: INTRO_DELAY + 0.65 }}
              href="#products"
              className="btn-fill whitespace-nowrap bg-white text-ink hover:text-white max-lg:!px-4 max-lg:!py-3.5"
            >
              View Products <ArrowDownRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: INTRO_DELAY + 0.75 }}
              href="#contact"
              className="btn-fill whitespace-nowrap border border-white/40 text-white [--btn-hover:rgba(255,255,255,0.16)] max-lg:!px-4 max-lg:!py-3.5"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>

          {/* Callouts either side of the bottle, while it is pinned at centre. */}
          <motion.div
            style={{ opacity: callouts, x: useTransform(calloutShift, (v) => -v) }}
            className="absolute left-[7vw] top-[34vh] z-10 hidden max-w-[24vw] lg:block"
          >
            <p className="font-display text-4xl font-light italic text-aqua xl:text-5xl">RO Purified</p>
            <div className="my-4 h-px w-[85%] bg-gradient-to-r from-aqua/70 to-transparent" />
            <p className="text-[15px] leading-relaxed text-white/75">
              Advanced reverse osmosis leaves crystal-clear water, free from contaminants and impurities.
            </p>
          </motion.div>
          <motion.div
            style={{ opacity: callouts, x: calloutShift }}
            className="absolute right-[7vw] top-[50vh] z-10 hidden max-w-[24vw] text-right lg:block"
          >
            <p className="font-display text-4xl font-light italic text-copper-light xl:text-5xl">FSSAI Certified</p>
            <div className="my-4 ml-auto h-px w-[85%] bg-gradient-to-l from-copper-light/80 to-transparent" />
            <p className="text-[15px] leading-relaxed text-white/75">
              Compliant with food safety and quality standards, so you can trust every bottle.
            </p>
          </motion.div>
          <motion.p
            style={{ opacity: callouts }}
            className="absolute inset-x-6 top-[11vh] z-10 text-center font-display text-2xl font-light italic text-white lg:hidden"
          >
            RO purified. <span className="text-copper-light">FSSAI certified.</span>
          </motion.p>
        </div>
      </section>

      {/* The section the bottle lands on rises over the hero like a tide. */}
      <section className="relative z-10 -mt-[100vh] bg-paper">
        <WaveEdge color="#f7fbfc" className="absolute inset-x-0 bottom-[calc(100%-1px)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:min-h-screen lg:grid-cols-2 lg:items-center lg:py-28">
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
                Our water is purified with a state-of-the-art RO system, using
                advanced Reverse Osmosis filtration technology for crystal-clear, safe drinking water.
              </p>
            </Reveal>

            <img
              src="/bottles/vaari-premium-1l.webp"
              alt="VAARI Premium Crystal 1 litre bottle"
              loading="lazy"
              className="mx-auto mt-10 h-[56vh] w-auto drop-shadow-[0_26px_26px_rgba(7,38,58,0.25)] lg:hidden"
            />

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
          <div className="hidden lg:block" />
        </div>
      </section>
    </div>
  );
}

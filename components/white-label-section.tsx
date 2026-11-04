'use client';

import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, FileCheck2, PenTool, Truck, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { Reveal, RiseText } from '@/components/site/motion';

const AUDIENCES = ['Hotels', 'Restaurants', 'Cafes', 'Corporate Offices', 'Event Organizers'];

const STEPS = [
  { icon: Upload, title: 'Share your brand', text: 'Send us your logo and the details you want on the label.' },
  { icon: PenTool, title: 'We design the label', text: 'Our team prepares a custom label for your bottles.' },
  { icon: FileCheck2, title: 'You approve', text: 'Production starts once you are happy with the design.' },
  { icon: Truck, title: 'We bottle and deliver', text: 'Your branded water arrives across Delhi NCR.' },
];

// Blank panel on the vaari-custom-1l render, as a percentage of the image.
const PANEL = { left: 15.1, top: 48.5, width: 69.5, height: 28 };

export function WhiteLabelSection() {
  const [brand, setBrand] = useState('');
  const shown = brand.trim() || 'Your Brand Here';

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 90, damping: 16 });
  const rotateY = useSpring(ry, { stiffness: 90, damping: 16 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const box = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - box.left) / box.width - 0.5) * 22);
    rx.set(((e.clientY - box.top) / box.height - 0.5) * -10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const steps = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: steps, offset: ['start 85%', 'start 40%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="white-label" className="relative overflow-hidden bg-gradient-to-b from-foam to-paper py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow mb-6 text-copper-dark">White Label Services</p>
            </Reveal>
            <RiseText text="Your name on every bottle." className="text-4xl font-light leading-[1.05] text-ink sm:text-6xl" />
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink/70">
                Beyond our own brand, we offer premium white labeling services, with customized bottled
                water solutions for your business. Try it: type your brand name and watch the label change.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <label htmlFor="brand-preview" className="mt-9 block text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
                Your brand name
              </label>
              <input
                id="brand-preview"
                value={brand}
                maxLength={20}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Grand Palace Hotel"
                autoComplete="off"
                className="mt-2 w-full max-w-md border-0 border-b-2 border-ink/20 bg-transparent py-3 font-display text-2xl text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-copper sm:text-3xl"
              />
              <div className="mt-7 flex flex-wrap gap-2">
                {AUDIENCES.map((a) => (
                  <span key={a} className="rounded-full border border-ink/15 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-ink/75">
                    {a}
                  </span>
                ))}
              </div>
              <a href="#contact" className="btn-fill mt-9 bg-ink text-white">
                Start Your Label <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          <div onPointerMove={onMove} onPointerLeave={onLeave} className="relative flex justify-center [perspective:1100px]">
            <div aria-hidden className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua/50 blur-[90px]" />
            <motion.div
              style={{ rotateX, rotateY, containerType: 'size', aspectRatio: '343 / 1240' }}
              className="relative h-[min(78vh,640px)] drop-shadow-[0_34px_34px_rgba(7,38,58,0.3)]"
            >
              <img
                src="/bottles/vaari-custom-1l.webp"
                alt="VAARI bottle showing a custom label preview"
                loading="lazy"
                className="h-full w-full"
              />
              <div
                className="absolute flex items-center justify-center"
                style={{
                  left: `${PANEL.left}%`,
                  top: `${PANEL.top}%`,
                  width: `${PANEL.width}%`,
                  height: `${PANEL.height}%`,
                }}
              >
                <motion.div
                  key={shown}
                  initial={{ opacity: 0.2, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  aria-live="polite"
                  className="flex h-full w-[46%] items-center justify-center overflow-hidden bg-ink px-1 text-center font-display leading-none text-white"
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    fontSize: `min(${Math.min(3.4, 42 / shown.length).toFixed(2)}cqh, 30px)`,
                  }}
                >
                  {shown}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <div ref={steps} className="relative mt-24 grid gap-10 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4 lg:gap-8">
          <div aria-hidden className="absolute left-7 right-[20%] top-7 hidden h-px bg-ink/10 lg:block">
            <motion.div style={{ scaleX: lineScale }} className="h-full origin-left bg-copper" />
          </div>
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} y={26}>
              <div className="relative grid h-14 w-14 place-items-center rounded-full border border-ink/10 bg-white text-ocean shadow-[0_10px_24px_-12px_rgba(7,38,58,0.4)]">
                <step.icon className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-copper text-[10px] font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-normal text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

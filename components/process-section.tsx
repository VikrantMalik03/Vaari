'use client';

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { RiseText } from '@/components/site/motion';

const STEPS = [
  {
    title: 'Advanced Filtration',
    text: 'Crystal-clear water free from contaminants, impurities, and harmful substances through our multi-stage RO process.',
  },
  {
    title: 'Quality Certified',
    text: 'Certified by the Food Safety and Standards Authority of India (FSSAI), ensuring compliance with the highest food safety and quality standards.',
  },
  {
    title: 'Sealed & Delivered',
    text: 'Bottled in eco-friendly packaging and delivered across Haryana on daily and weekly schedules.',
  },
];

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const level = useTransform(scrollYProgress, [0, 1], ['6%', '94%']);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  return (
    <section ref={ref} className="relative h-[260vh] bg-ink text-white">
      <div className="noise screen-h sticky top-0 overflow-hidden">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-[92px_1fr] items-center pt-14 gap-6 px-5 sm:grid-cols-[180px_1fr] sm:gap-12 sm:px-8 lg:grid-cols-[300px_1fr] lg:gap-24">
          {/* A glass column that fills as the reader scrolls. */}
          <div className="relative mx-auto h-[62vh] w-full max-w-[210px] overflow-hidden rounded-[999px] border border-white/25 bg-white/[0.04]">
            <motion.div style={{ height: level }} className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-aqua via-ocean to-ocean-deep">
              <svg viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden className="absolute bottom-[calc(100%-1px)] left-0 h-5 w-[200%] animate-wave-fast fill-aqua">
                <path d="M0 20 C50 40 150 0 200 20 C250 40 350 0 400 20 L400 40 L0 40 Z" />
              </svg>
            </motion.div>
            <div className="absolute inset-y-6 left-[18%] w-2 rounded-full bg-white/30 blur-[2px]" />
          </div>

          <div>
            <p className="eyebrow mb-4 text-aqua">Our Water Source</p>
            <RiseText
              text="Advanced RO Purification"
              className="mb-8 max-w-2xl text-3xl font-light leading-[1.08] sm:text-5xl lg:mb-12 lg:text-6xl"
            />
            <ol className="space-y-1">
              {STEPS.map((step, i) => {
                const isActive = i === active;
                return (
                  <li key={step.title} className="border-t border-white/15 py-3 lg:py-4">
                    <div className="flex items-baseline gap-4">
                      <span className={`text-xs font-bold tabular-nums transition-colors duration-500 ${isActive ? 'text-copper-light' : 'text-white/40'}`}>
                        0{i + 1}
                      </span>
                      <h3 className={`font-display text-xl font-light transition-colors duration-500 sm:text-2xl lg:text-3xl ${isActive ? 'text-white' : 'text-white/40'}`}>
                        {step.title}
                      </h3>
                    </div>
                    <motion.div
                      initial={false}
                      animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-1 pl-8 pt-2 text-sm leading-relaxed text-white/70 sm:text-base">{step.text}</p>
                    </motion.div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

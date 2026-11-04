'use client';

import Lenis from 'lenis';
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Scrolls with Lenis when it is running, otherwise natively. */
export function scrollToTarget(target: string | number, immediate = false) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.5, immediate });
    return;
  }
  const top =
    typeof target === 'number'
      ? target
      : (document.querySelector(target)?.getBoundingClientRect().top ?? 0) + window.scrollY;
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
}

export function setScrollLocked(locked: boolean) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: Lenis | undefined;
    let frame = 0;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute('href');
      if (!hash || hash === '#') return;
      event.preventDefault();
      scrollToTarget(hash);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
      lenis?.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Each word rises out of its own mask, like a line surfacing. */
export function RiseText({
  text,
  className,
  delay = 0,
  as: Tag = 'h2',
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  const show = immediate || inView;
  const Component = Tag as 'h2';
  return (
    <Component ref={ref as never} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 4 }}
            animate={show ? { y: 0, rotate: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: delay + i * 0.06 }}
          >
            {word}
            {' '}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

function ScrollWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}{' '}
    </motion.span>
  );
}

/** Words light up one at a time as the reader scrolls through them. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        {words.map((word, i) => (
          <ScrollWord
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
          />
        ))}
      </span>
    </p>
  );
}

export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

/** Rising bubbles on a canvas. Stops drawing when off screen. */
export function Bubbles({ count = 34, className }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const bubbles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1 + Math.random() ** 2.4 * 9,
      speed: 0.00035 + Math.random() * 0.0009,
      sway: Math.random() * Math.PI * 2,
      alpha: 0.12 + Math.random() * 0.4,
    }));

    const draw = (t: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);
      for (const b of bubbles) {
        b.y -= b.speed;
        if (b.y < -0.05) {
          b.y = 1.05;
          b.x = Math.random();
        }
        const x = b.x * width + Math.sin(t * 0.0007 + b.sway) * 14;
        const y = b.y * height;
        ctx.beginPath();
        ctx.arc(x, y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,240,250,${b.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        if (b.r > 3) {
          ctx.beginPath();
          ctx.arc(x - b.r * 0.35, y - b.r * 0.35, b.r * 0.18, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${b.alpha})`;
          ctx.fill();
        }
      }
    };
    frame = requestAnimationFrame(draw);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden className={className} />;
}

const WAVE_PATH =
  'M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 C1350,80 1550,0 1800,40 C2050,80 2250,0 2400,40 L2400,120 L0,120 Z';

/** Two layers of moving water, used as the edge between sections. */
export function WaveEdge({ color, className }: { color: string; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none h-[60px] overflow-hidden md:h-[90px] ${className ?? ''}`}>
      <svg
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-full w-[200%] animate-wave-slow opacity-40"
        fill={color}
      >
        <path d={WAVE_PATH} />
      </svg>
      <svg
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-[78%] w-[200%] animate-wave-fast"
        fill={color}
      >
        <path d={WAVE_PATH} />
      </svg>
    </div>
  );
}

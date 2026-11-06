'use client';

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Check, FileCheck2, PenTool, Truck, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Reveal, RiseText, scrollToTarget } from '@/components/site/motion';

const AUDIENCES = ['Hotels', 'Restaurants', 'Cafes', 'Corporate Offices', 'Event Organizers'];

const STEPS = [
  { icon: Upload, title: 'Upload your logo', text: 'Tap here to add your logo, and see it on the label above.' },
  { icon: PenTool, title: 'We design the label', text: 'Our team prepares a custom label for your bottles.' },
  { icon: FileCheck2, title: 'You approve', text: 'Production starts once you are happy with the design.' },
  { icon: Truck, title: 'We bottle and deliver', text: 'Your branded water arrives across Haryana.' },
];

// Positions on the vaari-custom-1l render, as a percentage of the image.
const LABEL = { left: 15.1, width: 69.5 };
const DESIGNED_FOR_TOP = 46.6;
const BRAND_AREA = { top: 50, height: 27 };

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_SENDABLE_LENGTH = 2_600_000;

/** Turns the chosen file into a small PNG, for the bottle preview and for sending with the enquiry. */
async function logoToPng(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const image = new window.Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('Unreadable image'));
      image.src = url;
    });
    const sourceWidth = image.naturalWidth || 800;
    const sourceHeight = image.naturalHeight || 800;

    for (const maxSide of [800, 500, 300]) {
      const scale = Math.min(1, maxSide / Math.max(sourceWidth, sourceHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(sourceWidth * scale));
      canvas.height = Math.max(1, Math.round(sourceHeight * scale));
      canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);
      const png = canvas.toDataURL('image/png');
      if (png.length <= MAX_SENDABLE_LENGTH) return png;
    }
    throw new Error('Image too detailed');
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function WhiteLabelSection() {
  const [brand, setBrand] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [logoName, setLogoName] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const returnToBottle = useRef(false);

  const shown = brand.trim() || 'Your Brand Here';
  const barHeight = logo ? 16 : BRAND_AREA.height;
  const fontSize = Math.min(3.4, (barHeight * 0.85) / (0.55 * shown.length)).toFixed(2);

  const openPicker = (fromSteps = false) => {
    returnToBottle.current = fromSteps;
    fileInput.current?.click();
  };

  const onFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ''; // lets the same file be chosen again after removing it
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error('Please choose a PNG, JPG, WEBP or SVG image.');
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      toast.error('Please choose an image under 8 MB.');
      return;
    }
    try {
      setLogo(await logoToPng(file));
      setLogoName(file.name);
      if (returnToBottle.current) scrollToTarget('#white-label');
    } catch (error) {
      console.error(error);
      toast.error('We could not read that image. Please try another file.');
    }
  };

  const startLabel = () => {
    window.dispatchEvent(new CustomEvent('vaari:white-label', { detail: { brand: brand.trim(), logo } }));
    scrollToTarget('#contact');
  };

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
      <input ref={fileInput} type="file" accept={ACCEPTED_TYPES.join(',')} onChange={onFile} aria-label="Upload your logo" className="sr-only" tabIndex={-1} />
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
                water solutions for your business. Try it: add your brand name and logo, and watch the label change.
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

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-ink/60">Your logo</p>
              <div className="mt-2 flex max-w-md items-center gap-2">
                <button
                  type="button"
                  onClick={() => openPicker()}
                  className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border-2 border-dashed border-ink/20 bg-white/70 px-4 py-3 text-left transition-colors hover:border-copper hover:bg-white"
                >
                  {logo ? (
                    <img src={logo} alt="" className="h-9 w-9 shrink-0 rounded-md object-contain" />
                  ) : (
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foam text-ocean">
                      <Upload className="h-4 w-4" />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-ink">{logo ? logoName : 'Upload your logo'}</span>
                    <span className="block text-xs text-ink/60">{logo ? 'Tap to change' : 'PNG, JPG, WEBP or SVG, up to 8 MB'}</span>
                  </span>
                </button>
                {logo && (
                  <button
                    type="button"
                    onClick={() => setLogo(null)}
                    aria-label="Remove logo"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {AUDIENCES.map((a) => (
                  <span key={a} className="rounded-full border border-ink/15 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-ink/75">
                    {a}
                  </span>
                ))}
              </div>
              <button type="button" onClick={startLabel} className="btn-fill mt-9 bg-ink text-white">
                Start Your Label <ArrowRight className="h-4 w-4" />
              </button>
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

              <p
                className="absolute text-center font-display italic leading-none text-ink"
                style={{ left: `${LABEL.left}%`, width: `${LABEL.width}%`, top: `${DESIGNED_FOR_TOP}%`, fontSize: '1.5cqh' }}
              >
                Especially designed for
              </p>

              <div
                className="absolute flex flex-col items-center justify-center gap-[0.8cqh]"
                style={{ left: `${LABEL.left}%`, width: `${LABEL.width}%`, top: `${BRAND_AREA.top}%`, height: `${BRAND_AREA.height}%` }}
              >
                <AnimatePresence>
                  {logo && (
                    <motion.img
                      key={logo}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      src={logo}
                      alt="Your logo on the label"
                      className="w-[84%] object-contain"
                      style={{ height: '9.5cqh' }}
                    />
                  )}
                </AnimatePresence>
                <motion.div
                  key={shown}
                  initial={{ opacity: 0.2, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  aria-live="polite"
                  className="flex min-h-0 w-[46%] flex-1 items-center justify-center overflow-hidden whitespace-nowrap bg-ink px-1 text-center font-display leading-none text-white"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: `${fontSize}cqh` }}
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
          {STEPS.map((step, i) => {
            const isUpload = i === 0;
            const icon = (
              <span className={`relative grid h-14 w-14 place-items-center rounded-full border bg-white text-ocean shadow-[0_10px_24px_-12px_rgba(7,38,58,0.4)] ${isUpload ? 'border-copper transition-transform duration-300 group-hover:-translate-y-1' : 'border-ink/10'}`}>
                {isUpload && logo ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-copper text-[10px] font-bold text-white">
                  {i + 1}
                </span>
              </span>
            );
            return (
              <Reveal key={step.title} delay={i * 0.1} y={26}>
                {isUpload ? (
                  <button type="button" onClick={() => openPicker(true)} className="group block text-left">
                    {icon}
                    <span className="mt-5 block font-display text-xl font-normal text-ink">{step.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-ink/65">{logo ? 'Logo added. Tap to change it.' : step.text}</span>
                  </button>
                ) : (
                  <>
                    {icon}
                    <h3 className="mt-5 text-xl font-normal text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.text}</p>
                  </>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

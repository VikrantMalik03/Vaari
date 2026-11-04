'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CONTACT } from '@/lib/site-data';

const MESSAGES = ['Order on WhatsApp', 'Need bulk supply?', 'Questions? Chat with us'];

export function WhatsAppButton() {
  const [index, setIndex] = useState(-1);
  const [dismissed, setDismissed] = useState(false);

  const [pastHero, setPastHero] = useState(false);
  const { scrollY } = useScroll();

  // Prompts wait until the visitor has moved past the hero and its buttons.
  useMotionValueEvent(scrollY, 'change', (y) => {
    if (y > window.innerHeight * 2.6) setPastHero(true);
  });

  useEffect(() => {
    if (dismissed || !pastHero) return;
    setIndex(0);
    const cycle = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 7000);
    return () => clearInterval(cycle);
  }, [dismissed, pastHero]);

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence mode="wait">
        {!dismissed && index >= 0 && (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 14, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="absolute bottom-full right-0 mb-3 hidden items-center gap-2 whitespace-nowrap rounded-2xl bg-white py-2 pl-4 pr-2 text-xs font-bold text-ink shadow-[0_12px_30px_-10px_rgba(7,38,58,0.5)] sm:flex"
          >
            {MESSAGES[index]}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss message"
              className="grid h-6 w-6 place-items-center rounded-full text-ink/50 hover:bg-ink/5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.8 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with VAARI on WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#128c5e] text-white shadow-[0_14px_30px_-8px_rgba(18,140,94,0.7)]"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
    </div>
  );
}

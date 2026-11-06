'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Mail, Menu, MessageCircle, Palette, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { scrollToTarget, setScrollLocked } from '@/components/site/motion';
import { CONTACT, NAV_LINKS } from '@/lib/site-data';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHome = pathname === '/';
  // Section links need the home page in front of them when used from another page.
  const hrefFor = (href: string) => (href.startsWith('#') && !isHome ? `/${href}` : href);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  useEffect(() => {
    setScrollLocked(menuOpen);
    return () => setScrollLocked(false);
  }, [menuOpen]);

  // Highlights the link for whichever section crosses the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActiveId(hit.target.id);
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    ['home', ...NAV_LINKS.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1))].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const solid = scrolled && !menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: isHome ? 1.1 : 0.1 }}
        className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5"
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex items-center justify-between transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
            solid
              ? 'mt-3 h-16 max-w-6xl rounded-full border border-white/60 bg-white/75 px-4 shadow-[0_14px_44px_-14px_rgba(7,38,58,0.4)] backdrop-blur-xl sm:px-6'
              : 'mt-1 h-20 max-w-7xl rounded-none border border-transparent bg-transparent px-2 sm:px-3'
          }`}
        >
          <Link href={isHome ? '#home' : '/'} aria-label="VAARI home" className="relative block h-10 w-[86px] shrink-0">
            <img
              src="/brand/vaari-logo-light.webp"
              alt=""
              className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500 ${solid ? 'opacity-0' : 'opacity-100'}`}
            />
            <img
              src="/brand/vaari-logo.webp"
              alt=""
              className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500 ${solid ? 'opacity-100' : 'opacity-0'}`}
            />
          </Link>

          <div className="hidden items-center lg:flex xl:gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === pathname || (isHome && activeId === link.href.slice(1));
              return (
                <Link
                  key={link.name}
                  href={hrefFor(link.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-3 py-2 text-sm font-semibold xl:px-4 transition-colors duration-300 ${
                    solid ? 'text-ink/75 hover:text-ink' : 'text-white/85 hover:text-white'
                  }`}
                >
                  {isActive && solid && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-full bg-ocean/10"
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDialogOpen(true)}
              className={`btn-fill hidden !px-5 !py-2.5 hover:text-white sm:inline-flex ${
                solid ? 'bg-ink text-white' : 'bg-white text-ink'
              }`}
            >
              <Phone className="h-3.5 w-3.5" />
              Get in Touch
            </button>
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
                solid ? 'text-ink hover:bg-ink/5' : 'text-white hover:bg-white/10'
              }`}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 92% 5%)' }}
            animate={{ clipPath: 'circle(150% at 92% 5%)' }}
            exit={{ clipPath: 'circle(0% at 92% 5%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="hero-water fixed inset-0 z-40 flex flex-col justify-center px-8 text-white lg:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={hrefFor(link.href)}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.06 }}
                className="border-b border-white/10 py-3 font-display text-3xl font-light sm:text-4xl"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
              onClick={() => {
                setMenuOpen(false);
                setDialogOpen(true);
              }}
              className="btn-fill mt-8 bg-white text-ink hover:text-white"
            >
              <Phone className="h-4 w-4" />
              Get in Touch
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-3xl sm:max-w-md sm:rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-light">Contact VAARI</DialogTitle>
            <DialogDescription>Choose how you would like to connect with us</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 py-3">
            <a href={CONTACT.phoneHref} className="group flex items-center gap-4 rounded-2xl bg-foam p-4 transition-colors hover:bg-ocean hover:text-white">
              <Phone className="h-5 w-5 text-ocean group-hover:text-white" />
              <span className="font-bold">Call Us: {CONTACT.phone}</span>
            </a>
            <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl bg-foam p-4 transition-colors hover:bg-[#128c5e] hover:text-white">
              <MessageCircle className="h-5 w-5 text-[#128c5e] group-hover:text-white" />
              <span className="font-bold">WhatsApp: {CONTACT.whatsapp}</span>
            </a>
            <button
              onClick={() => {
                setDialogOpen(false);
                if (isHome) scrollToTarget('#white-label');
                else window.location.href = '/#white-label';
              }}
              className="group flex items-center gap-4 rounded-2xl bg-foam p-4 text-left transition-colors hover:bg-copper hover:text-white"
            >
              <Palette className="h-5 w-5 text-copper-dark group-hover:text-white" />
              <span className="font-bold">White Label / Customize</span>
            </button>
          </div>

          <div className="space-y-1 text-center text-sm text-ink/65">
            <p className="flex items-center justify-center gap-2 break-all">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              {CONTACT.email}
            </p>
            <p>Working Hours: {CONTACT.hours}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

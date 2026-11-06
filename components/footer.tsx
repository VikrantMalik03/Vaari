'use client';

import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WaveEdge } from '@/components/site/motion';
import { CONTACT, NAV_LINKS } from '@/lib/site-data';

const SOCIAL = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/vaari_solutions?igsh=MWJqaXJiOG92OHUzbQ%3D%3D&utm_source=qr' },
  { icon: Twitter, label: 'X (Twitter)', href: 'https://x.com/vaari_solutions?s=21' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/vaari-solutions/' },
];

const LEGAL = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-conditions' },
  { name: 'Refund Policy', href: '/refund-policy' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const isHome = usePathname() === '/';

  return (
    <footer className="relative bg-ink pt-16 text-white">
      <WaveEdge color="#07263a" className="absolute inset-x-0 bottom-[calc(100%-1px)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1fr]">
          <div>
            <img src="/brand/vaari-logo-light.webp" alt="VAARI" loading="lazy" className="h-14 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
              Pure, safe, and refreshing drinking water delivered with excellence across Haryana.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIAL.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-copper-light hover:bg-copper-light hover:text-ink"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Quick Links">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link href={link.href.startsWith('#') && !isHome ? `/${link.href}` : link.href} className="text-white/65 transition-colors hover:text-aqua">{link.name}</Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact Info">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
              <span>
                <a href={CONTACT.phoneHref} className="block text-white/65 hover:text-aqua">+91 {CONTACT.phone}</a>
                <a href="tel:+918929695631" className="block text-white/65 hover:text-aqua">+91 {CONTACT.whatsapp}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
              <a href={CONTACT.emailHref} className="break-all text-white/65 hover:text-aqua">{CONTACT.email}</a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
              <span className="text-white/65">Haryana, India</span>
            </li>
          </FooterColumn>

          <FooterColumn title="Legal">
            {LEGAL.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-white/65 transition-colors hover:text-aqua">{link.name}</Link>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div aria-hidden className="water-text mt-14 select-none text-center font-display font-light italic leading-[1.1] [font-size:clamp(5rem,23vw,22rem)]">
          Vaari
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 text-center text-xs text-white/55 md:flex-row">
          <p>&copy; {year} VAARI by SATPREM SOLUTIONS. All rights reserved.</p>
          <p>FSSAI Certified | Quality Assured | Eco-Friendly</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/90">{title}</h3>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

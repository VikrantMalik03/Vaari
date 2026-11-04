'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2, Check, Clock, MapPin, Package, Phone, Truck } from 'lucide-react';
import { useRef } from 'react';
import { Reveal, RiseText, WaveEdge } from '@/components/site/motion';
import { CITIES, CONTACT } from '@/lib/site-data';

const FACTS = [
  { icon: MapPin, title: 'Service Area', lead: 'Haryana', text: 'Including  Faridabad, Gurgaon, Hodal and Palwal' },
  { icon: Clock, title: 'Working Hours', lead: CONTACT.hours, text: 'Monday to Saturday. Sunday by appointment only' },
  { icon: Truck, title: 'Delivery Schedule', lead: 'Daily & Weekly', text: 'Within 48hrs delivery available for bulk orders' },
];

const BULK = [
  {
    icon: Building2,
    title: 'Corporate Offices',
    items: ['Regular supply contracts', 'Customized delivery schedules', 'Dedicated account manager', 'Volume discounts'],
  },
  {
    icon: Package,
    title: 'Hotels & Restaurants',
    items: ['White-label options', 'Premium packaging', 'Flexible order quantities', 'Quick replenishment'],
  },
  {
    icon: Truck,
    title: 'Events & Functions',
    items: ['Large volume orders', 'Event-specific branding', 'Timely delivery guaranteed', 'Special event pricing'],
  },
];

const WHY = [
  { title: 'Fast Delivery', text: 'Within 48hrs delivery available' },
  { title: 'Quality Assured', text: 'Temperature-controlled transport' },
  { title: 'Reliable Service', text: 'On-time, every time' },
  { title: 'Flexible Options', text: 'Daily, weekly, or monthly' },
];

export function DeliverySection() {
  const route = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: route, offset: ['start 90%', 'end 45%'] });
  const truckLeft = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="delivery" className="relative bg-ocean-deep pb-24 pt-28 text-white lg:pb-36 lg:pt-40">
      <WaveEdge color="#0a3350" className="absolute inset-x-0 bottom-[calc(100%-1px)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-6 text-aqua">Distribution & Delivery</p>
        </Reveal>
        <RiseText
          text="Fast, reliable delivery across Haryana."
          className="max-w-4xl text-4xl font-light leading-[1.05] sm:text-6xl"
        />

        {/* The truck drives the route as the reader scrolls. */}
        <div ref={route} className="relative mb-20 mt-20 px-3 sm:px-8 lg:mt-24">
          <div className="relative h-px bg-white/20">
            <motion.div style={{ scaleX: lineScale }} className="absolute inset-0 origin-left bg-copper-light" />
            <motion.div style={{ left: truckLeft }} className="absolute -top-[22px] z-10 -ml-[22px] grid h-11 w-11 place-items-center rounded-full bg-copper-light text-ink shadow-[0_0_0_7px_rgba(232,176,128,0.2)]">
              <Truck className="h-5 w-5" />
            </motion.div>
            {CITIES.map((city, i) => (
              <div key={city} className="absolute top-0 flex -translate-x-1/2 flex-col items-center" style={{ left: `${(i / (CITIES.length - 1)) * 100}%` }}>
                <span className="-mt-1 h-2 w-2 rounded-full bg-white" />
                <span className="mt-8 text-[11px] font-semibold text-white/85 sm:text-sm">{city}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl bg-white/15 md:grid-cols-3">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.title} delay={i * 0.08} y={20} className="bg-ocean-deep">
              <div className="h-full p-7 transition-colors duration-500 hover:bg-white/[0.06] lg:p-10">
                <fact.icon className="mb-8 h-6 w-6 text-aqua" />
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{fact.title}</p>
                <p className="mt-2 font-display text-3xl font-light">{fact.lead}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{fact.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 lg:mt-32">
          <RiseText text="Bulk Order Options" className="text-3xl font-light sm:text-5xl" />
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-white/70">We cater to various business needs with customized solutions</p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {BULK.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.1}>
                <div className="group h-full rounded-3xl bg-white p-7 text-ink transition-transform duration-500 hover:-translate-y-2 lg:p-9">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-foam text-ocean transition-colors duration-500 group-hover:bg-copper group-hover:text-white">
                    <service.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-7 text-2xl font-normal">{service.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink/75">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 pt-12 lg:grid-cols-4">
          {WHY.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} y={18}>
              <h3 className="font-sans text-base font-bold tracking-normal">{item.title}</h3>
              <p className="mt-1.5 text-sm text-white/65">{item.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/20 p-7 sm:flex-row sm:items-center lg:p-10">
          <p className="max-w-xl font-display text-2xl font-light lg:text-3xl">
            Ready to place a bulk order or discuss white-label options?
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={CONTACT.phoneHref} className="btn-fill bg-white text-ink hover:text-white">
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a href="#contact" className="btn-fill border border-white/40 text-white [--btn-hover:rgba(255,255,255,0.16)]">
              Send Inquiry
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

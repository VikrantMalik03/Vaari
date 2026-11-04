'use client';

import { motion } from 'framer-motion';
import { Clock, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { Reveal, RiseText } from '@/components/site/motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CONTACT, type Product } from '@/lib/site-data';

const EMPTY = { name: '', email: '', phone: '', message: '', inquiry_type: 'general' };

const FIELD =
  'peer w-full rounded-none border-0 border-b-2 border-ink/15 bg-transparent pb-2.5 pt-6 text-base text-ink outline-none transition-colors focus:border-copper';
const LABEL =
  'pointer-events-none absolute left-0 top-6 text-base text-ink/55 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:font-bold peer-focus:text-copper-dark peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-bold';

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const set = (field: keyof typeof EMPTY, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  // The Order and Enquire buttons on the product showcase fill in the message.
  useEffect(() => {
    const onEnquire = (event: Event) => {
      const product = (event as CustomEvent<Product>).detail;
      setForm((prev) => ({
        ...prev,
        inquiry_type: product.line === 'Bulk' ? 'bulk_order' : prev.inquiry_type,
        message: `Hi, I would like to know more about ${product.name}.`,
      }));
    };
    window.addEventListener('vaari:enquire', onEnquire);
    return () => window.removeEventListener('vaari:enquire', onEnquire);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send');
      toast.success('Inquiry submitted successfully! We will contact you soon.');
      setForm(EMPTY);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-foam py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-6 text-copper-dark">Contact Us</p>
          </Reveal>
          <RiseText text="Let's talk water." className="text-5xl font-light leading-[1.02] text-ink sm:text-7xl" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">
              Get in touch with us for orders, inquiries, or white-label solutions. We typically respond
              within 2 to 4 hours during business hours.
            </p>
          </Reveal>

          <div className="mt-10 border-t border-ink/10">
            <Info icon={<Phone />} title="Call Us">
              <a className="font-bold text-ink hover:text-ocean" href={CONTACT.phoneHref}>+91 {CONTACT.phone}</a>
            </Info>
            <Info icon={<MessageCircle />} title="WhatsApp">
              <a className="font-bold text-ink hover:text-ocean" href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">+91 {CONTACT.whatsapp}</a>
            </Info>
            <Info icon={<Mail />} title="Email Us">
              <a className="break-all font-bold text-ink hover:text-ocean" href={CONTACT.emailHref}>{CONTACT.email}</a>
            </Info>
            <Info icon={<Clock />} title="Working Hours">
              <span className="font-bold text-ink">{CONTACT.hours}, {CONTACT.days}</span>
            </Info>
            <Info icon={<MapPin />} title="Service Area">
              <span className="font-bold text-ink">Delhi, Noida, Gurgaon, Ghaziabad, Faridabad</span>
            </Info>
          </div>
        </div>

        <Reveal y={50}>
          <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-7 shadow-[0_40px_80px_-40px_rgba(10,51,80,0.45)] sm:p-11">
            <h3 className="text-3xl font-light text-ink">Send us a message</h3>
            <p className="mb-7 mt-1.5 text-sm text-ink/60">Urgent order? Please call us directly.</p>

            <div className="space-y-6">
              <div className="relative">
                <input id="name" required placeholder=" " value={form.name} onChange={(e) => set('name', e.target.value)} className={FIELD} autoComplete="name" />
                <label htmlFor="name" className={LABEL}>Full Name *</label>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="relative">
                  <input id="email" type="email" required placeholder=" " value={form.email} onChange={(e) => set('email', e.target.value)} className={FIELD} autoComplete="email" />
                  <label htmlFor="email" className={LABEL}>Email Address *</label>
                </div>
                <div className="relative">
                  <input id="phone" type="tel" required placeholder=" " value={form.phone} onChange={(e) => set('phone', e.target.value)} className={FIELD} autoComplete="tel" />
                  <label htmlFor="phone" className={LABEL}>Phone Number *</label>
                </div>
              </div>
              <div>
                <p id="inquiry-label" className="mb-2 text-xs font-bold text-ink/60">Inquiry Type *</p>
                <Select value={form.inquiry_type} onValueChange={(value) => set('inquiry_type', value)}>
                  <SelectTrigger aria-labelledby="inquiry-label" className="h-12 rounded-xl border-ink/15 bg-paper">
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="bulk_order">Bulk Order</SelectItem>
                    <SelectItem value="white_label">White Label / Customization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <textarea ref={messageRef} id="message" required rows={4} placeholder=" " value={form.message} onChange={(e) => set('message', e.target.value)} className={`${FIELD} resize-none`} />
                <label htmlFor="message" className={LABEL}>Message *</label>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="btn-fill mt-8 w-full bg-ink py-5 text-base text-white disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Info({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Reveal y={14} className="flex items-start gap-4 border-b border-ink/10 py-4">
      <span className="mt-0.5 text-ocean [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      <div className="min-w-0 text-[15px]">
        <p className="mb-0.5 text-xs font-semibold text-ink/55">{title}</p>
        {children}
      </div>
    </Reveal>
  );
}

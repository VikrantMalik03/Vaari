'use client';

import { useState } from 'react';
import { Phone, Mail, Clock, Send, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export function ContactSection() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiry_type: 'general',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send');

      toast.success('Inquiry submitted successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        inquiry_type: 'general',
      });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for orders, inquiries, or white-label solutions
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT — MODERN FORM */}
          <Card className="relative overflow-hidden border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] rounded-3xl">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-300/30 blur-3xl rounded-full pointer-events-none"></div>

            <CardContent className="relative p-8 md:p-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h3>
              <p className="text-gray-600 mb-8">We usually respond within a few hours</p>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" required value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="John Doe"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" required value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="you@example.com"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" required value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Inquiry Type *</Label>
                  <Select
                    value={formData.inquiry_type}
                    onValueChange={(value) => handleChange('inquiry_type', value)}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="bulk_order">Bulk Order</SelectItem>
                      <SelectItem value="white_label">White Label / Customization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" required value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    className="resize-none rounded-xl"
                  />
                </div>

                <Button type="submit" disabled={loading}
                  className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg">
                  {loading ? 'Sending...' : (<><Send className="h-5 w-5 mr-2" />Send Message</>)}
                </Button>

              </form>
            </CardContent>
          </Card>

          {/* RIGHT SIDE INFO CARDS */}
          <div className="space-y-6">

            <InfoCard icon={<Phone />} title="Call Us" lines={[
              { label: '+91 9268448510', href: 'tel:+919268448510' },
              { label: '+91 8929695631', href: 'tel:+918929695631' }
            ]} />

            <InfoCard icon={<Mail />} title="Email Us" lines={[
              { label: 'Vaarisatpremsolutions@yahoo.com', href: 'mailto:Vaarisatpremsolutions@yahoo.com' }
            ]} />

            <InfoCard icon={<Clock />} title="Working Hours" lines={[
              { label: '9:00 AM - 6:00 PM' },
              { label: 'Monday to Saturday' }
            ]} />

            <InfoCard icon={<MapPin />} title="Service Area" lines={[
              { label: 'Delhi NCR' },
              { label: 'Delhi, Noida, Gurgaon, Ghaziabad, Faridabad' }
            ]} />

            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Quick Response Guarantee</h4>
              <p className="opacity-90 leading-relaxed">
                We typically respond to all inquiries within 2–4 hours during business hours.
                For urgent orders, please call us directly.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, lines }: any) {
  return (
    <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-8 flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">
          {icon}
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
          {lines.map((line: any, i: number) =>
            line.href ? (
              <a key={i} href={line.href} className="block text-blue-600 font-semibold hover:underline">{line.label}</a>
            ) : (
              <p key={i} className="text-gray-600">{line.label}</p>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}

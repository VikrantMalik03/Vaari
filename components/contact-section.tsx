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
import { supabase, type ContactInquiry } from '@/lib/supabase';
import { toast } from 'sonner';

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactInquiry>({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiry_type: 'general',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!supabase) {
        toast.error('Service temporarily unavailable. Please call us directly.');
        setLoading(false);
        return;
      }

      const { error } = await supabase.from('contact_inquiries').insert([formData]);

      if (error) throw error;

      toast.success('Inquiry submitted successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        inquiry_type: 'general',
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to submit inquiry. Please try calling us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ContactInquiry, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for orders, inquiries, or white-label solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="border-2 border-blue-100 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Enter your name"
                      className="h-12"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiry_type">Inquiry Type *</Label>
                    <Select
                      value={formData.inquiry_type}
                      onValueChange={(value) =>
                        handleChange('inquiry_type', value as ContactInquiry['inquiry_type'])
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
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
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Tell us about your requirements..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    {loading ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-cyan-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Call Us</h4>
                    <div className="space-y-2">
                      <a
                        href="tel:+919268448510"
                        className="block text-blue-600 font-semibold text-lg hover:underline"
                      >
                        +91 9268448510
                      </a>
                      <a
                        href="tel:+918929695631"
                        className="block text-blue-600 font-semibold text-lg hover:underline"
                      >
                        +91 8929695631
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Email Us</h4>
                    <a
                      href="mailto:Vaarisatpremsolutions@yahoo.com"
                      className="text-blue-600 font-semibold hover:underline break-all"
                    >
                      Vaarisatpremsolutions@yahoo.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Working Hours</h4>
                    <p className="text-gray-700 font-semibold">9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 mt-1">Monday to Saturday</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Service Area</h4>
                    <p className="text-gray-700 font-semibold">Delhi NCR</p>
                    <p className="text-gray-600 mt-1">
                      Covering Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Quick Response Guarantee</h4>
              <p className="opacity-90 leading-relaxed">
                We typically respond to all inquiries within 2-4 hours during business hours.
                For urgent orders or queries, please call us directly for immediate assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

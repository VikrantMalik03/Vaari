'use client';

import { MapPin, Clock, Phone, Mail, Truck, Building2, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function DeliverySection() {
  return (
    <section id="delivery" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Distribution & Delivery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fast, reliable delivery service across Delhi NCR with flexible options for all your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Service Area</h3>
              <p className="text-gray-700 text-lg">
                We deliver across <span className="font-semibold text-blue-600">Delhi NCR</span>
              </p>
              <p className="text-gray-600 mt-2">
                Including Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-cyan-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Working Hours</h3>
              <p className="text-gray-700 text-lg font-semibold">9:00 AM - 6:00 PM</p>
              <p className="text-gray-600 mt-2">Monday to Saturday</p>
              <p className="text-sm text-gray-500 mt-3">Sunday: By appointment only</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Delivery Schedule</h3>
              <p className="text-gray-700 text-lg">Daily & Weekly Options</p>
              <p className="text-gray-600 mt-2">With-in 48hrs delivery available for bulk orders</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Order</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-2xl">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Call Us</h4>
                <p className="text-gray-700 mb-2">Speak directly with our team</p>
                <a
                  href="tel:+919268448510"
                  className="text-blue-600 font-semibold hover:underline text-lg"
                >
                  9268448510 (Call)
                </a>
                <p className="text-gray-600 text-sm mt-1">or</p>
                <a
                  href="tel:+918929695631"
                  className="text-blue-600 font-semibold hover:underline text-lg"
                >
                  8929695631 (Whatsapp)
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-cyan-50 rounded-2xl">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Email Us</h4>
                <p className="text-gray-700 mb-2">Send your order details</p>
                <a
                  href="mailto:Vaarisatpremsolutions@yahoo.com"
                  className="text-blue-600 font-semibold hover:underline break-all"
                >
                  Vaarisatpremsolutions@yahoo.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
          <h3 className="text-3xl font-bold mb-8 text-center">Bulk Order Options</h3>
          <p className="text-xl text-center mb-12 opacity-90">
            We cater to various business needs with customized solutions
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: 'Corporate Offices',
                items: [
                  'Regular supply contracts',
                  'Customized delivery schedules',
                  'Dedicated account manager',
                  'Volume discounts',
                ],
              },
              {
                icon: Package,
                title: 'Hotels & Restaurants',
                items: [
                  'White-label options',
                  'Premium packaging',
                  'Flexible order quantities',
                  'Quick replenishment',
                ],
              },
              {
                icon: Truck,
                title: 'Events & Functions',
                items: [
                  'Large volume orders',
                  'Event-specific branding',
                  'Timely delivery guaranteed',
                  'Special event pricing',
                ],
              },
            ].map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span className="opacity-90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl mb-6">
              Ready to place a bulk order or discuss white-label options?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+919268448510"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-xl font-semibold hover:bg-white/30 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                Send Inquiry
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Choose VAARI Delivery?
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Fast Delivery', desc: 'With-in 48hrs delivery available' },
              { title: 'Quality Assured', desc: 'Temperature-controlled transport' },
              { title: 'Reliable Service', desc: 'On-time, every time' },
              { title: 'Flexible Options', desc: 'Daily, weekly, or monthly' },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { Calendar, Target, Droplets, Award, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About VAARI</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering pure, safe, and reliable drinking water while helping businesses
            strengthen their brand identity through custom white-label solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="font-semibold text-lg text-gray-900">Founded in 2025</p>
                <p>
                  SATPREM SOLUTIONS was founded with a clear purpose — to make pure, safe, and
                  reliable drinking water accessible to everyone, while helping businesses
                  strengthen their brand identity through custom white-label solutions.
                </p>
                <p>
                  The idea for the company came from recognizing a growing need in the market.
                  We saw businesses and individuals seeking not just quality water, but a trusted
                  partner who could deliver consistency, purity, and personalized service.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-cyan-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-3 rounded-xl">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What We Do</h3>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <span className="font-semibold text-gray-900">SATPREM SOLUTIONS</span>, under
                  its premium water brand <span className="font-semibold text-blue-600">VAARI</span>,
                  is dedicated to delivering pure, refreshing, and safe drinking water to consumers
                  and businesses alike.
                </p>
                <p>
                  We specialize in bottled water distribution under our own trusted brand, ensuring
                  every drop reflects the highest standards of purity and quality.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-3 rounded-xl">
              <Droplets className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Our Water Source</h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 mb-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Copper-Based RO Purification
              </h4>
              <p className="text-gray-700 leading-relaxed text-center mb-6">
                Our water is sourced from a state-of-the-art Copper-Based RO Purifier, a cutting-edge
                system that combines advanced Reverse Osmosis (RO) filtration technology with the
                natural benefits of copper.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h5 className="font-bold text-gray-900 mb-3 text-lg">Advanced Filtration</h5>
                <p className="text-gray-700">
                  Crystal-clear water free from contaminants, impurities, and harmful substances
                  through our multi-stage RO process.
                </p>
              </div>
              <div className="bg-cyan-50 rounded-xl p-6">
                <h5 className="font-bold text-gray-900 mb-3 text-lg">Copper Enrichment</h5>
                <p className="text-gray-700">
                  Water enriched with copper&rsquo;s natural health-boosting properties, including
                  antimicrobial benefits and improved immunity.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="bg-white/20 p-3 rounded-xl">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold">Quality Certifications</h3>
          </div>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl mb-6">
              VAARI water is certified by the Food Safety and Standards Authority of India (FSSAI),
              ensuring compliance with the highest food safety and quality standards.
            </p>
            <div className="inline-flex items-center space-x-3 bg-white/20 rounded-full px-6 py-3">
              <Award className="h-6 w-6" />
              <span className="font-bold text-lg">FSSAI Certified</span>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">White Label Services</h3>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
              Beyond our own brand, we offer premium white labeling services — providing customized
              bottled water solutions for hotels, restaurants, cafés, corporate offices, and event
              organizers.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Custom Branding', desc: 'Your logo and design on premium bottles' },
                { title: 'Quality Assurance', desc: 'Same VAARI purity standards' },
                { title: 'Flexible Orders', desc: 'From small batches to bulk supply' },
              ].map((item, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Droplets, Award, Shield, Leaf } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-white -z-10" />

      <div className="absolute inset-0 opacity-5 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" 
             style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeInUp">
            <div className="inline-block animate-slideInLeft">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300">
                Premium Bottled Water Since 2025
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight animate-slideInLeft" 
                style={{ animationDelay: '0.2s' }}>
              Stay Pure.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 animate-gradient">
                Stay Hydrated.
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed animate-slideInLeft" 
               style={{ animationDelay: '0.4s' }}>
              Experience the purity of copper-based RO purified water. Every drop of VAARI
              water is a commitment to your health, combining advanced filtration with the
              natural benefits of copper enrichment.
            </p>

            <div className="flex flex-wrap gap-4 animate-slideInLeft" style={{ animationDelay: '0.6s' }}>
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Products
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Us
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {[
                { icon: Droplets, label: 'Pure Water', delay: '0.8s' },
                { icon: Award, label: 'FSSAI Certified', delay: '0.9s' },
                { icon: Shield, label: 'Quality Assured', delay: '1s' },
                { icon: Leaf, label: 'Eco-Friendly', delay: '1.1s' },
              ].map((item, index) => (
                <div key={index} className="text-center animate-fadeInUp" style={{ animationDelay: item.delay }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl mb-2 transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-md hover:shadow-lg">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fadeInRight">
            <div className="relative w-full h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl transform rotate-6 opacity-20 animate-float" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-3xl transform -rotate-6 opacity-20 animate-float" 
                   style={{ animationDelay: '1s' }} />

              <div className="relative z-10 grid grid-cols-2 gap-6">
                <div className="space-y-6 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                  <div className="bg-white p-4 rounded-2xl shadow-xl transform hover:scale-105 hover:-rotate-2 transition-all duration-500 hover:shadow-2xl group">
                    <div className="w-full h-56 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img 
                        src="/Vaari_bottle_p_1ltr_final-removebg-preview.png" 
                        alt="premium" 
                        className="h-52 w-auto object-contain transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-center font-semibold text-gray-800 mt-4 group-hover:text-blue-600 transition-colors duration-300">Premium Design</p>
                  </div>
                </div>
                <div className="space-y-6 pt-12 animate-slideInUp" style={{ animationDelay: '0.6s' }}>
                  <div className="bg-white p-4 rounded-2xl shadow-xl transform hover:scale-105 hover:rotate-2 transition-all duration-500 hover:shadow-2xl group">
                    <div className="w-full h-56 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img 
                        src="/Vaari_bottle_s_1ltr_2_final-removebg-preview.png" 
                        alt="normal" 
                        className="h-52 w-auto object-contain transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-center font-semibold text-gray-800 mt-4 group-hover:text-cyan-600 transition-colors duration-300">Normal Design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-white rounded-3xl shadow-xl p-8 md:p-12 transform hover:shadow-2xl transition-all duration-500 animate-fadeInUp" 
             style={{ animationDelay: '1.2s' }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full animate-expandWidth" />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
            Our mission is to deliver pure, safe, and high-quality drinking water that enriches health
            and convenience for every customer, while empowering businesses to build their own brand
            identity through reliable white-label water solutions. We aim to set new benchmarks in purity,
            packaging, and service excellence, guided by a deep respect for sustainability, customer trust,
            and community well-being.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(6deg);
          }
          50% {
            transform: translateY(-20px) rotate(6deg);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 6rem;
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeInRight {
          animation: fadeInRight 1s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-expandWidth {
          animation: expandWidth 1s ease-out forwards;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
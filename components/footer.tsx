'use client';

import { Droplets, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Droplets className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">VAARI</h3>
                <p className="text-xs text-gray-400">by SATPREM SOLUTIONS</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pure, safe, and refreshing drinking water delivered with excellence across Delhi NCR.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Us', href: '#about' },
                { name: 'Products', href: '#products' },
                { name: 'Delivery', href: '#delivery' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <a href="tel:+919268448510" className="text-gray-400 hover:text-blue-400 block">
                    +91 9268448510
                  </a>
                  <a href="tel:+918929695631" className="text-gray-400 hover:text-blue-400 block">
                    +91 8929695631
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:Vaarisatpremsolutions@yahoo.com"
                  className="text-gray-400 hover:text-blue-400 text-sm break-all"
                >
                  Vaarisatpremsolutions@yahoo.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Delhi NCR, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 mb-6">
              {[
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms & Conditions', href: '/terms-conditions' },
                { name: 'Refund Policy', href: '/refund-policy' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: 'https://www.instagram.com/vaari_solutions?igsh=MWJqaXJiOG92OHUzbQ%3D%3D&utm_source=qr' },
                { icon: Twitter, href: 'https://x.com/vaari_solutions?s=21' },
                { icon: Linkedin, href: 'https://www.linkedin.com/company/vaari-solutions/' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} VAARI by SATPREM SOLUTIONS. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right">
              FSSAI Certified | Quality Assured | Eco-Friendly
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

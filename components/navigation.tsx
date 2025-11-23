'use client';

import { useState } from 'react';
import { Phone, Menu, X, MessageCircle, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Delivery', href: '#delivery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleCall = () => {
    window.location.href = 'tel:+919268448510';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/918929695631', '_blank');
  };

  const handleCustomize = () => {
    window.location.href = '#contact';
    setContactDialogOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* LOGO SECTION */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                <img
                  src="/logo_vaari.png"
                  alt="logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VAARI</h1>
                <p className="text-xs text-gray-600">by SATPREM SOLUTIONS</p>
              </div>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
              <Button
                onClick={() => setContactDialogOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                Get in Touch
              </Button>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              <Button
                onClick={() => {
                  setContactDialogOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600"
              >
                <Phone className="h-4 w-4 mr-2" />
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* CONTACT DIALOG */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Contact VAARI</DialogTitle>
            <DialogDescription>
              Choose how you would like to connect with us
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Button
              onClick={handleCall}
              className="h-16 bg-green-600 hover:bg-green-700 text-lg"
            >
              <Phone className="h-5 w-5 mr-3" />
              Call Us: 9268448510
            </Button>

            <Button
              onClick={handleWhatsApp}
              className="h-16 bg-emerald-600 hover:bg-emerald-700 text-lg"
            >
              <MessageCircle className="h-5 w-5 mr-3" />
              WhatsApp: 8929695631
            </Button>

            <Button
              onClick={handleCustomize}
              className="h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg"
            >
              <Palette className="h-5 w-5 mr-3" />
              White Label / Customize
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600 space-y-1">
            <p>Email: Vaarisatpremsolutions@yahoo.com</p>
            <p>Working Hours: 9:00 AM - 6:00 PM</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

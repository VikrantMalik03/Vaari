'use client';

import { useState } from 'react';

// Lucide icons as inline SVGs to avoid import issues
const PackageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 9.4 7.55 4.24"></path>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.29 7 12 12 20.71 7"></polyline>
    <line x1="12" y1="22" x2="12" y2="12"></line>
  </svg>
);

const StarIcon = ({ filled = false }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ShoppingCartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1"></circle>
    <circle cx="19" cy="21" r="1"></circle>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
  </svg>
);

const DropletsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const AwardIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"></circle>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
  </svg>
);

export function ProductsSection() {
  const [activeTab, setActiveTab] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Pure Aqua 250ml',
      size: '250ml',
      bottle_type: 'normal',
      description: 'Perfect for daily hydration and on-the-go refreshment',
      // price: '₹15',
      image: '/normal_1.png' // Add your image path here
    },
    {
      id: 2,
      name: 'Pure Aqua 500ml',
      size: '500ml',
      bottle_type: 'normal',
      description: 'Ideal for home, office, and extended outdoor activities',
      // price: '₹25',
      image: '/normal_1.png' // Add your image path here
    },
    {
      id: 3,
      name: 'Pure Aqua 1L',
      size: '1L',
      bottle_type: 'normal',
      description: 'Family size for shared meals and gatherings',
      // price: '₹40',
      image: '/normal_1.png' // Add your image path here
    },
    {
      id: 4,
      name: 'Premium Crystal 500ml',
      size: '500ml',
      bottle_type: 'premium',
      description: 'Enhanced mineral water with superior taste and purity',
      // price: '₹50',
      image: '/bottles premium-1 (1).png' // Add your image path here
    },
    {
      id: 5,
      name: 'Premium Crystal 1L',
      size: '1L',
      bottle_type: 'premium',
      description: 'Luxury hydration experience for discerning customers',
      // price: '₹85',
      image: '/bottles premium-1 (1).png' // Add your image path here
    }
  ];

  const normalProducts = products.filter(p => p.bottle_type === 'normal');
  const premiumProducts = products.filter(p => p.bottle_type === 'premium');

  const handleOrder = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ProductCard = ({ product, index }) => (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      style={{
        animation: 'fadeInUp 0.6s ease-out forwards',
        animationDelay: `${index * 0.1}s`,
        opacity: 0
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-500 z-10 pointer-events-none"></div>
      
      {product.bottle_type === 'premium' && (
        <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg font-semibold text-sm">
          <StarIcon filled={true} />
          Premium
        </div>
      )}

      <div className="relative h-80 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 to-transparent"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-blue-400 animate-pulse">
            <DropletsIcon />
          </div>
          <div className="absolute bottom-10 right-10 text-cyan-400 animate-pulse" style={{ animationDelay: '1s' }}>
            <DropletsIcon />
          </div>
        </div>

        <div className="relative z-10 h-72 flex items-center justify-center">
          <img
            src={product.image || '/placeholder-bottle.png'}
            alt={product.name}
            className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
          />
        </div>

        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg font-semibold border border-blue-100">
          <PackageIcon />
          {product.size}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {product.price}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <div className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-full font-medium">
            <ShieldIcon />
            RO Purified
          </div>
          <div className="flex items-center gap-1 text-xs bg-orange-50 text-orange-700 px-3 py-2 rounded-full font-medium">
            <AwardIcon />
            Copper Enriched
          </div>
          <div className="flex items-center gap-1 text-xs bg-cyan-50 text-cyan-700 px-3 py-2 rounded-full font-medium">
            <DropletsIcon />
            100% Pure
          </div>
        </div>

        <button
          onClick={handleOrder}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95"
        >
          <ShoppingCartIcon />
          Order Now
        </button>
      </div>
    </div>
  );

  const filteredProducts = 
    activeTab === 'all' ? products :
    activeTab === 'normal' ? normalProducts :
    premiumProducts;

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Our Products
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-6 shadow-lg"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our range of premium bottled water in various sizes to suit your needs
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-xl border border-blue-100">
            {['all', 'normal', 'premium'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {tab === 'all' ? 'All Products' : tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'all' ? (
          <div className="space-y-16">
            <div>
              <h3 className="text-4xl font-bold text-center mb-10 text-gray-900">
                Normal Range
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {normalProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-center mb-10 text-gray-900">
                Premium Range
              </h3>
              <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {premiumProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index + normalProducts.length} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={`grid ${activeTab === 'premium' ? 'sm:grid-cols-2 max-w-4xl mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-8`}>
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
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
      `}</style>
    </section>
  );
}
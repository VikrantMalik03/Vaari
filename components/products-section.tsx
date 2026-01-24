'use client';

import { useState } from 'react';

// ----------------------
//  Types
// ----------------------
interface Product {
  id: number;
  name: string;
  size: string;
  bottle_type: 'normal' | 'premium';
  description: string;
  price?: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

// ----------------------
//  Inline Icons
// ----------------------
const PackageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 9.4 7.55 4.24"></path>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.29 7 12 12 20.71 7"></polyline>
    <line x1="12" y1="22" x2="12" y2="12"></line>
  </svg>
);

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
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
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const AwardIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="6"></circle>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
  </svg>
);

// --------------------------------------------------------
//                     MAIN COMPONENT
// --------------------------------------------------------
export function ProductsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'normal' | 'premium'>('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'Pure Aqua 200ml',
      size: '250ml',
      bottle_type: 'normal',
      description: 'Perfect for daily hydration and on-the-go refreshment',
      image: '/Vaari_bottle_s_200ml_final-removebg-preview.png'
    },
    {
      id: 2,
      name: 'Pure Aqua 500ml',
      size: '500ml',
      bottle_type: 'normal',
      description: 'Ideal for home, office, and outdoor activities',
      image: '/Vaari_bottle_s_500ml_final-removebg-preview.png'
    },
    {
      id: 3,
      name: 'Pure Aqua 1L',
      size: '1L',
      bottle_type: 'normal',
      description: 'Family size for shared meals and gatherings',
      image: '/Vaari_bottle_s_1ltr_2_final-removebg-preview.png'
    },
    {
      id: 5,
      name: 'Premium Crystal 1L',
      size: '1L',
      bottle_type: 'premium',
      description: 'Luxury hydration experience for discerning customers',
      image: '/Vaari_bottle_p_1ltr_final-removebg-preview.png'
    }
  ];

  const orderedProducts = {
    all: [
      products.find(p => p.name.includes('200ml')),
      products.find(p => p.name.includes('500ml')),
      products.find(p => p.name.includes('1L') && p.bottle_type === 'normal'),
      products.find(p => p.name.includes('1L') && p.bottle_type === 'premium'),
    ].filter(Boolean) as Product[],
    normal: [
      products.find(p => p.name.includes('200ml')),
      products.find(p => p.name.includes('500ml')),
      products.find(p => p.name.includes('1L') && p.bottle_type === 'normal'),
    ].filter(Boolean) as Product[],
    premium: [products.find(p => p.bottle_type === 'premium')].filter(Boolean) as Product[],
  };

  const filteredProducts = orderedProducts[activeTab];

  const handleOrder = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ProductCard = ({ product, index }: ProductCardProps) => (
    <div
      className="group relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-3 flex flex-col"
      style={{ animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      {product.bottle_type === 'premium' && (
        <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg font-semibold text-sm animate-pulse">
          <StarIcon filled />
          Premium
        </div>
      )}

      {/* IMAGE SECTION */}
      <div className="relative h-[340px] flex items-end justify-center overflow-hidden bg-gradient-to-br from-blue-100/70 via-white to-cyan-100/70 pt-10">
        <div className="absolute w-64 h-64 bg-cyan-300/30 rounded-full blur-3xl group-hover:scale-125 transition-all duration-700"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-60 pointer-events-none"></div>

        <img
          src={product.image}
          alt={product.name}
          className="relative z-10 max-h-[260px] w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-3 drop-shadow-[0_30px_35px_rgba(0,0,0,0.28)]"
        />

        <div className="absolute bottom-8 w-32 h-6 bg-black/20 blur-xl rounded-full"></div>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-blue-600 px-4 py-2 rounded-full flex items-center gap-2 shadow-md font-semibold border border-blue-100">
          <PackageIcon />
          {product.size}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
          <p className="text-gray-600 text-sm">{product.description}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <div className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-full font-medium"><ShieldIcon />RO Purified</div>
          <div className="flex items-center gap-1 text-xs bg-orange-50 text-orange-700 px-3 py-2 rounded-full font-medium"><AwardIcon />Copper Enriched</div>
          <div className="flex items-center gap-1 text-xs bg-cyan-50 text-cyan-700 px-3 py-2 rounded-full font-medium"><DropletsIcon />100% Pure</div>
        </div>

        <button
          onClick={handleOrder}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <ShoppingCartIcon />
          Order Now
        </button>
      </div>
    </div>
  );

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-200/30 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">Our Products</h2>
          <p className="text-xl text-gray-600 mt-4">Choose from our range of premium bottled water</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-xl border border-blue-100">
            {['all', 'normal', 'premium'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

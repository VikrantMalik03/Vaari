'use client';

import { useEffect, useState } from 'react';
import { Package, Star, ShoppingCart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase, type Product } from '@/lib/supabase';

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      if (!supabase) return;

      // Using two type parameters to satisfy supabase-js typings
      const { data, error } = await supabase
        .from<Product, Product>('products') // <TableType, SelectType>
        .select('*')
        .eq('in_stock', true)
        .order('size', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };



  const normalProducts = products.filter((p) => p.bottle_type === 'normal' && p.size !== '200ml');
  const premiumProducts = products.filter((p) => p.bottle_type === 'premium' && p.size !== '200ml' && p.size !== '250ml');

  const handleOrder = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <Card
      className="group relative hover:shadow-2xl transition-all duration-500 border-2 hover:border-blue-300 overflow-hidden bg-white animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader className="pb-4 relative">
        <div className="relative w-full h-80 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
          {product.bottle_type === 'normal' && (
            <div className="overflow-hidden w-full h-72">
              <div
                className="flex h-72 transition-transform duration-700 ease-in-out group-hover:-translate-x-1/3"
                style={{ width: '300%' }}
              >
                <img src={product.images?.[0] || '/bottles-normal-1.png'} alt="Bottle" className="w-1/3 object-contain" />
                <img src={product.images?.[1] || '/bottles-normal-2.png'} alt="Bottle" className="w-1/3 object-contain" />
                <img src={product.images?.[2] || '/bottles-normal-3.png'} alt="Bottle" className="w-1/3 object-contain" />
              </div>
            </div>
          )}

          {product.bottle_type === 'premium' && (
            <img
              src={product.image_url || '/bottles premium-1.png'}
              alt={product.name}
              className="h-72 w-auto object-contain transition-all duration-500 group-hover:scale-110"
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          )}

          {product.bottle_type === 'premium' && (
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 border-0 shadow-lg">
              <Star className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}

          <Badge className="absolute bottom-4 left-4 bg-white/90 text-blue-600 border border-blue-200 shadow-lg">
            <Package className="h-3 w-3 mr-1" />
            {product.size}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed px-2">{product.description}</p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <div className="flex items-center gap-1 text-xs text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
            <span>RO Purified</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 bg-orange-50 px-3 py-1 rounded-full">
            <span>Copper Enriched</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleOrder}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-base font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Order Now
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Products</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our range of premium bottled water in various sizes to suit your needs
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 h-14 bg-white shadow-lg border-2 border-blue-100">
            <TabsTrigger value="all" className="text-base">
              All Products
            </TabsTrigger>
            <TabsTrigger value="normal" className="text-base">
              Normal
            </TabsTrigger>
            <TabsTrigger value="premium" className="text-base">
              Premium
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-12">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-3xl font-bold text-center mb-8">Normal Range</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {normalProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <h3 className="text-3xl font-bold text-center mb-8">Premium Range</h3>
                  <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {premiumProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="normal">
            {!loading && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {normalProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="premium">
            {!loading && (
              <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {premiumProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

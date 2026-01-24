'use client';

import { useEffect, useState } from 'react';
import { Star, Quote, Building2, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type Testimonial = {
  id: number;
  customer_name: string;
  company_name?: string;
  rating: number;
  message: string;
  customer_type: 'business' | 'individual';
};

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch (replace with real API later if needed)
    const mockTestimonials: Testimonial[] = [
      {
        id: 1,
        customer_name: 'Rahul Sharma',
        company_name: 'Sharma Enterprises',
        rating: 5,
        message:
          'VAARI provides excellent water quality and always delivers on time. Highly recommended!',
        customer_type: 'business',
      },
      {
        id: 2,
        customer_name: 'Priya Mehta',
        rating: 5,
        message:
          'The water tastes fresh and pure. Delivery service is smooth and reliable.',
        customer_type: 'individual',
      },
    ];

    setTimeout(() => {
      setTestimonials(mockTestimonials);
      setLoading(false);
    }, 800);
  }, []);

  const renderStars = (rating: number) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by individuals and businesses across Delhi NCR
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center ${
                          testimonial.customer_type === 'business'
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                            : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                        }`}
                      >
                        {testimonial.customer_type === 'business' ? (
                          <Building2 className="h-7 w-7 text-white" />
                        ) : (
                          <User className="h-7 w-7 text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {testimonial.customer_name}
                        </h4>
                        {testimonial.company_name && (
                          <p className="text-sm text-gray-600">{testimonial.company_name}</p>
                        )}
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-blue-200" />
                  </div>

                  <div className="mb-4">{renderStars(testimonial.rating)}</div>

                  <p className="text-gray-700 leading-relaxed italic">
                    &ldquo;{testimonial.message}&rdquo;
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        testimonial.customer_type === 'business'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {testimonial.customer_type === 'business'
                        ? 'Business Client'
                        : 'Individual Customer'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No testimonials available yet.</p>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Join Our Happy Customers</h3>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Experience the VAARI difference with pure, safe, and refreshing water delivered to your doorstep
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { number: '1000+', label: 'Happy Customers' },
              { number: '50+', label: 'Business Partners' },
              { number: '100%', label: 'Quality Assured' },
              { number: '24/7', label: 'Order Support' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

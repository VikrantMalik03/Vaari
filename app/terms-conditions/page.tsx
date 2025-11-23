import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600 mb-8">Last Updated: January 2025</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using the services of VAARI by SATPREM SOLUTIONS, you agree to be bound
                by these Terms and Conditions. If you do not agree with any part of these terms, you may
                not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Products and Services</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Product Quality</h3>
              <p className="mb-4">
                All VAARI water products are manufactured following FSSAI guidelines and meet the highest
                quality standards. We guarantee the purity and safety of our products.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Product Availability</h3>
              <p>
                While we strive to maintain adequate stock, product availability may vary. We reserve the
                right to limit quantities or discontinue products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Orders and Delivery</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Order Acceptance</h3>
              <p className="mb-4">
                All orders are subject to acceptance and availability. We reserve the right to refuse or
                cancel orders for any reason.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Delivery</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Delivery is available across Delhi NCR</li>
                <li>Delivery times are estimates and not guaranteed</li>
                <li>You must provide accurate delivery information</li>
                <li>Failed deliveries due to incorrect information may incur additional charges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pricing and Payment</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Pricing</h3>
              <p className="mb-4">
                All prices are in Indian Rupees (INR) and are subject to change without notice. We reserve
                the right to correct pricing errors.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Payment Terms</h3>
              <p>
                Payment must be made at the time of delivery or as per agreed terms for bulk orders.
                Accepted payment methods include cash, UPI, and bank transfer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. White Label Services</h2>
              <p className="mb-4">For white-label customization services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Minimum order quantities apply</li>
                <li>Custom designs are subject to approval and feasibility</li>
                <li>Additional charges may apply for custom packaging</li>
                <li>Lead times vary based on order complexity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Product Returns and Refunds</h2>
              <p>
                Please refer to our separate Refund Policy for detailed information on returns and refunds.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Quality Complaints</h2>
              <p>
                If you experience any quality issues with our products, please contact us within 24 hours
                of delivery with photographic evidence. We will investigate and resolve the matter promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p>
                VAARI by SATPREM SOLUTIONS shall not be liable for any indirect, incidental, or
                consequential damages arising from the use of our products or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
              <p>
                All content, trademarks, and intellectual property related to VAARI are owned by
                SATPREM SOLUTIONS. Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by the laws of India. Any disputes shall be subject
                to the jurisdiction of courts in Delhi, India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <p>For questions about these Terms and Conditions:</p>
              <div className="mt-4 space-y-2">
                <p>Email: Vaarisatpremsolutions@yahoo.com</p>
                <p>Phone: +91 9268448510 / +91 8929695631</p>
                <p>Working Hours: 9:00 AM - 6:00 PM (Monday to Saturday)</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

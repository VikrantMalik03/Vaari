import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RefundPolicy() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund & Return Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: January 2025</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Our Commitment</h2>
              <p>
                At VAARI by SATPREM SOLUTIONS, we are committed to delivering the highest quality bottled
                water. Your satisfaction is our priority. This policy outlines the conditions under which
                returns and refunds are accepted.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Quality Guarantee</h2>
              <p className="mb-4">
                All our products are FSSAI certified and undergo rigorous quality checks. However, if you
                receive a product that does not meet our quality standards, we will gladly replace or refund it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility for Returns</h2>
              <p className="mb-4">Returns are accepted under the following conditions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The product seal is damaged or tampered with at the time of delivery</li>
                <li>The product is contaminated or contains foreign particles</li>
                <li>The product has expired or is near expiry (within 7 days)</li>
                <li>Wrong product was delivered</li>
                <li>Packaging is significantly damaged affecting product integrity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Return Process</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Timeframe</h3>
              <p className="mb-4">
                All return requests must be made within 24 hours of delivery. Please inspect your order
                upon receipt and contact us immediately if there are any issues.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 How to Initiate a Return</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact us via phone or email within 24 hours of delivery</li>
                <li>Provide order details and reason for return</li>
                <li>Share clear photographs of the product and packaging</li>
                <li>Our team will verify the claim and approve the return if eligible</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Policy</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Approved Returns</h3>
              <p className="mb-4">
                Once your return is approved, you can choose between:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Full refund of the product value</li>
                <li>Product replacement at no additional cost</li>
                <li>Credit for future orders</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Refund Timeline</h3>
              <p>
                Refunds will be processed within 7-10 business days of return approval. The refund will be
                issued through the original payment method or as agreed upon.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Non-Returnable Items</h2>
              <p className="mb-4">The following items cannot be returned:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Products with intact seals if opened after delivery</li>
                <li>Products damaged due to customer negligence</li>
                <li>Products stored improperly after delivery</li>
                <li>Custom white-label orders (subject to specific agreement terms)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Bulk Orders</h2>
              <p>
                For bulk orders, specific return and refund terms may apply as per the agreement. Please
                discuss these terms with our team when placing bulk orders.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Damaged in Transit</h2>
              <p>
                If products are damaged during delivery, please refuse to accept the delivery and contact
                us immediately. We will arrange for a replacement at no additional cost.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. White Label Orders</h2>
              <p>
                Custom white-label orders are subject to specific return and refund policies due to their
                personalized nature. These will be discussed and agreed upon before order confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact for Returns</h2>
              <p className="mb-4">To initiate a return or refund:</p>
              <div className="space-y-2">
                <p><strong>Phone:</strong> +91 9268448510 / +91 8929695631</p>
                <p><strong>Email:</strong> Vaarisatpremsolutions@yahoo.com</p>
                <p><strong>Working Hours:</strong> 9:00 AM - 6:00 PM (Monday to Saturday)</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Policy Updates</h2>
              <p>
                We reserve the right to update this Refund & Return Policy at any time. Changes will be
                effective immediately upon posting on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

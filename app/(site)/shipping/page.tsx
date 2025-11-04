export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Information</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
          <p className="text-gray-700 mb-4">
            We offer fast and reliable shipping on all orders. Standard shipping typically takes 3-5 business days within the continental US.
          </p>
          <h3 className="text-xl font-semibold mb-2">Shipping Rates</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Standard Shipping: $5.99 (Free on orders over $50)</li>
            <li>Express Shipping: $12.99</li>
            <li>Overnight Shipping: $24.99</li>
          </ul>
          <p className="text-gray-700">
            International shipping rates vary by location. Please contact us for a quote.
          </p>
        </div>
      </div>
    </div>
  );
}
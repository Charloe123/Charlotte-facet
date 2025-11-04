export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns & Exchanges</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
          <p className="text-gray-700 mb-4">
            We want you to be completely satisfied with your purchase. If you are not happy with your jewelry, you can return it within 30 days of receipt for a full refund or exchange.
          </p>
          <h3 className="text-xl font-semibold mb-2">Return Conditions</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Items must be in original condition and packaging</li>
            <li>Tags must be attached</li>
            <li>Custom or personalized items are not eligible for return</li>
            <li>Return shipping costs are the responsibility of the customer</li>
          </ul>
          <p className="text-gray-700">
            To initiate a return, please contact our customer service team with your order number.
          </p>
        </div>
      </div>
    </div>
  );
}
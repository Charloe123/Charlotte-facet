export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Support</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">How Can We Help?</h2>
          <p className="text-gray-700 mb-6">
            Our customer support team is here to assist you with any questions or concerns you may have about your Charlotte Facet jewelry purchase.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Email:</strong> support@charlottefacet.com</li>
                <li><strong>Phone:</strong> (555) 123-4567</li>
                <li><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM PST</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Common Topics</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Order status and tracking</li>
                <li>Product information</li>
                <li>Size and fit guidance</li>
                <li>Care and maintenance</li>
                <li>Return and exchange requests</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Live Chat</h3>
            <p className="text-gray-700 mb-4">
              For immediate assistance, use our live chat feature available during business hours.
            </p>
            <button className="bg-[#D4AF37] text-white px-6 py-2 rounded hover:bg-[#B8860B] transition">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
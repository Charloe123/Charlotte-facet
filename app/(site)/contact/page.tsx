"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Thank you for reaching out! We’ll respond within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight font-mersad">
            Contact Charlotte Facet
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-mersad">
            We would love to hear from you. Whether you have a question about our jewelry, need help with an order, 
            or want to design a custom piece — our team is always ready to assist.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#D4AF37] p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+263 (0) 77 456 7890</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-[#D4AF37] p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">support@charlottefacet.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-[#D4AF37] p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Warehouse Location</h3>
                    <p className="text-gray-600">
                      Charlotte Facet Jewelry Warehouse<br />
                      Victoria Falls, Zimbabwe
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Established January 2025
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-[#D4AF37] p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">
                      Online Store: 24/7<br />
                      Customer Support: Mon - Fri (9:00 AM - 6:00 PM)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Why Choose Charlotte Facet?
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Handcrafted luxury jewelry made with precision</li>
                <li>• Proudly designed and curated in Zimbabwe</li>
                <li>• Free shipping across Zimbabwe for orders above $150</li>
                <li>• Secure online shopping experience</li>
                <li>• Excellent after-sales support from our Victoria Falls team</li>
              </ul>
            </div>
          </div>

        
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37] focus:outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37] focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37] focus:outline-none"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37] focus:outline-none resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4AF37] text-white py-3 px-6 rounded-lg hover:bg-[#B8860B] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

       
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do you ship across Zimbabwe?</h3>
              <p className="text-gray-600 mb-4">
                Yes, we offer free delivery within Zimbabwe for orders above $150, including Harare, Bulawayo, and Victoria Falls.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">Can I visit your warehouse?</h3>
              <p className="text-gray-600 mb-4">
                Our Victoria Falls warehouse is not open to the public, but we’re happy to arrange private viewings by appointment.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do you accept custom orders?</h3>
              <p className="text-gray-600 mb-4">
                Absolutely! You can send us your design ideas, and our team will craft a personalized piece to your specifications.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">Who is behind Charlotte Facet?</h3>
              <p className="text-gray-600 mb-4">
                Charlotte Facet was founded by <strong>Charlotte Ncube</strong>, a Zimbabwean jewelry designer passionate about blending modern elegance with authentic African artistry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

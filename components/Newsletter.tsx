"use client";

import { useState } from "react";
import { Heart, Star, Truck, Shield } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      
      console.log("Newsletter subscription:", email);
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="w-full px-6 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-12">Stay in Style</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
            <p className="text-gray-600 text-sm">Handcrafted with love and attention to detail</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">5-Star Reviews</h3>
            <p className="text-gray-600 text-sm">Trusted by thousands of satisfied customers</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">Fast and secure delivery worldwide</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">Safe and encrypted checkout process</p>
          </div>
        </div>

        <div>
          <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and jewelry trends.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-gray-900"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#D4AF37] text-white font-semibold rounded-lg hover:bg-[#B8860B] transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </form>

          {isSubscribed && (
            <p className="mt-4 text-[#D4AF37] font-medium">
              Thank you for subscribing! 🎉
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
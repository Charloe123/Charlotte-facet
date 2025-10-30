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
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
         
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay in Style
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and jewelry trends.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto lg:mx-0">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00a0b0] focus:outline-none text-gray-900"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#00a0b0] text-white font-semibold rounded-lg hover:bg-[#008a9e] transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>

            {isSubscribed && (
              <p className="mt-4 text-[#00a0b0] font-medium">
                Thank you for subscribing! 🎉
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00a0b0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#00a0b0]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Handcrafted with love and attention to detail</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#00a0b0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[#00a0b0]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">5-Star Reviews</h3>
              <p className="text-gray-600 text-sm">Trusted by thousands of satisfied customers</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#00a0b0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-[#00a0b0]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">Fast and secure delivery worldwide</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#00a0b0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#00a0b0]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">Safe and encrypted checkout process</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
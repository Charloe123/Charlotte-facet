"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

interface CheckoutFormProps {
  product: {
    _id: string;
    title: string;
    price: number;
  };
  onClose: () => void;
}

export default function CheckoutForm({ product, onClose }: CheckoutFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal" | "bank" | "ecocash" | "innbucks">("paypal");
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paypalEmail: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    bankName: "",
    accountNumber: "",
    ecocashNumber: "",
    innbucksNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCart();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      alert(`Payment processed successfully!\n\nProduct: ${product.title}\nAmount: $${product.price}\n\nThank you for your purchase! A confirmation email has been sent to ${formData.email} with delivery details.`);

      console.log("Confirmation email sent to:", formData.email);
      console.log("Email content: Thank you for your purchase! Your order will be delivered within 3-5 business days.");

      // Clear cart after successful purchase
      clearCart();

      onClose();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 p-4 overflow-y-auto border-l border-gray-200">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900">{product.title}</h3>
          <p className="text-2xl font-bold text-[#0070ba] mt-2">${product.price}</p>
        </div>

       
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-3">Payment Method</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value as "paypal")}
                className="mr-2"
              />
              <span className="text-gray-700">PayPal</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={(e) => setPaymentMethod(e.target.value as "stripe")}
                className="mr-2"
              />
              <span className="text-gray-700">Credit Card (Stripe)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={(e) => setPaymentMethod(e.target.value as "bank")}
                className="mr-2"
              />
              <span className="text-gray-700">Bank Transfer</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="ecocash"
                checked={paymentMethod === "ecocash"}
                onChange={(e) => setPaymentMethod(e.target.value as "ecocash")}
                className="mr-2"
              />
              <span className="text-gray-700">EcoCash</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="innbucks"
                checked={paymentMethod === "innbucks"}
                onChange={(e) => setPaymentMethod(e.target.value as "innbucks")}
                className="mr-2"
              />
              <span className="text-gray-700">InnBucks</span>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Address
            </label>
            <textarea
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
              placeholder="Street address, apartment, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code
            </label>
            <input
              type="text"
              name="zipCode"
              required
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
            />
          </div>

          {paymentMethod === "paypal" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PayPal Email
              </label>
              <input
                type="email"
                name="paypalEmail"
                required={paymentMethod === "paypal"}
                value={formData.paypalEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
                placeholder="your-paypal@email.com"
              />
            </div>
          )}

          {paymentMethod === "stripe" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardName"
                  required={paymentMethod === "stripe"}
                  value={formData.cardName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  required={paymentMethod === "stripe"}
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    required={paymentMethod === "stripe"}
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    required={paymentMethod === "stripe"}
                    value={formData.cvv}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
                    placeholder="123"
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === "bank" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <select
                  name="bankName"
                  required={paymentMethod === "bank"}
                  value={formData.bankName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
                >
                  <option value="">Select Bank</option>
                  <option value="cbz">CBZ Bank</option>
                  <option value="fnb">First National Bank (FNB)</option>
                  <option value="stanbic">Stanbic Bank</option>
                  <option value="zimbank">Zimbabwe Bank</option>
                  <option value="nedbank">Nedbank Zimbabwe</option>
                  <option value="ecobank">Ecobank Zimbabwe</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  required={paymentMethod === "bank"}
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
                  placeholder="Enter your account number"
                />
              </div>
            </>
          )}

          {paymentMethod === "ecocash" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EcoCash Number
              </label>
              <input
                type="text"
                name="ecocashNumber"
                required={paymentMethod === "ecocash"}
                value={formData.ecocashNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
                placeholder="077 123 4567"
              />
            </div>
          )}

          {paymentMethod === "innbucks" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                InnBucks Number
              </label>
              <input
                type="text"
                name="innbucksNumber"
                required={paymentMethod === "innbucks"}
                value={formData.innbucksNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0070ba] focus:border-[#0070ba]"
                placeholder="Enter your InnBucks number"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0070ba] text-white py-3 px-4 rounded-lg hover:bg-[#003087] transition-colors font-medium disabled:opacity-50"
          >
            {loading ? "Processing..." : `Buy Now - $${product.price}`}
          </button>
        </form>
      </div>
    </div>
  );
}
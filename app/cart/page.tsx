"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import CheckoutForm from "@/components/CheckoutForm";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ _id: string; title: string; price: number } | null>(null);

  const handleCheckout = (product: { _id: string; title: string; price: number }) => {
    setSelectedProduct(product);
    setShowCheckout(true);
  };

  const handleCheckoutClose = () => {
    setShowCheckout(false);
    setSelectedProduct(null);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some beautiful jewelry to your cart!</p>
          <Link
            href="/collections"
            className="bg-[#D4AF37] text-white px-6 py-3 rounded-lg hover:bg-[#B8860B] transition-colors"
          >
            Shop Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden mr-4">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.title || "Product image"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-[#D4AF37] font-bold">${item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="ml-4 text-right">
                <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 mt-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-[#D4AF37]">${getTotal().toFixed(2)}</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear Cart
            </button>
            <button
              onClick={() => handleCheckout({
                _id: "cart-checkout",
                title: `Cart Items (${cart.length} items)`,
                price: getTotal()
              })}
              className="flex-1 bg-[#D4AF37] text-white py-3 rounded-lg hover:bg-[#B8860B] transition-colors font-semibold"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {showCheckout && selectedProduct && (
        <CheckoutForm
          product={selectedProduct}
          onClose={handleCheckoutClose}
        />
      )}
    </div>
  );
}
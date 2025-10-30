"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import CheckoutForm from "@/components/CheckoutForm";


interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setClientSecret] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // Try different product collections
        const collections = ['NewArrival', 'forgifts', 'bestsellers', 'bracelet', 'earring', 'necklace', 'nosering', 'ring', 'watch'];

        for (const collection of collections) {
          try {
            const res = await fetch(`/api/${collection}?id=${id}`);
            if (res.ok) {
              const data = await res.json();
              if (data.success && data.data) {
                // If it's an array, find the product by ID
                if (Array.isArray(data.data)) {
                  const product = data.data.find((p: Product) => p._id === id);
                  if (product) {
                    setProduct(product);
                    return;
                  }
                } else {
                  // If it's a single product object
                  setProduct(data.data);
                  return;
                }
              }
            }
          } catch (error) {
            // Continue to next collection
          }
        }

        // If no product found in any collection
        throw new Error("Product not found");
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handlePurchase = async () => {
    if (!product) return;

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: product.price,
          productId: product._id,
        }),
      });

      const data = await res.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        // For PayPal, we'll use Stripe Elements
        // This is a simplified implementation
        alert("Payment initiated. In a real app, this would redirect to PayPal.");
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-[32rem] md:h-full">
                <Image
                  src={product.imageUrl}
                  alt={product.title || "Product image"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
              <div className="text-3xl font-bold text-[#00a0b0] mb-6">${product.price}</div>
              <p className="text-sm text-gray-500 mb-8">Category: <span className="font-medium">{product.category}</span></p>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-[#00a0b0] text-white py-4 px-6 rounded-lg hover:bg-[#008a9e] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && product && (
        <CheckoutForm
          product={product}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}
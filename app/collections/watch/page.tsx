"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

interface Watch {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function WatchPage() {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const res = await fetch("/api/watch");
        const data = await res.json();
        if (data.success) {
          setWatches(data.data);
        }
      } catch (error) {
        console.error("Error fetching watches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatches();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading watches...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center uppercase mt-20 text-white tracking-wide">
        Watches
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {watches.map((watch) => (
          <Link
            key={watch._id}
            href={`/product/${watch._id}`}
            className="block bg-gray-100 rounded-lg shadow hover:shadow-md transition overflow-hidden h-80"
          >
            <div className="flex flex-col items-center p-4 h-full">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                {watch.imageUrl && (
                  <Image
                    src={watch.imageUrl}
                    alt={watch.title || "Product image"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-center">
                {watch.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 text-center line-clamp-2">
                {watch.description}
              </p>
              <p className="mt-2 font-bold text-[#D4AF37]">${watch.price}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({
                      _id: watch._id,
                      title: watch.title,
                      price: watch.price,
                      imageUrl: watch.imageUrl
                    });
                  }}
                  className="flex-1 px-3 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8860B] transition-colors text-sm font-medium"
                >
                  Add to Bag
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Navigate to product page
                    window.location.href = `/product/${watch._id}`;
                  }}
                  className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium text-center"
                >
                  View
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

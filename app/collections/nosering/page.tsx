// app/collections/nosering/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

interface Nosering {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function NoseringPage() {
  const [noserings, setNoserings] = useState<Nosering[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchNoserings = async () => {
      try {
        const res = await fetch("/api/nosering");
        const data = await res.json();
        if (data.success) {
          setNoserings(data.data);
        }
      } catch (error) {
        console.error("Error fetching noserings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoserings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading noserings...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center uppercase mt-20 text-white tracking-wide">
        Noserings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {noserings.map((nosering) => (
          <Link
            key={nosering._id}
            href={`/product/${nosering._id}`}
            className="block bg-gray-100 rounded-lg shadow hover:shadow-md transition overflow-hidden h-80"
          >
            <div className="flex flex-col items-center p-4 h-full">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                {nosering.imageUrl && (
                  <Image
                    src={nosering.imageUrl}
                    alt={nosering.title || "Product image"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-center">{nosering.title}</h3>
              <p className="mt-1 text-sm text-gray-600 text-center line-clamp-2">{nosering.description}</p>
              <p className="mt-2 font-bold text-[#D4AF37]">${nosering.price}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({
                      _id: nosering._id,
                      title: nosering.title,
                      price: nosering.price,
                      imageUrl: nosering.imageUrl
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
                    window.location.href = `/product/${nosering._id}`;
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
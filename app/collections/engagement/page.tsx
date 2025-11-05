
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

interface Engagement {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function EngagementPage() {
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchEngagements = async () => {
      try {
        const res = await fetch("/api/engagement");
        const data = await res.json();
        if (data.success) {
          setEngagements(data.data);
        }
      } catch (error) {
        console.error("Error fetching engagements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEngagements();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading engagements...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center uppercase mt-20 text-white tracking-wide">
        Engagements
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {engagements.map((engagement) => (
          <Link
            key={engagement._id}
            href={`/product/${engagement._id}`}
            className="block bg-gray-100 rounded-lg shadow hover:shadow-md transition overflow-hidden h-80"
          >
            <div className="flex flex-col items-center p-4 h-full">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                {engagement.imageUrl && (
                  <Image
                    src={engagement.imageUrl}
                    alt={engagement.title || "Product image"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-center">{engagement.title}</h3>
              <p className="mt-1 text-sm text-gray-600 text-center line-clamp-2">{engagement.description}</p>
              <p className="mt-2 font-bold text-[#D4AF37]">${engagement.price}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({
                      _id: engagement._id,
                      title: engagement.title,
                      price: engagement.price,
                      imageUrl: engagement.imageUrl
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
                    window.location.href = `/product/${engagement._id}`;
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
// app/collections/earring/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Earring {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function EarringPage() {
  const [earrings, setEarrings] = useState<Earring[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarrings = async () => {
      try {
        const res = await fetch("/api/earring");
        const data = await res.json();
        if (data.success) {
          setEarrings(data.data);
        }
      } catch (error) {
        console.error("Error fetching earrings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarrings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading earrings...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center uppercase mt-20 text-white tracking-wide">
        Earrings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {earrings.map((earring) => (
          <Link
            key={earring._id}
            href={`/product/${earring._id}`}
            className="block bg-gray-100 rounded-lg shadow hover:shadow-md transition overflow-hidden h-80"
          >
            <div className="flex flex-col items-center p-4 h-full">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={earring.imageUrl}
                  alt={earring.title || "Product image"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="mt-2 text-lg font-semibold text-center">{earring.title}</h3>
              <p className="mt-1 text-sm text-gray-600 text-center line-clamp-2">{earring.description}</p>
              <p className="mt-2 font-bold text-[#D4AF37]">${earring.price}</p>
              <button className="mt-3 px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8860B] transition-colors text-sm font-medium">
                Shop Now
              </button>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
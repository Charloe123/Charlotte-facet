// app/collections/necklace/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Necklace {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function NecklacePage() {
  const [necklaces, setNecklaces] = useState<Necklace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNecklaces = async () => {
      try {
        const res = await fetch("/api/necklace");
        const data = await res.json();
        if (data.success) {
          setNecklaces(data.data);
        }
      } catch (error) {
        console.error("Error fetching necklaces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNecklaces();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading necklaces...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center uppercase mt-20 text-white tracking-wide">
        Necklaces
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {necklaces.map((necklace) => (
          <Link
            key={necklace._id}
            href={`/product/${necklace._id}`}
            className="block bg-gray-100 rounded-lg shadow hover:shadow-md transition overflow-hidden h-80"
          >
            <div className="flex flex-col items-center p-4 h-full">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={necklace.imageUrl}
                  alt={necklace.title || "Product image"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="mt-2 text-lg font-semibold text-center">{necklace.title}</h3>
              <p className="mt-1 text-sm text-gray-600 text-center line-clamp-2">{necklace.description}</p>
              <p className="mt-2 font-bold text-[#D4AF37]">${necklace.price}</p>
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
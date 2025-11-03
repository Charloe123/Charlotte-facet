
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Ring {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function RingPage() {
  const [rings, setRings] = useState<Ring[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRings = async () => {
      try {
        const res = await fetch("/api/ring");
        const data = await res.json();
        if (data.success) {
          setRings(data.data);
        }
      } catch (error) {
        console.error("Error fetching rings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading rings...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center uppercase mt-20 text-white tracking-wide">
        Rings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rings.map((ring) => (
          <Link
            key={ring._id}
            href={`/product/${ring._id}`}
            className="block bg-gray-100 rounded-lg shadow hover:shadow-md transition overflow-hidden h-80"
          >
            <div className="flex flex-col items-center p-4 h-full">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={ring.imageUrl}
                  alt={ring.title || "Product image"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="mt-2 text-lg font-semibold text-center">{ring.title}</h3>
              <p className="mt-1 text-sm text-gray-600 text-center line-clamp-2">{ring.description}</p>
              <p className="mt-2 font-bold text-[#D4AF37]">${ring.price}</p>
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
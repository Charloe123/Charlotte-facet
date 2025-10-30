// app/collections/necklace/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
          <div
            key={necklace._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-100 cursor-pointer group"
            onClick={() => router.push(`/products/${necklace._id}`)}
          >
            <div className="relative w-full h-64 mb-4 overflow-hidden rounded-xl">
              <Image
                src={necklace.imageUrl}
                alt={`${necklace.title} - ${necklace.description?.substring(0, 50) || 'Stylish necklace'}...`}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0  from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h2 className="font-bold text-xl text-center text-[#2C2C2C] mb-2 tracking-wide">
              {necklace.title}
            </h2>
            <p className="text-black text-base text-center mb-3 line-clamp-2 font-semibold">
              {necklace.description}
            </p>
            <div className="w-16 h-1 bg-[#D4AF37] rounded-full mb-3"></div>
            <p className="text-[#D4AF37] font-bold text-2xl mt-2 tracking-wider">${necklace.price}</p>
            <div className="mt-4 w-full h-px  from-transparent via-[#D4AF37]/30 to-transparent"></div>
          </div>
        ))}
      </div>
    </main>
  );
}
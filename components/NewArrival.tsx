"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

export default function NewArrival() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/NewArrival");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.success) setProducts(data.data.slice(0, 12));
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 overflow-hidden">
      <h2 className="text-center text-3xl font-semibold mb-10 text-gray-900">
        New Arrivals
      </h2>

      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...products, ...products].map((product, i) => (
            <Link
              key={i}
              href={`/product/${product._id}`}
              className="bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0 w-56 h-[20rem] overflow-hidden mx-4"
            >
              <div className="relative w-full h-48">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {product.title}
                </h3>
                <p className="text-xs line-clamp-2">
                  {product.description}
                </p>
                <p className="mt-1 text-sm font-bold text-[#D4AF37]">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

  
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>

      
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}

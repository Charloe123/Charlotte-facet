"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/bestsellers");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.success) setProducts(data.data.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch best sellers:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold text-center mb-12">Best Sellers</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="sticky top-8 h-screen rounded-lg overflow-hidden shadow-lg">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="https://res.cloudinary.com/dpahyb1x9/video/upload/v1761814327/1a596d9b44548391eda0f3b407ceb621_720w_online-video-cutter.com_oh9tx8.mp4"
          />
        </div>

      
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="block bg-gray-100 rounded-lg shadow hover:shadow-md transition overflow-hidden h-80"
            >
              <div className="flex flex-col items-center p-4 h-full">
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.title || "Product image"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-center">{product.title}</h3>
                <p className="mt-1 text-sm text-gray-600 text-center line-clamp-2">{product.description}</p>
                <p className="mt-2 font-bold text-[#00a0b0]">${product.price}</p>
                <button className="mt-3 px-4 py-2 bg-[#00a0b0] text-white rounded-lg hover:bg-[#008a9e] transition-colors text-sm font-medium">
                  Shop Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

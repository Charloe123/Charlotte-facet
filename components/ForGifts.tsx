// components/ForGifts.tsx
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

export default function ForGifts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/forgifts");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.success) {
          setProducts(data.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch for gifts:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="w-full px-6 py-12">
      <div className="flex justify-center items-center">
        <h2 className="text-3xl font-semibold mb-8">For Gifts</h2>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="bg-white rounded-md hover:shadow-md transition overflow-hidden"
            >
              <div className="relative w-full h-64">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-base font-medium mb-2">{product.title}</h3>
                <p className="text-xl font-bold text-[#D4AF37]">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
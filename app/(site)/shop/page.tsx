// app/(site)/shop/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Store intended path for redirect after login
        sessionStorage.setItem("intendedPath", "/shop");
        router.push("/signIn");
        return;
      }

      try {
        JSON.parse(atob(token.split('.')[1]));
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error decoding token:", error);
        sessionStorage.setItem("intendedPath", "/shop");
        router.push("/signIn");
        return;
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchProducts = async () => {
      try {
        const responses = await Promise.allSettled([
          fetch("/api/product"),
          fetch("/api/NewArrival"),
          fetch("/api/bestsellers"),
          fetch("/api/forgifts"),
          fetch("/api/engagement")
        ]);

        const dataPromises = responses.map(async (response, index) => {
          if (response.status === 'fulfilled' && response.value.ok) {
            try {
              return await response.value.json();
            } catch (error) {
              console.error(`Error parsing JSON for API ${index}:`, error);
              return { success: false };
            }
          }
          return { success: false };
        });

        const [productData, newArrivalData, bestSellersData, forGiftsData, engagementData] = await Promise.all(dataPromises);

        const allProducts = [
          ...(productData.success ? productData.data : []),
          ...(newArrivalData.success ? newArrivalData.data : []),
          ...(bestSellersData.success ? bestSellersData.data : []),
          ...(forGiftsData.success ? forGiftsData.data : []),
          ...(engagementData.success ? engagementData.data : [])
        ];

        // Remove duplicates based on _id
        const uniqueProducts = allProducts.filter((product, index, self) =>
          index === self.findIndex(p => p._id === product._id)
        );

        setProducts(uniqueProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isLoggedIn]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center uppercase mt-20 text-white tracking-wide">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-100 cursor-pointer group"
            onClick={() => router.push(`/product/${product._id}`)}
          >
            <div className="relative w-full h-64 mb-4 overflow-hidden rounded-xl">
              <Image
                src={product.imageUrl}
                alt={`${product.title} - ${product.description?.substring(0, 50) || 'Stylish product'}...`}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0  from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h2 className="font-bold text-xl text-center text-[#2C2C2C] mb-2 tracking-wide">
              {product.title}
            </h2>
            <p className="text-black text-base text-center mb-3 line-clamp-2 font-semibold">
              {product.description}
            </p>
            <div className="w-16 h-1 bg-[#D4AF37] rounded-full mb-3"></div>
            <p className="text-[#D4AF37] font-bold text-2xl mt-2 tracking-wider">${product.price}</p>
            <div className="mt-4 w-full h-px  from-transparent via-[#D4AF37]/30 to-transparent"></div>
          </div>
        ))}
      </div>
    </main>
  );
}
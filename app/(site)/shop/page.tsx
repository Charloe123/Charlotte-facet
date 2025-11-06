
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      
      sessionStorage.setItem("intendedPath", "/shop");
      router.push("/signIn");
      return;
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

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
  }, [status]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center uppercase mt-20 text-gray-900 tracking-wide">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group"
            onClick={() => router.push(`/product/${product._id}`)}
          >
            <div className="relative w-full h-48">
              <Image
                src={product.imageUrl}
                alt={`${product.title} - ${product.description?.substring(0, 50) || 'Stylish jewelry product'}...`}
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
          </div>
        ))}
      </div>
    </main>
  );
}
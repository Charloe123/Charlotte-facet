"use client";

import Link from "next/link";
import Image from "next/image";

export default function CollectionsPage() {
  const collections = [
    {
      name: "Earrings",
      href: "/collections/earring",
      image: "https://via.placeholder.com/400x300/FFD700/000000?text=Earrings",
      description: "Elegant earrings for every occasion"
    },
    {
      name: "Necklaces",
      href: "/collections/necklace",
      image: "https://via.placeholder.com/400x300/FFD700/000000?text=Necklaces",
      description: "Timeless necklaces to complement your style"
    },
    {
      name: "Bracelets",
      href: "/collections/bracelet",
      image: "https://via.placeholder.com/400x300/FFD700/000000?text=Bracelets",
      description: "Beautiful bracelets for everyday wear"
    },
    {
      name: "Engagement Rings",
      href: "/collections/engagement",
      image: "https://via.placeholder.com/400x300/FFD700/000000?text=Engagement+Rings",
      description: "Special rings for your special moments"
    },
    {
      name: "Watches",
      href: "/collections/watch",
      image: "https://via.placeholder.com/400x300/FFD700/000000?text=Watches",
      description: "Luxury watches for the discerning"
    },
    {
      name: "Nose Rings",
      href: "/collections/nosering",
      image: "https://via.placeholder.com/400x300/FFD700/000000?text=Nose+Rings",
      description: "Delicate nose rings for subtle elegance"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight font-mersad">
            Our Collections
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collections of handcrafted jewelry, each piece designed with care and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {collection.name}
                </h3>
                <p className="text-gray-600">{collection.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
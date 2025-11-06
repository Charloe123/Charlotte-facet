"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CategoryMenu() {
  const [open, setOpen] = useState(false);

  const categories = [
    { name: "Rings", href: "/collections/rings" },
    { name: "Necklaces", href: "/collections/necklaces" },
    { name: "Bracelets", href: "/collections/bracelets" },
    { name: "Earrings", href: "/collections/earring" },
    { name: "Watches", href: "/collections/watches" },
    { name: "Nose Rings", href: "/collections/nose-rings" },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Main link */}
      <Link
        href="/collections"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        className="flex items-center gap-1 text-gray-900 hover:text-[#D4AF37] uppercase tracking-widest transition-all"
      >
        Collections
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Link>

      {/* Dropdown */}
      {open && (
        <div className="mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg py-2 min-w-[180px] border border-gray-100">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="block px-4 py-2 text-gray-800 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all"
              onClick={() => setOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

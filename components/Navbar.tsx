"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X, ShoppingBag } from "lucide-react";
import CategoryMenu from "@/components/CategoryMenu";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { getItemCount } = useCart();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const role = (session?.user as { role: string })?.role as "admin" | "customer" | null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 border-b backdrop-blur-2xl transition-all duration-500 border-white/20 ${isHomePage ? 'bg-white/10' : 'bg-[#00a0b0]/90'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">

        <Link
          href="/"
          className="text-xs md:text-2xl font-light tracking-[0.25em] text-white drop-shadow-[0_0_8px_rgba(212,175,55,0.25)]"
        >
          CHARLOTTE<span className="text-[#0096a6]">•</span>FACET
        </Link>


        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            link.name === "Collections" ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setIsCollectionsOpen(true)}
                onMouseLeave={() => setIsCollectionsOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`uppercase text-[13px] tracking-[0.25em] transition-all duration-300 relative group block ${isHomePage ? 'text-white hover:text-white' : 'text-white hover:text-white'}`}
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 bg-[#00a0b0] group-hover:w-full transition-all duration-500 "></span>
                </Link>


                {isCollectionsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-6 px-6 z-50">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Shop by Category</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href="/collections/earring"
                        className="bg-[#D4AF37] text-white py-3 px-4 rounded-lg hover:bg-[#B8860B] transition-all duration-300 text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        onClick={() => setIsCollectionsOpen(false)}
                      >
                        Earrings
                      </Link>
                      <Link
                        href="/collections/necklace"
                        className="bg-[#D4AF37] text-white py-3 px-4 rounded-lg hover:bg-[#B8860B] transition-all duration-300 text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        onClick={() => setIsCollectionsOpen(false)}
                      >
                        Necklaces
                      </Link>
                      <Link
                        href="/collections/watch"
                        className="bg-[#D4AF37] text-white py-3 px-4 rounded-lg hover:bg-[#B8860B] transition-all duration-300 text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        onClick={() => setIsCollectionsOpen(false)}
                      >
                        Watches
                      </Link>
                      <Link
                        href="/collections/nosering"
                        className="bg-[#D4AF37] text-white py-3 px-4 rounded-lg hover:bg-[#B8860B] transition-all duration-300 text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        onClick={() => setIsCollectionsOpen(false)}
                      >
                        Nose Rings
                      </Link>
                      <Link
                        href="/collections/bracelet"
                        className="bg-[#D4AF37] text-white py-3 px-4 rounded-lg hover:bg-[#B8860B] transition-all duration-300 text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        onClick={() => setIsCollectionsOpen(false)}
                      >
                        Bracelets
                      </Link>
                      <Link
                        href="/collections/engagement"
                        className="bg-[#D4AF37] text-white py-3 px-4 rounded-lg hover:bg-[#B8860B] transition-all duration-300 text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        onClick={() => setIsCollectionsOpen(false)}
                      >
                        Engagements
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={`uppercase text-[13px] tracking-[0.25em] transition-all duration-300 relative group ${isHomePage ? 'text-white hover:text-white' : 'text-white hover:text-white'}`}
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-500 "></span>
              </Link>
            )
          ))}

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="flex items-center gap-2 text-white/80 hover:text-[#D4AF37] transition"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-sm tracking-wider uppercase">Profile</span>
              </Link>
              {role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="text-white/80 hover:text-[#D4AF37] transition"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                href="/signIn"
                className="flex items-center gap-2 text-white/80 hover:text-[#D4AF37] transition"
              >
                <User size={18} />
                <span className="text-sm tracking-wider uppercase">Sign In</span>
              </Link>

             
              <Link
                href="/cart"
                className="relative text-white hover:text-[#D4AF37] transition"
              >
                <ShoppingBag size={20} />
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </Link>
            </div>
          )}
        </div>

        
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

    
      {isOpen && (
        <div className="md:hidden backdrop-blur-xl border-t border-gray-200 bg-white">
          <div className="flex flex-col items-center space-y-5 py-6 text-gray-900">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="uppercase text-sm tracking-widest hover:text-[#D4AF37] transition"
              >
                {link.name}
              </Link>
            ))}

            <CategoryMenu />

            {isLoggedIn ? (
              <div className="flex items-center gap-6 pt-4">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-white/80 hover:text-[#D4AF37]"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm uppercase">Profile</span>
                </Link>
                {role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    className="text-white/80 hover:text-[#D4AF37]"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/signIn"
                className="flex items-center gap-2 text-white/80 hover:text-[#D4AF37]"
              >
                <User size={18} />
                <span className="text-sm uppercase">Sign In / Sign Up</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

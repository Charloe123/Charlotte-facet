"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import NewArrival from "@/components/NewArrival";
import ForGifts from "@/components/ForGifts";
import Engagement from "@/components/Engagement";
import BestSellers from "@/components/BestSellers";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<"admin" | "customer" | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role);

        // Only redirect admin if they're not already on the admin dashboard
        if (payload.role === "admin" && !window.location.pathname.startsWith("/admin")) {
          window.location.href = "/admin/dashboard";
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    window.location.reload();
  };

  return (
    <>
   
      <Navbar isLoggedIn={isLoggedIn} role={userRole} onLogout={handleLogout} />

   
      <section className="relative w-full h-screen overflow-hidden">
      
        <motion.video
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="https://res.cloudinary.com/dpahyb1x9/video/upload/v1761211890/knot_title_online-video-cutter.com_kj0r8z.mp4"
        />

       
        <div className="absolute inset-0 bg-black/40"></div>

       
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-5xl md:text-6xl font-light tracking-widest overflow-hidden"
          >
            Discover Timeless Elegance
            <motion.div
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              }}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
          </motion.h1>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="mt-4 text-lg md:text-xl text-gray-200"
          >
            Explore our exquisite collection of handcrafted jewelry
          </motion.p>

        
          <motion.a
            href="/shop"
            className="relative mt-8 px-8 py-3 border border-white/70 text-white hover:bg-[#0ABAB5] hover:border-[#0ABAB5] transition-all duration-300 rounded-full tracking-wide overflow-hidden"
          >
            Shop Now
            <motion.div
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              }}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
          </motion.a>
        </div>
      </section>

      <Engagement/>
      <div id="products" className="min-h-screen">
        <NewArrival/>
        <ForGifts/>
        <BestSellers/>
        <Newsletter/>
      </div>

   
      
    </>
  );
}

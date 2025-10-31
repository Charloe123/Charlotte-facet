"use client";

import Image from "next/image";

export default function Engagement() {
  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-16 items-center">
        
       
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">
            Gold for all events
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
            From timeless engagement rings to statement pieces for every celebration — 
            discover gold jewelry designed to mark life s most beautiful moments.
          </p>
          <button className="mt-3 bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition">
            Explore Collection
          </button>
        </div>

        
        <div className="relative flex justify-center md:justify-end w-full gap-6">
         
          <div className="relative w-72 h-[420px] rounded-2xl overflow-hidden shadow-lg -translate-y-6">
            <Image
              src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1761897094/engage1_oesc7j.jpg"
              alt="Gold Jewelry"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          
          <div className="relative w-72 h-[380px] rounded-2xl overflow-hidden shadow-xl translate-y-6">
            <Image
              src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1761897094/engage2_akpv4y.jpg"
              alt="Engagement Ring"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

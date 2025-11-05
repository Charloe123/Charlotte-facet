"use client";

import { Heart, Star, Award } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
    
      <div className="relative pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-6 tracking-tight font-mersad">
                About Charlotte Facet
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-mersad mb-8">
                A story of craftsmanship, confidence, and creativity — Charlotte Facet brings timeless jewelry to the
                modern woman, designed and crafted with heart from Victoria Falls, Zimbabwe.
              </p>
            </div>
            <div className="bg-gray-200 h-72 w-96 rounded-lg flex items-center justify-center relative overflow-hidden mx-auto">
              <Image
                src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1762333531/creation_c6ruji.jpg"
                alt="Charlotte Facet story and craftsmanship"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

     
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-72 w-96 rounded-lg overflow-hidden mx-auto">
              <Image
                src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1761808390/best4_uphcba.jpg"
                alt="Charlotte Facet story and craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-mersad">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded by <strong>Charlotte Ncube</strong> in early 2025, Charlotte Facet began as an online jewelry
                store built on a deep love for elegance, authenticity, and self-expression. From delicate rings to
                statement necklaces, each piece is created to empower women to wear their story with pride.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Based in the breathtaking city of <strong>Victoria Falls, Zimbabwe</strong>, our warehouse opened in
                January this year — a milestone that turned a long-held dream into reality. Every design reflects both
                African artistry and global sophistication, merging tradition with modern minimalism.
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-mersad">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                To craft jewelry that speaks to confidence and individuality — pieces that celebrate beauty, milestones,
                and personal expression. Charlotte Facet is committed to making luxury accessible to every woman who
                values authenticity and meaning in her style.
              </p>

              <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-mersad">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To grow into Zimbabwe’s most loved online jewelry brand, recognized across Africa and beyond for our
                creativity, craftsmanship, and customer care. Our vision is to redefine elegance — one facet at a time.
              </p>
            </div>
            <div className="relative h-72 w-96 rounded-lg overflow-hidden mx-auto">
              <Image
                src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1761804009/gift3_c6udts.jpg"
                alt="Charlotte Facet mission and vision"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

    
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center font-mersad">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#D4AF37] p-6 rounded-lg inline-block mb-4">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Passion</h3>
              <p className="text-gray-600">Every design starts with love and intention</p>
            </div>
            <div className="text-center">
              <div className="bg-[#D4AF37] p-6 rounded-lg inline-block mb-4">
                <Star className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">Crafted to last, with materials that matter</p>
            </div>
            <div className="text-center">
              <div className="bg-[#D4AF37] p-6 rounded-lg inline-block mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600">We build trust through transparency and care</p>
            </div>
          </div>
        </div>
      </div>

    
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center font-mersad">
            Meet Our Team
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                name: "Charlotte Ncube",
                role: "Founder & CEO",
                desc: "Visionary leader behind Charlotte Facet’s creativity and growth.",
                img: "https://res.cloudinary.com/dpahyb1x9/image/upload/v1762349520/ceo_cfal8p.jpg",
              },
              {
                name: "Sandra Sibanda",
                role: "Operations Manager",
                desc: "Oversees daily logistics and ensures smooth warehouse operations in Victoria Falls.",
                img: "https://res.cloudinary.com/dpahyb1x9/image/upload/v1762349569/manager_z3gl9f.jpg",
              },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-80 w-64 rounded-lg mb-6 overflow-hidden mx-auto">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-mersad">{member.name}</h3>
                <p className="text-[#D4AF37] font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, Heart, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-[#F8F1EC] pt-20 pb-10 border-t border-gold-luxury/20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Information */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-12 h-12 border border-gold-luxury/40 rounded-full">
              <span className="font-serif-luxury text-gold-luxury text-xl font-bold tracking-wider">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl font-bold tracking-[0.2em] text-white">VATIKA</span>
              <span className="text-[10px] tracking-[0.3em] text-[#5B5B5B] uppercase -mt-1">Sweets & Bakery</span>
            </div>
          </div>
          <p className="text-xs text-[#5B5B5B] leading-relaxed tracking-wider">
            Crafting royal culinary celebrations in Hinoo, Ranchi. Experience the perfect marriage of luxury Indian heritage and contemporary fine baking craftsmanship.
          </p>
          <div className="flex items-center space-x-4">
            {["Instagram", "Facebook", "Pinterest"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs tracking-widest text-[#5B5B5B] hover:text-gold-luxury transition-colors duration-300 flex items-center"
              >
                <span>{social}</span>
                <ArrowUpRight className="w-2.5 h-2.5 ml-0.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Collections links */}
        <div>
          <h3 className="font-serif-luxury text-base tracking-[0.2em] text-gold-luxury uppercase mb-6">Our Collections</h3>
          <ul className="space-y-3.5 text-xs text-[#5B5B5B] tracking-widest uppercase">
            <li>
              <Link href="/sweets" className="hover:text-gold-luxury transition-colors">Luxury Sweets</Link>
            </li>
            <li>
              <Link href="/cakes" className="hover:text-gold-luxury transition-colors">Designer Cakes</Link>
            </li>
            <li>
              <Link href="/bakery" className="hover:text-gold-luxury transition-colors">Bakery Classics</Link>
            </li>
            <li>
              <Link href="/festivals" className="hover:text-gold-luxury transition-colors">Festive Hampers</Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-gold-luxury transition-colors">Visual Gallery</Link>
            </li>
          </ul>
        </div>

        {/* Store Hours & Directions */}
        <div>
          <h3 className="font-serif-luxury text-base tracking-[0.2em] text-gold-luxury uppercase mb-6">Store Details</h3>
          <ul className="space-y-4 text-xs text-[#5B5B5B] tracking-wider">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-gold-luxury shrink-0 mt-0.5" />
              <span>Main Road, Hinoo, Ranchi, Jharkhand 834002</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <Clock className="w-4 h-4 text-gold-luxury shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">Daily: 9:00 AM - 10:00 PM</p>
                <p className="text-[10px] text-[#5B5B5B] uppercase tracking-widest mt-0.5">Parking Available</p>
              </div>
            </li>
            <li className="flex items-start space-x-2.5">
              <Phone className="w-4 h-4 text-gold-luxury shrink-0 mt-0.5" />
              <span>+91 99999 99999</span>
            </li>
          </ul>
        </div>

        {/* Celebrations Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-serif-luxury text-base tracking-[0.2em] text-gold-luxury uppercase mb-6">Wedding & Custom Orders</h3>
            <p className="text-xs text-[#5B5B5B] leading-relaxed tracking-wider mb-6">
              Let us elevate your milestone moments. Send us your custom concepts, themes, and wedding invitations, and we will translate them into edible art.
            </p>
          </div>
          <Link
            href="/custom-orders"
            className="w-full text-center border border-gold-luxury/40 hover:border-gold-luxury py-3 font-button-luxury text-[10px] tracking-[0.2em] uppercase text-gold-luxury hover:text-white transition-all duration-300 hover:bg-gold-luxury"
          >
            Inquire Now
          </Link>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-8 border-t border-[#E7D8CC]/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#5B5B5B] tracking-widest uppercase">
        <p>&copy; {currentYear} Vatika Sweets & Bakery. All Rights Reserved.</p>
        <p className="flex items-center mt-4 md:mt-0">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-gold-luxury mx-1 fill-gold-luxury" />
          <span>in Ranchi</span>
        </p>
      </div>
    </footer>
  );
}

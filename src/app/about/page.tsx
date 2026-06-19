"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Award, Users } from "lucide-react";

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
  icon: React.ComponentType<any>;
}

function StatCounter({ end, label, suffix = "", icon: Icon }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col items-center p-6 bg-[#FFF8F4] border border-border-luxury/50 shadow-sm relative group hover:border-gold-luxury transition-all duration-300">
      <Icon className="w-6 h-6 text-gold-luxury mb-4" />
      <span className="font-serif-luxury text-4xl md:text-5xl font-light text-text-luxury">
        {count}
        {suffix}
      </span>
      <span className="text-[10px] tracking-[0.25em] text-[#5B5B5B] uppercase mt-3 text-center">
        {label}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F1EC]">
      {/* 1. Page Header */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <span className="text-xs md:text-sm tracking-[0.6em] text-gold-luxury uppercase font-semibold mb-3 block">
          Our Heritage
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-6xl uppercase tracking-wide text-text-luxury mb-4">
          A Legacy of Sweetness
        </h1>
        <p className="font-serif-luxury text-sm md:text-lg italic text-[#5B5B5B] max-w-xl mx-auto">
          Crafting moments of pure joy, regional heritage, and high-end baking in Hinoo, Ranchi.
        </p>
        <div className="w-24 h-[1px] bg-gold-luxury/40 mx-auto mt-6" />
      </section>

      {/* 2. Full-Width Heritage Photo Banner */}
      <section className="relative h-[60vh] bg-neutral-900 border-y border-border-luxury overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1920&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center text-[#F8F1EC] text-center max-w-3xl mx-auto px-6">
          <p className="font-serif-luxury text-xl md:text-3xl leading-relaxed italic text-[#E7D8CC]">
            &ldquo;There is no shortcut to excellence. We measure our ingredients in grams, our time in hours, and our success in smiles.&rdquo;
          </p>
        </div>
      </section>

      {/* 3. Narrative Sections */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column Story */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-gold-luxury" />
            <span className="text-[10px] tracking-[0.3em] text-gold-luxury uppercase font-semibold">
              The Craftsmanship
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl md:text-4xl text-text-luxury uppercase tracking-wider">
            Uncompromising Standards
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            At **Vatika Sweets & Bakery**, we treat baking and confectionery as high art. We reject synthetic dyes, processed oils, and artificial syrups. Instead, we clarify butter from pure cream, hand-crush green cardamoms, and boil saffron filaments to release their vibrant royal golden hue.
          </p>
          <p className="text-xs text-text-secondary leading-relaxed">
            Our master sweet makers specialize in regional Indian classics—from delicate Bengali sandesh and cottage cheese rasgullas to dry fruit rolls. Simultaneously, our contemporary patisserie chefs craft tiered designer cakes, French croissants, and gold-leaf macarons that hold center stage in Ranchi&apos;s grandest weddings.
          </p>
        </div>

        {/* Right Column Image Frame */}
        <div className="relative">
          <div className="absolute -inset-4 border border-gold-luxury/20 translate-x-3 translate-y-3 z-0" />
          <div
            className="relative z-10 aspect-[4/3] bg-cover bg-center border border-border-luxury shadow-lg"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1601356616077-695728ecf769?q=80&w=800&auto=format&fit=crop')`,
            }}
          />
        </div>
      </section>

      {/* 4. Animated Counters Section */}
      <section className="py-24 bg-secondary-background border-t border-border-luxury">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs md:text-sm tracking-[0.5em] text-gold-luxury uppercase font-semibold mb-2">
              Our Journey in Numbers
            </h2>
            <h3 className="font-serif-luxury text-2xl md:text-3xl text-text-luxury uppercase tracking-widest">
              Vatika Excellence
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter end={12} label="Years of Excellence" suffix="+" icon={Award} />
            <StatCounter end={150} label="Happy Customers" suffix="K+" icon={Users} />
            <StatCounter end={85} label="Gourmet Products" suffix="+" icon={Sparkles} />
            <StatCounter end={45} label="Festivals Celebrated" suffix="+" icon={Star} />
          </div>
        </div>
      </section>
    </div>
  );
}

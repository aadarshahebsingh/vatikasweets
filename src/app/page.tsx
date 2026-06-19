"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ShoppingBag, Award, Heart, Sparkles, MapPin, Phone, Clock } from "lucide-react";

// Ken Burns Montage Images (luxury food, pastries, and sweets)
const heroImages = [
  "https://images.unsplash.com/photo-1601356616077-695728ecf769?q=80&w=1920&auto=format&fit=crop", // Cashew / Kaju
  "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1920&auto=format&fit=crop", // Bengali Sweet style closeups
  "https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=1920&auto=format&fit=crop", // Wedding Cake closeups
  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1920&auto=format&fit=crop", // Croissant bakery closeups
];

const bentoCollections = [
  {
    title: "Luxury Sweets",
    description: "Pure cow ghee laddoos, silver-leaf kaju katli, and royal dry fruit assortments.",
    href: "/sweets",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=600&auto=format&fit=crop",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Designer Cakes",
    description: "Edible floral sculptures and multi-tiered celebration cakes.",
    href: "/cakes",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=600&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Festive Hampers",
    description: "Royal curated celebration gift boxes for corporate and family milestones.",
    href: "/festivals",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Bakery Classics",
    description: "Slow-fermented artisan sourdough breads, macarons, and croissants.",
    href: "/bakery",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Wedding Orders",
    description: "Bespoke catering menus and grand wedding invitation sweets.",
    href: "/custom-orders",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop",
    className: "md:col-span-2 md:row-span-1",
  },
];

const storyTimeline = [
  {
    year: "Our Heritage",
    title: "Generations of Craftsmanship",
    description: "Born out of a deep reverence for regional Indian sweets, Vatika started with a simple belief: sweet-making is a form of fine art that demands passion, precision, and history.",
    icon: Award,
  },
  {
    year: "The Ingredients",
    title: "Uncompromising Selection",
    description: "Every pinch of cardamom is sourced from Alleppey, saffron strands are hand-harvested from Pampore, and our cow ghee is slowly clarified to achieve a rich golden hue.",
    icon: Sparkles,
  },
  {
    year: "Art & Customization",
    title: "Bespoke Celebrations",
    description: "From designer visual cakes to personalized gifting trays, we craft each order to match the emotion and visual aesthetic of your special day.",
    icon: Heart,
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Slideshow state for hero background
  const [currentHeroIdx, setCurrentHeroIdx] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#F8F1EC]">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-black select-none">
        {/* Ken Burns Cross-fading Image Montage */}
        <motion.div style={{ y: heroBgY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <motion.div
              key={img}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{
                opacity: currentHeroIdx === idx ? 0.45 : 0,
                scale: currentHeroIdx === idx ? 1.15 : 1.05,
              }}
              transition={{
                opacity: { duration: 2.0, ease: "easeInOut" },
                scale: { duration: 6.5, ease: "linear" },
              }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          {/* Subtle Dark Gold Radial Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/30 to-black/70" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-[#F8F1EC] flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-center mb-8"
          >
            {/* Monogram emblem */}
            <div className="w-14 h-14 border border-gold-luxury/50 rounded-full flex items-center justify-center mb-6">
              <span className="font-serif-luxury text-gold-luxury text-xl tracking-wider">V</span>
            </div>
            
            <h2 className="text-xs md:text-sm tracking-[0.6em] text-gold-luxury uppercase font-semibold mb-3">
              Luxury Sweets & Bakery
            </h2>
            <h1 className="font-serif-luxury text-5xl md:text-8xl tracking-[0.2em] font-light uppercase text-white mb-6">
              VATIKA
            </h1>
            <p className="font-serif-luxury text-lg md:text-2xl font-light italic text-[#E7D8CC] max-w-2xl leading-relaxed">
              &ldquo;Celebrating Sweet Moments with Elegance.&rdquo;
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto"
          >
            <Link
              href="/sweets"
              className="border border-gold-luxury bg-gold-luxury text-white hover:bg-gold-hover px-10 py-4 font-button-luxury text-xs tracking-[0.25em] uppercase transition-all duration-300 shadow-lg shadow-gold-luxury/10"
            >
              Explore Collection
            </Link>
            
            {/* WhatsApp Integration Button */}
            <a
              href="https://wa.me/919999999999?text=Hi%20Vatika%20Sweets%20%26%20Bakery%2C%20I'm%20interested%20in%20pre-ordering%20some%20of%20your%20luxury%20collections."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/40 bg-white/5 hover:bg-white/10 hover:border-gold-luxury px-10 py-4 font-button-luxury text-xs tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order on WhatsApp</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <motion.span 
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[9px] tracking-[0.3em] uppercase text-gold-luxury mb-2"
          >
            Scroll to discover
          </motion.span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold-luxury to-transparent" />
        </div>
      </section>

      {/* 2. FEATURED COLLECTIONS BENTO GRID */}
      <section className="py-32 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-xs md:text-sm tracking-[0.5em] text-gold-luxury uppercase font-semibold mb-3">
            Handcrafted Treasures
          </h2>
          <h3 className="font-serif-luxury text-3xl md:text-5xl tracking-wide uppercase text-text-luxury">
            The Featured Collections
          </h3>
          <div className="w-24 h-[1px] bg-gold-luxury/40 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[320px]">
          {bentoCollections.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
              className={`group relative overflow-hidden bg-[#111111] border border-border-luxury/50 shadow-sm transition-all duration-500 hover:border-gold-luxury ${card.className}`}
            >
              {/* Background Zoom Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-40"
                style={{ backgroundImage: `url(${card.image})` }}
              />

              {/* Glassmorphic/Golden borders reveal */}
              <div className="absolute inset-4 border border-gold-luxury/0 group-hover:border-gold-luxury/25 transition-all duration-500 pointer-events-none" />

              {/* Card Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                <span className="text-[10px] tracking-[0.3em] text-gold-luxury uppercase font-semibold mb-2">
                  Collection
                </span>
                <h4 className="font-serif-luxury text-xl md:text-2xl text-[#F8F1EC] uppercase tracking-wider mb-2">
                  {card.title}
                </h4>
                <p className="text-xs text-[#5B5B5B] group-hover:text-[#FFF8F4]/80 transition-colors duration-300 leading-relaxed max-w-sm mb-4">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#F8F1EC] hover:text-gold-luxury transition-colors uppercase font-medium group/btn w-fit"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 transform transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. OUR STORY TIMELINE */}
      <section ref={storyRef} className="py-32 bg-secondary-background border-y border-border-luxury overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Detail */}
          <div className="flex flex-col space-y-8">
            <div>
              <h2 className="text-xs md:text-sm tracking-[0.5em] text-gold-luxury uppercase font-semibold mb-3">
                Crafting Legacies
              </h2>
              <h3 className="font-serif-luxury text-3xl md:text-5xl uppercase tracking-wide text-text-luxury leading-tight">
                Our Story of Pure Devotion
              </h3>
              <p className="text-xs text-text-secondary mt-6 leading-relaxed max-w-md">
                Deeply rooted in the cultural heart of Hinoo, Ranchi, Vatika is a sanctuary of sensory indulgence. We combine timeless Vedic confectionery traditions with modern dessert artistry.
              </p>
            </div>

            {/* Timeline Milestones */}
            <div className="relative border-l border-gold-luxury/20 pl-8 space-y-12 py-2">
              {storyTimeline.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -30 }}
                    animate={storyInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: idx * 0.2, duration: 0.8 }}
                    className="relative group"
                  >
                    {/* Circle Node */}
                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#FFF8F4] border border-gold-luxury flex items-center justify-center group-hover:bg-gold-luxury transition-colors duration-300">
                      <Icon className="w-3 h-3 text-gold-luxury group-hover:text-[#FFF8F4] transition-colors" />
                    </div>

                    <span className="font-serif-luxury text-sm italic text-gold-luxury block mb-1">
                      {item.year}
                    </span>
                    <h4 className="font-serif-luxury text-lg md:text-xl text-text-luxury uppercase tracking-wider mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed max-w-md">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Image Overlay Block */}
          <div className="relative">
            {/* Behind golden frame */}
            <div className="absolute -inset-4 border border-gold-luxury/20 translate-x-3 translate-y-3 z-0" />
            <div className="relative z-10 aspect-[4/5] bg-cover bg-center overflow-hidden border border-border-luxury"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop')` }}
            >
              <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-all duration-500" />
            </div>
            
            {/* Absolute badge */}
            <div className="absolute bottom-6 left-6 z-20 glass-panel p-6 border border-gold-luxury/30">
              <p className="font-serif-luxury text-lg italic text-gold-luxury">Pure Ghee, Genuine Cardamom</p>
              <p className="text-[10px] tracking-widest text-[#5B5B5B] uppercase mt-1">Sourced from Kerala & Kashmir</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISIT TEASER & MAP EMBED */}
      <section className="py-32 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Details */}
          <div className="flex flex-col space-y-8">
            <div>
              <h2 className="text-xs md:text-sm tracking-[0.5em] text-gold-luxury uppercase font-semibold mb-3">
                Experience in Person
              </h2>
              <h3 className="font-serif-luxury text-3xl md:text-5xl uppercase tracking-wide text-text-luxury">
                Visit Our Flagship Store
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-luxury shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif-luxury text-base uppercase text-text-luxury">Address</h4>
                  <p className="text-xs text-text-secondary mt-1">Main Road, Hinoo, Ranchi, Jharkhand 834002</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gold-luxury shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif-luxury text-base uppercase text-text-luxury">Hours</h4>
                  <p className="text-xs text-text-secondary mt-1">Open Daily: 9:00 AM - 10:00 PM</p>
                  <p className="text-[10px] text-gold-luxury uppercase tracking-widest mt-0.5 font-semibold">Valet Parking Available</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border-luxury pt-6 flex flex-wrap gap-4">
              <a
                href="https://maps.google.com/?q=Vatika+Sweets+Hinoo+Ranchi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-luxury hover:bg-gold-hover text-white px-8 py-3.5 font-button-luxury text-xs tracking-widest uppercase transition-colors"
              >
                Get Directions
              </a>
              <a
                href="tel:+919999999999"
                className="border border-gold-luxury text-text-luxury hover:bg-gold-luxury hover:text-white px-8 py-3.5 font-button-luxury text-xs tracking-widest uppercase transition-all duration-300"
              >
                Call Store
              </a>
            </div>
          </div>

          {/* Map Embed (Luxury Frame) */}
          <div className="relative aspect-[16/10] w-full border border-border-luxury overflow-hidden bg-white shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.486259020359!2d85.31175657512196!3d23.334407478964724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e17b8df589b3%3A0xe54d3eb470716cb8!2sHinoo%2C%20Ranchi%2C%20Jharkhand%20834002!5e0!3m2!1sen!2sin!4v1717529898083!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vatika Sweets Hinoo Ranchi"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

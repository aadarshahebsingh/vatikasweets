"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const festivals = [
  {
    name: "Diwali Specials",
    tagline: "The Festival of Gold and Light",
    description: "Pure Kesar Kaju Katli, gold-leaf laddoos, and customized royal hampers wrapped in handmade silk boxes. Elevate your corporate and family gifting.",
    image: "https://images.unsplash.com/photo-1601356616077-695728ecf769?q=80&w=800&auto=format&fit=crop",
    color: "#C9A227",
  },
  {
    name: "Raksha Bandhan",
    tagline: "Celebrating Sacred Bonds",
    description: "Handcrafted designer threads coupled with our signature assortment of dry fruit sweets, milk pedas, and fresh almond florentines.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop",
    color: "#E7D8CC",
  },
  {
    name: "Holi Delicacies",
    tagline: "Colors of Tradition",
    description: "Traditional baked Gujiyas stuffed with saffron-infused khoya, dry fruits, and slow-fried malpuas glazed in organic cardamom honey syrup.",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=800&auto=format&fit=crop",
    color: "#B58E1D",
  },
  {
    name: "Eid Celebrations",
    tagline: "Sweet Devotion and Feasts",
    description: "Rich, creamy Sheer Khurma mixes, royal pistachio baklavas, and premium dates stuffed with roasted almonds and orange peels.",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop",
    color: "#FFF8F4",
  },
  {
    name: "Christmas & New Year",
    tagline: "Winter Magic in Baking",
    description: "Madagascar vanilla bean plum cakes cured in organic fruit juices, gingerbread treats, chocolate log cakes, and macarons.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
    color: "#C9A227",
  },
  {
    name: "Wedding Season",
    tagline: "The Grand Celebration of Love",
    description: "Custom visual cakes, tiered centerpieces, and personalized invitations boxes matched with gold-leaf sweets and hand-painted cookies.",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop",
    color: "#E7D8CC",
  }
];

export default function FestiveSpecialsPage() {
  const handlePreBook = (festivalName: string) => {
    const brandPhone = "919999999999";
    const msg = `Hi Vatika Sweets & Bakery,

I would like to pre-book items for the upcoming:
Festival: ${festivalName}

Please share your special festive menu brochure and catalog.`;
    window.open(`https://wa.me/${brandPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F8F1EC] py-20">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center mb-20">
        <span className="text-xs md:text-sm tracking-[0.6em] text-gold-luxury uppercase font-semibold mb-3 block">
          Joyous Moments
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-6xl uppercase tracking-wide text-text-luxury mb-4">
          Festive & Wedding Specials
        </h1>
        <p className="font-serif-luxury text-sm md:text-lg italic text-[#5B5B5B] max-w-xl mx-auto">
          From lighting lamps to wedding vows, celebrate the rich tapestry of Indian festivals with our curated luxury hampers.
        </p>
        <div className="w-24 h-[1px] bg-gold-luxury/40 mx-auto mt-6" />
      </div>

      {/* Festive Banners Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-24">
        {festivals.map((festival, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              key={festival.name}
              className={`flex flex-col ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center`}
            >
              {/* Image Frame */}
              <div className="w-full lg:w-1/2 relative">
                {/* Gold backing border */}
                <div className="absolute -inset-3 border border-gold-luxury/20 translate-x-2 translate-y-2 z-0" />
                <div
                  className="relative z-10 aspect-[16/10] w-full bg-cover bg-center border border-border-luxury bg-neutral-900 overflow-hidden"
                  style={{ backgroundImage: `url(${festival.image})` }}
                >
                  <div className="absolute inset-0 bg-black/15 hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>

              {/* Text Info */}
              <div className="w-full lg:w-1/2 flex flex-col space-y-6">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-gold-luxury" />
                  <span className="text-[10px] tracking-[0.3em] text-gold-luxury uppercase font-semibold">
                    Festive Gifting
                  </span>
                </div>
                <div>
                  <h2 className="font-serif-luxury text-2xl md:text-3xl text-text-luxury uppercase tracking-wider mb-1">
                    {festival.name}
                  </h2>
                  <p className="font-serif-luxury text-sm italic text-[#5B5B5B] tracking-wide">
                    {festival.tagline}
                  </p>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {festival.description}
                </p>
                <button
                  onClick={() => handlePreBook(festival.name)}
                  className="flex items-center space-x-2 border border-gold-luxury px-6 py-3 font-button-luxury text-[10px] tracking-[0.2em] uppercase text-text-luxury hover:text-white transition-all duration-300 w-fit hover:bg-gold-luxury"
                >
                  <span>Pre-book Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-luxury group-hover:text-white" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Grand Pre-booking Alert Box */}
      <div className="max-w-4xl mx-auto px-6 mt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 text-center relative border border-gold-luxury/35"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F8F1EC] px-4">
            <Sparkles className="w-6 h-6 text-gold-luxury" />
          </div>
          <h2 className="font-serif-luxury text-2xl md:text-3xl text-text-luxury uppercase tracking-widest mb-4">
            Custom Gifting & Corporate Orders
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed max-w-xl mx-auto mb-8">
            Planning wedding return favors, festive hampers, or corporate client boxes? Our designers work closely with you to curate bespoke combinations, matching box colors with your branding or wedding invitation theme.
          </p>
          <button
            onClick={() => handlePreBook("Custom Corporate Hampers")}
            className="bg-gold-luxury hover:bg-gold-hover text-white px-10 py-4 font-button-luxury text-xs tracking-widest uppercase transition-colors"
          >
            Inquire For Custom Gifting
          </button>
        </motion.div>
      </div>
    </div>
  );
}

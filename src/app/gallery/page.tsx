"use client";

import React, { useState, useEffect } from "react";
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "../../config";

interface GalleryItem {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  description: string;
}

const localGalleryBackup: GalleryItem[] = [
  {
    id: "g1",
    imageUrl: "https://images.unsplash.com/photo-1601356616077-695728ecf769?q=80&w=600&auto=format&fit=crop",
    category: "sweets",
    title: "Artisanal Cashew Perfection",
    description: "Finely sliced Kaju Katli sheets being finished with natural silver leaves.",
  },
  {
    id: "g2",
    imageUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop",
    category: "sweets",
    title: "Golden Festivity",
    description: "Freshly prepared Motichoor Laddoos glistening in pure cow ghee.",
  },
  {
    id: "g3",
    imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=600&auto=format&fit=crop",
    category: "cakes",
    title: "The Regal Wedding Bake",
    description: "Four tiers of delicate vanilla chiffon and hand-piped gold leaf details.",
  },
  {
    id: "g4",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
    category: "cakes",
    title: "Chocolate Craftsmanship",
    description: "Pouring the signature mirror glaze over our Belgian Chocolate Truffle Cake.",
  },
  {
    id: "g5",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop",
    category: "bakery",
    title: "Morning Rise Croissants",
    description: "Freshly baked croissants showing perfect laminated layers of gold.",
  },
  {
    id: "g6",
    imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop",
    category: "wedding",
    title: "Celebration Hamper Selection",
    description: "Handcrafted hampers containing an assortment of premium dry fruit sweets and macarons.",
  },
  {
    id: "g7",
    imageUrl: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=600&auto=format&fit=crop",
    category: "festivals",
    title: "Diwali Hamper Layout",
    description: "Royal luxury gift box curated with dry fruit bites and silver coins.",
  },
  {
    id: "g8",
    imageUrl: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=600&auto=format&fit=crop",
    category: "cakes",
    title: "Blossom Birthday Delight",
    description: "Fresh cream floral birthday cake featuring pastel edible roses.",
  }
];

const filterCategories = [
  { name: "All", id: "all" },
  { name: "Sweets", id: "sweets" },
  { name: "Cakes", id: "cakes" },
  { name: "Bakery", id: "bakery" },
  { name: "Festivals", id: "festivals" },
  { name: "Wedding Orders", id: "wedding" },
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gallery`);
        const json = await response.json();
        if (json.success && json.data.length > 0) {
          setItems(json.data);
        } else {
          setItems(localGalleryBackup);
        }
      } catch (err) {
        console.warn("Backend API not reachable. Using local backup gallery items.");
        setItems(localGalleryBackup);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = items.filter(
    (item) => selectedFilter === "all" || item.category === selectedFilter
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F1EC] py-20 px-6 md:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-xs md:text-sm tracking-[0.6em] text-gold-luxury uppercase font-semibold mb-3 block">
          Visual Symphony
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-6xl uppercase tracking-wide text-text-luxury mb-4">
          Brand Gallery
        </h1>
        <p className="font-serif-luxury text-sm md:text-lg italic text-[#5B5B5B] max-w-xl mx-auto">
          A visual chronicle of kitchen craftsmanship, custom sugar work, and celebratory spreads.
        </p>
        <div className="w-24 h-[1px] bg-gold-luxury/40 mx-auto mt-6" />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16 border-b border-border-luxury/55 pb-8">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedFilter(cat.id)}
            className={`px-5 py-2.5 font-button-luxury text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
              selectedFilter === cat.id
                ? "bg-gold-luxury text-white shadow-md shadow-gold-luxury/10"
                : "border border-border-luxury text-text-secondary hover:border-gold-luxury hover:text-gold-luxury"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Masonry Layout Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border border-t-gold-luxury border-border-luxury rounded-full animate-spin" />
        </div>
      ) : (
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="relative overflow-hidden border border-border-luxury bg-neutral-900 group cursor-pointer break-inside-avoid shadow-sm hover:border-gold-luxury transition-colors duration-500 mb-6"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />

              {/* Dark Glass Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                {/* Gold eye icon reveal */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-gold-luxury/40 flex items-center justify-center text-gold-luxury transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  <Eye className="w-4 h-4" />
                </div>
                
                <span className="text-[9px] tracking-[0.25em] text-gold-luxury uppercase font-semibold mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif-luxury text-base text-white uppercase tracking-wider mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#5B5B5B] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[99999] bg-[#111111]/95 flex items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-gold-luxury z-[100000] p-2 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={showPrev}
              className="absolute left-6 text-white hover:text-gold-luxury z-[100000] p-2 focus:outline-none bg-black/40 border border-white/10 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={showNext}
              className="absolute right-6 text-white hover:text-gold-luxury z-[100000] p-2 focus:outline-none bg-black/40 border border-white/10 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content Frame */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center bg-[#FFF8F4] border border-gold-luxury/20 p-4 md:p-6 shadow-2xl"
            >
              <div className="relative overflow-hidden max-h-[60vh] aspect-auto">
                <img
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full max-h-[60vh] object-contain border border-border-luxury"
                />
              </div>

              {/* Title & Description under image */}
              <div className="w-full text-center mt-6">
                <span className="text-[10px] tracking-[0.3em] text-gold-luxury uppercase font-semibold block mb-1">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h2 className="font-serif-luxury text-xl md:text-2xl text-text-luxury uppercase tracking-widest mb-2">
                  {filteredItems[lightboxIndex].title}
                </h2>
                <p className="text-xs text-text-secondary max-w-lg mx-auto">
                  {filteredItems[lightboxIndex].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

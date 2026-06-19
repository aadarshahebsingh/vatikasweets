"use client";

import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "../../config";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
  weight: string;
  availableSizes: string;
}

const localSweetsBackup: Product[] = [
  {
    id: "p1",
    name: "Luxury Kaju Katli",
    description: "Classic premium silver-leaves adorned cashew fudge, crafted from handpicked Goan cashews for celebratory perfection.",
    category: "sweets",
    subcategory: "dry-sweets",
    price: 450,
    image: "https://images.unsplash.com/photo-1601356616077-695728ecf769?q=80&w=600&auto=format&fit=crop",
    weight: "500g",
    availableSizes: "250g, 500g, 1kg",
  },
  {
    id: "p2",
    name: "Saffron Rajbhog",
    description: "Spongy cottage cheese dumplings infused with pure Kashmiri saffron and stuffed with pistachios and almonds.",
    category: "sweets",
    subcategory: "bengali-sweets",
    price: 320,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=600&auto=format&fit=crop",
    weight: "Box of 6",
    availableSizes: "Box of 6, Box of 12",
  },
  {
    id: "p3",
    name: "Gold-Leaf Motichoor Laddoo",
    description: "Fine gram flour pearls fried in organic cow ghee, infused with green cardamom and glazed with edible 24k gold leaf.",
    category: "sweets",
    subcategory: "milk-sweets",
    price: 280,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop",
    weight: "500g",
    availableSizes: "500g, 1kg",
  },
  {
    id: "p4",
    name: "Royal Anjeer Dry Fruit Roll",
    description: "Sugar-free roll crafted from rich Turkish figs, premium dates, and loaded with roasted almonds, pistachios, and cashews.",
    category: "sweets",
    subcategory: "dry-sweets",
    price: 600,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=600&auto=format&fit=crop",
    weight: "500g",
    availableSizes: "250g, 500g, 1kg",
  },
  {
    id: "p5",
    name: "Kesar Pista Sandesh",
    description: "Traditional Bengali milk fudge, hand-molded, spiced with cardamom and topped with fresh Iranian pistachios.",
    category: "sweets",
    subcategory: "bengali-sweets",
    price: 350,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop",
    weight: "Box of 12",
    availableSizes: "Box of 12, Box of 24",
  },
  {
    id: "p6",
    name: "Vatika Royal Dry Fruit Gift Box",
    description: "An elegant, premium hamper box containing silver-decorated Almonds, Pistachios, Cashews, and dry fruit rolls.",
    category: "sweets",
    subcategory: "gift-boxes",
    price: 1200,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop",
    weight: "1kg",
    availableSizes: "1kg, 2kg",
  }
];

const subcategories = [
  { name: "All", id: "all" },
  { name: "Bengali Sweets", id: "bengali-sweets" },
  { name: "Dry Sweets", id: "dry-sweets" },
  { name: "Milk Sweets", id: "milk-sweets" },
  { name: "Gift Boxes", id: "gift-boxes" },
];

export default function SweetsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSub, setSelectedSub] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch from backend API
    const fetchSweets = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products?category=sweets`);
        const json = await response.json();
        if (json.success && json.data.length > 0) {
          setProducts(json.data);
        } else {
          setProducts(localSweetsBackup);
        }
      } catch (err) {
        console.warn("Backend API not reachable. Using local backup sweets catalog.");
        setProducts(localSweetsBackup);
      } finally {
        setLoading(false);
      }
    };
    fetchSweets();
  }, []);

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesSub = selectedSub === "all" || p.subcategory === selectedSub;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSub && matchesSearch;
  });

  const handleWhatsAppOrder = (product: Product) => {
    const brandPhone = "919999999999";
    const msg = `Hi Vatika Sweets & Bakery,

I want to order:
Product: ${product.name}
Weight: ${product.weight}
Date: ${new Date().toLocaleDateString('en-IN')}

Please share details.`;
    window.open(`https://wa.me/${brandPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F8F1EC] py-20 px-6 md:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-xs md:text-sm tracking-[0.6em] text-gold-luxury uppercase font-semibold mb-3 block">
          A Legacy of Taste
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-6xl uppercase tracking-wide text-text-luxury mb-4">
          Luxury Sweets Collection
        </h1>
        <p className="font-serif-luxury text-sm md:text-lg italic text-[#5B5B5B] max-w-xl mx-auto">
          Clarified cow ghee, hand-ground spices, and traditional craftsmanship merged into unforgettable royal bites.
        </p>
        <div className="w-24 h-[1px] bg-gold-luxury/40 mx-auto mt-6" />
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-border-luxury/55 pb-8">
        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSub(sub.id)}
              className={`px-5 py-2.5 font-button-luxury text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                selectedSub === sub.id
                  ? "bg-gold-luxury text-white shadow-md shadow-gold-luxury/10"
                  : "border border-border-luxury text-text-secondary hover:border-gold-luxury hover:text-gold-luxury"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search sweets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-widest"
          />
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#5B5B5B]/60" />
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border border-t-gold-luxury border-border-luxury rounded-full animate-spin" />
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                key={p.id}
                className="group relative bg-[#FFF8F4] border border-border-luxury/50 overflow-hidden shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-gold-luxury/5 hover:-translate-y-1 hover:border-gold-luxury"
              >
                {/* Image */}
                <div className="aspect-[4/3] w-full overflow-hidden relative border-b border-border-luxury/50 bg-[#111111]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  {/* Subtle Golden Glow Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gold-luxury/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[9px] tracking-[0.25em] text-gold-luxury uppercase font-semibold mb-2">
                      <span>{p.subcategory.replace("-", " ")}</span>
                      <span>{p.weight}</span>
                    </div>
                    <h3 className="font-serif-luxury text-lg md:text-xl uppercase tracking-wider text-text-luxury group-hover:text-gold-luxury transition-colors duration-300 mb-2">
                      {p.name}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4 min-h-[48px]">
                      {p.description}
                    </p>
                  </div>

                  <div className="border-t border-border-luxury/50 pt-4 flex items-center justify-between mt-2">
                    <span className="font-serif-luxury text-lg text-text-luxury">
                      ₹{p.price}
                    </span>
                    <button
                      onClick={() => handleWhatsAppOrder(p)}
                      className="flex items-center space-x-2 border border-gold-luxury/40 px-4 py-2 font-button-luxury text-[9px] tracking-[0.2em] uppercase text-text-luxury hover:text-white transition-all duration-300 hover:bg-gold-luxury"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-gold-luxury group-hover:text-white" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20 border border-dashed border-border-luxury">
          <p className="font-serif-luxury text-lg italic text-[#5B5B5B]">No sweets found matching your selection.</p>
          <button
            onClick={() => {
              setSelectedSub("all");
              setSearchQuery("");
            }}
            className="text-gold-luxury text-xs font-button-luxury tracking-widest uppercase mt-4 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

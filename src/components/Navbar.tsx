"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Sweets", href: "/sweets" },
  { name: "Cakes", href: "/cakes" },
  { name: "Bakery", href: "/bakery" },
  { name: "Festive Specials", href: "/festivals" },
  { name: "Gallery", href: "/gallery" },
  { name: "Custom Orders", href: "/custom-orders" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-nav py-3 shadow-sm shadow-gold-luxury/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Monogram / Brand Name */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 border border-gold-luxury/60 rounded-full transition-colors duration-300 group-hover:border-gold-luxury">
            <span className="font-serif-luxury text-gold-luxury text-lg font-semibold tracking-wider group-hover:text-gold-hover transition-colors">V</span>
            <div className="absolute inset-0.5 border border-dashed border-gold-luxury/30 rounded-full group-hover:border-gold-luxury/60 transition-all" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-lg md:text-xl font-bold tracking-[0.2em] text-text-luxury group-hover:text-gold-luxury transition-colors">
              VATIKA
            </span>
            <span className="text-[9px] tracking-[0.3em] text-text-secondary uppercase -mt-1">
              Sweets & Bakery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-button-luxury text-xs tracking-[0.15em] uppercase font-medium relative py-1 transition-colors duration-300 ${
                  isActive ? "text-gold-luxury" : "text-text-luxury hover:text-gold-luxury"
                }`}
              >
                {link.name}
                {/* Gold Underline Animation */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-luxury origin-left transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                  }`}
                  style={{ transformOrigin: "left" }}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA Visit / Order Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/custom-orders"
            className="flex items-center space-x-2 border border-gold-luxury px-5 py-2.5 rounded-none font-button-luxury text-[10px] tracking-[0.2em] uppercase text-text-luxury hover:text-white transition-all duration-300 gold-liquid-button"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gold-luxury group-hover:text-white" />
            <span>Custom Order</span>
          </Link>
          <a
            href="tel:+919999999999"
            className="bg-gold-luxury hover:bg-gold-hover px-5 py-2.5 rounded-none font-button-luxury text-[10px] tracking-[0.2em] uppercase text-white transition-all duration-300 shadow-md shadow-gold-luxury/10"
          >
            Call Store
          </a>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden text-text-luxury hover:text-gold-luxury p-1.5 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer (Fullscreen Luxury Navigation) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-x-0 top-[70px] bottom-0 z-40 bg-[#111111] flex flex-col justify-between p-8 xl:hidden"
          >
            <div className="flex flex-col space-y-6 pt-8">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      className={`font-serif-luxury text-2xl tracking-widest uppercase block ${
                        isActive ? "text-gold-luxury" : "text-[#F8F1EC] hover:text-gold-luxury"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Footer CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="border-t border-[#E7D8CC]/10 pt-6 flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between text-xs tracking-widest uppercase text-[#5B5B5B]">
                <span>Ranchi, Jharkhand</span>
                <a href="tel:+919999999999" className="text-gold-luxury flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </a>
              </div>
              <Link
                href="/custom-orders"
                className="w-full text-center bg-gold-luxury py-3 font-button-luxury text-xs tracking-[0.2em] uppercase text-white font-medium hover:bg-gold-hover transition-colors"
              >
                Book Custom Order
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

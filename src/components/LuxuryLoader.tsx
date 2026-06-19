"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LuxuryLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -100,
        transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#111111] text-[#F8F1EC]"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Royal V Monogram */}
        <div className="relative w-32 h-32 mb-6">
          {/* Decorative Gold Circular border */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
            animate={{ scale: 1.0, opacity: 0.2, rotate: 360 }}
            transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
            className="absolute inset-0 border border-gold-luxury rounded-full"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, rotate: 180 }}
            animate={{ scale: 1.05, opacity: 0.4, rotate: -180 }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            className="absolute -inset-2 border border-dashed border-gold-luxury rounded-full opacity-30"
          />

          {/* V Emblem */}
          <svg
            className="w-full h-full text-gold-luxury"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Elegant V path */}
            <motion.path
              d="M25 25 L45 75 L55 75 L75 25"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            {/* Inner Serif Flourish */}
            <motion.path
              d="M22 25 H28 M72 25 H78 M43 75 H57"
              stroke="currentColor"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.0 }}
            />
          </svg>

          {/* Golden Shimmer Overlay */}
          <div className="absolute inset-0 gold-shimmer mix-blend-overlay opacity-60" />
        </div>

        {/* Brand Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.0, ease: "easeOut" }}
          className="font-serif-luxury text-3xl md:text-4xl tracking-[0.4em] text-gold-luxury uppercase mb-2 text-center"
        >
          VATIKA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.0 }}
          className="text-xs md:text-sm tracking-[0.6em] text-text-secondary uppercase text-[#5B5B5B] text-center"
        >
          Sweets & Bakery
        </motion.p>
      </div>

      {/* Decorative Bottom Royal Crest Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.0, duration: 1.0 }}
        className="absolute bottom-10 font-serif-luxury text-xs tracking-[0.2em] italic text-[#FFF8F4]"
      >
        Hinoo, Ranchi
      </motion.div>
    </motion.div>
  );
}

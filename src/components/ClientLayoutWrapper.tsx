"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import LuxuryLoader from "./LuxuryLoader";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Elegant luxury transition loading duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    // Initialize core Lenis smooth scrolling (zero React peer conflicts)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let animationFrameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [loading]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LuxuryLoader key="loader" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col min-h-screen"
        >
          {/* Custom Interactive Gold Sparkles Cursor */}
          <CustomCursor />

          {/* Premium Sticky Glassmorphism Header */}
          <Navbar />

          {/* Page content */}
          <main className="flex-grow pt-20">
            {children}
          </main>

          {/* Premium Footer */}
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

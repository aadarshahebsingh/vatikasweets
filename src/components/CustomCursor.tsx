"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    // Hide default cursor on desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Update CSS cursor follower ring
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }

      // Add sparkle particles
      if (Math.random() < 0.25) {
        createSparkle(e.clientX, e.clientY);
      }
    };

    const createSparkle = (x: number, y: number) => {
      const colors = ["#C9A227", "#FFF8F4", "#B58E1D", "#E7D8CC"];
      const particle: Particle = {
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        decay: Math.random() * 0.02 + 0.015,
      };
      particlesRef.current.push(particle);
    };

    const onMouseEnterInteractive = () => setIsHovered(true);
    const onMouseLeaveInteractive = () => setIsHovered(false);

    const setupInteractiveListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, input, select, textarea, [role='button'], .hover-interactive, [data-tilt]"
      );
      targets.forEach((target) => {
        target.addEventListener("mouseenter", onMouseEnterInteractive);
        target.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };

    // Listeners
    window.addEventListener("mousemove", onMouseMove);

    // Initial query
    setupInteractiveListeners();

    // Re-bind listeners on DOM modifications (e.g. page changes)
    const observer = new MutationObserver(setupInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Sparkle Canvas Animation loop
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;

    const render = () => {
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        const particles = particlesRef.current;
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          
          // Add soft glow
          ctx.shadowBlur = 4;
          ctx.shadowColor = p.color;
          
          ctx.fill();
          ctx.restore();
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      const targets = document.querySelectorAll(
        "a, button, input, select, textarea, [role='button'], .hover-interactive"
      );
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", onMouseEnterInteractive);
        target.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Sparkle Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999] mix-blend-screen"
      />

      {/* Floating Gold Cursor Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[99999] rounded-full border border-gold-luxury/80 transition-[width,height,background-color,border-color] duration-300 ease-out hidden md:block ${
          isHovered
            ? "w-14 h-14 bg-gold-luxury/10 border-gold-hover scale-110"
            : "w-6 h-6 bg-transparent"
        }`}
      />
    </>
  );
}

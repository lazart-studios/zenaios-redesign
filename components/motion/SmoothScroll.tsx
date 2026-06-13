"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis-powered inertial smooth scroll. Mounted once at the root.
 * Disabled automatically when the user prefers reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Lerp-based smoothing tracks the wheel directly (snappy, no input lag),
    // instead of animating each scroll over a fixed duration (which felt floaty).
    const lenis = new Lenis({
      lerp: 0.13,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Let in-page anchor links use Lenis
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -90 });
      }
    }
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useState } from "react";

export type ScrollPosition = {
  scrollY: number;
  scrolled: boolean;
  scrollDirection: "up" | "down" | "none";
};

export function useScrollPosition(threshold = 20): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrolled: false,
    scrollDirection: "none"
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : currentScrollY < lastScrollY ? "up" : "none";

      setScrollPosition({
        scrollY: currentScrollY,
        scrolled: currentScrollY > threshold,
        scrollDirection: direction
      });

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    // Initial check
    updateScrollPosition();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrollPosition;
}

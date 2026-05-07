"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 1023px)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      duration: 1.05,
      anchors: {
        offset: 96
      },
      prevent: (node) => node instanceof HTMLElement && node.hasAttribute("data-lenis-prevent")
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useState } from "react";

export function useAmbientMotion() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopPointerQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");

    const update = () => {
      setEnabled(!reduceMotionQuery.matches && desktopPointerQuery.matches);
    };

    update();

    reduceMotionQuery.addEventListener("change", update);
    desktopPointerQuery.addEventListener("change", update);

    return () => {
      reduceMotionQuery.removeEventListener("change", update);
      desktopPointerQuery.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}

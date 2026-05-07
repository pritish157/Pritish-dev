"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const smoothX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 1024) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX - 180);
      y.set(event.clientY - 180);
      setEnabled(true);
    };

    const handleLeave = () => setEnabled(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-10 hidden h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18),rgba(139,92,246,0.08)_35%,transparent_70%)] blur-3xl lg:block"
      style={{
        x: smoothX,
        y: smoothY,
        opacity: enabled ? 1 : 0
      }}
    />
  );
}

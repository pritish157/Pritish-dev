"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RiArrowUpLine } from "react-icons/ri";
import { useScrollPosition } from "@/lib/hooks/use-scroll-position";
import { cn } from "@/lib/utils";

export type BackToTopProps = {
  className?: string;
  threshold?: number;
};

export function BackToTop({ className, threshold = 400 }: BackToTopProps) {
  const { scrollY } = useScrollPosition();
  const visible = scrollY > threshold;

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-label="Back to top of page"
          title="Back to top"
          className={cn(
            "fixed bottom-20 right-5 z-[55] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:bottom-8 md:right-8",
            className
          )}
        >
          <RiArrowUpLine className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

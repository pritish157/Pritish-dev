"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type MarqueeItem = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  category?: string;
};

export type MarqueeProps = {
  items: (string | MarqueeItem)[];
  className?: string;
  pauseOnHover?: boolean;
};

export function Marquee({ items, className, pauseOnHover = true }: MarqueeProps) {
  const normalizedItems: MarqueeItem[] = items.map((item) =>
    typeof item === "string" ? { label: item } : item
  );

  // Duplicate loop array to create seamless loop
  const loop = [...normalizedItems, ...normalizedItems];

  return (
    <div
      aria-label="Technologies and stack marquee"
      className={cn("group relative overflow-hidden py-1", className)}
    >
      {/* Gradient Mask Edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#050816] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#050816] to-transparent sm:w-28" />

      {/* Marquee Track */}
      <div
        className={cn(
          "flex min-w-max items-center gap-3.5 animate-marquee motion-reduce:animate-none",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {loop.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={`${item.label}-${index}`}
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
            >
              {Icon && <Icon className="h-4 w-4 shrink-0 text-violet-300" />}
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

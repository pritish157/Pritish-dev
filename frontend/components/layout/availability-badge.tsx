"use client";

import { siteConfig } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";

export type AvailabilityBadgeProps = {
  className?: string;
  showText?: boolean;
};

export function AvailabilityBadge({ className, showText = true }: AvailabilityBadgeProps) {
  return (
    <div
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium tracking-wide text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-500/15 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
        className
      )}
      title={siteConfig.availability}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
      </span>
      {showText && <span className="uppercase tracking-[0.14em]">Open to Work</span>}
    </div>
  );
}

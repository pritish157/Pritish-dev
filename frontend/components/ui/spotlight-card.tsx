"use client";

import type { HTMLAttributes, MouseEvent } from "react";

import { cn } from "@/lib/utils";

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  accent?: string;
};

export function SpotlightCard({ className, accent = "rgba(139,92,246,0.22)", ...props }: SpotlightCardProps) {
  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    event.currentTarget.style.setProperty("--spotlight-x", `${x}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${y}px`);
    event.currentTarget.style.setProperty("--spotlight-accent", accent);
  };

  return (
    <div
      onMouseMove={handleMove}
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-soft backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.055]",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition before:duration-500 before:content-[''] group-hover:before:opacity-100 before:[background:radial-gradient(420px_circle_at_var(--spotlight-x)_var(--spotlight-y),var(--spotlight-accent),transparent_45%)]",
        "after:pointer-events-none after:absolute after:inset-px after:rounded-[calc(1.75rem-1px)] after:border after:border-white/[0.08] after:content-['']",
        className
      )}
      {...props}
    />
  );
}

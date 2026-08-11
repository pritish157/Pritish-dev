"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  accent?: string;
  glow?: boolean;
};

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ className, accent = "rgba(139, 92, 246, 0.22)", glow = false, children, ...props }, ref) => {
    const cardRef = React.useRef<HTMLDivElement | null>(null);

    React.useImperativeHandle(ref, () => cardRef.current!);

    const handleMouseMove = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const bounds = cardRef.current.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        cardRef.current.style.setProperty("--spotlight-x", `${x}px`);
        cardRef.current.style.setProperty("--spotlight-y", `${y}px`);
        cardRef.current.style.setProperty("--spotlight-accent", accent);
      },
      [accent]
    );

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-hover",
          "before:pointer-events-none before:absolute before:-inset-px before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100 before:[background:radial-gradient(500px_circle_at_var(--spotlight-x)_var(--spotlight-y),var(--spotlight-accent),transparent_45%)]",
          glow && "shadow-glow border-violet-500/30",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SpotlightCard.displayName = "SpotlightCard";

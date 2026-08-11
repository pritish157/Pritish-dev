import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "accent" | "status" | "outline";
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantClasses = {
      default: "border border-white/10 bg-white/[0.04] text-slate-300",
      accent: "border border-violet-500/30 bg-violet-500/10 text-violet-300",
      status: "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-mono",
      outline: "border border-white/20 bg-transparent text-muted"
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] transition-colors select-none",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

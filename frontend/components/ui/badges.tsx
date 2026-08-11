import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { Pill } from "./pill";

export { Badge, Pill };

/**
 * StatusBadge Component — Badge with animated glowing status dot indicator.
 */
export type StatusBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  status?: "online" | "offline" | "busy" | "deploying";
};

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status = "online", children, ...props }, ref) => {
    const statusColors = {
      online: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
      offline: "bg-slate-500",
      busy: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
      deploying: "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)] animate-ping"
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-200 select-none",
          className
        )}
        {...props}
      >
        <span className={cn("h-2 w-2 rounded-full", statusColors[status])} />
        {children}
      </span>
    );
  }
);
StatusBadge.displayName = "StatusBadge";

/**
 * AvailabilityBadge Component — Green pulse badge communicating immediate role availability.
 */
export type AvailabilityBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  label?: string;
};

export const AvailabilityBadge = React.forwardRef<HTMLSpanElement, AvailabilityBadgeProps>(
  ({ className, label = "Available for high-impact roles", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-md select-none",
          className
        )}
        {...props}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {label}
      </span>
    );
  }
);
AvailabilityBadge.displayName = "AvailabilityBadge";

/**
 * TechBadge Component — Badge for technology stack items with optional icon.
 */
export type TechBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  icon?: React.ReactNode;
};

export const TechBadge = React.forwardRef<HTMLSpanElement, TechBadgeProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-200 select-none",
          className
        )}
        {...props}
      >
        {icon && <span className="text-violet-400 shrink-0">{icon}</span>}
        {children}
      </span>
    );
  }
);
TechBadge.displayName = "TechBadge";

/**
 * GradientBadge Component — High-visibility badge with colorful gradient fill or border.
 */
export type GradientBadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export const GradientBadge = React.forwardRef<HTMLSpanElement, GradientBadgeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border border-violet-400/40 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-glow select-none",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
GradientBadge.displayName = "GradientBadge";

/**
 * OutlineBadge Component — Minimalist outline badge for structural labels.
 */
export type OutlineBadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export const OutlineBadge = React.forwardRef<HTMLSpanElement, OutlineBadgeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border border-white/20 bg-transparent px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-400 select-none",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
OutlineBadge.displayName = "OutlineBadge";

/**
 * MetricBadge Component — Badge displaying stat numbers or counts.
 */
export type MetricBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  value: string;
};

export const MetricBadge = React.forwardRef<HTMLSpanElement, MetricBadgeProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-xs font-semibold text-violet-300 select-none",
          className
        )}
        {...props}
      >
        <span className="font-bold text-white">{value}</span>
        {children}
      </span>
    );
  }
);
MetricBadge.displayName = "MetricBadge";

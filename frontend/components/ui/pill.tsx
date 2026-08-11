import * as React from "react";
import { cn } from "@/lib/utils";

export type PillProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "active" | "outline" | "ghost" | "status";
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
};

export const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      interactive = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: "bg-white/[0.04] border border-white/10 text-muted hover:text-white hover:bg-white/10",
      active: "bg-violet-500/20 border border-violet-500/40 text-violet-200 shadow-sm",
      outline: "border border-white/15 text-muted hover:border-white/30 hover:text-white",
      ghost: "bg-transparent text-muted hover:bg-white/5 hover:text-white",
      status: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono"
    };

    const sizeClasses = {
      sm: "px-2.5 py-0.5 text-xs rounded-full",
      md: "px-3.5 py-1.5 text-sm rounded-full",
      lg: "px-4 py-2 text-base rounded-full"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 font-medium transition-all duration-200 select-none",
          variantClasses[variant],
          sizeClasses[size],
          interactive && "cursor-pointer active:scale-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Pill.displayName = "Pill";

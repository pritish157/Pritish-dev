import * as React from "react";
import { cn } from "@/lib/utils";

export type IconWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "glass" | "primary" | "glow";
};

export const IconWrapper = React.forwardRef<HTMLDivElement, IconWrapperProps>(
  ({ className, size = "md", variant = "default", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg",
      xl: "w-16 h-16 text-xl"
    };

    const variantClasses = {
      default: "bg-white/[0.04] border border-white/10 text-foreground",
      glass: "glass-panel text-violet-300",
      primary: "bg-primary/20 border border-primary/40 text-primary-hover",
      glow: "bg-violet-500/20 border border-violet-500/40 text-violet-300 shadow-glow"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl shrink-0 transition-all duration-200",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

IconWrapper.displayName = "IconWrapper";

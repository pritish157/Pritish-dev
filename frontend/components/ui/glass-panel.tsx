import * as React from "react";
import { cn } from "@/lib/utils";

export type GlassPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "sm" | "md" | "strong" | "hover" | "floating" | "nav" | "card";
  glow?: boolean;
};

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = "md", glow = false, children, ...props }, ref) => {
    const variantClasses = {
      sm: "glass-sm rounded-lg",
      md: "glass-md rounded-xl",
      strong: "glass-strong rounded-2xl",
      hover: "glass-md glass-hover rounded-xl",
      floating: "glass-floating rounded-full",
      nav: "glass-nav",
      card: "glass-panel rounded-2xl"
    };

    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
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

GlassPanel.displayName = "GlassPanel";

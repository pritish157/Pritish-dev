import * as React from "react";
import { cn } from "@/lib/utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  glow?: boolean;
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-soft backdrop-blur-xl transition-all duration-300",
          hover && "hover:border-white/20 hover:bg-white/[0.06] hover:shadow-hover hover:-translate-y-1",
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

Card.displayName = "Card";

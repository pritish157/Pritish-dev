import * as React from "react";
import { cn } from "@/lib/utils";

export type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
  glow?: boolean;
  orientation?: "horizontal" | "vertical";
};

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, glow = false, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          orientation === "horizontal" ? "w-full h-px" : "h-full w-px",
          glow
            ? "bg-gradient-to-r from-transparent via-violet-500/80 to-transparent"
            : "bg-white/10",
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

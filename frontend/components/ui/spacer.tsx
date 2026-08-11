import * as React from "react";
import { cn } from "@/lib/utils";

export type SpacerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  axis?: "vertical" | "horizontal";
};

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = "md", axis = "vertical", ...props }, ref) => {
    const verticalSizes = {
      xs: "h-2",
      sm: "h-4",
      md: "h-8",
      lg: "h-16",
      xl: "h-24",
      "2xl": "h-32"
    };

    const horizontalSizes = {
      xs: "w-2",
      sm: "w-4",
      md: "w-8",
      lg: "w-16",
      xl: "w-24",
      "2xl": "w-32"
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          axis === "vertical" ? verticalSizes[size] : horizontalSizes[size],
          "shrink-0",
          className
        )}
        {...props}
      />
    );
  }
);

Spacer.displayName = "Spacer";

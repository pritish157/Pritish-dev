import * as React from "react";
import { cn } from "@/lib/utils";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl" | "7xl" | "full";
  padded?: boolean;
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "7xl", padded = true, children, ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-5xl",
      xl: "max-w-6xl",
      "7xl": "max-w-7xl",
      full: "max-w-full"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto",
          sizeClasses[size],
          padded && "px-4 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

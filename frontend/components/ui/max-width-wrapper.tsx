import * as React from "react";
import { cn } from "@/lib/utils";

export type MaxWidthWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
};

export const MaxWidthWrapper = React.forwardRef<HTMLDivElement, MaxWidthWrapperProps>(
  ({ className, maxWidth = "7xl", children, ...props }, ref) => {
    const widthClasses = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      "7xl": "max-w-7xl",
      full: "max-w-full"
    };

    return (
      <div
        ref={ref}
        className={cn("w-full mx-auto px-4 sm:px-6 lg:px-8", widthClasses[maxWidth], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MaxWidthWrapper.displayName = "MaxWidthWrapper";

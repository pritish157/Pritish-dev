import * as React from "react";
import { cn } from "@/lib/utils";

export type SubheadingProps = React.HTMLAttributes<HTMLParagraphElement> & {
  size?: "small" | "body" | "large";
};

export const Subheading = React.forwardRef<HTMLParagraphElement, SubheadingProps>(
  ({ className, size = "large", children, ...props }, ref) => {
    const sizeClasses = {
      small: "text-small text-muted",
      body: "text-body text-muted",
      large: "text-body-lg text-muted max-w-2xl"
    };

    return (
      <p
        ref={ref}
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Subheading.displayName = "Subheading";

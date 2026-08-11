import * as React from "react";
import { cn } from "@/lib/utils";

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "display" | "hero" | "h1" | "h2" | "h3" | "h4";
  gradient?: boolean;
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, size, gradient = false, children, ...props }, ref) => {
    const Tag = `h${level}` as React.ElementType;

    const sizeClasses = {
      display: "text-display",
      hero: "text-hero",
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4"
    };

    const defaultSizeKey = size || (level === 1 ? "h1" : level === 2 ? "h2" : level === 3 ? "h3" : "h4");

    return (
      <Tag
        ref={ref}
        className={cn(
          sizeClasses[defaultSizeKey],
          gradient ? "text-gradient" : "text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = "Heading";

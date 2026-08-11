import * as React from "react";
import { cn } from "@/lib/utils";

export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  spacing?: "none" | "sm" | "md" | "lg";
  divider?: boolean;
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, id, spacing = "lg", divider = false, children, ...props }, ref) => {
    const spacingClasses = {
      none: "py-0",
      sm: "py-12 md:py-16",
      md: "py-16 md:py-20",
      lg: "py-24 md:py-32"
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative w-full scroll-mt-28",
          spacingClasses[spacing],
          divider && "surface-divider",
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

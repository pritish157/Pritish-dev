import * as React from "react";
import { cn } from "@/lib/utils";

export { Container } from "./container";
export { MaxWidthWrapper } from "./max-width-wrapper";
export { Section } from "./section";
export { Stack } from "./stack";
export { Grid } from "./grid";
export { Cluster } from "./cluster";
export { PageWrapper } from "./page-wrapper";
export { Spacer } from "./spacer";

/**
 * Flex Component — Flexible direction layout container with align and justify controls.
 */
export type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  wrap?: boolean;
};

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      direction = "row",
      align = "center",
      justify = "start",
      gap = "md",
      wrap = false,
      children,
      ...props
    },
    ref
  ) => {
    const directionClasses = {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse"
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline"
    };

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly"
    };

    const gapClasses = {
      none: "gap-0",
      xs: "gap-1.5",
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          directionClasses[direction],
          alignClasses[align],
          justifyClasses[justify],
          gapClasses[gap],
          wrap && "flex-wrap",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Flex.displayName = "Flex";

/**
 * ContentWrapper Component — Container for prose or main reader column width.
 */
export type ContentWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "narrow" | "prose" | "wide";
};

export const ContentWrapper = React.forwardRef<HTMLDivElement, ContentWrapperProps>(
  ({ className, size = "prose", children, ...props }, ref) => {
    const sizeClasses = {
      narrow: "max-w-xl",
      prose: "max-w-3xl",
      wide: "max-w-5xl"
    };

    return (
      <div ref={ref} className={cn("w-full mx-auto px-4 sm:px-6", sizeClasses[size], className)} {...props}>
        {children}
      </div>
    );
  }
);
ContentWrapper.displayName = "ContentWrapper";

/**
 * ResponsiveGrid Component — Standard responsive column grid (1 col mobile -> 2 tablet -> 3/4 desktop).
 */
export type ResponsiveGridProps = React.HTMLAttributes<HTMLDivElement> & {
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
};

export const ResponsiveGrid = React.forwardRef<HTMLDivElement, ResponsiveGridProps>(
  ({ className, columns = 3, gap = "md", children, ...props }, ref) => {
    const colClasses = {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    };

    const gapClasses = {
      sm: "gap-4 sm:gap-6",
      md: "gap-6 sm:gap-8",
      lg: "gap-8 sm:gap-10"
    };

    return (
      <div ref={ref} className={cn("grid w-full", colClasses[columns], gapClasses[gap], className)} {...props}>
        {children}
      </div>
    );
  }
);
ResponsiveGrid.displayName = "ResponsiveGrid";

/**
 * AutoGrid Component — CSS Auto-fit / Auto-fill min-max responsive container grid.
 */
export type AutoGridProps = React.HTMLAttributes<HTMLDivElement> & {
  minWidth?: string;
  gap?: "sm" | "md" | "lg";
};

export const AutoGrid = React.forwardRef<HTMLDivElement, AutoGridProps>(
  ({ className, minWidth = "280px", gap = "md", children, style, ...props }, ref) => {
    const gapClasses = {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8"
    };

    return (
      <div
        ref={ref}
        className={cn("grid w-full", gapClasses[gap], className)}
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AutoGrid.displayName = "AutoGrid";

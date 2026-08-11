import * as React from "react";
import { cn } from "@/lib/utils";

export type ClusterProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: "xs" | "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end" | "between";
};

export const Cluster = React.forwardRef<HTMLDivElement, ClusterProps>(
  (
    {
      className,
      gap = "sm",
      align = "center",
      justify = "start",
      children,
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      xs: "gap-1.5",
      sm: "gap-2 sm:gap-3",
      md: "gap-4",
      lg: "gap-6"
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end"
    };

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap",
          gapClasses[gap],
          alignClasses[align],
          justifyClasses[justify],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Cluster.displayName = "Cluster";

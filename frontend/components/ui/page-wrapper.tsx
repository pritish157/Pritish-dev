import * as React from "react";
import { cn } from "@/lib/utils";

export type PageWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  noise?: boolean;
  mesh?: boolean;
};

export const PageWrapper = React.forwardRef<HTMLDivElement, PageWrapperProps>(
  ({ className, noise = true, mesh = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative min-h-screen w-full overflow-x-hidden bg-background text-foreground selection:bg-violet-500/20 selection:text-white",
          mesh && "bg-mesh-main",
          className
        )}
        {...props}
      >
        {noise && <div className="pointer-events-none fixed inset-0 z-10 noise-overlay" aria-hidden="true" />}
        <div className="relative z-base flex min-h-screen flex-col">
          {children}
        </div>
      </div>
    );
  }
);

PageWrapper.displayName = "PageWrapper";

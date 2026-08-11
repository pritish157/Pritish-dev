import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "./glass-panel";

export type MetricCardProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  label: string;
  subtext?: string;
  glow?: boolean;
};

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, value, label, subtext, glow = false, ...props }, ref) => {
    return (
      <GlassPanel
        ref={ref}
        variant="hover"
        glow={glow}
        className={cn("p-6 flex flex-col justify-between space-y-2", className)}
        {...props}
      >
        <div className="text-3xl sm:text-4xl font-bold font-display text-gradient tracking-tight">
          {value}
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{label}</div>
          {subtext && <div className="text-xs text-muted mt-0.5">{subtext}</div>}
        </div>
      </GlassPanel>
    );
  }
);

MetricCard.displayName = "MetricCard";

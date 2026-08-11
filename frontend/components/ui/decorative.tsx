import * as React from "react";
import { cn } from "@/lib/utils";

export { Divider } from "./divider";

/**
 * Glow Component — Radial glow light accent element.
 */
export type GlowProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "violet" | "fuchsia" | "emerald" | "amber";
};

export function Glow({ className, size = "md", color = "violet", ...props }: GlowProps) {
  const sizeClasses = {
    sm: "h-32 w-32 blur-2xl",
    md: "h-64 w-64 blur-3xl",
    lg: "h-96 w-96 blur-[100px]",
    xl: "h-[500px] w-[500px] blur-[140px]"
  };

  const colorClasses = {
    violet: "bg-violet-600/20",
    fuchsia: "bg-fuchsia-600/20",
    emerald: "bg-emerald-600/15",
    amber: "bg-amber-600/15"
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full select-none",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      {...props}
    />
  );
}

/**
 * GridBackground Component — Subtle tech SVG grid line overlay.
 */
export type GridBackgroundProps = React.HTMLAttributes<HTMLDivElement>;

export function GridBackground({ className, children, ...props }: GridBackgroundProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)} {...props}>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

/**
 * NoiseLayer Component — Micro texture noise grain overlay.
 */
export type NoiseLayerProps = React.HTMLAttributes<HTMLDivElement>;

export function NoiseLayer({ className, ...props }: NoiseLayerProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay select-none bg-repeat",
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * AmbientLight Component — Soft glowing light beam.
 */
export type AmbientLightProps = React.HTMLAttributes<HTMLDivElement>;

export function AmbientLight({ className, ...props }: AmbientLightProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-64 w-3/4 max-w-5xl rounded-full bg-gradient-to-b from-violet-500/15 via-fuchsia-500/5 to-transparent blur-3xl",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * GradientOrb Component — Floating blurred color orb.
 */
export type GradientOrbProps = React.HTMLAttributes<HTMLDivElement>;

export function GradientOrb({ className, ...props }: GradientOrbProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-72 w-72 rounded-full bg-gradient-to-tr from-violet-600/30 to-fuchsia-500/30 blur-3xl animate-pulse",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * GlassSurface Component — High grade backdrop blur container surface.
 */
export type GlassSurfaceProps = React.HTMLAttributes<HTMLDivElement>;

export function GlassSurface({ className, children, ...props }: GlassSurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * BorderGlow Component — Container with illuminated glowing border gradient.
 */
export type BorderGlowProps = React.HTMLAttributes<HTMLDivElement>;

export function BorderGlow({ className, children, ...props }: BorderGlowProps) {
  return (
    <div className={cn("relative rounded-2xl p-px bg-gradient-to-r from-violet-500/50 via-fuchsia-500/50 to-violet-500/50 shadow-glow", className)} {...props}>
      <div className="h-full w-full rounded-[inherit] bg-slate-950 p-6">
        {children}
      </div>
    </div>
  );
}

/**
 * Spotlight Component — Radial highlight focus ray overlay.
 */
export type SpotlightProps = React.HTMLAttributes<HTMLDivElement>;

export function Spotlight({ className, ...props }: SpotlightProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-20 left-1/4 h-[400px] w-[500px] -rotate-12 bg-gradient-to-b from-white/10 via-violet-500/5 to-transparent blur-2xl",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

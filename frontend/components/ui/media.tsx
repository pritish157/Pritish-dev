import * as React from "react";
import Image, { ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

/**
 * Avatar Component — User profile avatar with initials fallback and status dot.
 */
export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy";
};

export function Avatar({
  className,
  src,
  alt = "Avatar",
  fallback = "PK",
  size = "md",
  status,
  ...props
}: AvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-20 w-20 text-xl"
  };

  const statusColors = {
    online: "bg-emerald-500",
    offline: "bg-slate-500",
    busy: "bg-amber-500"
  };

  return (
    <div className={cn("relative inline-block shrink-0", className)} {...props}>
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-full border border-white/15 bg-slate-800 font-semibold font-mono text-slate-200 shadow-md",
          sizeClasses[size]
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <span>{fallback}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}

/**
 * AppImage Component — Custom wrapper for Next.js Image with aspect ratio and fallback state.
 */
export type AppImageProps = Omit<NextImageProps, "alt"> & {
  alt: string;
  aspectRatio?: "square" | "video" | "wide" | "auto";
  containerClassName?: string;
};

export function AppImage({
  className,
  containerClassName,
  aspectRatio = "auto",
  alt,
  src,
  ...props
}: AppImageProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    auto: ""
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60",
        aspectClasses[aspectRatio],
        containerClassName
      )}
    >
      <Image
        src={src}
        alt={alt}
        className={cn("object-cover transition-transform duration-500 hover:scale-105", className)}
        {...props}
      />
    </div>
  );
}

/**
 * BrowserMockup Component — macOS-style desktop browser window header and viewport frame.
 */
export type BrowserMockupProps = React.HTMLAttributes<HTMLDivElement> & {
  url?: string;
  title?: string;
};

export function BrowserMockup({
  className,
  url = "https://pritish.dev",
  title,
  children,
  ...props
}: BrowserMockupProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-2xl backdrop-blur-xl",
        className
      )}
      {...props}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex-1 max-w-sm mx-4">
          <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-1 text-center font-mono text-xs text-slate-400 truncate">
            {url}
          </div>
        </div>
        <div className="text-xs text-slate-400 font-medium">{title}</div>
      </div>
      {/* Viewport content */}
      <div className="relative p-2 sm:p-4">{children}</div>
    </div>
  );
}

/**
 * PhoneMockup Component — Smartphone device frame mockup with notch.
 */
export type PhoneMockupProps = React.HTMLAttributes<HTMLDivElement>;

export function PhoneMockup({ className, children, ...props }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[280px] rounded-[2.5rem] border-[6px] border-slate-800 bg-slate-950 p-2 shadow-2xl",
        className
      )}
      {...props}
    >
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-28 rounded-b-xl bg-slate-800 z-20" />
      {/* Inner Screen */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 min-h-[480px]">
        {children}
      </div>
    </div>
  );
}

/**
 * ProjectPreview Component — Card mockup frame displaying screenshot or live preview.
 */
export type ProjectPreviewProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  imageSrc?: string;
};

export function ProjectPreview({ className, title, imageSrc, children, ...props }: ProjectPreviewProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-2 transition-all duration-300 hover:border-violet-500/40",
        className
      )}
      {...props}
    >
      {imageSrc ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

/**
 * VideoWrapper Component — Accessible video player frame with play button overlay.
 */
export type VideoWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  poster?: string;
  onPlayClick?: () => void;
};

export function VideoWrapper({
  className,
  poster,
  onPlayClick,
  children,
  ...props
}: VideoWrapperProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/15 bg-black aspect-video flex items-center justify-center",
        className
      )}
      {...props}
    >
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="Video Poster" className="absolute inset-0 h-full w-full object-cover opacity-80" />
      )}
      {children}
      <button
        onClick={onPlayClick}
        aria-label="Play video"
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-violet-600/80 text-white shadow-glow backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
      >
        <Play className="h-7 w-7 fill-white translate-x-0.5" />
      </button>
    </div>
  );
}

/**
 * GradientBackground Component — Atmospheric background ambient gradient layer.
 */
export type GradientBackgroundProps = React.HTMLAttributes<HTMLDivElement>;

export function GradientBackground({ className, children, ...props }: GradientBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden w-full", className)} {...props}>
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-[120px]" />
      {children}
    </div>
  );
}

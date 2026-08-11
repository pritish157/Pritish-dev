"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card as BaseCard } from "./card";
import { GlassPanel as GlassCard } from "./glass-panel";
import { SpotlightCard } from "./spotlight-card";
import { MetricCard } from "./metric-card";
import { Badge } from "./badge";
import { Button } from "./button";
import { ExternalLink } from "lucide-react";
import { RiGithubFill } from "react-icons/ri";

export { BaseCard, GlassCard, SpotlightCard, MetricCard };

/**
 * ProjectCardBase Component — Structured card layout for featured or secondary engineering projects.
 */
export type ProjectCardBaseProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  tags?: string[];
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  onCaseStudyClick?: () => void;
  imageSrc?: string;
};

export const ProjectCardBase = React.forwardRef<HTMLDivElement, ProjectCardBaseProps>(
  (
    {
      className,
      title,
      description,
      tags = [],
      metrics = [],
      liveUrl,
      githubUrl,
      onCaseStudyClick,
      imageSrc,
      ...props
    },
    ref
  ) => {
    return (
      <SpotlightCard
        ref={ref}
        className={cn("flex flex-col justify-between overflow-hidden p-6 sm:p-8", className)}
        {...props}
      >
        <div className="space-y-4">
          {imageSrc && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-xl font-bold font-display text-white tracking-tight">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{description}</p>
          </div>

          {metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 py-2 border-y border-white/5 my-4">
              {metrics.map((m) => (
                <div key={m.label} className="space-y-0.5">
                  <div className="text-xs text-slate-400">{m.label}</div>
                  <div className="text-sm font-semibold text-violet-300 font-mono">{m.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-white/5">
          {onCaseStudyClick ? (
            <Button size="sm" variant="secondary" onClick={onCaseStudyClick}>
              View Architecture
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${title} GitHub Repository`}
                className="p-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RiGithubFill className="h-4 w-4" />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${title} Live Demo`}
                className="p-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:text-white hover:bg-violet-500/20 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </SpotlightCard>
    );
  }
);
ProjectCardBase.displayName = "ProjectCardBase";

/**
 * InteractiveCard Component — Highly dynamic card with cursor lift, glow, and border highlight.
 */
export type InteractiveCardProps = React.HTMLAttributes<HTMLDivElement> & {
  glow?: boolean;
};

export const InteractiveCard = React.forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ className, glow = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-500/40 hover:bg-white/[0.06]",
          glow && "hover:shadow-glow",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
InteractiveCard.displayName = "InteractiveCard";

/**
 * FloatingCard Component — Subtle ambient floating animation wrapper.
 */
export type FloatingCardProps = React.HTMLAttributes<HTMLDivElement>;

export const FloatingCard = React.forwardRef<HTMLDivElement, FloatingCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-lg transition-transform duration-700 animate-pulse hover:animate-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FloatingCard.displayName = "FloatingCard";

/**
 * HoverCard Component — Container card designed for hover information popovers or previews.
 */
export type HoverCardProps = React.HTMLAttributes<HTMLDivElement>;

export const HoverCardContainer = React.forwardRef<HTMLDivElement, HoverCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-white/15 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-2xl text-xs text-slate-300 max-w-xs space-y-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
HoverCardContainer.displayName = "HoverCardContainer";

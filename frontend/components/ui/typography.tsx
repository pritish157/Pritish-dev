import * as React from "react";
import { cn } from "@/lib/utils";

// Re-export Heading & Subheading for convenience
export { Heading } from "@/components/ui/heading";
export { Subheading } from "@/components/ui/subheading";
export { SectionHeading } from "@/components/ui/section-heading";

/**
 * Text Component — General body typography with support for multiple weight, color, and size presets.
 */
export type TextProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "muted" | "lead" | "caption" | "mono" | "semibold" | "accent";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  as?: React.ElementType;
};

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className, variant = "default", size = "base", as: Component = "span", children, ...props }, ref) => {
    const variantClasses = {
      default: "text-slate-300",
      muted: "text-slate-400",
      lead: "text-slate-200 font-medium text-lg leading-relaxed",
      caption: "text-slate-400 text-xs tracking-wide",
      mono: "font-mono text-violet-300",
      semibold: "text-white font-semibold",
      accent: "text-violet-400 font-medium"
    };

    const sizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    };

    return (
      <Component
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(sizeClasses[size], variantClasses[variant], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = "Text";

/**
 * Paragraph Component — Semantic paragraph wrapper with standard line height and spacing.
 */
export type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  lead?: boolean;
};

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, lead = false, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "leading-relaxed text-slate-300",
          lead ? "text-lg sm:text-xl font-normal text-slate-200 max-w-3xl" : "text-base sm:text-lg",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
Paragraph.displayName = "Paragraph";

/**
 * Eyebrow Component — Standard uppercase label above section headings or title cards.
 */
export type EyebrowProps = React.HTMLAttributes<HTMLSpanElement>;

export const Eyebrow = React.forwardRef<HTMLSpanElement, EyebrowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-violet-400 select-none",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Eyebrow.displayName = "Eyebrow";

/**
 * Caption Component — Muted sub-text for metadata, timestamps, and image captions.
 */
export type CaptionProps = React.HTMLAttributes<HTMLSpanElement>;

export const Caption = React.forwardRef<HTMLSpanElement, CaptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-xs font-normal text-slate-400 tracking-normal", className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Caption.displayName = "Caption";

/**
 * Code Component — Inline code snippet element styled for dark surfaces.
 */
export type CodeProps = React.HTMLAttributes<HTMLElement>;

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          "rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs font-medium text-violet-300",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }
);
Code.displayName = "Code";

/**
 * GradientText Component — Vibrant gradient text display element.
 */
export type GradientTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  from?: string;
  to?: string;
};

export const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-bold",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
GradientText.displayName = "GradientText";

/**
 * Highlight Component — Styled highlight span with subtle backdrop accent.
 */
export type HighlightProps = React.HTMLAttributes<HTMLSpanElement>;

export const Highlight = React.forwardRef<HTMLSpanElement, HighlightProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "rounded px-1.5 py-0.5 bg-violet-500/10 text-violet-300 border border-violet-500/20 font-medium",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Highlight.displayName = "Highlight";

/**
 * SectionDescription Component — Subtitle text below section headings.
 */
export type SectionDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const SectionDescription = React.forwardRef<HTMLParagraphElement, SectionDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
SectionDescription.displayName = "SectionDescription";

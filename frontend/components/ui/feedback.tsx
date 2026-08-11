import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle, CheckCircle2, Info, RefreshCw } from "lucide-react";
import { Button } from "./button";

/**
 * LoadingSpinner Component — Smooth rotating SVG spinner.
 */
export type LoadingSpinnerProps = React.SVGAttributes<SVGSVGElement> & {
  size?: "sm" | "md" | "lg";
};

export function LoadingSpinner({ className, size = "md", ...props }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10"
  };

  return (
    <Loader2
      className={cn("animate-spin text-violet-400 shrink-0", sizeClasses[size], className)}
      aria-label="Loading..."
      {...props}
    />
  );
}

/**
 * Skeleton Component — Shimmer loading placeholder block for UI elements.
 */
export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-white/10 backdrop-blur-sm", className)}
      {...props}
    />
  );
}

/**
 * Progress Component — Horizontal progress indicator bar.
 */
export type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value: number; // 0 to 100
  max?: number;
};

export function Progress({ className, value, max = 100, ...props }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-white/10", className)}
      {...props}
    >
      <div
        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

/**
 * Toast Component — Notification banner banner for transient alerts.
 */
export type ToastProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "info" | "success" | "error" | "warning";
  title?: string;
  message: string;
};

export function Toast({ className, type = "info", title, message, ...props }: ToastProps) {
  const icons = {
    info: <Info className="h-5 w-5 text-sky-400 shrink-0" />,
    success: <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-400 shrink-0" />
  };

  const borderColors = {
    info: "border-sky-500/30 bg-sky-500/10",
    success: "border-emerald-500/30 bg-emerald-500/10",
    error: "border-rose-500/30 bg-rose-500/10",
    warning: "border-amber-500/30 bg-amber-500/10"
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-xl text-slate-200 text-sm max-w-md",
        borderColors[type],
        className
      )}
      {...props}
    >
      {icons[type]}
      <div className="space-y-0.5">
        {title && <div className="font-semibold text-white">{title}</div>}
        <div className="text-slate-300">{message}</div>
      </div>
    </div>
  );
}

/**
 * EmptyState Component — Icon + text display for empty datasets.
 */
export type EmptyStateProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
};

export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 sm:p-12 text-center space-y-4 max-w-md mx-auto",
        className
      )}
      {...props}
    >
      {icon ? (
        <div className="p-3 rounded-full border border-white/10 bg-white/5 text-violet-400">
          {icon}
        </div>
      ) : (
        <Info className="h-8 w-8 text-slate-500" />
      )}
      <div className="space-y-1">
        <h4 className="text-lg font-semibold text-white font-display">{title}</h4>
        {description && <p className="text-sm text-slate-400 leading-relaxed">{description}</p>}
      </div>
      {action && (
        <Button size="sm" variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

/**
 * ErrorState Component — High visibility error callout with optional retry action.
 */
export type ErrorStateProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export function ErrorState({
  className,
  title = "Something went wrong",
  message,
  onRetry,
  ...props
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 sm:p-8 text-center space-y-4 max-w-lg mx-auto",
        className
      )}
      {...props}
    >
      <div className="p-3 rounded-full bg-rose-500/20 text-rose-300">
        <AlertCircle className="h-8 w-8" />
      </div>
      <div className="space-y-1">
        <h4 className="text-lg font-semibold text-rose-200 font-display">{title}</h4>
        <p className="text-sm text-rose-300/80 leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button
          size="sm"
          variant="danger"
          onClick={onRetry}
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}

/**
 * SuccessState Component — Confirmation feedback card.
 */
export type SuccessStateProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  message: string;
};

export function SuccessState({
  className,
  title = "Operation Successful",
  message,
  ...props
}: SuccessStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 sm:p-8 text-center space-y-3 max-w-lg mx-auto",
        className
      )}
      {...props}
    >
      <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-300">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <div className="space-y-1">
        <h4 className="text-lg font-semibold text-emerald-200 font-display">{title}</h4>
        <p className="text-sm text-emerald-300/80 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

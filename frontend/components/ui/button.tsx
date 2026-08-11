"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 transform-gpu active:scale-98 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border border-violet-400/30 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-glow hover:scale-[1.01] hover:shadow-hover",
        secondary:
          "border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/[0.08]",
        ghost:
          "border border-transparent bg-transparent text-slate-300 hover:bg-white/5 hover:text-white",
        outline:
          "border border-white/15 bg-transparent text-slate-200 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white",
        link:
          "border-b border-violet-400/50 bg-transparent text-violet-300 rounded-none p-0 h-auto hover:text-violet-200 hover:border-violet-300",
        danger:
          "border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/50"
      },
      size: {
        default: "h-12 px-5 text-sm",
        sm: "h-9 px-3.5 text-xs font-semibold uppercase tracking-wider",
        lg: "h-14 px-7 text-base font-semibold",
        icon: "h-10 w-10 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" aria-hidden="true" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

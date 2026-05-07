"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 transform-gpu",
  {
    variants: {
      variant: {
        default:
          "border border-violet-400/30 bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 text-white shadow-[0_16px_40px_rgba(139,92,246,0.32)] hover:scale-[1.01] hover:shadow-[0_22px_60px_rgba(139,92,246,0.4)]",
        secondary:
          "border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/[0.08]",
        ghost:
          "border border-transparent bg-transparent text-slate-300 hover:bg-white/5 hover:text-white"
      },
      size: {
        default: "h-12 px-5",
        sm: "h-10 px-4 text-xs uppercase tracking-[0.18em]",
        lg: "h-14 px-6 text-[0.95rem]"
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

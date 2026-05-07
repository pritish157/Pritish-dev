"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  external?: boolean;
};

export function MagneticLink({
  href,
  children,
  className,
  variant = "default",
  size = "default",
  external = false
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (
      !node ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const xTo = gsap.quickTo(node, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.3, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      const bounds = node.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;

      xTo(x * 0.14);
      yTo(y * 0.22);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      gsap.set(node, { x: 0, y: 0 });
    };
  }, []);

  const classes = cn(buttonVariants({ variant, size }), className);

  if (external) {
    return (
      <a ref={ref} href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} className={classes}>
      {children}
    </Link>
  );
}

"use client";

import * as React from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeIn, staggerContainer, staggerItem, EASE_DEFAULT } from "@/lib/motion";

export { MagneticLink } from "./magnetic-link";
export { CursorGlow } from "@/components/effects/cursor-glow";
export { SectionReveal as ScrollReveal } from "@/components/effects/section-reveal";

/**
 * AnimatedText Component — Word-by-word staggered entrance text reveal.
 */
export type AnimatedTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i }
    })
  };

  const childVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: EASE_DEFAULT
      }
    },
    hidden: {
      opacity: 0,
      y: 20
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("flex flex-wrap gap-x-1.5 gap-y-0.5", className)}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={childVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

/**
 * Reveal Component — General entrance reveal wrapper.
 */
export type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
};

export function Reveal({ children, delay = 0, direction = "up", className }: RevealProps) {
  const directionOffsets = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: EASE_DEFAULT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeIn Component — Simple fade in wrapper.
 */
export type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Component — Staggered container for child items.
 */
export type StaggerProps = {
  children: React.ReactNode;
  staggerChildren?: number;
  className?: string;
};

export function Stagger({ children, staggerChildren = 0.1, className }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer(staggerChildren)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * ParallaxWrapper Component — Scroll displacement parallax effect wrapper.
 */
export type ParallaxWrapperProps = {
  children: React.ReactNode;
  offset?: number;
  className?: string;
};

export function ParallaxWrapper({ children, offset = 50, className }: ParallaxWrapperProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * HoverScale Component — Interactive smooth scale up on hover.
 */
export type HoverScaleProps = {
  children: React.ReactNode;
  scale?: number;
  className?: string;
};

export function HoverScale({ children, scale = 1.03, className }: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: EASE_DEFAULT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * MagneticWrapper Component — Magnetic mouse follow wrapper.
 */
export type MagneticWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function MagneticWrapper({ children, className }: MagneticWrapperProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

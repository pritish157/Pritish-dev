import type { Variants } from "framer-motion";

/**
 * Standard Physics & Easing Curves
 */
export const EASE_DEFAULT = [0.16, 1, 0.3, 1] as const;
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SPRING = { type: "spring", stiffness: 380, damping: 30 } as const;
export const EASE_SOFT_SPRING = { type: "spring", stiffness: 200, damping: 20 } as const;

/**
 * Fade In Variant
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_DEFAULT }
  }
};

/**
 * Fade Up Variant (Standard Section Entrance)
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_DEFAULT }
  }
};

/**
 * Fade Down Variant
 */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_DEFAULT }
  }
};

/**
 * Scale In Variant
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_DEFAULT }
  }
};

/**
 * Slide In Variants
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_DEFAULT }
  }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_DEFAULT }
  }
};

/**
 * Stagger Parent & Child Container Variants
 */
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_DEFAULT }
  }
};

/**
 * Interactive Micro-animations
 */
export const hoverLift: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.01,
    transition: { duration: 0.25, ease: EASE_DEFAULT }
  }
};

export const hoverGlow: Variants = {
  rest: { opacity: 0.4 },
  hover: {
    opacity: 1,
    transition: { duration: 0.3, ease: EASE_DEFAULT }
  }
};

export const buttonPress = {
  rest: { scale: 1 },
  tap: { scale: 0.97 }
};

export const cardHover: Variants = {
  rest: { y: 0, borderColor: "rgba(255, 255, 255, 0.10)" },
  hover: {
    y: -6,
    borderColor: "rgba(255, 255, 255, 0.20)",
    transition: { duration: 0.3, ease: EASE_DEFAULT }
  }
};

/**
 * Section Viewport Reveal Preset
 */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_DEFAULT,
      staggerChildren: 0.12
    }
  }
};

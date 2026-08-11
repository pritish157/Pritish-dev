"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { RiArrowRightUpLine, RiDownloadLine } from "react-icons/ri";

import { AvailabilityBadge } from "@/components/layout/availability-badge";
import { navigation, siteConfig, socialLinks } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";

export type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  activeId: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
};

export function MobileDrawer({ isOpen, onClose, activeId, triggerRef }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        triggerRef?.current?.focus();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable && lastFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable && firstFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Initial focus into close button or first link
    const timer = setTimeout(() => {
      const firstInput = drawerRef.current?.querySelector<HTMLElement>("button, a");
      firstInput?.focus();
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose, triggerRef]);

  // Handle focus restoration when drawer closes
  const handleClose = () => {
    onClose();
    triggerRef?.current?.focus();
  };

  const handleLinkClick = (href: string) => {
    handleClose();
    const cleanId = href.replace(/^#/, "");
    const target = document.getElementById(cleanId);
    if (target) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer Dialog Container */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[85] flex w-full max-w-sm flex-col justify-between border-l border-white/10 bg-[#070a17] p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-500/80 to-fuchsia-500/70 font-display text-sm font-bold text-white shadow-[0_10px_20px_rgba(139,92,246,0.3)]">
                  PK
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-sm font-semibold tracking-tight text-white">{siteConfig.shortName}</span>
                  <span className="text-xs text-slate-400">{siteConfig.role}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Body */}
            <div className="my-auto space-y-6 py-6">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Navigation</span>
                <AvailabilityBadge showText={true} />
              </div>

              <nav className="flex flex-col gap-2" aria-label="Mobile Menu Navigation">
                {navigation.map((item) => {
                  const isActive = activeId === item.href.replace(/^#/, "");

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.href);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group flex items-center justify-between rounded-2xl border px-4 py-3 text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
                        isActive
                          ? "border-violet-500/40 bg-violet-500/15 text-white shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                          : "border-white/5 bg-white/[0.03] text-slate-300 hover:border-white/15 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span>{item.label}</span>
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full transition-all duration-300",
                          isActive ? "bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" : "opacity-0 group-hover:opacity-50 group-hover:bg-slate-400"
                        )}
                      />
                    </a>
                  );
                })}
              </nav>

              {/* Resume CTA Action */}
              <div className="pt-2">
                <a
                  href={siteConfig.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-violet-400/30 bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(139,92,246,0.25)] transition-all hover:border-violet-400/60 hover:from-violet-600/40 hover:to-fuchsia-600/40 hover:shadow-[0_15px_30px_rgba(139,92,246,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  <RiDownloadLine className="h-4 w-4 text-violet-300" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            {/* Footer / Socials */}
            <div className="border-t border-white/10 pt-5">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-slate-400">Connect</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 flex-1 items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  >
                    <span className="truncate">{social.label}</span>
                    <RiArrowRightUpLine className="h-3.5 w-3.5 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

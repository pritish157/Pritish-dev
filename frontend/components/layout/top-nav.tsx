"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RiDownloadLine } from "react-icons/ri";

import { AvailabilityBadge } from "@/components/layout/availability-badge";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { navigation, siteConfig } from "@/lib/data/portfolio";
import { useScrollPosition } from "@/lib/hooks/use-scroll-position";
import { useScrollSpy } from "@/lib/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";

export function TopNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { scrolled } = useScrollPosition(20);

  const sectionIds = useMemo(() => navigation.map((item) => item.href), []);
  const [activeId] = useScrollSpy(sectionIds, { defaultActiveId: "profile" });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const cleanId = href.replace(/^#/, "");
    const target = document.getElementById(cleanId);
    if (target) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-6">
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-6",
            scrolled
              ? "border-white/15 bg-[#050816]/85 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
              : "border-white/10 bg-black/35 shadow-soft backdrop-blur-xl"
          )}
        >
          {/* Brand Logo & Name */}
          <Link
            href="#profile"
            onClick={(e) => handleNavClick(e, "#profile")}
            className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            aria-label={`${siteConfig.name} — ${siteConfig.role}`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500/80 to-fuchsia-500/70 font-display text-sm font-bold text-white shadow-[0_10px_25px_rgba(139,92,246,0.3)] transition-transform duration-300 group-hover:scale-105">
              PK
            </span>
            <span className="hidden min-w-0 flex-col sm:flex">
              <span className="font-display text-sm font-semibold tracking-tight text-white group-hover:text-violet-200 transition-colors">
                {siteConfig.name}
              </span>
              <span className="text-xs text-slate-400 truncate max-w-[200px]">{siteConfig.role}</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
            {navigation.map((item) => {
              const cleanHref = item.href.replace(/^#/, "");
              const isActive = activeId === cleanHref;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
                    isActive ? "text-white" : "text-slate-300 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full border border-violet-500/35 bg-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Actions: Availability & Resume CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <AvailabilityBadge showText={true} />

            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/15 px-4 py-2 text-xs font-semibold text-violet-100 shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300 hover:border-violet-400/60 hover:bg-violet-500/25 hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <RiDownloadLine className="h-3.5 w-3.5 text-violet-300" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            ref={triggerRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 lg:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-label="Open navigation menu"
          >
            <IoMenu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeId={activeId}
        triggerRef={triggerRef}
      />
    </>
  );
}

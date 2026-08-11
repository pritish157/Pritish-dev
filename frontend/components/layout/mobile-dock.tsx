"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  RiBriefcase4Line,
  RiCpuLine,
  RiMailLine,
  RiSparklingLine,
  RiUser3Line
} from "react-icons/ri";

import { navigation } from "@/lib/data/portfolio";
import { useScrollSpy } from "@/lib/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "#profile": RiUser3Line,
  "#projects": RiBriefcase4Line,
  "#experience": RiSparklingLine,
  "#skills": RiCpuLine,
  "#contact": RiMailLine
};

export function MobileDock() {
  const sectionIds = useMemo(() => navigation.map((item) => item.href), []);
  const [activeId, setActiveId] = useScrollSpy(sectionIds, { defaultActiveId: "profile" });

  const handleJump = (href: string) => {
    const cleanId = href.replace(/^#/, "");
    const target = document.getElementById(cleanId);

    if (target) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      setActiveId(cleanId);
    }
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed inset-x-3 bottom-3 z-40 md:hidden"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="mx-auto flex max-w-lg items-center justify-around rounded-[1.75rem] border border-white/15 bg-[#050816]/90 px-1.5 py-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
        {navigation.map((item) => {
          const cleanHref = item.href.replace(/^#/, "");
          const active = activeId === cleanHref;
          const Icon = iconMap[item.href] ?? RiUser3Line;

          return (
            <button
              key={item.href}
              type="button"
              onClick={() => handleJump(item.href)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center rounded-[1.2rem] px-1 py-1 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
                active ? "text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              {active && (
                <motion.span
                  layoutId="mobile-dock-active-pill"
                  className="absolute inset-0 rounded-[1.2rem] border border-violet-500/35 bg-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex flex-col items-center gap-1">
                <Icon className={cn("h-4 w-4 transition-transform duration-200", active && "-translate-y-0.5 text-violet-200")} />
                <span className="truncate">{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

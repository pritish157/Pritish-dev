"use client";

import { useEffect, useState } from "react";
import {
  RiBriefcase4Line,
  RiMailLine,
  RiSparklingLine,
  RiUser3Line
} from "react-icons/ri";

import { cn } from "@/lib/utils";

const dockItems = [
  { href: "#profile", label: "Profile", icon: RiUser3Line },
  { href: "#projects", label: "Projects", icon: RiBriefcase4Line },
  { href: "#experience", label: "Experience", icon: RiSparklingLine },
  { href: "#contact", label: "Contact", icon: RiMailLine }
] as const;

export function MobileDock() {
  const [activeHref, setActiveHref] = useState<(typeof dockItems)[number]["href"]>("#profile");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!activeEntry) {
          return;
        }

        const group = activeEntry.target.getAttribute("data-nav-group") ?? activeEntry.target.id;

        if (group) {
          setActiveHref(`#${group}` as (typeof dockItems)[number]["href"]);
        }
      },
      {
        rootMargin: "-34% 0px -48% 0px",
        threshold: [0.15, 0.35, 0.55, 0.75]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleJump = (href: (typeof dockItems)[number]["href"]) => {
    const target = document.querySelector<HTMLElement>(href);

    if (!target) {
      return;
    }

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    target.scrollIntoView({ behavior, block: "start" });
    setActiveHref(href);
  };

  return (
    <nav
      aria-label="Mobile section navigation"
      className="fixed inset-x-3 bottom-3 z-[65] md:hidden"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="mx-auto flex max-w-xl items-center justify-between rounded-[1.75rem] border border-white/10 bg-black/70 px-2 py-2 shadow-[0_24px_70px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const active = activeHref === item.href;

          return (
            <button
              key={item.href}
              type="button"
              onClick={() => handleJump(item.href)}
              className={cn(
                "flex min-w-0 flex-1 items-center justify-center rounded-[1.2rem] px-2 py-3 text-xs font-medium transition-all duration-300",
                active ? "bg-violet-500/18 text-white shadow-[0_10px_30px_rgba(139,92,246,0.22)]" : "text-slate-400"
              )}
              aria-current={active ? "page" : undefined}
            >
              <span className="flex flex-col items-center gap-1.5">
                <Icon className={cn("h-4 w-4 transition-transform", active && "-translate-y-0.5 text-violet-200")} />
                <span className="truncate">{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

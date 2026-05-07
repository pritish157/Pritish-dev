"use client";

import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { RiArrowRightUpLine } from "react-icons/ri";

import { MagneticLink } from "@/components/ui/magnetic-link";
import { cn } from "@/lib/utils";
import { navigation, siteConfig } from "@/lib/data/portfolio";

export function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] px-3 py-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/35 px-4 py-3 shadow-soft backdrop-blur-xl sm:px-6">
        <Link href="#profile" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/80 to-fuchsia-500/70 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(139,92,246,0.28)]">
            PK
          </span>
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="font-display text-sm font-semibold tracking-[-0.03em] text-white">{siteConfig.name}</span>
            <span className="text-xs text-slate-400">{siteConfig.role}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(74,222,128,0.9)]" />
            Available
          </span>
          <MagneticLink href="#contact" variant="secondary">
            Let&apos;s talk
            <RiArrowRightUpLine className="h-4 w-4" />
          </MagneticLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:text-white lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <IoClose className="h-5 w-5" /> : <IoMenu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "mx-auto mt-3 max-w-7xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070913]/90 px-4 transition-all duration-300 backdrop-blur-xl lg:hidden",
          open ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        )}
      >
        <div className="grid gap-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-transparent bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition hover:border-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.resumePath}
            target="_blank"
            className="rounded-2xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-sm text-violet-100"
          >
            Resume
          </Link>
        </div>
      </div>
    </header>
  );
}

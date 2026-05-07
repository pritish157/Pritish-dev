import Link from "next/link";
import { RiArrowUpLine, RiGithubFill, RiLinkedinFill, RiMailLine } from "react-icons/ri";

import { siteConfig } from "@/lib/data/portfolio";

const footerLinks = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: RiGithubFill
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: RiLinkedinFill
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: RiMailLine
  }
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 px-4 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] pt-10 sm:px-6 md:pb-8">
      <div className="absolute inset-x-0 top-0 h-px bg-glow-line opacity-80" />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/80 to-fuchsia-500/70 text-sm font-semibold text-white">
              PK
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-white">{siteConfig.name}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Premium frontend systems</p>
            </div>
          </div>
          <p className="text-sm text-slate-400">© 2026 Pritish Kumar Panda. Crafted for the AI-era product web.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {footerLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
                aria-label={item.label}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}

          <Link
            href="#profile"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            Back to top
            <RiArrowUpLine className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

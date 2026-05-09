"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { RiArrowDownLine, RiArrowRightUpLine, RiGithubFill, RiSparklingLine } from "react-icons/ri";

import { MagneticLink } from "@/components/ui/magnetic-link";
import { heroSignals, quickAccessLinks, siteConfig } from "@/lib/data/portfolio";
import { useAmbientMotion } from "@/lib/hooks/use-ambient-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const ambientMotion = useAmbientMotion();
  const { scrollYProgress } = useScroll();
  const panelY = useTransform(scrollYProgress, [0, 0.2], [0, reduceMotion || !ambientMotion ? 0 : 36]);

  return (
    <section
      id="profile"
      data-nav-section
      className="content-auto relative isolate min-h-screen overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:pt-36"
    >
      <div className="absolute inset-0 -z-20 bg-mesh-main opacity-90" />
      <div className="absolute inset-0 -z-10 bg-hero-grid bg-[size:72px_72px] opacity-[0.06]" />
      <div className="absolute left-[6%] top-24 -z-10 h-72 w-72 rounded-full bg-violet-500/25 blur-[120px]" />
      <div className="absolute right-[10%] top-[18%] -z-10 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[140px]" />
      <div className="absolute bottom-[8%] left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[110px]" />

      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-center">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-300/80" />
              <span className="relative rounded-full bg-emerald-300 p-[5px] shadow-[0_0_16px_rgba(74,222,128,0.8)]" />
            </span>
            {siteConfig.availability}
          </motion.div>

          <motion.div variants={item} className="mt-8 space-y-6">
            <p className="text-sm uppercase tracking-[0.32em] text-violet-200/80">Backend engineering - AI-era product systems</p>
            <h1 className="font-display text-[clamp(3.25rem,7vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
              Building AI-era
              <span className="block bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                backends with
              </span>
              <span className="block text-white/82">full-stack gravity.</span>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">{siteConfig.subheadline}</p>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <MagneticLink href="#projects" size="lg">
              Explore flagship work
              <RiArrowRightUpLine className="h-4 w-4" />
            </MagneticLink>
            <MagneticLink href={siteConfig.github} variant="secondary" size="lg" external>
              GitHub profile
              <RiGithubFill className="h-4 w-4" />
            </MagneticLink>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            {heroSignals.map((signal) => (
              <span
                key={signal}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300"
              >
                <RiSparklingLine className="h-4 w-4 text-violet-300" />
                {signal}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-10 rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-4 shadow-soft backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Quick launchpad</p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
                  Portfolio, profiles, and live project proof surfaced in one place for a faster mobile scan.
                </p>
              </div>
              <span className="inline-flex w-fit rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.16em] text-slate-300">
                5 direct links
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {quickAccessLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-3 rounded-[1.35rem] border border-white/10 bg-black/20 px-4 py-4 transition hover:border-white/20 hover:bg-black/25"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{link.label}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-violet-200/75">{link.shortLabel}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{link.description}</p>
                  </div>
                  <RiArrowRightUpLine className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-white" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: panelY }} className="relative">
          <div className="absolute inset-x-[10%] bottom-0 h-28 rounded-full bg-violet-500/30 blur-[90px]" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-luxe backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.16),transparent_22%,transparent_72%,rgba(168,85,247,0.16))]" />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/20 px-4 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Live positioning</p>
                  <p className="mt-2 font-display text-xl tracking-[-0.05em] text-white">
                    Premium interfaces.
                    <span className="block text-violet-200">Production logic.</span>
                  </p>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-emerald-200">
                  Shipping now
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                <motion.div
                  animate={ambientMotion && !reduceMotion ? { y: [0, -10, 0] } : undefined}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-[1.6rem] border border-violet-400/20 bg-gradient-to-br from-violet-500/16 via-transparent to-fuchsia-500/12 p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Command surface</p>
                      <p className="mt-3 max-w-xs font-display text-2xl tracking-[-0.05em] text-white">
                        High-performance product surfaces built for trust and flow.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-slate-300">
                      60fps target
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Surface</p>
                      <p className="mt-2 text-sm text-slate-200">Next.js + motion-led storytelling</p>
                    </div>
                    <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Logic</p>
                      <p className="mt-2 text-sm text-slate-200">Auth, workflows, and API contracts</p>
                    </div>
                    <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Feel</p>
                      <p className="mt-2 text-sm text-slate-200">Cinematic, minimal, deeply engineered</p>
                    </div>
                  </div>
                </motion.div>

                <div className="grid gap-4">
                  <motion.div
                    animate={ambientMotion && !reduceMotion ? { y: [0, 10, 0] } : undefined}
                    transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Priority stack</p>
                    <div className="mt-4 space-y-3">
                      {["UX systems", "Realtime clarity", "Security posture"].map((row) => (
                        <div key={row} className="flex items-center justify-between rounded-2xl bg-black/20 px-3 py-3">
                          <span className="text-sm text-slate-300">{row}</span>
                          <span className="h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,0.9)]" />
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    animate={ambientMotion && !reduceMotion ? { y: [0, -8, 0] } : undefined}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Current energy</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["AI-ready UI", "Luxury SaaS feel", "Zero fluff", "Typed architecture"].map((pill) => (
                        <span
                          key={pill}
                          className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.16em] text-slate-300"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-500">Scroll to enter</span>
        <div className="flex h-14 w-9 items-start justify-center rounded-full border border-white/10 bg-white/[0.03] p-2">
          <div className="h-3 w-3 animate-scroll-hint rounded-full bg-violet-300" />
        </div>
        <RiArrowDownLine className="h-4 w-4 text-slate-500" />
      </div>
    </section>
  );
}

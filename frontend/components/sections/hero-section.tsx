"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import {
  RiArrowDownLine,
  RiArrowRightUpLine,
  RiDownloadLine,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiMailLine,
  RiSparklingLine
} from "react-icons/ri";

import { AvailabilityBadge } from "@/components/layout/availability-badge";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { MetricCard } from "@/components/ui/metric-card";
import { credibilityMetrics, heroSignals, quickAccessLinks, siteConfig } from "@/lib/data/portfolio";
import { useAmbientMotion } from "@/lib/hooks/use-ambient-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

function SystemTerminal() {
  const [displayText, setDisplayText] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDisplayText("> SYSTEM.READY // OPEN FOR IMPACT.");
      return;
    }

    const lines = [
      "> INITIALIZING NODE.JS / EXPRESS REST SERVER...",
      "> ENFORCING JWT + TOTP 2FA AUTHENTICATION...",
      "> OPTIMIZING MONGODB AGGREGATION & INDEXES...",
      "> CONNECTING SOCKET.IO & RAZORPAY WEBHOOKS...",
      "> SYSTEM.READY // SEEKING BACKEND / FULL-STACK ROLES."
    ];
    let currentLine = 0;
    let currentChar = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const type = () => {
      const fullString = lines[currentLine];

      if (!isDeleting) {
        setDisplayText(fullString.substring(0, currentChar + 1));
        currentChar++;

        if (currentChar === fullString.length) {
          if (currentLine === lines.length - 1) {
            return;
          }
          isDeleting = true;
          timer = setTimeout(type, 1600);
        } else {
          timer = setTimeout(type, 35);
        }
      } else {
        setDisplayText(fullString.substring(0, currentChar - 1));
        currentChar--;

        if (currentChar === 0) {
          isDeleting = false;
          currentLine = (currentLine + 1) % lines.length;
          timer = setTimeout(type, 300);
        } else {
          timer = setTimeout(type, 15);
        }
      }
    };

    timer = setTimeout(type, 800);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <div
      aria-label="System status telemetry terminal"
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#060814]/90 font-mono shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
    >
      {/* Terminal Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs uppercase tracking-widest text-slate-400">sys-status // root</span>
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">
          Operational
        </span>
      </div>

      {/* Terminal Content */}
      <div className="space-y-5 p-5 sm:p-7">
        <div className="flex min-h-[2.5rem] items-center gap-2 text-xs text-emerald-400 sm:text-sm md:text-base">
          <span className="leading-relaxed">{displayText}</span>
          {!reduceMotion && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="inline-block h-4 w-2 shrink-0 bg-emerald-400 sm:h-5"
            />
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.02] p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">Core Engine</p>
            <p className="mt-1.5 text-sm font-semibold text-slate-200">Node.js / Express / MERN</p>
          </div>
          <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.02] p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">Focus Area</p>
            <p className="mt-1.5 text-sm font-semibold text-slate-200">REST APIs & Security</p>
          </div>
        </div>

        <div className="rounded-[1.2rem] border border-violet-500/25 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 p-4 sm:p-5">
          <div className="flex items-start gap-3.5">
            <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-200">Available for Opportunities</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                Ready to engineer production REST APIs, secure auth systems, and scalable backend platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const ambientMotion = useAmbientMotion();
  const { scrollYProgress } = useScroll();
  const panelY = useTransform(scrollYProgress, [0, 0.2], [0, reduceMotion || !ambientMotion ? 0 : 36]);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <section
      id="profile"
      data-nav-section
      aria-label="Hero Introduction"
      className="content-auto relative isolate min-h-screen overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:pt-36"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-mesh-main opacity-90" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-grid bg-[size:72px_72px] opacity-[0.06]" />
      <div className="pointer-events-none absolute left-[5%] top-20 -z-10 h-80 w-80 rounded-full bg-violet-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute right-[8%] top-[15%] -z-10 h-96 w-96 rounded-full bg-fuchsia-500/18 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[10%] left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(400px,0.9fr)] lg:items-center lg:gap-16">
        {/* Left Main Content */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          {/* Eyebrows & Availability */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <AvailabilityBadge showText={true} />
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200 backdrop-blur-md">
              {siteConfig.role}
            </span>
          </motion.div>

          {/* Primary Headline & Description */}
          <motion.div variants={item} className="mt-7 space-y-5">
            <h1 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white">
              Engineering secure
              <span className="block bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                production APIs &
              </span>
              <span className="block text-slate-300">scalable backends.</span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl font-normal">
              {siteConfig.subheadline}
            </p>
          </motion.div>

          {/* Primary Call to Actions */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticLink href="#projects" size="lg" onClick={handleScrollToProjects}>
              Explore flagship work
              <RiArrowRightUpLine className="h-4 w-4" />
            </MagneticLink>

            <MagneticLink href={siteConfig.resumePath} variant="secondary" size="lg" external>
              Download Resume
              <RiDownloadLine className="h-4 w-4 text-violet-300" />
            </MagneticLink>
          </motion.div>

          {/* Secondary Quick Access Links */}
          <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-medium uppercase tracking-wider text-slate-400">Direct Profiles:</span>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <RiGithubFill className="h-4 w-4 text-slate-300" />
              <span>GitHub</span>
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <RiLinkedinBoxFill className="h-4 w-4 text-violet-300" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email Contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <RiMailLine className="h-4 w-4 text-emerald-300" />
              <span>Email</span>
            </a>
          </motion.div>

          {/* Hero Signals */}
          <motion.div variants={item} className="mt-7 flex flex-wrap gap-2.5">
            {heroSignals.map((signal) => (
              <span
                key={signal}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-300 backdrop-blur-md"
              >
                <RiSparklingLine className="h-3.5 w-3.5 text-violet-300" />
                {signal}
              </span>
            ))}
          </motion.div>

          {/* Credibility Metrics Grid */}
          <motion.div variants={item} className="mt-9">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Verified System Metrics</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {credibilityMetrics.map((metric, idx) => (
                <MetricCard
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                  glow={idx === 0}
                  className="p-4"
                />
              ))}
            </div>
          </motion.div>

          {/* Quick Launchpad Cards */}
          <motion.div
            variants={item}
            className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-4 shadow-soft backdrop-blur-xl sm:p-5"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-violet-200">Flagship System Proof</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                  Direct access to live production systems and code repositories.
                </p>
              </div>
              <span className="inline-flex w-fit rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs uppercase tracking-wider text-slate-300">
                Live Proof
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {quickAccessLinks.slice(0, 4).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-3 rounded-[1.2rem] border border-white/10 bg-black/30 p-3.5 transition-all duration-300 hover:border-violet-500/30 hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-violet-200 transition-colors">{link.label}</p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-violet-300/80">{link.shortLabel}</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">{link.description}</p>
                  </div>
                  <RiArrowRightUpLine className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Telemetry Terminal */}
        <motion.div style={{ y: panelY }} className="relative">
          <div className="pointer-events-none absolute inset-x-[10%] bottom-0 h-32 rounded-full bg-violet-500/25 blur-[100px]" />
          <SystemTerminal />
        </motion.div>
      </div>

      {/* Animated Scroll Hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Scroll to explore</span>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 bg-white/[0.03] p-1.5">
          <div className="h-2 w-2 animate-bounce rounded-full bg-violet-300 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
        </div>
        <RiArrowDownLine className="h-3.5 w-3.5 text-slate-400" />
      </div>
    </section>
  );
}

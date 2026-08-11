"use client";

import {
  RiCodeSSlashLine,
  RiCpuLine,
  RiDatabase2Line,
  RiDatabaseLine,
  RiDownloadLine,
  RiGitBranchLine,
  RiGithubFill,
  RiNextjsLine,
  RiNodejsLine,
  RiReactjsLine,
  RiServerLine,
  RiShieldKeyholeLine,
  RiSparklingLine,
  RiStackLine,
  RiTailwindCssLine,
  RiTerminalBoxLine,
  RiCommandLine
} from "react-icons/ri";

import { SectionReveal } from "@/components/effects/section-reveal";
import { AvailabilityBadge } from "@/components/layout/availability-badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { Marquee, type MarqueeItem } from "@/components/ui/marquee";
import { MetricCard } from "@/components/ui/metric-card";
import { credibilityMetrics, siteConfig } from "@/lib/data/portfolio";

const techStackItems: MarqueeItem[] = [
  { label: "React 19", icon: RiReactjsLine },
  { label: "Next.js 15", icon: RiNextjsLine },
  { label: "TypeScript", icon: RiCodeSSlashLine },
  { label: "Node.js", icon: RiNodejsLine },
  { label: "Express.js", icon: RiServerLine },
  { label: "MongoDB", icon: RiDatabase2Line },
  { label: "PostgreSQL", icon: RiDatabaseLine },
  { label: "Python", icon: RiCommandLine },
  { label: "Docker", icon: RiStackLine },
  { label: "Git", icon: RiGitBranchLine },
  { label: "GitHub", icon: RiGithubFill },
  { label: "REST APIs", icon: RiTerminalBoxLine },
  { label: "JWT Auth", icon: RiShieldKeyholeLine },
  { label: "Socket.IO", icon: RiSparklingLine },
  { label: "Tailwind CSS", icon: RiTailwindCssLine },
  { label: "Framer Motion", icon: RiCpuLine }
];

export function TrustBar() {
  return (
    <section
      data-nav-section
      data-nav-group="profile"
      aria-label="Engineering Credibility and Tech Stack"
      className="content-auto px-4 py-8 sm:px-6 lg:py-12"
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Part 1: Technology Marquee */}
        <SectionReveal className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-4 py-5 shadow-soft backdrop-blur-xl sm:px-6">
          <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Production Tech Stack & Systems</p>
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-violet-200/80">
              Hover to pause • Smooth 60 FPS
            </p>
          </div>

          <Marquee items={techStackItems} pauseOnHover={true} />
        </SectionReveal>

        {/* Part 2 & Part 3: Metrics Grid & Availability Positioning Card */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Part 2: Recruiter Metrics Grid (7 columns) */}
          <SectionReveal className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Verified System Telemetry</span>
              <span className="text-xs uppercase tracking-wider text-slate-400">SSOT Data</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1">
              {credibilityMetrics.map((metric, idx) => (
                <MetricCard
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                  glow={idx === 0}
                  className="h-full justify-center p-5"
                />
              ))}
            </div>
          </SectionReveal>

          {/* Part 3: Availability & Positioning Card (5 columns) */}
          <SectionReveal delay={0.1} className="lg:col-span-5">
            <GlassPanel variant="card" className="h-full flex flex-col justify-between p-6 sm:p-7 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <AvailabilityBadge showText={true} />
                  <span className="text-xs uppercase tracking-wider text-slate-400">Positioning</span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-white tracking-tight">
                    Full-Stack Ownership & AI-Era Focus
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    Crafting cinematic product frontends backed by secure, performance-first Node.js and Python backend architectures.
                  </p>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Availability:</span>
                    <span className="font-medium text-emerald-300">Open to 2026 Opportunities</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-medium text-slate-200">{siteConfig.location} (Remote / Relocation)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Target Roles:</span>
                    <span className="font-medium text-violet-200">Frontend / Full-Stack / AI Systems</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2">
                <MagneticLink href={siteConfig.resumePath} variant="secondary" size="sm" external className="w-full justify-center">
                  <RiDownloadLine className="h-3.5 w-3.5 text-violet-300" />
                  <span>Download Resume</span>
                </MagneticLink>
              </div>
            </GlassPanel>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

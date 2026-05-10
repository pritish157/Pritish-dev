"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowRightUpLine,
  RiCalendarScheduleLine,
  RiFlowChart,
  RiGithubFill,
  RiRadarLine,
  RiShieldCheckLine,
  RiSparklingLine,
  RiTerminalBoxLine,
  RiKeynoteLine
} from "react-icons/ri";

import { SectionReveal } from "@/components/effects/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { featuredProjects, type Project } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";

function PreviewSurface({ project }: { project: Project }) {
  const accentStyle = { boxShadow: `0 0 0 1px ${project.accent}22, inset 0 0 0 1px rgba(255,255,255,0.04)` };

  if (project.preview === "chat") {
    return (
      <div className="relative h-64 overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-violet-500/18 via-transparent to-cyan-500/10 p-4 sm:p-5">
        <div className="absolute right-4 sm:right-5 top-4 sm:top-5 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-violet-100 backdrop-blur-md">
          Live chat + trust
        </div>
        <div className="mt-11 space-y-3">
          <div className="ml-auto max-w-[85%] sm:max-w-[75%] rounded-[1.2rem] bg-violet-500/18 px-4 sm:px-5 py-3 text-xs sm:text-sm leading-relaxed text-violet-50" style={accentStyle}>
            Identity verified. Safe to start conversation.
          </div>
          <div className="max-w-[90%] sm:max-w-[78%] rounded-[1.2rem] bg-white/[0.06] px-4 sm:px-5 py-3 text-xs sm:text-sm leading-relaxed text-slate-200 backdrop-blur-md">
            Realtime replies, moderation rails, and profile trust in one flow.
          </div>
          <div className="ml-auto flex max-w-[85%] sm:max-w-[68%] items-center justify-between rounded-[1.2rem] bg-white/[0.05] px-4 sm:px-5 py-3 backdrop-blur-md">
            <span className="text-xs sm:text-sm text-slate-200">Receipt synced</span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] shrink-0" />
          </div>
        </div>
      </div>
    );
  }

  if (project.preview === "events") {
    return (
      <div className="relative h-64 overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/16 via-transparent to-violet-500/12 p-5">
        <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-fuchsia-100 backdrop-blur-md">
          Event Dashboard
        </div>
        
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="col-span-2 rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div className="h-2 w-16 rounded-full bg-fuchsia-400/50" />
              <Badge className="bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-500/30">Live</Badge>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-white/10" />
              <div className="h-2 w-4/5 rounded-full bg-white/10" />
            </div>
          </div>
          
          <div className="flex flex-col justify-between rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
            <RiCalendarScheduleLine className="h-6 w-6 text-fuchsia-300" />
            <div className="mt-4">
              <div className="text-xl font-medium text-white">124</div>
              <div className="text-[0.65rem] uppercase tracking-wider text-slate-400">Registered</div>
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between rounded-[1.2rem] border border-fuchsia-500/20 bg-fuchsia-500/10 px-5 py-3.5 backdrop-blur-md">
           <span className="text-sm text-fuchsia-100">Capacity rules enforced</span>
           <div className="h-1.5 w-16 rounded-full bg-fuchsia-400/30 overflow-hidden">
             <div className="h-full w-3/4 bg-fuchsia-400 rounded-full" />
           </div>
        </div>
      </div>
    );
  }

  if (project.preview === "ops") {
    return (
      <div className="relative h-64 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0A0A0A] p-5 font-mono">
         <div className="absolute top-0 left-0 right-0 flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
           <div className="flex gap-1.5">
             <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
             <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
             <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
           </div>
           <span className="ml-2 text-xs text-slate-500">api/v1/optimize-route</span>
         </div>
         
         <div className="mt-10 space-y-2 text-sm text-slate-300">
           <div className="flex items-center gap-3">
             <span className="text-emerald-400">200 OK</span>
             <span className="text-slate-500">→</span>
             <span className="text-indigo-300">Calculating graph nodes...</span>
           </div>
           <div className="flex items-center gap-3">
             <span className="text-slate-500">[worker-1]</span>
             <span>Evaluating fuel cost differentials</span>
           </div>
           <div className="flex items-center gap-3">
             <span className="text-slate-500">[worker-1]</span>
             <span>Distance penalty applied</span>
           </div>
           <div className="mt-4 rounded border border-indigo-500/30 bg-indigo-500/10 p-3 text-indigo-200">
             {"{"} <br/>
             &nbsp;&nbsp;"optimal_stops": 3, <br/>
             &nbsp;&nbsp;"total_savings": "$124.50", <br/>
             &nbsp;&nbsp;"route_deviation": "+4.2mi" <br/>
             {"}"}
           </div>
         </div>
      </div>
    );
  }

  if (project.preview === "security") {
    return (
      <div className="relative h-64 overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-violet-500/18 via-transparent to-rose-500/12 p-5">
        <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-amber-100 backdrop-blur-md">
          LSB Extraction
        </div>
        
        <div className="mt-8 grid gap-3">
          <div className="flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-md">
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Target Image</span>
            <span className="font-mono text-xs text-slate-300">payload_carrier.png</span>
          </div>
          
          <div className="grid grid-cols-8 gap-1 opacity-70">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="h-6 rounded bg-white/5 flex items-center justify-center font-mono text-[0.6rem] text-slate-400">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
          
          <div className="rounded-[1.2rem] border border-rose-400/20 bg-rose-500/10 p-4 backdrop-blur-md">
             <div className="flex items-center gap-2">
               <RiKeynoteLine className="text-rose-300" />
               <p className="text-sm font-medium text-rose-100">Hidden payload isolated</p>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function FeaturedProjects() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalPages = featuredProjects.length;

  const navigateTo = (newIndex: number) => {
    if (newIndex === page) return;
    setDirection(newIndex > page ? 1 : -1);
    setPage(newIndex);
  };

  const nextProject = () => {
    if (page < totalPages - 1) navigateTo(page + 1);
  };

  const prevProject = () => {
    if (page > 0) navigateTo(page - 1);
  };

  const activeProject = useMemo(
    () => featuredProjects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId]
  );

  const currentProject = featuredProjects[page];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <section id="projects" data-nav-section className="content-auto px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeading
            eyebrow="Featured projects"
            title="Systems presented cleanly, without scroll fatigue."
            description="A focused presentation of the core systems I've built, emphasizing the backend capabilities, product design, and logic architectures behind them."
          />
        </SectionReveal>

        <SectionReveal delay={0.04} className="mt-10 rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-4 shadow-soft backdrop-blur-xl sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-3 w-full xl:w-auto">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Select Project</p>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {featuredProjects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => navigateTo(index)}
                    className={cn(
                      "whitespace-nowrap rounded-full border px-5 py-2.5 text-sm transition font-medium",
                      page === index
                        ? "border-violet-400/40 bg-violet-500/15 text-violet-100"
                        : "border-white/10 bg-black/20 text-slate-400 hover:border-white/20 hover:text-white"
                    )}
                  >
                    {project.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="secondary" onClick={prevProject} disabled={page === 0}>
                <RiArrowLeftSLine className="h-5 w-5" />
                Prev
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={nextProject}
                disabled={page === totalPages - 1}
              >
                Next
                <RiArrowRightSLine className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </SectionReveal>

        <div className="mt-8 relative rounded-[1.8rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
            >
              <SectionReveal delay={0}>
                <SpotlightCard accent={`${currentProject.accent}55`} className="p-6 sm:p-10">
                  <div className="grid gap-10 lg:grid-cols-2">
                    <div className="flex flex-col justify-center">
                      <PreviewSurface project={currentProject} />
                    </div>

                    <div className="flex flex-col gap-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">{currentProject.eyebrow}</p>
                          <h3 className="mt-3 font-display text-3xl tracking-[-0.05em] text-white">{currentProject.title}</h3>
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/[0.05] p-3.5">
                          {currentProject.preview === "chat" ? (
                            <RiSparklingLine className="h-6 w-6 text-violet-200" />
                          ) : currentProject.preview === "events" ? (
                            <RiCalendarScheduleLine className="h-6 w-6 text-fuchsia-200" />
                          ) : currentProject.preview === "security" ? (
                            <RiRadarLine className="h-6 w-6 text-violet-200" />
                          ) : (
                            <RiTerminalBoxLine className="h-6 w-6 text-violet-200" />
                          )}
                        </div>
                      </div>

                      <p className="text-[15px] leading-relaxed text-slate-400">{currentProject.summary}</p>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {currentProject.metrics.slice(0, 4).map((metric) => (
                          <div key={metric.label} className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-3">
                            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
                            <p className="mt-2 text-sm text-slate-200 font-medium">{metric.value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {currentProject.stack.map((item) => (
                          <Badge key={item} className="bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] transition">
                            {item}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {currentProject.links.live ? (
                          <a
                            href={currentProject.links.live}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-5 py-3.5 text-sm font-medium text-violet-100 transition hover:border-violet-300/30 hover:bg-violet-500/16"
                          >
                            Live preview
                            <RiArrowRightUpLine className="h-4 w-4" />
                          </a>
                        ) : null}
                        {currentProject.links.github ? (
                          <a
                            href={currentProject.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                          >
                            GitHub
                            <RiGithubFill className="h-4 w-4" />
                          </a>
                        ) : null}
                        <Button type="button" variant="secondary" className="px-5 py-6" onClick={() => setActiveProjectId(currentProject.id)}>
                          Read Case Study
                        </Button>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </SectionReveal>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Dialog open={Boolean(activeProject)} onOpenChange={(open) => !open && setActiveProjectId(null)}>
        {activeProject ? (
          <DialogContent className="max-w-4xl">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="border-violet-400/20 bg-violet-500/10 text-violet-200">{activeProject.eyebrow}</Badge>
                <div className="space-y-3">
                  <DialogTitle className="font-display text-4xl tracking-[-0.07em] text-white">{activeProject.title}</DialogTitle>
                  <DialogDescription className="max-w-3xl text-base leading-8 text-slate-400">
                    {activeProject.summary}
                  </DialogDescription>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                {activeProject.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
                    <p className="mt-3 text-sm text-slate-100 font-medium">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Challenge</p>
                  <p className="mt-4 text-[15px] leading-8 text-slate-300">{activeProject.challenge}</p>

                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Architecture</p>
                    <div className="mt-4 space-y-3">
                      {activeProject.architecture.map((entry) => (
                        <div key={entry} className="flex gap-3 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4">
                          <span className="mt-2 h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,0.9)] shrink-0" />
                          <p className="text-[15px] leading-relaxed text-slate-300">{entry}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Outcome</p>
                    <div className="mt-4 space-y-3">
                      {activeProject.outcome.map((entry) => (
                        <div key={entry} className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 text-[15px] leading-relaxed text-slate-300">
                          {entry}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Why it matters</p>
                    <div className="mt-4 space-y-3">
                      {activeProject.highlights.map((entry) => (
                        <div key={entry} className="flex gap-3 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4">
                          <span className="mt-1 text-violet-200 shrink-0">+</span>
                          <p className="text-[15px] leading-relaxed text-slate-300">{entry}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  );
}

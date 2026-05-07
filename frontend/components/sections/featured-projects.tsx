"use client";

import { useEffect, useMemo, useState } from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowRightUpLine,
  RiCalendarScheduleLine,
  RiFlowChart,
  RiGithubFill,
  RiRadarLine,
  RiShieldCheckLine,
  RiSparklingLine
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
      <div className="relative h-56 overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-violet-500/18 via-transparent to-cyan-500/10 p-4">
        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-violet-100">
          Live chat + trust
        </div>
        <div className="space-y-3">
          <div className="ml-auto max-w-[70%] rounded-[1.2rem] bg-violet-500/18 px-4 py-3 text-sm text-violet-50" style={accentStyle}>
            Identity verified. Safe to start conversation.
          </div>
          <div className="max-w-[72%] rounded-[1.2rem] bg-white/[0.06] px-4 py-3 text-sm text-slate-200">
            Realtime replies, moderation rails, and profile trust in one flow.
          </div>
          <div className="ml-auto flex max-w-[64%] items-center justify-between rounded-[1.2rem] bg-white/[0.05] px-4 py-3">
            <span className="text-sm text-slate-200">Receipt synced</span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
          </div>
        </div>
      </div>
    );
  }

  if (project.preview === "events") {
    return (
      <div className="relative h-56 overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/16 via-transparent to-violet-500/12 p-4">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-xs text-slate-300",
                index === 1 && "col-span-2 border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-100",
                index === 6 && "col-span-2"
              )}
            >
              {index === 1 ? "Headline event" : index === 6 ? "Organizer dashboard" : "Slot"}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Registration state</p>
            <p className="mt-1 text-sm text-slate-200">Capacity-aware with confirmation loops</p>
          </div>
          <RiCalendarScheduleLine className="h-7 w-7 text-fuchsia-200" />
        </div>
      </div>
    );
  }

  if (project.preview === "security") {
    return (
      <div className="relative h-56 overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-violet-500/18 via-transparent to-rose-500/12 p-4">
        <div className="grid gap-3">
          <div className="flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-3">
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Risk score</span>
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-amber-100">
              Elevated
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["Device", "IP drift", "Geo jump"].map((itemLabel) => (
              <div key={itemLabel} className="rounded-[1.2rem] border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{itemLabel}</p>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" style={{ width: "72%" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[1.2rem] border border-violet-400/15 bg-violet-500/10 p-4">
            <p className="text-sm text-violet-50">Step-up challenge triggered before session trust is granted.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-56 overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-violet-500/14 via-transparent to-fuchsia-500/12 p-4">
      <div className="grid gap-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 rounded-[1.2rem] border border-white/10 bg-white/[0.05] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Workflow map</p>
            <div className="mt-4 flex items-center gap-3">
              {["Draft", "Review", "Confirm"].map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs text-slate-300">{step}</span>
                  {index < 2 ? <RiFlowChart className="h-4 w-4 text-violet-200/70" /> : null}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.05] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">RBAC</p>
            <p className="mt-3 text-sm text-slate-200">Admin / Organizer / Attendee</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.05] p-4 text-sm text-slate-200">Seat limits enforced</div>
          <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.05] p-4 text-sm text-slate-200">Emails tied to workflow events</div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(2);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setProjectsPerPage(query.matches ? 1 : 2);
    };

    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(featuredProjects.length / projectsPerPage));

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(totalPages - 1, 0)));
  }, [totalPages]);

  const visibleProjects = useMemo(() => {
    const start = page * projectsPerPage;
    return featuredProjects.slice(start, start + projectsPerPage);
  }, [page, projectsPerPage]);

  const pageLabels = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, index) =>
        featuredProjects
          .slice(index * projectsPerPage, index * projectsPerPage + projectsPerPage)
          .map((project) => project.title)
          .join(" / ")
      ),
    [projectsPerPage, totalPages]
  );

  const activeProject = useMemo(
    () => featuredProjects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId]
  );

  return (
    <section id="projects" data-nav-section className="content-auto px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeading
            eyebrow="Featured projects"
            title="Flagship systems presented with pagination instead of scroll fatigue."
            description="The work is still detailed, but now it is chunked into smaller browsing passes so mobile visitors can scan like an app, not an endless landing page."
          />
        </SectionReveal>

        <SectionReveal delay={0.04} className="mt-10 rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-4 shadow-soft backdrop-blur-xl sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Project pages</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {pageLabels.map((label, index) => (
                  <button
                    key={`${label}-${index}`}
                    type="button"
                    onClick={() => setPage(index)}
                    className={cn(
                      "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition",
                      page === index
                        ? "border-violet-400/30 bg-violet-500/12 text-violet-100"
                        : "border-white/10 bg-black/20 text-slate-400 hover:border-white/20 hover:text-white"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.16em] text-slate-300">
                Page {page + 1} / {totalPages}
              </span>
              <Button type="button" variant="secondary" onClick={() => setPage((current) => Math.max(current - 1, 0))} disabled={page === 0}>
                <RiArrowLeftSLine className="h-4 w-4" />
                Prev
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setPage((current) => Math.min(current + 1, totalPages - 1))}
                disabled={page === totalPages - 1}
              >
                Next
                <RiArrowRightSLine className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SectionReveal>

        <div className={cn("mt-8 grid gap-5", visibleProjects.length > 1 && "xl:grid-cols-2")}>
          {visibleProjects.map((project, index) => (
            <SectionReveal key={project.id} delay={index * 0.05}>
              <SpotlightCard accent={`${project.accent}55`} className="h-full p-4 sm:p-5">
                <div className="flex h-full flex-col gap-5">
                  <PreviewSurface project={project} />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">{project.eyebrow}</p>
                      <h3 className="mt-2 font-display text-2xl tracking-[-0.05em] text-white">{project.title}</h3>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/[0.05] p-3">
                      {project.preview === "chat" ? (
                        <RiSparklingLine className="h-5 w-5 text-violet-200" />
                      ) : project.preview === "events" ? (
                        <RiCalendarScheduleLine className="h-5 w-5 text-fuchsia-200" />
                      ) : project.preview === "security" ? (
                        <RiRadarLine className="h-5 w-5 text-violet-200" />
                      ) : (
                        <RiShieldCheckLine className="h-5 w-5 text-violet-200" />
                      )}
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-slate-400">{project.summary}</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label} className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-3">
                        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
                        <p className="mt-2 text-sm text-slate-200">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <Badge key={item} className="bg-white/[0.03] text-slate-300">
                        {item}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3">
                    {project.links.live ? (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-sm text-violet-100 transition hover:border-violet-300/30 hover:bg-violet-500/16"
                      >
                        Live preview
                        <RiArrowRightUpLine className="h-4 w-4" />
                      </a>
                    ) : null}
                    {project.links.github ? (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
                      >
                        GitHub
                        <RiGithubFill className="h-4 w-4" />
                      </a>
                    ) : null}
                    <Button type="button" variant="secondary" onClick={() => setActiveProjectId(project.id)}>
                      Case study
                    </Button>
                  </div>
                </div>
              </SpotlightCard>
            </SectionReveal>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeProject)} onOpenChange={(open) => !open && setActiveProjectId(null)}>
        {activeProject ? (
          <DialogContent>
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
                    <p className="mt-3 text-sm text-slate-100">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Challenge</p>
                  <p className="mt-4 text-sm leading-8 text-slate-400">{activeProject.challenge}</p>

                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Architecture</p>
                    <div className="mt-4 space-y-3">
                      {activeProject.architecture.map((entry) => (
                        <div key={entry} className="flex gap-3 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4">
                          <span className="mt-2 h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,0.9)]" />
                          <p className="text-sm leading-7 text-slate-300">{entry}</p>
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
                        <div key={entry} className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 text-sm leading-7 text-slate-300">
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
                          <span className="mt-1 text-violet-200">+</span>
                          <p className="text-sm leading-7 text-slate-300">{entry}</p>
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

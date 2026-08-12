import { SectionReveal } from "@/components/effects/section-reveal";
import { Badge } from "@/components/ui/badge";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  certificationList,
  educationList,
  siteConfig,
  workExperiences
} from "@/lib/data/portfolio";
import { RiAwardLine, RiBriefcaseLine, RiBuildingLine, RiDownloadLine, RiGraduationCapLine, RiMapPinLine } from "react-icons/ri";

export function ExperienceSection() {
  return (
    <section id="experience" data-nav-section className="content-auto px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeading
            eyebrow="Professional Experience & Education"
            title="Hands-on engineering in production environments."
            description="Verified developer internships, computer science degree, and continuous technical certifications driving backend and full-stack execution."
          />
        </SectionReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Work Experience Timeline */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-white">
              <RiBriefcaseLine className="h-5 w-5 text-violet-400" />
              Work Experience
            </h3>

            <div className="relative space-y-6 pl-6 sm:pl-8 before:absolute before:bottom-4 before:left-2.5 sm:before:left-3 before:top-4 before:w-px before:bg-gradient-to-b before:from-violet-400/70 before:via-violet-400/20 before:to-transparent">
              {workExperiences.map((exp, index) => (
                <SectionReveal key={exp.company} delay={index * 0.1} className="relative">
                  <div className="absolute -left-[1.35rem] sm:-left-[1.6rem] top-6 h-3.5 w-3.5 rounded-full border border-violet-300/40 bg-violet-300 shadow-[0_0_16px_rgba(196,181,253,0.8)]" />

                  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6 shadow-soft backdrop-blur-xl">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="inline-block text-xs uppercase tracking-[0.18em] text-violet-200/80">
                          {exp.role}
                        </span>
                        <h4 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                          {exp.company}
                        </h4>
                      </div>
                      <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-200">
                        {exp.period}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                      <RiMapPinLine className="h-3.5 w-3.5 text-slate-400" />
                      <span>{exp.location}</span>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs sm:text-sm leading-relaxed text-slate-300 list-disc list-inside">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="marker:text-violet-400">
                          <span className="inline">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} className="bg-black/40 text-[11px] font-medium text-slate-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Certifications */}
          <div className="space-y-8">
            {/* Education Card */}
            <SectionReveal className="space-y-4">
              <h3 className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-white">
                <RiGraduationCapLine className="h-5 w-5 text-violet-400" />
                Education
              </h3>

              {educationList.map((edu) => (
                <div
                  key={edu.degree}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6 shadow-soft backdrop-blur-xl"
                >
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {edu.period}
                  </span>
                  <h4 className="mt-3 font-display text-xl font-bold tracking-tight text-white">
                    {edu.degree}
                  </h4>
                  <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <RiBuildingLine className="h-4 w-4 text-violet-300" />
                    <span>{edu.institution}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    <RiMapPinLine className="h-3.5 w-3.5 text-slate-400" />
                    <span>{edu.location}</span>
                  </div>
                </div>
              ))}
            </SectionReveal>

            {/* Certifications Card */}
            <SectionReveal className="space-y-4">
              <h3 className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-white">
                <RiAwardLine className="h-5 w-5 text-violet-400" />
                Certifications
              </h3>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6 shadow-soft backdrop-blur-xl space-y-4">
                {certificationList.map((cert) => (
                  <div key={cert.title} className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                      <RiAwardLine className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-display text-base font-semibold text-white">{cert.title}</h5>
                      <p className="text-xs text-slate-400">Issued by {cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>

            {/* Resume Callout Card */}
            <SectionReveal className="rounded-[1.75rem] border border-violet-500/20 bg-gradient-to-br from-violet-950/30 via-black/40 to-fuchsia-950/20 p-6 shadow-soft backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Official Resume</p>
              <h4 className="mt-2 font-display text-2xl tracking-tight text-white">
                Download Latest Resume PDF
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Get a clean, recruiter-optimized single-page PDF covering backend systems architecture, API endpoints, and technical stack details.
              </p>
              <div className="mt-5">
                <MagneticLink href={siteConfig.resumePath} variant="default" external>
                  Download Resume PDF
                  <RiDownloadLine className="h-4 w-4" />
                </MagneticLink>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}


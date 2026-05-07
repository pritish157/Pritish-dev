import { SectionReveal } from "@/components/effects/section-reveal";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { experienceTimeline } from "@/lib/data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" data-nav-section className="content-auto px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeading
            eyebrow="Experience arc"
            title="Short timeline. Strong signal."
            description="The goal here is not biography overload. It is giving hiring teams enough context to see trajectory, systems thinking, and where the portfolio is headed next."
          />
        </SectionReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionReveal className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-soft backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Current positioning</p>
            <h3 className="mt-4 font-display text-3xl tracking-[-0.06em] text-white">
              Frontend-heavy product engineer who still thinks in systems.
            </h3>
            <p className="mt-4 text-sm leading-8 text-slate-400">
              The portfolio is intentionally built to show premium frontend judgment without losing backend authority. That mix is the edge: strong surfaces, cleaner contracts, and product logic that stays trustworthy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticLink href="#contact" variant="default">
                Start a conversation
              </MagneticLink>
              <MagneticLink href="#skills" variant="secondary">
                View stack depth
              </MagneticLink>
            </div>
          </SectionReveal>

          <div className="relative space-y-5 pl-8 before:absolute before:bottom-4 before:left-3 before:top-4 before:w-px before:bg-gradient-to-b before:from-violet-400/70 before:via-violet-400/20 before:to-transparent">
            {experienceTimeline.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.08} className="relative">
                <div className="absolute left-[-2rem] top-6 h-4 w-4 rounded-full border border-violet-300/40 bg-violet-300 shadow-[0_0_22px_rgba(196,181,253,0.8)]" />
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.18em] text-violet-200/80">{item.period}</p>
                  <h3 className="mt-3 font-display text-2xl tracking-[-0.05em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-8 text-slate-400">{item.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { SectionReveal } from "@/components/effects/section-reveal";
import { Marquee } from "@/components/ui/marquee";
import { credibilityMetrics, credibilityNotes, trustPills } from "@/lib/data/portfolio";

export function TrustBar() {
  return (
    <section data-nav-section data-nav-group="profile" className="content-auto px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <SectionReveal className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-4 py-5 shadow-soft backdrop-blur-xl sm:px-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Trust / credibility / shipping signals</p>
            <p className="hidden text-xs uppercase tracking-[0.18em] text-violet-200/80 sm:block">
              engineered for fast recruiter scan speed
            </p>
          </div>
          <Marquee items={trustPills} />
        </SectionReveal>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionReveal className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {credibilityMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-5 backdrop-blur-xl"
              >
                <p className="font-display text-2xl font-semibold tracking-[-0.06em] text-white">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{metric.label}</p>
              </div>
            ))}
          </SectionReveal>

          <SectionReveal delay={0.08} className="grid gap-3 sm:grid-cols-3">
            {credibilityNotes.map((note) => (
              <div key={note.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-violet-200/80">{note.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">{note.detail}</p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

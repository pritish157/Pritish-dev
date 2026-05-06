import PageLayout from '../components/PageLayout'
import Skills from '../components/Skills'
import Seo from '../components/seo/Seo'
import Reveal from '../components/ui/Reveal'

export default function SkillsScreen() {
  return (
    <>
      <Seo pageKey="skills" />
      <PageLayout
        eyebrow="Capability map"
        title="Frontend polish, backend structure, and the stack needed to ship real products."
        description="This is a practical skill map rather than keyword stuffing. The emphasis is on technologies I can use to deliver complete product experiences with confidence."
      >
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Primary strength', 'MERN systems with responsive UI and backend architecture'],
              ['Technical edge', 'Auth, realtime flows, dashboard UX, and integrations'],
              ['Growth direction', 'TypeScript, Docker, caching, and stronger AI workflows'],
            ].map(([label, value]) => (
              <Reveal key={label} className="surface-tile">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">{label}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{value}</p>
              </Reveal>
            ))}
          </div>

          <Skills />
        </div>
      </PageLayout>
    </>
  )
}

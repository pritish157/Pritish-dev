import { motion } from 'framer-motion'

const TIMELINE = [
  { year: '2024–25', title: 'MERN Stack Mastery', desc: 'Built 3 production-grade systems: event management, matrimonial platform with real-time features, and steganography tool. Deployed to Render + Vercel.', color: '#8B5CF6' },
  { year: '2023', title: 'Core CS Foundation', desc: 'Data Structures, DBMS, OS, Computer Networks — built the theoretical foundation that drives cleaner architecture decisions.', color: '#06B6D4' },
  { year: 'Next', title: 'Application Developer Role', desc: 'Target: Backend-heavy full-stack roles where I design APIs, architect databases, and own features end-to-end in production.', color: '#3B82F6' },
]

const TRAITS = [
  { icon: '⚡', title: 'System Thinker', desc: 'I design APIs and DB schemas before writing a single line of frontend code.' },
  { icon: '🔐', title: 'Security-First', desc: 'JWT, bcrypt, rate limiting, CORS, CSP headers — security is non-negotiable in my systems.' },
  { icon: '⚙️', title: 'Backend-First', desc: 'Node.js + Express + MongoDB with clean controller/route/model separation and middleware chains.' },
  { icon: '🤖', title: 'AI Explorer', desc: 'Integrating LLM-powered features (RAG, OpenAI) into practical, real-world full-stack applications.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: [0.4, 0, 0.2, 1] } }),
}

export default function About() {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left: Story + Traits */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="flex flex-col gap-6">
        <div className="glass p-6 sm:p-8 rounded-3xl flex flex-col gap-5">
          <p className="text-slate-300 leading-relaxed text-[0.9375rem]">
            I build <span className="text-purple-200 font-semibold">full-stack applications</span> where every layer is intentional — the API design, the data model, the auth flow, and the UI state management.
          </p>
          <p className="text-text-secondary leading-relaxed text-[0.9375rem]">
            My strongest projects are MERN-based systems that solve real problems: matching people for marriage with real-time chat, managing events end-to-end with role-based access, and hiding data inside images using steganography algorithms.
          </p>
          <p className="text-text-secondary leading-relaxed text-[0.9375rem]">
            Currently exploring AI integration — building tools where LLMs are a <em>feature</em>, not the whole product.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TRAITS.map((t, i) => (
            <motion.div key={t.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
              className="glass card-hover p-5 rounded-2xl cursor-default group">
              <div className="text-2xl mb-3">{t.icon}</div>
              <h3 className="text-sm font-bold text-slate-200 mb-1">{t.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right: Timeline + Quick Info */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className="flex flex-col gap-5">
        <div className="font-mono text-[11px] text-text-muted mb-1">// learning_direction.log</div>

        {TIMELINE.map((item, i) => (
          <motion.div key={item.year} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2} className="relative pl-7">
            {i < TIMELINE.length - 1 && (
              <div className="absolute left-[9px] top-8 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${item.color}40, transparent)` }} />
            )}
            <div className="absolute left-0 top-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${item.color}18`, border: `1.5px solid ${item.color}50` }}>
              <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
            </div>
            <div className="glass p-5 rounded-2xl ml-1">
              <div className="font-mono text-[11px] mb-1.5 font-semibold" style={{ color: item.color }}>{item.year}</div>
              <h3 className="font-semibold text-slate-200 text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}

        <div className="glass p-5 rounded-2xl mt-2">
          <div className="font-mono text-[11px] text-text-muted mb-3">// quick_info</div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Location', value: 'India 🇮🇳' },
              { label: 'Education', value: 'B.Tech CSE' },
              { label: 'Stack', value: 'MERN + AI' },
              { label: 'Status', value: '🟢 Available' },
            ].map(row => (
              <div key={row.label}>
                <div className="text-xs text-text-muted mb-0.5">{row.label}</div>
                <div className="text-sm font-semibold text-slate-200">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </article>
  )
}

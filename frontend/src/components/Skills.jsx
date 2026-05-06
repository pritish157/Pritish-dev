import { motion } from 'framer-motion'

const SKILLS = [
  { name: 'React', level: 80, category: 'Frontend', color: '#06B6D4' },
  { name: 'Node.js', level: 82, category: 'Backend', color: '#22C55E' },
  { name: 'MongoDB', level: 78, category: 'Database', color: '#22C55E' },
  { name: 'Express', level: 80, category: 'Backend', color: '#8B5CF6' },
  { name: 'JavaScript', level: 85, category: 'Language', color: '#F59E0B' },
  { name: 'Java', level: 70, category: 'Language', color: '#F97316' },
  { name: 'Socket.IO', level: 72, category: 'Backend', color: '#8B5CF6' },
  { name: 'Git/GitHub', level: 78, category: 'Tools', color: '#F1F5F9' },
  { name: 'REST API', level: 83, category: 'Backend', color: '#8B5CF6' },
  { name: 'MySQL', level: 65, category: 'Database', color: '#3B82F6' },
  { name: 'HTML/CSS', level: 88, category: 'Frontend', color: '#06B6D4' },
  { name: 'Python', level: 60, category: 'Language', color: '#F59E0B' },
]

const RADAR_SKILLS = [
  { label: 'Frontend', value: 85 },
  { label: 'Backend', value: 80 },
  { label: 'Database', value: 75 },
  { label: 'DevOps', value: 55 },
  { label: 'AI/ML', value: 50 },
  { label: 'DSA', value: 65 },
]

function RadarChart({ skills, size = 200 }) {
  const center = size / 2
  const radius = size * 0.38
  const n = skills.length
  const angleStep = (2 * Math.PI) / n

  const getPoint = (i, r) => {
    const angle = i * angleStep - Math.PI / 2
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) }
  }

  const gridLevels = [0.25, 0.5, 0.75, 1]
  const dataPath = skills
    .map((s, i) => {
      const pt = getPoint(i, radius * (s.value / 100))
      return `${i === 0 ? 'M' : 'L'}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`
    })
    .join(' ') + ' Z'

  return (
    <svg width="100%" viewBox={`0 0 ${size} ${size}`} className="max-w-[220px]" role="img" aria-label="Skill domain coverage radar chart">
      {gridLevels.map(level => {
        const pts = skills.map((_, i) => getPoint(i, radius * level))
        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' Z'
        return <path key={level} d={d} fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="1" />
      })}
      {skills.map((_, i) => {
        const outer = getPoint(i, radius)
        return <line key={i} x1={center} y1={center} x2={outer.x} y2={outer.y} stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
      })}
      <path d={dataPath} fill="rgba(139,92,246,0.15)" stroke="url(#radarGrad)" strokeWidth="2" />
      {skills.map((s, i) => {
        const pt = getPoint(i, radius * (s.value / 100))
        return <circle key={`dot-${i}`} cx={pt.x} cy={pt.y} r="3.5" fill="#8B5CF6" stroke="#050510" strokeWidth="2" />
      })}
      {skills.map((s, i) => {
        const pt = getPoint(i, radius * 1.25)
        return (
          <text key={`lbl-${i}`} x={pt.x} y={pt.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="8.5" fill="#94A3B8" fontFamily="Inter, sans-serif" fontWeight="500">
            {s.label}
          </text>
        )
      })}
      <defs>
        <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-2 sm:gap-3"
    >
      <div className="w-16 sm:w-[88px] text-xs text-slate-300 font-medium text-right shrink-0">
        {skill.name}
      </div>
      <div className="flex-1 h-1.5 rounded-full bg-white/6">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: index * 0.05, ease: 'easeOut' }}
        />
      </div>
      <div className="w-8 text-xs text-text-muted font-mono">{skill.level}%</div>
    </motion.div>
  )
}

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Language', 'Tools']
const CATEGORY_COLORS = { Frontend: '#06B6D4', Backend: '#8B5CF6', Database: '#22C55E', Language: '#F59E0B', Tools: '#F1F5F9' }

export default function Skills() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
      {/* Left: Skill bars */}
      <div className="flex flex-col gap-6 sm:gap-8">
        {CATEGORIES.map(cat => {
          const catSkills = SKILLS.filter(s => s.category === cat)
          if (!catSkills.length) return null
          return (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-[7px] h-[7px] rounded-full" style={{ background: CATEGORY_COLORS[cat] }} />
                <span className="font-mono text-[11px] text-text-muted">{cat}</span>
              </div>
              <div className="flex flex-col gap-2.5 sm:gap-3">
                {catSkills.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
              </div>
            </div>
          )
        })}
      </div>

      {/* Right: Radar + Tools */}
      <div className="flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass p-5 rounded-3xl flex flex-col items-center"
        >
          <div className="font-mono text-[11px] text-text-muted mb-4 self-start">// domain_coverage</div>
          <RadarChart skills={RADAR_SKILLS} size={220} />
          <div className="grid grid-cols-3 gap-3 mt-4 w-full">
            {RADAR_SKILLS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-sm font-bold text-purple-300">{s.value}%</div>
                <div className="text-[10px] text-text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass p-5 rounded-3xl">
          <div className="font-mono text-[11px] text-text-muted mb-4">// tools_and_environment</div>
          <div className="flex flex-wrap gap-1.5">
            {['VS Code', 'Postman', 'Git', 'GitHub', 'Render', 'Vercel', 'MongoDB Atlas', 'Figma', 'Linux CLI'].map(tool => (
              <span key={tool} className="tag tag-blue">{tool}</span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass p-5 rounded-3xl border-accent-cyan/20">
          <div className="font-mono text-[11px] text-accent-cyan mb-3">// currently_learning</div>
          <div className="flex flex-wrap gap-1.5">
            {['TypeScript', 'Docker', 'Redis', 'LangChain', 'Next.js'].map(item => (
              <span key={item} className="tag tag-cyan">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

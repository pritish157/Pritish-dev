import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CAPABILITIES = [
  { icon: '⚡', title: 'Full-Stack CRUD Apps', desc: 'REST APIs with Express + MongoDB, React frontend with state management, CORS, auth middleware, and deployment.', tags: ['MERN', 'REST', 'MongoDB'], color: '#8B5CF6' },
  { icon: '🔐', title: 'Authentication Systems', desc: 'JWT access/refresh tokens, bcrypt hashing, role-based access control, email verification, session management.', tags: ['JWT', 'bcrypt', 'RBAC'], color: '#06B6D4' },
  { icon: '⚙️', title: 'Real-Time Applications', desc: 'WebSocket integration with Socket.IO for live chat, presence indicators, read receipts, and broadcasting.', tags: ['Socket.IO', 'WebSockets'], color: '#22C55E' },
  { icon: '🤖', title: 'AI-Integrated Apps', desc: 'LLM-powered chatbots, RAG assistants, smart search, and context-aware responses in MERN apps.', tags: ['OpenAI', 'RAG', 'LLM'], color: '#F59E0B' },
  { icon: '📊', title: 'Admin Dashboards', desc: 'Role-gated admin panels with analytics, user moderation, KYC workflows, and data management.', tags: ['Admin', 'Analytics'], color: '#EC4899' },
  { icon: '📱', title: 'Mobile-First UIs', desc: 'React UIs with Tailwind — bottom nav, touch interactions, responsive layouts that feel native.', tags: ['React', 'Tailwind'], color: '#3B82F6' },
  { icon: '🔔', title: 'Notification Systems', desc: 'Email via Nodemailer, push via Firebase FCM, and in-app real-time alerts via Socket.IO.', tags: ['Nodemailer', 'FCM'], color: '#06B6D4' },
  { icon: '☁️', title: 'Deployment & DevOps', desc: 'Render for backends, Vercel for frontends, env management, CORS hardening, CI/CD pipelines.', tags: ['Render', 'Vercel'], color: '#8B5CF6' },
]

export default function WhatIBuild() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {CAPABILITIES.map((cap, i) => (
          <motion.div
            key={cap.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ y: -5 }}
            className="glass p-5 sm:p-6 rounded-3xl cursor-default flex flex-col gap-4 group transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `${cap.color}15`, border: `1px solid ${cap.color}25` }}>
              {cap.icon}
            </div>
            <h3 className="text-sm font-bold text-text-primary leading-snug">{cap.title}</h3>
            <p className="text-xs text-text-secondary leading-relaxed flex-1">{cap.desc}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {cap.tags.map(tag => (
                <span key={tag} className="font-mono text-[10px] py-0.5 px-2.5 rounded"
                  style={{ background: `${cap.color}10`, color: cap.color, border: `1px solid ${cap.color}20` }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="h-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(90deg, ${cap.color}, transparent)` }} />
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="mt-12 p-8 sm:p-10 rounded-3xl text-center glass-elevated">
        <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
          Looking for a developer who ships <span className="gradient-text">complete systems</span>?
        </h3>
        <p className="text-text-secondary text-sm sm:text-base mb-8 max-w-lg mx-auto">
          I don't just write code — I own features from DB schema to deployed UI, with auth, testing, and monitoring.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-primary">Let's Talk →</Link>
          <a href="https://www.linkedin.com/in/pritish-kumar-panda-dev/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            View LinkedIn ↗
          </a>
        </div>
      </motion.div>
    </div>
  )
}

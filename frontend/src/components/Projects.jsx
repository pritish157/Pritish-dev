import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  {
    id: 'event', status: 'active', label: 'MODULE_01', name: 'Event Management System',
    tagline: 'End-to-end event orchestration platform',
    problem: 'Organizers lacked a unified system to create events, manage registrations, send confirmations, and monitor attendance — everything was done manually via spreadsheets.',
    solution: 'Built a MERN app with role-based access (Admin / Organizer / Attendee), automated email confirmations, real-time seat tracking, and a dashboard for event analytics.',
    architecture: [
      { layer: 'React', role: 'UI + Forms + Role Views', color: '#06B6D4' },
      { layer: 'Express', role: 'REST API + Auth Middleware', color: '#8B5CF6' },
      { layer: 'MongoDB', role: 'Events · Users · Tickets', color: '#22C55E' },
      { layer: 'Nodemailer', role: 'Email Confirmations', color: '#F59E0B' },
    ],
    features: ['JWT auth with role-based access control', 'Event creation with capacity limits & deadlines', 'One-click registration with email confirmation', 'Admin dashboard — CRUD, stats, attendee list', 'Search + filter events by category / date'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Nodemailer'],
    stackColors: ['tag-cyan', 'tag-green', 'tag-purple', 'tag-green', 'tag-blue', 'tag-blue'],
    github: 'https://github.com/pritish157', demo: null,
    metrics: [{ label: 'API Endpoints', value: '18+' }, { label: 'Auth Roles', value: '3' }, { label: 'DB Collections', value: '5' }],
    color: '#06B6D4',
  },
  {
    id: 'matrimonial', status: 'active', label: 'MODULE_02', name: 'Matrimonial Platform (Knot of Love)',
    tagline: 'Full-stack matchmaking system with real-time chat',
    problem: "Existing matrimonial apps don't provide real-time communication, modern UX, or transparent admin control — they feel outdated and trust-deficient.",
    solution: 'Built a production-deployed MERN platform with WebSocket real-time chat, KYC verification flow, match discovery, blocking/archiving, Firebase push notifications, and a full admin panel.',
    architecture: [
      { layer: 'React + Vite', role: 'SPA · Match UI · Chat', color: '#06B6D4' },
      { layer: 'Express + Socket.IO', role: 'REST API + Real-time WS', color: '#8B5CF6' },
      { layer: 'MongoDB Atlas', role: 'Users · Matches · Messages', color: '#22C55E' },
      { layer: 'Firebase FCM', role: 'Push Notifications', color: '#F59E0B' },
    ],
    features: ['Real-time messaging via Socket.IO with read receipts', 'KYC verification with document upload (Multer)', 'Match discovery with filter + smart recommendations', 'Block / archive / report system for safety', 'Firebase Cloud Messaging for offline push notifications', 'Admin dashboard — user moderation + KYC approval', 'Full production deployment: Render + Vercel'],
    stack: ['React', 'Node.js', 'Socket.IO', 'MongoDB Atlas', 'Firebase', 'JWT', 'Multer'],
    stackColors: ['tag-cyan', 'tag-green', 'tag-purple', 'tag-green', 'tag-blue', 'tag-blue', 'tag-purple'],
    github: 'https://github.com/pritish157', demo: null,
    metrics: [{ label: 'API Routes', value: '40+' }, { label: 'Real-time', value: 'WS' }, { label: 'Deployed', value: 'Yes ✓' }],
    color: '#8B5CF6',
  },
  {
    id: 'steg', status: 'complete', label: 'MODULE_03', name: 'Image Steganography System',
    tagline: 'Conceal secret data inside image pixels',
    problem: 'Existing steganography tools are either command-line only or lack a clean UI — there was no accessible web-based tool for students and researchers.',
    solution: 'Built a web app that uses LSB (Least Significant Bit) encoding to hide text messages inside PNG images without visible quality loss, with a clean encode/decode UI.',
    architecture: [
      { layer: 'HTML/CSS/JS', role: 'Upload · Encode · Download', color: '#06B6D4' },
      { layer: 'Canvas API', role: 'Pixel-level Manipulation', color: '#8B5CF6' },
      { layer: 'LSB Algorithm', role: 'Bit-level Encoding Logic', color: '#F59E0B' },
    ],
    features: ['LSB steganography — hides text in image bit planes', 'Supports PNG format with lossless encoding', 'Encode mode: text → hidden image download', 'Decode mode: extract hidden message from image', 'No server upload — all processing in-browser'],
    stack: ['JavaScript', 'Canvas API', 'HTML5', 'CSS3', 'LSB Algorithm'],
    stackColors: ['tag-blue', 'tag-cyan', 'tag-blue', 'tag-purple', 'tag-green'],
    github: 'https://github.com/pritish157', demo: null,
    metrics: [{ label: 'Processing', value: 'Client-side' }, { label: 'Format', value: 'PNG' }, { label: 'Algorithm', value: 'LSB' }],
    color: '#F59E0B',
  },
]

function ArchitectureFlow({ layers }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-mono text-[11px] text-text-muted mb-1">// system_architecture</div>
      {layers.map((layer, i) => (
        <div key={layer.layer}>
          <div className="flex items-center gap-2.5">
            <div className="font-mono text-[11px] font-bold py-1 px-2.5 rounded-md min-w-[100px] text-center shrink-0"
              style={{ background: `${layer.color}15`, border: `1px solid ${layer.color}40`, color: layer.color }}>
              {layer.layer}
            </div>
            <div className="text-xs text-slate-400">{layer.role}</div>
          </div>
          {i < layers.length - 1 && (
            <div className="text-text-dim text-xs pl-10 leading-none py-0.5">↓</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Projects() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="flex flex-col gap-3">
      {PROJECTS.map((proj, idx) => (
        <motion.div
          key={proj.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.08 }}
        >
          <div
            className="glass rounded-3xl overflow-hidden transition-colors duration-300"
            style={{ border: expanded === proj.id ? `1px solid ${proj.color}50` : '1px solid rgba(139,92,246,0.15)' }}
          >
            {/* Module Header */}
            <button
              onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}
              className="w-full text-left p-4 sm:p-5 flex items-start gap-3 sm:gap-4 bg-transparent border-none cursor-pointer hover:bg-white/2 transition-colors min-h-[60px]"
            >
              <div className="shrink-0 pt-1">
                <div className="w-2.5 h-2.5 rounded-full animate-pulse-dot"
                  style={{ background: proj.color, boxShadow: `0 0 8px ${proj.color}` }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-mono text-[11px] text-text-muted">{proj.label}</span>
                  <span className="font-mono text-[11px] py-0.5 px-2 rounded"
                    style={{ background: `${proj.color}15`, color: proj.color }}>
                    {proj.status}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-text-primary">{proj.name}</h3>
                <p className="text-xs sm:text-sm text-text-muted mt-0.5">{proj.tagline}</p>
              </div>

              {/* Metrics — desktop */}
              <div className="hidden md:flex items-center gap-6 shrink-0">
                {proj.metrics.map(m => (
                  <div key={m.label} className="text-center">
                    <div className="text-sm font-bold" style={{ color: proj.color }}>{m.value}</div>
                    <div className="text-[11px] text-text-muted">{m.label}</div>
                  </div>
                ))}
              </div>

              <motion.div
                animate={{ rotate: expanded === proj.id ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-text-muted text-xl font-light"
              >+</motion.div>
            </button>

            {/* Expanded Detail */}
            <AnimatePresence>
              {expanded === proj.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-5 pb-5 pt-0" style={{ borderTop: `1px solid ${proj.color}20` }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pt-5">
                      {/* Left */}
                      <div className="flex flex-col gap-5">
                        <div>
                          <div className="font-mono text-[11px] text-text-muted mb-2">// problem_statement</div>
                          <p className="text-sm text-text-muted leading-relaxed">{proj.problem}</p>
                        </div>
                        <div>
                          <div className="font-mono text-[11px] text-text-muted mb-2">// solution_built</div>
                          <p className="text-sm text-slate-300 leading-relaxed">{proj.solution}</p>
                        </div>
                        <div>
                          <div className="font-mono text-[11px] text-text-muted mb-2.5">// tech_stack</div>
                          <div className="flex flex-wrap gap-1.5">
                            {proj.stack.map((t, i) => (
                              <span key={t} className={`tag ${proj.stackColors[i] || 'tag-purple'}`}>{t}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2.5">
                          <a href={proj.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 !px-4 !text-xs">
                            GitHub ↗
                          </a>
                          {proj.demo && (
                            <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-4 !text-xs">
                              Live Demo ↗
                            </a>
                          )}
                        </div>
                      </div>
                      {/* Right */}
                      <div className="flex flex-col gap-5">
                        <div className="glass p-4 rounded-xl">
                          <ArchitectureFlow layers={proj.architecture} />
                        </div>
                        <div>
                          <div className="font-mono text-[11px] text-text-muted mb-2.5">// key_features</div>
                          <ul className="flex flex-col gap-2">
                            {proj.features.map(f => (
                              <li key={f} className="flex items-start gap-2 text-sm text-text-muted">
                                <span className="mt-0.5 shrink-0" style={{ color: proj.color }}>▸</span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

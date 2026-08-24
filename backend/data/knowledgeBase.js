/**
 * RAG Knowledge Base — Pritish Kumar Panda
 * Used by the AI assistant to answer questions about projects, skills, and background.
 */

const knowledge = [
  // ── IDENTITY ──
  {
    keywords: ['who', 'pritish', 'about', 'introduce', 'yourself', 'background', 'name'],
    reply: `Pritish Kumar Panda is a final-year CSE student and Application Developer specializing in the MERN stack (MongoDB, Express, React, Node.js). He builds production-grade systems — from real-time matchmaking platforms to AI-integrated apps. He's currently open to full-time and internship opportunities.`,
  },
  // ── CAREER / GOAL ──
  {
    keywords: ['goal', 'career', 'job', 'role', 'target', 'looking', 'opportunity', 'hire', 'work'],
    reply: `Pritish's career goal is to work as an Application Developer in backend-heavy full-stack roles — owning features from database schema design to deployed UI. He targets companies where he can ship real systems with Node.js, Express, and MongoDB, ideally with real-time or AI-integrated components.`,
  },
  // ── PAYGUARD PAYMENT SWITCH ──
  {
    keywords: ['payguard', 'payment', 'switch', 'java', 'spring', 'transaction', 'reversal', 'idempotency', 'iso-8583', 'optimistic locking', 'dispute'],
    reply: `"PayGuard" is a resilient payment switching engine and transaction investigation system built with Java 21, Spring Boot 4.x, and MySQL. It features: atomic dual-account fund transfers (@Transactional), ISO-8583 standard response codes (00 Success, 14 Invalid Account, 51 Insufficient Funds, 57 Blocked), database-enforced @Version optimistic locking preventing race conditions and double-debits, database-safe idempotency via unique constraints, real-time fraud & velocity rules, in-memory sliding-window rate limiting, JPA Specification multi-criteria search, dispute lifecycle management, and 34 comprehensive automated tests.`,
  },
  // ── MATRIMONIAL APP ──
  {
    keywords: ['matrimonial', 'knot', 'love', 'match', 'wedding', 'marriage', 'matching'],
    reply: `"Knot of Love" is a full-stack matrimonial platform built with the MERN stack. It includes: real-time chat via Socket.IO with read receipts, KYC verification with document upload (Multer), match discovery with filtering, block/archive/report safety features, Firebase Cloud Messaging for offline push notifications, a full admin dashboard for user moderation and KYC approval, and is fully deployed on Render (backend) and Vercel (frontend).`,
  },
  // ── EVENT MANAGEMENT ──
  {
    keywords: ['event', 'management', 'ticket', 'booking', 'registration', 'organizer', 'vireon'],
    reply: `The Event Management System (Vireon) is a MERN app with role-based access for Admins, Organizers, and Attendees. Key features: JWT authentication with role-based control, event creation with capacity limits and deadlines, one-click registration with Nodemailer email confirmation, Razorpay payment processing with webhooks, two-stage concurrency seat lock, and search/filter by category and date. It has 10+ REST endpoints and full lifecycle payments.`,
  },
  // ── STEGANOGRAPHY ──
  {
    keywords: ['steganography', 'steg', 'image', 'lsb', 'hide', 'secret', 'pixel', 'encode', 'decode'],
    reply: `The Image Steganography System is a web tool that uses LSB (Least Significant Bit) encoding to hide secret text messages inside PNG images without visible quality loss. Everything runs in-browser using the Canvas API — no server upload needed. It supports encode mode (text → hidden image download) and decode mode (extract hidden message from image).`,
  },
  // ── REAL-TIME ──
  {
    keywords: ['real-time', 'realtime', 'socket', 'websocket', 'chat', 'live', 'instant'],
    reply: `Yes! Pritish has built real-time features using Socket.IO. In the Knot of Love matrimonial platform, he implemented live messaging with read receipts, user presence indicators, and event broadcasting. He understands WebSocket lifecycle, room management, and graceful disconnection handling.`,
  },
  // ── AUTHENTICATION ──
  {
    keywords: ['auth', 'authentication', 'jwt', 'login', 'security', 'password', 'token', 'bcrypt', 'session', 'rbac'],
    reply: `Pritish has strong experience with authentication systems: stateless Spring Security 6.x JWT and Node.js JWT access/refresh tokens, TOTP 2FA time-based OTP validation, BCrypt password hashing, role-based access control (ADMIN, OPERATOR, AUDITOR), rate limiting, and session management.`,
  },
  // ── TECH STACK ──
  {
    keywords: ['stack', 'tech', 'technology', 'tools', 'language', 'use', 'know', 'skill', 'java', 'spring'],
    reply: `Pritish is skilled across Java & MERN backend ecosystems: Java 21, Spring Boot 4.x, Spring Security, Spring Data JPA, Hibernate, MySQL, Node.js, Express.js, MongoDB, React, and TypeScript. Core specializations include REST API design, ISO-8583 standards, @Version optimistic locking, idempotency control, JWT/TOTP 2FA security, Socket.io, Docker, and GitHub Actions CI/CD.`,
  },
  // ── MONGODB & MYSQL ──
  {
    keywords: ['mongodb', 'database', 'mongoose', 'atlas', 'nosql', 'schema', 'model', 'mysql', 'sql', 'hibernate'],
    reply: `Pritish works with both SQL (MySQL, Hibernate ORM, optimistic locking with @Version, indexing) and NoSQL (MongoDB, Mongoose ODM, aggregation pipelines, query optimization) databases for high-integrity transaction processing and scalable document storage.`,
  },
  // ── DEPLOYMENT ──
  {
    keywords: ['deploy', 'deployment', 'production', 'render', 'vercel', 'hosting', 'live', 'deployed'],
    reply: `Pritish has deployed full-stack apps to production: Java/Spring Boot & Node/Express backends on Render, React/Next.js frontends on Vercel. He handles environment variable configuration, CORS hardening, Docker containerization, and GitHub Actions CI/CD automation.`,
  },
  // ── AI ──
  {
    keywords: ['ai', 'artificial intelligence', 'openai', 'gpt', 'llm', 'rag', 'chatbot', 'machine learning', 'ml'],
    reply: `Pritish is actively exploring AI integration in web apps. He has built a RAG-based assistant (this chatbot!) and AstroAgent (LLM API orchestration with prompt middleware and Jest tests).`,
  },
  // ── PROJECTS COUNT ──
  {
    keywords: ['project', 'built', 'created', 'made', 'work', 'portfolio'],
    reply: `Pritish has built 4 major systems: (1) PayGuard — Java 21 / Spring Boot payment switch with ISO-8583 codes, @Version locking, and fraud checks; (2) Knot of Love — matrimonial platform with real-time Socket.io chat, TOTP 2FA, and full CI/CD; (3) Vireon — event management with Razorpay payment processing and concurrent seat lock; (4) AstroAgent — LLM API orchestration backend. He also created Image Steganography and Fuel Route Optimization systems.`,
  },
  // ── NODEMAILER / EMAIL ──
  {
    keywords: ['email', 'nodemailer', 'smtp', 'notification', 'mail', 'send'],
    reply: `Pritish has implemented email features using Nodemailer with Gmail SMTP. He uses it for event registration confirmations, contact form submissions, password reset emails, and other transactional notifications in his MERN applications.`,
  },
  // ── CONTACT ──
  {
    keywords: ['contact', 'reach', 'connect', 'email address', 'linkedin', 'github', 'social'],
    reply: `You can reach Pritish at: Email — pritishpanda157@gmail.com | LinkedIn — linkedin.com/in/pritish-kumar-panda-dev/ | GitHub — github.com/pritish157. He typically responds within 24 hours.`,
  },
]

/**
 * Find best matching response for a query
 * @param {string} query
 * @returns {string}
 */
function queryKnowledge(query) {
  const lower = query.toLowerCase()
  const words = lower.split(/\s+/)

  let bestMatch = null
  let bestScore = 0

  for (const entry of knowledge) {
    let score = 0
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) score += 2
      else if (words.some(w => keyword.includes(w) && w.length > 3)) score += 1
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = entry
    }
  }

  if (bestScore > 0 && bestMatch) return bestMatch.reply

  return `Great question! I'm Pritish's portfolio assistant. I can tell you about his projects (Event Management App, Knot of Love matrimonial platform, Image Steganography), his tech stack (MERN, Socket.IO, JWT, Firebase), his skills, or his career goals. What would you like to know?`
}

module.exports = { queryKnowledge }

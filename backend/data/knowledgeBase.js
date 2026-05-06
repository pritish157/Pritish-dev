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
  // ── MATRIMONIAL APP ──
  {
    keywords: ['matrimonial', 'knot', 'love', 'match', 'wedding', 'marriage', 'matching'],
    reply: `"Knot of Love" is a full-stack matrimonial platform built with the MERN stack. It includes: real-time chat via Socket.IO with read receipts, KYC verification with document upload (Multer), match discovery with filtering, block/archive/report safety features, Firebase Cloud Messaging for offline push notifications, a full admin dashboard for user moderation and KYC approval, and is fully deployed on Render (backend) and Vercel (frontend).`,
  },
  // ── EVENT MANAGEMENT ──
  {
    keywords: ['event', 'management', 'ticket', 'booking', 'registration', 'organizer'],
    reply: `The Event Management System is a MERN app with role-based access for Admins, Organizers, and Attendees. Key features: JWT authentication with role-based control, event creation with capacity limits and deadlines, one-click registration with Nodemailer email confirmation, admin dashboard with CRUD and attendee list, and search/filter by category and date. It has 18+ API endpoints and 5 MongoDB collections.`,
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
    keywords: ['auth', 'authentication', 'jwt', 'login', 'security', 'password', 'token', 'bcrypt', 'session'],
    reply: `Pritish has strong experience with authentication systems: JWT access and refresh tokens, bcrypt password hashing, role-based access control (Admin/User roles), email verification flows, password reset with secure tokens, rate limiting, and session management. He has also implemented all-device logout via JWT token versioning.`,
  },
  // ── TECH STACK ──
  {
    keywords: ['stack', 'tech', 'technology', 'tools', 'language', 'use', 'know', 'skill'],
    reply: `Pritish's core stack is MERN: MongoDB, Express.js, React (Vite), Node.js. Additional skills include: Socket.IO, JWT, Nodemailer, Firebase FCM, Multer (file uploads), Tailwind CSS, Framer Motion, Axios, and Git/GitHub. He also knows Java and Python, and is learning TypeScript, Docker, and Redis.`,
  },
  // ── MONGODB ──
  {
    keywords: ['mongodb', 'database', 'mongoose', 'atlas', 'nosql', 'schema', 'model'],
    reply: `Pritish works with MongoDB and Mongoose for database design. He designs schemas for complex relationships — users, matches, messages, events, and tickets. He uses MongoDB Atlas for production deployments and has experience with indexing, aggregation, and population of references.`,
  },
  // ── DEPLOYMENT ──
  {
    keywords: ['deploy', 'deployment', 'production', 'render', 'vercel', 'hosting', 'live', 'deployed'],
    reply: `Pritish has deployed full-stack apps to production: Node/Express backends on Render, React frontends on Vercel. He handles environment variable configuration, CORS hardening for cross-origin production requests, and has experience troubleshooting WebSocket connections in deployed environments.`,
  },
  // ── AI ──
  {
    keywords: ['ai', 'artificial intelligence', 'openai', 'gpt', 'llm', 'rag', 'chatbot', 'machine learning', 'ml'],
    reply: `Pritish is actively exploring AI integration in web apps. He has built a RAG-based assistant (this chatbot!) and understands how to connect LLM APIs like OpenAI into MERN applications. He's also studied ML basics and built a Rainfall Prediction model using Python. His current learning path includes LangChain and vector databases for production RAG systems.`,
  },
  // ── PROJECTS COUNT ──
  {
    keywords: ['project', 'built', 'created', 'made', 'work', 'portfolio'],
    reply: `Pritish has built 3 major systems: (1) Event Management System — MERN with role-based auth and email notifications; (2) Knot of Love — matrimonial platform with real-time chat, KYC, push notifications, and full deployment; (3) Image Steganography System — client-side LSB encoding for hiding data in images. He also built a Rainfall Prediction ML model in Python.`,
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

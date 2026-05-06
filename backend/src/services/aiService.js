/**
 * AI Service — Business logic for AI chat with Redis caching.
 * Caches identical questions to reduce OpenAI API calls and latency.
 */
const crypto = require('crypto')
const config = require('../config')
const logger = require('../utils/logger')
const { cacheGet, cacheSet } = require('../config/redis')
const { queryKnowledge } = require('../data/knowledgeBase')
const { sanitizeString } = require('../utils/sanitize')

// Optional OpenAI client
let openai = null
if (config.openai.apiKey) {
  try {
    const { OpenAI } = require('openai')
    openai = new OpenAI({ apiKey: config.openai.apiKey })
    logger.info('✅ OpenAI connected — AI assistant using GPT-4o-mini')
  } catch {
    logger.info('openai package not installed — using local RAG')
  }
}

const SYSTEM_PROMPT = `You are a helpful AI assistant embedded in Pritish Kumar Panda's developer portfolio.
Pritish is a final-year CSE student and MERN stack Application Developer.

Projects:
1. Event Management System (MERN) — JWT auth, role-based access (Admin/Organizer/Attendee), event CRUD, Nodemailer email confirmations, 18+ API endpoints.
2. Knot of Love — Matrimonial platform with Socket.IO real-time chat, read receipts, KYC verification (Multer), match discovery, block/archive system, Firebase FCM push notifications, admin dashboard, deployed on Render + Vercel.
3. Image Steganography System — LSB bit-level encoding, client-side Canvas API, encode and decode text in PNG images.

Skills: React, Node.js, Express, MongoDB, Socket.IO, JWT, Nodemailer, Firebase, Multer, Tailwind CSS, Framer Motion, Java, Python, Git.
Contact: pritishpanda157@gmail.com | LinkedIn: linkedin.com/in/pritish-kumar-panda-dev/ | GitHub: github.com/pritish157
Career Goal: Application Developer role — backend-heavy full-stack, ideally with real-time or AI features.

Answer the user's question concisely and helpfully using this context. Keep responses under 150 words.`

/**
 * Generate a cache key from the user's message.
 */
function getCacheKey(message) {
  const normalized = message.toLowerCase().trim().replace(/\s+/g, ' ')
  const hash = crypto.createHash('md5').update(normalized).digest('hex')
  return `ai:chat:${hash}`
}

/**
 * Process an AI chat message.
 * @param {string} rawMessage
 * @returns {Promise<{ reply: string, source: string, cached: boolean }>}
 */
async function processChat(rawMessage) {
  const message = sanitizeString(rawMessage).slice(0, 500)
  if (!message) throw new Error('Message is required')

  const cacheKey = getCacheKey(message)

  // ── Check cache first ──
  const cached = await cacheGet(cacheKey)
  if (cached) {
    logger.debug({ cacheKey }, 'AI cache HIT')
    return { ...cached, cached: true }
  }

  let result

  // ── Path 1: OpenAI ──
  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: config.openai.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        max_tokens: config.openai.maxTokens,
        temperature: config.openai.temperature,
      })
      const reply = completion.choices[0]?.message?.content?.trim() || 'No response generated.'
      result = { reply, source: 'openai' }
    } catch (err) {
      logger.error({ err: err.message }, 'OpenAI call failed — falling back to RAG')
      result = { reply: queryKnowledge(message), source: 'rag-fallback' }
    }
  } else {
    // ── Path 2: Local RAG ──
    result = { reply: queryKnowledge(message), source: 'rag' }
  }

  // ── Cache the result ──
  await cacheSet(cacheKey, result, config.redis.aiCacheTTL)
  logger.debug({ cacheKey, source: result.source }, 'AI cache SET')

  return { ...result, cached: false }
}

module.exports = { processChat }

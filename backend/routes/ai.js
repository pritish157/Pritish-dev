const express = require('express')
const { queryKnowledge } = require('../data/knowledgeBase')

const router = express.Router()

// Optional: OpenAI integration
let openai = null
if (process.env.OPENAI_API_KEY) {
  try {
    const { OpenAI } = require('openai')
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    console.log('✅ OpenAI connected — AI assistant using GPT-4o')
  } catch {
    console.log('ℹ️  openai package not installed — using local RAG')
  }
}

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  const { message } = req.body
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required.' })
  }

  const trimmed = message.trim().slice(0, 500)

  try {
    // ── Path 1: OpenAI (if key provided) ──
    if (openai) {
      const context = `You are a helpful AI assistant embedded in Pritish Kumar Panda's developer portfolio.
Pritish is a final-year CSE student and Backend Developer specializing in Java 21, Spring Boot, and Node.js REST API architectures.

Projects:
1. PayGuard — Resilient payment switch with ISO-8583 codes, @Version optimistic locking, idempotency controls, and 34 automated concurrency tests (Java 21, Spring Boot, MySQL).
2. Knot of Love — Matrimonial platform with Socket.IO real-time chat, read receipts, TOTP 2FA, KYC verification, deployed on Render + Vercel (Node.js, Express, MongoDB).
3. Vireon — Event management platform with Razorpay payment processing and concurrent two-stage seat reservations.
4. AstroAgent — LLM API orchestration backend with prompt middleware and Jest test suites.
5. Image Steganography System & Fuel Route Optimization.

Skills: Java 21, Spring Boot, Spring Security, Spring Data JPA, Hibernate, MySQL, Node.js, Express.js, MongoDB, Socket.IO, JWT + TOTP 2FA, Docker, GitHub Actions, Jest, JUnit.
Contact: pritishpanda157@gmail.com | LinkedIn: linkedin.com/in/pritish-kumar-panda-dev/ | GitHub: github.com/pritish157
Career Goal: Backend Developer / Software Engineer role — building high-throughput services, payment switches, and secure distributed architectures.

Answer the user's question concisely and helpfully using this context. Keep responses under 150 words.`

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: context },
          { role: 'user', content: trimmed },
        ],
        max_tokens: 200,
        temperature: 0.7,
      })
      const reply = completion.choices[0]?.message?.content?.trim() || 'No response generated.'
      return res.json({ reply, source: 'openai' })
    }

    // ── Path 2: Local RAG ──
    const reply = queryKnowledge(trimmed)
    return res.json({ reply, source: 'rag' })
  } catch (err) {
    console.error('AI route error:', err.message)
    const fallback = queryKnowledge(trimmed)
    return res.json({ reply: fallback, source: 'rag-fallback' })
  }
})

module.exports = router

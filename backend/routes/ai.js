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
Pritish is a final-year CSE student and MERN stack Application Developer.

Projects:
1. Event Management System (MERN) — JWT auth, role-based access (Admin/Organizer/Attendee), event CRUD, Nodemailer email confirmations, 18+ API endpoints.
2. Knot of Love — Matrimonial platform with Socket.IO real-time chat, read receipts, KYC verification (Multer), match discovery, block/archive system, Firebase FCM push notifications, admin dashboard, deployed on Render + Vercel.
3. Image Steganography System — LSB bit-level encoding, client-side Canvas API, encode and decode text in PNG images.

Skills: React, Node.js, Express, MongoDB, Socket.IO, JWT, Nodemailer, Firebase, Multer, Tailwind CSS, Framer Motion, Java, Python, Git.
Contact: pritishpanda157@gmail.com | LinkedIn: linkedin.com/in/pritish-kumar-panda-dev/ | GitHub: github.com/pritish157
Career Goal: Application Developer role — backend-heavy full-stack, ideally with real-time or AI features.

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

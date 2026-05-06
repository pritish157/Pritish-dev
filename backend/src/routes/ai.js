/**
 * AI chat routes.
 * Thin controller for the portfolio RAG chatbot.
 */
const express = require('express')
const { processChat } = require('../services/aiService')
const { aiLimiter } = require('../middleware/security')
const { success, error } = require('../utils/response')

const router = express.Router()

router.post('/chat', aiLimiter, async (req, res, next) => {
  try {
    const { message, history } = req.body

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return error(res, 'Message is required.', 400)
    }

    const result = await processChat(message, history)

    return success(res, {
      reply: result.reply,
      source: result.source,
      cached: result.cached,
      citations: result.citations ?? [],
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router

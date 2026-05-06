/**
 * AI Chat Routes — thin controller with caching via aiService.
 */
const express = require('express')
const { processChat } = require('../services/aiService')
const { aiLimiter } = require('../middleware/security')
const { success, error } = require('../utils/response')

const router = express.Router()

// POST /api/ai/chat
router.post('/chat', aiLimiter, async (req, res, next) => {
  try {
    const { message } = req.body

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return error(res, 'Message is required.', 400)
    }

    const result = await processChat(message)
    return success(res, {
      reply: result.reply,
      source: result.source,
      cached: result.cached,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router

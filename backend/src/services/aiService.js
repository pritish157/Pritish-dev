/**
 * AI service for portfolio chat with lightweight RAG and optional OpenAI.
 * Retrieved portfolio documents are used for grounding and source chips.
 */
const crypto = require('crypto')
const config = require('../config')
const logger = require('../utils/logger')
const { cacheGet, cacheSet } = require('../config/redis')
const { buildKnowledgeContext, formatCitations, queryKnowledge, retrieveKnowledge } = require('../data/knowledgeBase')
const { sanitizeString } = require('../utils/sanitize')

let openai = null

if (config.openai.apiKey) {
  try {
    const { OpenAI } = require('openai')
    openai = new OpenAI({ apiKey: config.openai.apiKey })
    logger.info('OpenAI connected - portfolio assistant using GPT-4o-mini')
  } catch {
    logger.info('openai package not installed - using local RAG')
  }
}

const SYSTEM_PROMPT = `You are the portfolio AI assistant for Pritish Kumar Panda.
Answer clearly and recruiter-focused.
Use the retrieved portfolio context as the source of truth wherever possible.
Never invent experience beyond the portfolio.
If the question asks about availability, resume highlights, or engineering mindset, answer using portfolio proof points and hiring-ready language.
Keep answers under 120 words and use concise, professional tone.`

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return []

  return history
    .map((entry) => ({
      role: entry?.role === 'assistant' ? 'assistant' : 'user',
      content: sanitizeString(entry?.content || '').slice(0, 500),
    }))
    .filter((entry) => entry.content)
    .slice(-8)
}

function getCacheKey(message, history = []) {
  const normalizedMessage = message.toLowerCase().trim().replace(/\s+/g, ' ')
  const normalizedHistory = history
    .map((entry) => `${entry.role}:${entry.content.toLowerCase().trim().replace(/\s+/g, ' ')}`)
    .join('|')
  const hash = crypto.createHash('md5').update(`${normalizedHistory}::${normalizedMessage}`).digest('hex')

  return `ai:chat:${hash}`
}

async function processChat(rawMessage, history = []) {
  const message = sanitizeString(rawMessage).slice(0, 500)

  if (!message) {
    throw new Error('Message is required')
  }

  const sanitizedHistory = sanitizeHistory(history)
  const retrievalQuery = [...sanitizedHistory.slice(-2).map((entry) => entry.content), message].join(' ')
  const matches = retrieveKnowledge(retrievalQuery)
  const citations = formatCitations(matches)
  const cacheKey = getCacheKey(message, sanitizedHistory)

  const cached = await cacheGet(cacheKey)
  if (cached) {
    logger.debug({ cacheKey }, 'AI cache HIT')
    return { ...cached, cached: true }
  }

  let result

  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: config.openai.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...sanitizedHistory,
          {
            role: 'user',
            content: `Question: ${message}

Retrieved portfolio context:
${buildKnowledgeContext(matches)}

Answer using only the retrieved context when possible. If something is not covered, say that briefly.`,
          },
        ],
        max_tokens: config.openai.maxTokens,
        temperature: config.openai.temperature,
      })

      const reply = completion.choices[0]?.message?.content?.trim() || 'No response generated.'
      result = {
        reply,
        source: 'openai-rag',
        citations,
      }
    } catch (err) {
      logger.error({ err: err.message }, 'OpenAI call failed - falling back to local RAG')
      result = {
        ...queryKnowledge(message, matches),
        source: 'rag-fallback',
      }
    }
  } else {
    result = {
      ...queryKnowledge(message, matches),
      source: 'rag',
    }
  }

  await cacheSet(cacheKey, result, config.redis.aiCacheTTL)
  logger.debug({ cacheKey, source: result.source }, 'AI cache SET')

  return { ...result, cached: false }
}

module.exports = { processChat }

/**
 * Security Middleware Stack
 * Comprehensive defense-in-depth security for production.
 */
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const compression = require('compression')
const config = require('../config')

/**
 * Core security middleware array — apply all to the app.
 */
function getSecurityMiddleware() {
  return [
    // ── Helmet — secure HTTP headers ──
    helmet({
      contentSecurityPolicy: config.isProd ? undefined : false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),

    // ── CORS — strict origin whitelist ──
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true)
        if (config.security.corsOrigins.includes(origin)) {
          return callback(null, true)
        }
        callback(new Error('Not allowed by CORS'))
      },
      methods: ['GET', 'POST'],
      credentials: true,
      maxAge: 86400, // 24h preflight cache
    }),

    // ── Body parsing with size limit ──
    require('express').json({ limit: config.security.bodyLimit }),

    // ── NoSQL injection prevention (Express 5 compatible) ──
    // express-mongo-sanitize tries to set req.query which is read-only in Express 5
    // Custom middleware that only sanitizes req.body (our API only uses POST with JSON)
    (req, res, next) => {
      if (req.body && typeof req.body === 'object') {
        const sanitizeValue = (obj) => {
          for (const key in obj) {
            if (typeof obj[key] === 'string' && obj[key].startsWith('$')) {
              const logger = require('../utils/logger')
              logger.warn({ key, ip: req.ip }, 'NoSQL injection attempt blocked')
              obj[key] = obj[key].replace(/^\$/, '_')
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
              sanitizeValue(obj[key])
            }
          }
        }
        sanitizeValue(req.body)
      }
      next()
    },

    // Note: HPP removed — incompatible with Express 5 (req.query is read-only)
    // Not needed for JSON-only POST APIs

    // ── Compression ──
    compression({
      threshold: 1024, // Only compress responses > 1KB
      filter: (req, res) => {
        if (req.headers['x-no-compression']) return false
        return compression.filter(req, res)
      },
    }),
  ]
}

/**
 * Rate limiters — tiered by endpoint sensitivity.
 */
const generalLimiter = rateLimit({
  windowMs: config.rateLimit.general.windowMs,
  max: config.rateLimit.general.max,
  message: { success: false, error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const strictLimiter = rateLimit({
  windowMs: config.rateLimit.strict.windowMs,
  max: config.rateLimit.strict.max,
  message: { success: false, error: 'Rate limit exceeded for this endpoint.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const aiLimiter = rateLimit({
  windowMs: config.rateLimit.ai.windowMs,
  max: config.rateLimit.ai.max,
  message: { success: false, error: 'AI rate limit exceeded. Please wait a moment.' },
  standardHeaders: true,
  legacyHeaders: false,
})

module.exports = {
  getSecurityMiddleware,
  generalLimiter,
  strictLimiter,
  aiLimiter,
}

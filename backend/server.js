/**
 * Portfolio Backend — Production Server
 *
 * Architecture: Clean layered design
 *   server.js → routes → services → models/utils
 *
 * Features:
 *   - Structured logging (Pino)
 *   - Redis caching with graceful fallback
 *   - MongoDB with connection pooling + indexes
 *   - Comprehensive security middleware stack
 *   - Request ID tracing
 *   - Graceful shutdown
 *   - Health check + metrics endpoints
 */

const express = require('express')
const config = require('./src/config')
const logger = require('./src/utils/logger')
const { connectDB, getDBStatus, closeDB } = require('./src/config/database')
const { initRedis, getRedisStatus, closeRedis } = require('./src/config/redis')
const { getSecurityMiddleware, generalLimiter } = require('./src/middleware/security')
const requestId = require('./src/middleware/requestId')
const requestLogger = require('./src/middleware/requestLogger')
const errorHandler = require('./src/middleware/errorHandler')
const { success, error } = require('./src/utils/response')

// Routes
const contactRouter = require('./src/routes/contact')
const aiRouter = require('./src/routes/ai')

const app = express()
const startTime = Date.now()
let requestCount = 0

// ── Request tracking ──
app.use((req, res, next) => { requestCount++; next() })

// ── Middleware Stack ──
app.use(express.json({ limit: '10kb' }))
app.use(requestId)
app.use(requestLogger)
getSecurityMiddleware().forEach(mw => app.use(mw))
app.use('/api', generalLimiter)

// ── API Routes ──
app.use('/api/contact', contactRouter)
app.use('/api/ai', aiRouter)

// ── Health Check ──
app.get('/api/health', (req, res) => {
  const db = getDBStatus()
  const redis = getRedisStatus()

  const healthy = db.connected // Redis is optional
  const status = healthy ? 'ok' : 'degraded'

  return res.status(healthy ? 200 : 503).json({
    status,
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor((Date.now() - startTime) / 1000)}s`,
    services: {
      database: db,
      cache: redis,
    },
    environment: config.nodeEnv,
  })
})

// ── Metrics (lightweight) ──
app.get('/api/metrics', (req, res) => {
  const mem = process.memoryUsage()
  return success(res, {
    uptime: `${Math.floor((Date.now() - startTime) / 1000)}s`,
    requests: requestCount,
    memory: {
      rss: `${Math.round(mem.rss / 1024 / 1024)}MB`,
      heap: `${Math.round(mem.heapUsed / 1024 / 1024)}/${Math.round(mem.heapTotal / 1024 / 1024)}MB`,
    },
    pid: process.pid,
    node: process.version,
  })
})

// ── 404 ──
app.use((req, res) => {
  error(res, `Route ${req.method} ${req.originalUrl} not found`, 404)
})

// ── Global Error Handler ──
app.use(errorHandler)

// ── Startup ──
async function start() {
  logger.info({ port: config.port, env: config.nodeEnv }, '🚀 Starting server...')

  // Connect services (non-blocking — server starts even if one fails)
  await connectDB()
  initRedis()

  const server = app.listen(config.port, () => {
    logger.info({ port: config.port, env: config.nodeEnv }, `🚀 Server running on port ${config.port}`)
  })

  // ── Graceful Shutdown ──
  const shutdown = async (signal) => {
    logger.info({ signal }, 'Shutdown signal received')

    server.close(async () => {
      logger.info('HTTP server closed')

      try {
        await closeDB()
        await closeRedis()
      } catch (err) {
        logger.error({ err: err.message }, 'Error during cleanup')
      }

      logger.info('Graceful shutdown complete')
      process.exit(0)
    })

    // Force shutdown after 10s
    setTimeout(() => {
      logger.error('Forced shutdown — timeout exceeded')
      process.exit(1)
    }, 10000)
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))

  // ── Unhandled Errors ──
  process.on('uncaughtException', (err) => {
    logger.fatal({ err: err.message, stack: err.stack }, 'Uncaught Exception')
    process.exit(1)
  })

  process.on('unhandledRejection', (reason) => {
    logger.fatal({ reason: String(reason) }, 'Unhandled Rejection')
    process.exit(1)
  })
}

start()

module.exports = app // Export for testing

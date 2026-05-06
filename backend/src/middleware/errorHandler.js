/**
 * Global Error Handler
 * Catches all unhandled errors and returns consistent error responses.
 * Never leaks stack traces or internal details in production.
 */
const logger = require('../utils/logger')
const { error } = require('../utils/response')

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  const requestId = req.id || 'unknown'

  // Log full error with stack trace
  logger.error({
    requestId,
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    stack: err.stack,
    name: err.name,
  }, 'Unhandled error')

  // ── Mongoose Validation Error ──
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message)
    return error(res, messages.join(', '), 400)
  }

  // ── Mongoose Duplicate Key ──
  if (err.code === 11000) {
    return error(res, 'Duplicate entry', 409)
  }

  // ── CORS Error ──
  if (err.message === 'Not allowed by CORS') {
    return error(res, 'CORS policy: origin not allowed', 403)
  }

  // ── JSON Parse Error ──
  if (err.type === 'entity.parse.failed') {
    return error(res, 'Invalid JSON in request body', 400)
  }

  // ── Default ──
  return error(res, 'Internal server error', 500, err.message)
}

module.exports = errorHandler

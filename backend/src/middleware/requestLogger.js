/**
 * Request Logger Middleware
 * Logs every request with method, URL, status, and response time.
 */
const logger = require('../utils/logger')

function requestLogger(req, res, next) {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      requestId: req.id,
    }

    if (res.statusCode >= 400) {
      logger.warn(logData, 'Request completed with error')
    } else {
      logger.info(logData, 'Request completed')
    }
  })

  next()
}

module.exports = requestLogger

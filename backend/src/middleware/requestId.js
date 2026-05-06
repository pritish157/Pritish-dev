/**
 * Request ID Middleware
 * Attaches a unique ID to every request for distributed tracing.
 * The ID is logged with every request and returned in response headers.
 */
const { v4: uuidv4 } = require('uuid')

function requestId(req, res, next) {
  const id = req.headers['x-request-id'] || uuidv4()
  req.id = id
  res.setHeader('X-Request-Id', id)
  next()
}

module.exports = requestId

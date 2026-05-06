/**
 * Standardized API Response Helpers
 * Ensures consistent response shape across all endpoints.
 */

function success(res, data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    ...data,
    timestamp: new Date().toISOString(),
  })
}

function error(res, message = 'Internal server error', statusCode = 500, details = null) {
  const response = {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  }
  if (details && process.env.NODE_ENV !== 'production') {
    response.details = details
  }
  return res.status(statusCode).json(response)
}

function validationError(res, errors) {
  return res.status(400).json({
    success: false,
    error: 'Validation failed',
    errors: Array.isArray(errors) ? errors.map(e => e.msg || e) : [errors],
    timestamp: new Date().toISOString(),
  })
}

module.exports = { success, error, validationError }

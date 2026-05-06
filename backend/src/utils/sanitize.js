/**
 * Input Sanitization Utilities
 * Defense-in-depth against XSS, injection, and malformed input.
 */

/**
 * Strip dangerous HTML/script characters
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/[<>]/g, '')         // Strip angle brackets
    .replace(/javascript:/gi, '') // Strip JS protocol
    .replace(/on\w+\s*=/gi, '')   // Strip event handlers
    .trim()
}

/**
 * Sanitize an object's string values (shallow)
 */
function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return {}
  const clean = {}
  for (const [key, value] of Object.entries(obj)) {
    clean[key] = typeof value === 'string' ? sanitizeString(value) : value
  }
  return clean
}

/**
 * Validate and sanitize email
 */
function sanitizeEmail(email) {
  if (typeof email !== 'string') return ''
  return email.toLowerCase().trim().slice(0, 254)
}

module.exports = { sanitizeString, sanitizeObject, sanitizeEmail }

/**
 * Contact Routes — thin controller layer.
 * Validation here, business logic in contactService.
 */
const express = require('express')
const { body, validationResult } = require('express-validator')
const { submitContact } = require('../services/contactService')
const { strictLimiter } = require('../middleware/security')
const { success, validationError, error } = require('../utils/response')

const router = express.Router()

// POST /api/contact
router.post(
  '/',
  strictLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
    body('subject').optional().trim().isLength({ max: 200 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return validationError(res, errors.array())
      }

      const result = await submitContact(req.body)
      return success(res, { message: 'Message received!', id: result.id }, 201)
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router

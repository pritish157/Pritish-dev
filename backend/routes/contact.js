const express = require('express')
const { body, validationResult } = require('express-validator')
const nodemailer = require('nodemailer')
const Message = require('../models/Message')

const router = express.Router()

// ── Nodemailer transporter ──
const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  })

// POST /api/contact
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
    body('subject').optional().trim().isLength({ max: 200 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { name, email, subject, message } = req.body

    try {
      // 1. Save to MongoDB
      const saved = await Message.create({ name, email, subject, message })

      // 2. Send email notification (non-blocking — don't fail if email fails)
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          const transporter = createTransporter()
          await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `[Portfolio] ${subject || 'New message'} — from ${name}`,
            html: `
              <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;background:#0f0f23;color:#F1F5F9;padding:32px;border-radius:16px;border:1px solid rgba(139,92,246,0.3)">
                <h2 style="color:#8B5CF6;margin-bottom:4px">New Portfolio Message</h2>
                <hr style="border-color:rgba(139,92,246,0.2);margin-bottom:24px"/>
                <p><strong style="color:#94A3B8">From:</strong> ${name}</p>
                <p><strong style="color:#94A3B8">Email:</strong> ${email}</p>
                <p><strong style="color:#94A3B8">Subject:</strong> ${subject || 'N/A'}</p>
                <hr style="border-color:rgba(139,92,246,0.1);margin:16px 0"/>
                <p style="white-space:pre-wrap;color:#CBD5E1">${message}</p>
                <hr style="border-color:rgba(139,92,246,0.1);margin:16px 0"/>
                <p style="font-size:12px;color:#475569">Sent via portfolio contact form · ID: ${saved._id}</p>
              </div>
            `,
          })
        } catch (emailErr) {
          console.error('Email send failed (message saved):', emailErr.message)
        }
      }

      res.status(201).json({ success: true, message: 'Message received!' })
    } catch (err) {
      console.error('Contact route error:', err)
      res.status(500).json({ error: 'Server error. Please try emailing directly.' })
    }
  }
)

module.exports = router

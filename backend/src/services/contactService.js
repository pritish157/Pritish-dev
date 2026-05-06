/**
 * Contact Service — Business logic for contact form.
 * Handles: validation, DB save, email notification.
 */
const nodemailer = require('nodemailer')
const Message = require('../models/Message')
const config = require('../config')
const logger = require('../utils/logger')
const { sanitizeString, sanitizeEmail } = require('../utils/sanitize')

let transporter = null

function getTransporter() {
  if (!transporter && config.email.user && config.email.pass) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: config.email.user, pass: config.email.pass },
      pool: true,       // Reuse connections
      maxConnections: 3,
      maxMessages: 50,
    })
  }
  return transporter
}

/**
 * Process a contact form submission.
 * @param {{ name, email, subject, message }} data
 * @returns {Promise<{ id: string }>}
 */
async function submitContact(data) {
  // Sanitize
  const clean = {
    name: sanitizeString(data.name).slice(0, 100),
    email: sanitizeEmail(data.email),
    subject: sanitizeString(data.subject || '').slice(0, 200) || 'No Subject',
    message: sanitizeString(data.message).slice(0, 2000),
  }

  // Save to DB
  const saved = await Message.create(clean)
  logger.info({ messageId: saved._id, from: clean.email }, 'Contact message saved')

  // Send email notification (non-blocking)
  sendNotificationEmail(clean, saved._id).catch(err => {
    logger.error({ err: err.message, messageId: saved._id }, 'Email notification failed')
  })

  return { id: saved._id.toString() }
}

async function sendNotificationEmail(data, messageId) {
  const mailer = getTransporter()
  if (!mailer) return

  await mailer.sendMail({
    from: `"Portfolio Contact" <${config.email.user}>`,
    to: config.email.user,
    replyTo: data.email,
    subject: `[Portfolio] ${data.subject} — from ${data.name}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;background:#0f0f23;color:#F1F5F9;padding:32px;border-radius:16px;border:1px solid rgba(139,92,246,0.3)">
        <h2 style="color:#8B5CF6;margin-bottom:4px">New Portfolio Message</h2>
        <hr style="border-color:rgba(139,92,246,0.2);margin-bottom:24px"/>
        <p><strong style="color:#94A3B8">From:</strong> ${data.name}</p>
        <p><strong style="color:#94A3B8">Email:</strong> ${data.email}</p>
        <p><strong style="color:#94A3B8">Subject:</strong> ${data.subject}</p>
        <hr style="border-color:rgba(139,92,246,0.1);margin:16px 0"/>
        <p style="white-space:pre-wrap;color:#CBD5E1">${data.message}</p>
        <hr style="border-color:rgba(139,92,246,0.1);margin:16px 0"/>
        <p style="font-size:12px;color:#475569">Sent via portfolio contact form · ID: ${messageId}</p>
      </div>
    `,
  })

  logger.info({ messageId }, 'Email notification sent')
}

module.exports = { submitContact }

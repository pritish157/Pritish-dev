/**
 * Message Model — with production indexes.
 */
const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true, maxlength: 100 },
    email:   { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    subject: { type: String, trim: true, maxlength: 200, default: 'No Subject' },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    read:    { type: Boolean, default: false },
  },
  {
    timestamps: true,
    // Optimize: only return needed fields
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

// ── Indexes ──
// Compound: query messages by email + date (admin lookup)
MessageSchema.index({ email: 1, createdAt: -1 })

// Sort by newest first (default listing)
MessageSchema.index({ createdAt: -1 })

// TTL: auto-delete messages older than 90 days
MessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 })

// Filter unread messages
MessageSchema.index({ read: 1, createdAt: -1 })

module.exports = mongoose.model('Message', MessageSchema)

/**
 * Centralized Configuration
 * Single source of truth for all environment variables and app settings.
 */
require('dotenv').config()

const config = {
  // ── Server ──
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',

  // ── CORS ──
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  // ── MongoDB ──
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio',
    options: {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      retryReads: true,
    },
  },

  // ── Redis ──
  redis: {
    url: process.env.REDIS_URL || null,
    defaultTTL: 3600,       // 1 hour
    aiCacheTTL: 1800,       // 30 min for AI responses
    githubCacheTTL: 300,    // 5 min for GitHub API
  },

  // ── Email ──
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  // ── OpenAI ──
  openai: {
    apiKey: process.env.OPENAI_API_KEY || null,
    model: 'gpt-4o-mini',
    maxTokens: 200,
    temperature: 0.7,
  },

  // ── Rate Limiting ──
  rateLimit: {
    general: { windowMs: 15 * 60 * 1000, max: 100 },
    strict:  { windowMs: 15 * 60 * 1000, max: 10 },  // contact/ai
    ai:      { windowMs: 60 * 1000,       max: 15 },  // per minute
  },

  // ── Security ──
  security: {
    bodyLimit: '10kb',
    corsOrigins: [
      process.env.CLIENT_URL || 'http://localhost:5173',
      'https://pritish-dev.vercel.app',
    ].filter(Boolean),
  },
}

module.exports = config

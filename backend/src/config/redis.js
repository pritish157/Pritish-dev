/**
 * Redis Connection — Graceful Fallback
 * If Redis is unavailable, the app continues without caching.
 * All cache operations are safe to call even when Redis is down.
 */
const Redis = require('ioredis')
const config = require('./index')
const logger = require('../utils/logger')

let client = null
let isConnected = false

/**
 * Initialize Redis connection
 */
function initRedis() {
  if (!config.redis.url) {
    logger.info('Redis URL not configured — running without cache')
    return null
  }

  try {
    client = new Redis(config.redis.url, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        if (times > 5) {
          logger.warn('Redis: max retries reached, giving up')
          return null // Stop retrying
        }
        return Math.min(times * 200, 2000)
      },
      lazyConnect: true,
      enableOfflineQueue: false,
      connectTimeout: 5000,
    })

    client.on('connect', () => {
      isConnected = true
      logger.info('✅ Redis connected')
    })

    client.on('error', (err) => {
      isConnected = false
      logger.error({ err: err.message }, 'Redis connection error')
    })

    client.on('close', () => {
      isConnected = false
      logger.warn('Redis connection closed')
    })

    client.connect().catch(() => {
      logger.warn('Redis initial connection failed — running without cache')
    })

    return client
  } catch (err) {
    logger.error({ err: err.message }, 'Redis initialization failed')
    return null
  }
}

/**
 * Safe cache GET — returns null if Redis unavailable
 */
async function cacheGet(key) {
  if (!client || !isConnected) return null
  try {
    const data = await client.get(key)
    return data ? JSON.parse(data) : null
  } catch (err) {
    logger.warn({ key, err: err.message }, 'Cache GET failed')
    return null
  }
}

/**
 * Safe cache SET with TTL
 */
async function cacheSet(key, value, ttl = config.redis.defaultTTL) {
  if (!client || !isConnected) return false
  try {
    await client.set(key, JSON.stringify(value), 'EX', ttl)
    return true
  } catch (err) {
    logger.warn({ key, err: err.message }, 'Cache SET failed')
    return false
  }
}

/**
 * Safe cache DELETE
 */
async function cacheDel(key) {
  if (!client || !isConnected) return false
  try {
    await client.del(key)
    return true
  } catch (err) {
    logger.warn({ key, err: err.message }, 'Cache DEL failed')
    return false
  }
}

/**
 * Get Redis status for health checks
 */
function getRedisStatus() {
  return {
    configured: !!config.redis.url,
    connected: isConnected,
    status: client ? client.status : 'not_initialized',
  }
}

/**
 * Graceful shutdown
 */
async function closeRedis() {
  if (client) {
    await client.quit().catch(() => {})
    logger.info('Redis connection closed')
  }
}

module.exports = {
  initRedis,
  cacheGet,
  cacheSet,
  cacheDel,
  getRedisStatus,
  closeRedis,
}

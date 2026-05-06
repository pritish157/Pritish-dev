/**
 * MongoDB Connection — with retry, pooling, and graceful shutdown.
 */
const mongoose = require('mongoose')
const config = require('./index')
const logger = require('../utils/logger')

let isConnected = false

async function connectDB() {
  try {
    await mongoose.connect(config.mongo.uri, config.mongo.options)
    isConnected = true
    logger.info('✅ MongoDB connected')

    mongoose.connection.on('error', (err) => {
      isConnected = false
      logger.error({ err: err.message }, 'MongoDB runtime error')
    })

    mongoose.connection.on('disconnected', () => {
      isConnected = false
      logger.warn('MongoDB disconnected')
    })

    mongoose.connection.on('reconnected', () => {
      isConnected = true
      logger.info('MongoDB reconnected')
    })
  } catch (err) {
    isConnected = false
    logger.error({ err: err.message }, '❌ MongoDB connection failed')
    // Don't crash — server starts without DB so AI chat still works
  }
}

function getDBStatus() {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting']
  return {
    connected: isConnected,
    readyState: states[mongoose.connection.readyState] || 'unknown',
  }
}

async function closeDB() {
  await mongoose.connection.close()
  logger.info('MongoDB connection closed')
}

module.exports = { connectDB, getDBStatus, closeDB }

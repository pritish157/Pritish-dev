/**
 * Structured Logger — Pino
 * JSON logging in production, pretty-printed in development.
 * Every log line includes timestamp, level, request ID (if available).
 */
const pino = require('pino')
const config = require('../config')

const logger = pino({
  level: config.isProd ? 'info' : 'debug',
  ...(config.isProd
    ? {
        // Production: JSON logs (parseable by Grafana/ELK)
        formatters: {
          level: (label) => ({ level: label }),
        },
        timestamp: pino.stdTimeFunctions.isoTime,
      }
    : {
        // Development: pretty-printed
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
      }),
})

module.exports = logger

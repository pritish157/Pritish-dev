/**
 * PM2 Ecosystem Config — Production Process Manager
 *
 * Usage:
 *   pm2 start ecosystem.config.js --env production
 *   pm2 reload ecosystem.config.js   # Zero-downtime restart
 *   pm2 logs portfolio-api
 *   pm2 monit
 */
module.exports = {
  apps: [
    {
      name: 'portfolio-api',
      script: 'server.js',
      instances: 'max',           // Use all CPU cores
      exec_mode: 'cluster',       // Cluster mode for load balancing
      max_memory_restart: '256M', // Auto-restart on memory leak
      watch: false,
      autorestart: true,

      // ── Environment ──
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },

      // ── Logging ──
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      merge_logs: true,
      log_file: './logs/combined.log',

      // ── Graceful ──
      kill_timeout: 10000,        // Wait 10s for graceful shutdown
      listen_timeout: 8000,
      shutdown_with_message: true,

      // ── Health ──
      min_uptime: 5000,
      max_restarts: 10,
    },
  ],
}

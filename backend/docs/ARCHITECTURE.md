# Portfolio Backend — System Architecture

## Overview

Production-grade Node.js/Express backend powering a developer portfolio with AI chat and contact form.

---

## Architecture Diagram

```
                    ┌─────────────────────────────────────┐
                    │          Cloudflare CDN              │
                    │   (DDoS Protection + Edge Caching)  │
                    └──────────────┬──────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────┐
                    │          Nginx Reverse Proxy         │
                    │   (SSL, Rate Limit, Gzip, HTTP/2)   │
                    └──────────────┬──────────────────────┘
                                   │
              ┌────────────────────▼─────────────────────┐
              │            PM2 Cluster (N workers)        │
              │                                           │
              │  ┌─────────────────────────────────────┐  │
              │  │        Express Application           │  │
              │  │                                      │  │
              │  │  ┌──────────┐  ┌──────────────────┐ │  │
              │  │  │ Security │  │  Request Logger   │ │  │
              │  │  │  Stack   │  │  (Pino + Req ID)  │ │  │
              │  │  └────┬─────┘  └────────┬─────────┘ │  │
              │  │       │                 │            │  │
              │  │  ┌────▼─────────────────▼─────────┐ │  │
              │  │  │         Route Layer             │ │  │
              │  │  │   /api/contact  /api/ai/chat   │ │  │
              │  │  │   /api/health   /api/metrics   │ │  │
              │  │  └────────────┬────────────────────┘ │  │
              │  │               │                      │  │
              │  │  ┌────────────▼────────────────────┐ │  │
              │  │  │        Service Layer            │ │  │
              │  │  │  contactService  aiService      │ │  │
              │  │  └──────┬──────────────┬──────────┘ │  │
              │  │         │              │            │  │
              │  └─────────┼──────────────┼────────────┘  │
              └────────────┼──────────────┼───────────────┘
                           │              │
              ┌────────────▼───┐  ┌───────▼────────────┐
              │   MongoDB      │  │     Redis           │
              │   (Atlas)      │  │  (Cache + Sessions) │
              │                │  │                      │
              │  Messages      │  │  ai:chat:<hash>     │
              │  ├── Indexes   │  │  rate-limits         │
              │  └── TTL (90d) │  │  TTL: 30min          │
              └────────────────┘  └──────────────────────┘
```

---

## Clean Architecture Layers

### 1. Config Layer (`src/config/`)
- **`index.js`** — Single source of truth for all configuration
- **`database.js`** — MongoDB connection with pooling, retry, graceful shutdown
- **`redis.js`** — Redis with graceful fallback (app works without Redis)

### 2. Middleware Layer (`src/middleware/`)
- **`security.js`** — Helmet, CORS, rate limiters, mongo-sanitize, HPP, compression
- **`requestId.js`** — UUID per request for distributed tracing
- **`requestLogger.js`** — Pino-based structured request logging
- **`errorHandler.js`** — Global error handler (Mongoose, CORS, parse errors)

### 3. Route Layer (`src/routes/`)
- Thin controllers — validation only
- Delegates business logic to services
- Each route applies appropriate rate limiter

### 4. Service Layer (`src/services/`)
- **`contactService.js`** — sanitize → save → email (async)
- **`aiService.js`** — sanitize → cache check → OpenAI/RAG → cache set

### 5. Model Layer (`src/models/`)
- Mongoose schemas with indexes, TTL, validation, toJSON transforms

### 6. Utility Layer (`src/utils/`)
- **`logger.js`** — Pino (JSON prod, pretty dev)
- **`response.js`** — Consistent API response format
- **`sanitize.js`** — XSS/injection defense-in-depth

---

## Security Model

### Defense-in-Depth Layers

| Layer | Protection | Tool |
|-------|-----------|------|
| Edge | DDoS, Bot | Cloudflare |
| Proxy | Rate limit, SSL, HSTS | Nginx |
| App: Headers | XSS, clickjack, MIME | Helmet |
| App: Input | NoSQL injection | express-mongo-sanitize |
| App: Input | XSS strings | Custom sanitize.js |
| App: Input | Param pollution | hpp |
| App: Input | Body size | express.json limit |
| App: Auth | Rate limiting | express-rate-limit (tiered) |
| App: CORS | Origin whitelist | cors middleware |
| DB | Schema validation | Mongoose validators |
| DB | Auto-cleanup | TTL index (90 days) |

### Rate Limiting Tiers

| Tier | Endpoint | Window | Max |
|------|----------|--------|-----|
| General | All `/api/*` | 15 min | 100 |
| Strict | `/api/contact` | 15 min | 10 |
| AI | `/api/ai/chat` | 1 min | 15 |

---

## Caching Strategy

```
Request → Check Redis Cache → HIT? Return cached → MISS? Process → Cache result → Return
```

| Resource | Cache Key | TTL | Invalidation |
|----------|-----------|-----|-------------|
| AI Chat | `ai:chat:<md5(normalized_msg)>` | 30 min | Auto-expire |
| GitHub API | `github:repos` | 5 min | Auto-expire |

### Graceful Degradation
- Redis is **optional** — app starts and works without it
- All cache operations silently fail and return null
- Logging warns on Redis failures

---

## Scaling Strategy

### Current: Single Instance (Render)
```
Client → Render (single Dyno) → MongoDB Atlas
```

### Stage 2: Vertical + PM2
```
Client → Nginx → PM2 Cluster (N workers) → MongoDB Atlas + Redis
```

### Stage 3: Horizontal
```
Client → Cloudflare → Load Balancer → N App Servers → MongoDB Atlas (Replica Set) + Redis Cluster
```

### Stage 4: Enterprise
```
Client → Cloudflare → ALB → K8s Pods (auto-scale) → MongoDB Atlas (Sharded) + Redis Cluster + S3 + CDN
```

---

## MongoDB Optimization

### Indexes
```javascript
MessageSchema.index({ email: 1, createdAt: -1 })     // Admin lookup
MessageSchema.index({ createdAt: -1 })                 // Default sort
MessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 })  // 90-day TTL
MessageSchema.index({ read: 1, createdAt: -1 })       // Unread filter
```

### Connection Pooling
```javascript
maxPoolSize: 10,    // Max concurrent connections
minPoolSize: 2,     // Keep-alive connections
serverSelectionTimeoutMS: 5000,
socketTimeoutMS: 45000,
```

---

## Monitoring & Observability

### Endpoints
- `GET /api/health` — DB + Redis status, uptime
- `GET /api/metrics` — Memory, request count, PID

### Logging (Pino)
- **Production**: JSON (parseable by Grafana/Loki/ELK)
- **Development**: Pretty-printed with colors
- Every request logged with: method, URL, status, duration, IP, request ID

### Future: Observability Stack
```
App → Pino JSON logs → Loki → Grafana Dashboard
App → Prometheus metrics → Grafana
App → Sentry (error tracking)
App → OpenTelemetry (distributed tracing)
```

---

## Deployment

### Render (Current)
- Backend auto-deploys from GitHub `main` branch
- Environment variables set in Render dashboard
- Free tier with auto-sleep

### Docker (VPS)
```bash
docker-compose up -d --build
```

### PM2 (VPS)
```bash
pm2 start ecosystem.config.js --env production
pm2 reload ecosystem.config.js  # Zero-downtime restart
pm2 monit                        # Real-time monitoring
```

---

## CI/CD Pipeline

```
Push to main → GitHub Actions → Install → Security Audit → Jest Tests → Deploy to Render
```

---

## API Response Format

All endpoints return consistent shape:

```json
// Success
{
  "success": true,
  "data": {},
  "timestamp": "2025-01-01T00:00:00.000Z"
}

// Error
{
  "success": false,
  "error": "Human-readable message",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

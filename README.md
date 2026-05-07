# Pritish Dev Portfolio

Live site: [https://pritish-dev.vercel.app/](https://pritish-dev.vercel.app/)

Modern portfolio for Pritish Kumar Panda showcasing product-focused frontend engineering, full-stack development, AI-enhanced chat, and secure contact workflows.

## Overview

This repository contains a production-ready developer portfolio with:
- **Next.js 15 frontend** in `frontend/`
- **Node.js 20+ Express backend** in `backend/`
- **MongoDB** persistence for contact messages
- **Redis** caching support for AI responses
- **Secure middleware** with Helmet, rate limiting, sanitization, CORS, and request logging
- **Deployment-ready** Docker, Render, and PM2 setup

## Features

- Responsive portfolio UI with animated sections and project showcase
- Contact form with backend validation and message persistence
- AI chat endpoint for smart conversation or knowledge prompts
- Clean API response shape and structured logging
- Full-stack local development with a single root start command

## Tech Stack

- Frontend: `next`, `react`, `tailwindcss`, `framer-motion`, `typescript`
- Backend: `node`, `express`, `mongoose`, `redis`, `pino`, `nodemailer`
- Deployment: Vercel (frontend), Render / Docker / PM2 (backend)

## Getting Started

### Install dependencies

```bash
npm run install-all
```

### Run locally

```bash
npm run dev
```

This starts the backend and frontend together via the backend workspace.

### Backend-only development

```bash
cd backend
npm run dev
```

### Frontend-only development

```bash
cd frontend
npm run dev
```

## Environment Variables

Create a `.env` file in `backend/` with at least the following values:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/portfolio
REDIS_URL=redis://localhost:6379
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
OPENAI_API_KEY=your-openai-api-key
```

> `REDIS_URL` is optional. The backend can run without Redis, but caching is disabled.

## Scripts

From the root:
- `npm run dev` — start the full stack locally
- `npm run install-all` — install backend and frontend dependencies

From `backend/`:
- `npm run start` — run the backend server
- `npm run server` — run backend with `nodemon`
- `npm run client` — run the frontend dev server
- `npm run dev` — run backend and frontend concurrently
- `npm test` — run backend Jest tests
- `npm run docker:up` — bring up Docker Compose
- `npm run docker:down` — stop Docker Compose

From `frontend/`:
- `npm run dev` — run Next.js dev server
- `npm run build` — build production frontend
- `npm run start` — start built frontend
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript type check

## Project Structure

- `frontend/` — Next.js app, UI components, page layout, Tailwind styles
- `backend/` — Express API, middleware, services, database models, and deployment config
- `index.html` — root landing page placeholder for the project

## Deployment

- Frontend is designed for Vercel deployment
- Backend can deploy to Render, Docker, or a VPS with PM2

### Docker

```bash
cd backend
npm run docker:up
```

### PM2

```bash
cd backend
npm run pm2:start
```

## Testing

```bash
cd backend
npm test
```

## Notes

- The backend is production-hardened with security middleware, logging, and graceful Redis fallback.
- The frontend is built using modern React and animation libraries for an engaging portfolio experience.

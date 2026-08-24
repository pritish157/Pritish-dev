/**
 * Lightweight portfolio RAG knowledge base.
 * Retrieves the most relevant portfolio documents and turns them into
 * compact answers with section-level citations for the frontend chatbot.
 */

const portfolioDocuments = [
  {
    id: 'profile-overview',
    title: 'Profile overview',
    category: 'Overview',
    anchor: '/#skills',
    keywords: ['who is pritish', 'about', 'background', 'introduce', 'profile', 'full stack', 'mern', 'engineer'],
    summary:
      'Pritish Kumar Panda is a full-stack MERN engineer focused on production-ready systems, secure workflows, real-time features, and AI-ready product experiences.',
    details: [
      'He is a final-year CSE student targeting remote full-time and internship roles where he can own both backend workflows and user-facing polish.',
      'His strongest proof points are authentication flows, real-time messaging, deployment readiness, and compact product UX.',
    ],
  },
  {
    id: 'payguard',
    title: 'PayGuard Payment Switch',
    category: 'Project',
    anchor: '/#projects',
    keywords: ['payguard', 'payment switch', 'java', 'spring boot', 'iso 8583', 'idempotency', 'optimistic locking', 'reversal', 'dispute', 'fraud'],
    summary:
      'PayGuard is a resilient, high-throughput Payment Switch and Transaction Investigation System built with Java 21 and Spring Boot 4.x.',
    details: [
      'It processes atomic dual-account fund transfers (@Transactional) with standard ISO-8583 response codes and STAN generation.',
      'Enforces database-level @Version optimistic locking on Account and PaymentTransaction entities to prevent race conditions and double-debits.',
      'Features database-safe idempotency via unique constraints on idempotency_key, real-time fraud/velocity rules, in-memory sliding-window rate limiting, and 34 automated concurrency/unit tests.',
      'Includes JPA Specification multi-criteria transaction investigation, dispute lifecycle management, and an immutable chronological audit trail.',
    ],
  },
  {
    id: 'knot-of-love',
    title: 'Knot of Love',
    category: 'Project',
    anchor: '/#projects',
    keywords: ['knot of love', 'matrimonial', 'matchmaking', 'socket.io', 'chat', 'kyc', 'notifications', 'push'],
    summary:
      'Knot of Love is a production-style matrimonial platform built with MERN, Socket.IO, Firebase push notifications, and KYC moderation workflows.',
    details: [
      'The system includes real-time chat, read receipts, block and archive safety controls, profile discovery filters, and admin-side KYC approval.',
      'It demonstrates backend-heavy feature ownership across messaging, trust and safety, file uploads, notifications, and deployment.',
    ],
  },
  {
    id: 'event-management',
    title: 'Event Management System',
    category: 'Project',
    anchor: '/#projects',
    keywords: ['event management', 'events', 'booking', 'registration', 'organizer', 'attendee', 'nodemailer', 'rbac'],
    summary:
      'The Event Management System is a MERN application built around role-based operations, event workflows, and transactional communication.',
    details: [
      'It includes JWT authentication, admin and organizer controls, event CRUD, capacity handling, registration flows, and email confirmations through Nodemailer.',
      'This project is the clearest proof of structured API design, business rules, and operations-focused backend workflow design.',
    ],
  },
  {
    id: 'image-steganography',
    title: 'Image Steganography System',
    category: 'Project',
    anchor: '/#projects',
    keywords: ['steganography', 'image', 'lsb', 'canvas', 'encode', 'decode', 'png', 'secret message'],
    summary:
      'The Image Steganography System is a browser-based tool that hides and extracts text inside PNG files using LSB encoding and the Canvas API.',
    details: [
      'Everything runs client-side, so no image upload is required for encoding or decoding.',
      'It shows algorithmic problem solving, attention to data handling, and a clean product wrapper around low-level image manipulation.',
    ],
  },
  {
    id: 'auth-security',
    title: 'Authentication and security',
    category: 'Capability',
    anchor: '/#case-studies',
    keywords: ['authentication', 'auth', 'security', 'jwt', 'rbac', 'bcrypt', 'login', 'token', 'password reset'],
    summary:
      'Authentication and access control are one of Pritish\'s strongest engineering themes across the portfolio.',
    details: [
      'He has implemented JWT-based auth, role-based access control, bcrypt password protection, secure reset flows, rate limiting, and session-aware workflows.',
      'That pattern shows up most clearly in the Event Management System and in moderation and trust features across Knot of Love.',
    ],
  },
  {
    id: 'realtime-systems',
    title: 'Real-time systems',
    category: 'Capability',
    anchor: '/#case-studies',
    keywords: ['real-time', 'realtime', 'socket', 'websocket', 'live chat', 'presence', 'read receipts', 'instant'],
    summary:
      'Pritish has real proof with real-time features through Socket.IO-based messaging and interaction flows.',
    details: [
      'Knot of Love includes live messaging, read receipts, presence-aware communication, and broadcast-style updates.',
      'This shows understanding of connection lifecycle, state synchronization, and event-driven product behavior.',
    ],
  },
  {
    id: 'deployment-performance',
    title: 'Deployment and production thinking',
    category: 'Capability',
    anchor: '/#case-studies',
    keywords: ['deployment', 'production', 'render', 'vercel', 'cors', 'environment variables', 'performance', 'hosting'],
    summary:
      'The portfolio emphasizes production-minded delivery, not just demos, with deployed frontend and backend systems plus operational safeguards.',
    details: [
      'Pritish has deployed React frontends to Vercel and Express backends to Render while managing cross-origin configuration, environment setup, and debugging in hosted environments.',
      'He also focuses on responsive UX, performance tuning, and reducing interface friction so the frontend feels product-ready rather than academic.',
    ],
  },
  {
    id: 'ai-rag',
    title: 'AI and RAG work',
    category: 'Capability',
    anchor: '/#skills',
    keywords: ['ai', 'rag', 'chatbot', 'llm', 'openai', 'gpt', 'assistant', 'langchain', 'vector database'],
    summary:
      'Pritish is actively building AI-assisted web experiences, including this portfolio chatbot with retrieval-augmented grounding.',
    details: [
      'He understands how to connect LLM APIs into MERN applications and how retrieval helps ground responses in project-specific context.',
      'He is also exploring broader production AI tooling such as LangChain patterns and vector-database-backed retrieval.',
    ],
  },
  {
    id: 'engineering-mindset',
    title: 'Engineering mindset',
    category: 'Mindset',
    anchor: '/#about',
    keywords: ['engineering mindset', 'product thinking', 'systems design', 'scalability', 'maintainability', 'clean code'],
    summary:
      'Pritish combines product-first thinking with backend-first architecture, prioritizing secure services, observability, and polished UX.',
    details: [
      'He chooses patterns that support maintainable growth and future team handoff, such as clear API boundaries, role-based auth, and deployable feature flows.',
      'His portfolio emphasizes production readiness: error handling, logging, responsive interfaces, and accessible experiences.',
    ],
  },
  {
    id: 'resume-highlights',
    title: 'Resume highlights',
    category: 'Resume',
    anchor: '/#about',
    keywords: ['resume', 'cv', 'experience', 'summary', 'highlights', 'profile'],
    summary:
      'Pritish is a MERN Stack Developer with experience delivering real-time systems, authentication flows, and deployable web apps with strong backend foundations.',
    details: [
      'His resume highlights MERN delivery, Socket.IO real-time chat, JWT-based auth, email workflows, and AI-integrated applications.',
      'He also has experience with Java, Python, Docker, and is continuously improving deployment and performance practices.',
    ],
  },
  {
    id: 'availability',
    title: 'Availability and contact',
    category: 'Contact',
    anchor: '/#contact',
    keywords: ['available', 'availability', 'hire', 'job', 'internship', 'remote', 'open to work'],
    summary:
      'Pritish is open to remote and hybrid full-time opportunities, with recruiter-friendly availability for backend-heavy full-stack roles.',
    details: [
      'He is actively looking for roles where he can own backend architecture, system integration, and complete product delivery.',
      'Reach him via email at pritishpanda157@gmail.com or through LinkedIn and GitHub links on the portfolio.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact and availability',
    category: 'Contact',
    anchor: '/#contact',
    keywords: ['contact', 'email', 'linkedin', 'github', 'availability', 'hire', 'reach', 'connect'],
    summary:
      'Pritish is open to remote engineering opportunities and can be reached directly by email, LinkedIn, or GitHub.',
    details: [
      'Email: pritishpanda157@gmail.com',
      'LinkedIn: linkedin.com/in/pritish-kumar-panda-dev/ | GitHub: github.com/pritish157',
    ],
  },
]

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(text) {
  return [...new Set(normalize(text).split(' ').filter((token) => token.length > 2))]
}

const preparedDocuments = portfolioDocuments.map((document) => {
  const searchText = normalize(
    [document.title, document.category, document.summary, ...document.details, ...document.keywords].join(' '),
  )

  return {
    ...document,
    searchText,
    keywordSet: new Set(document.keywords.flatMap((keyword) => tokenize(keyword))),
  }
})

function scoreDocument(document, normalizedQuery, tokens) {
  let score = 0

  for (const keyword of document.keywords) {
    const normalizedKeyword = normalize(keyword)

    if (!normalizedKeyword) continue
    if (normalizedQuery.includes(normalizedKeyword)) {
      score += normalizedKeyword.includes(' ') ? 12 : 7
    }
  }

  for (const token of tokens) {
    if (document.keywordSet.has(token)) {
      score += 4
      continue
    }

    if (document.searchText.includes(token)) {
      score += 1
    }
  }

  if (normalizedQuery && document.searchText.includes(normalizedQuery)) {
    score += 8
  }

  return score
}

function pickSnippet(document, tokens) {
  const scoredDetails = document.details
    .map((detail) => ({
      detail,
      score: tokens.reduce((total, token) => total + (normalize(detail).includes(token) ? 1 : 0), 0),
    }))
    .sort((left, right) => right.score - left.score)

  return scoredDetails[0]?.score ? scoredDetails[0].detail : document.summary
}

function retrieveKnowledge(query, limit = 3) {
  const normalizedQuery = normalize(query)
  const tokens = tokenize(query)

  const matches = preparedDocuments
    .map((document) => ({
      ...document,
      score: scoreDocument(document, normalizedQuery, tokens),
      snippet: pickSnippet(document, tokens),
    }))
    .filter((document) => document.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)

  if (matches.length) {
    return matches.map(({ keywordSet, searchText, ...document }) => document)
  }

  return preparedDocuments
    .slice(0, 2)
    .map(({ keywordSet, searchText, ...document }) => ({ ...document, score: 0, snippet: document.summary }))
}

function buildKnowledgeContext(matches) {
  return matches
    .map(
      (match) =>
        `[${match.title} | ${match.category}]
Summary: ${match.summary}
Key details: ${match.details.join(' ')}`,
    )
    .join('\n\n')
}

function formatCitations(matches) {
  return matches.map((match) => ({
    id: match.id,
    title: match.title,
    category: match.category,
    label: match.title,
    href: match.anchor,
  }))
}

function queryKnowledge(query, preloadedMatches) {
  const matches = preloadedMatches?.length ? preloadedMatches : retrieveKnowledge(query)
  const primary = matches[0]
  const secondary = matches[1]

  if (!primary) {
    return {
      reply:
        'Ask about projects, authentication, real-time systems, deployment, AI work, or how Pritish fits a product engineering role.',
      citations: [],
    }
  }

  const segments = [primary.summary]

  if (primary.snippet && primary.snippet !== primary.summary) {
    segments.push(primary.snippet)
  }

  if (secondary && secondary.score >= Math.max(4, primary.score * 0.45)) {
    segments.push(`Related proof: ${secondary.title} - ${secondary.snippet}`)
  }

  return {
    reply: segments.join(' '),
    citations: formatCitations(matches),
  }
}

module.exports = {
  buildKnowledgeContext,
  formatCitations,
  queryKnowledge,
  retrieveKnowledge,
}

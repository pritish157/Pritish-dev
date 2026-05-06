export const siteConfig = {
  name: 'Pritish Kumar Panda',
  firstName: 'Pritish',
  role: 'MERN Stack Developer',
  secondaryRole: 'Full Stack Developer',
  location: 'India',
  email: 'pritishpanda157@gmail.com',
  siteUrl: 'https://pritish-dev.vercel.app',
  resumePath: '/resume.pdf',
  defaultImage: '/og-image.png',
  availability: 'Open to full-time roles, internships, and strong product teams',
  responseTime: 'Usually replies within 24 hours',
  headline:
    'Full Stack Developer in India building production-grade MERN systems with strong backend architecture, responsive frontends, and recruiter-ready product thinking.',
  description:
    'Pritish Kumar Panda is a MERN Stack Developer and Full Stack Developer in India building production-grade systems with React, Node.js, Express, MongoDB, REST APIs, Socket.IO, JWT auth, and AI integration.',
  keywords: [
    'Pritish Kumar Panda',
    'MERN Stack Developer',
    'Full Stack Developer India',
    'React Developer Portfolio',
    'Node.js Developer',
    'MERN Portfolio',
    'Full Stack Developer Portfolio',
    'JavaScript Developer India',
  ],
  socialLinks: [
    {
      label: 'GitHub',
      href: 'https://github.com/pritish157',
      shortLabel: '@pritish157',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/pritish-kumar-panda-dev/',
      shortLabel: 'LinkedIn',
    },
    {
      label: 'Email',
      href: 'mailto:pritishpanda157@gmail.com',
      shortLabel: 'Email',
    },
  ],
  heroRotations: [
    'API-first systems',
    'real-time products',
    'responsive interfaces',
    'AI-enabled workflows',
  ],
}

export const primaryNav = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const heroMetrics = [
  { label: 'Production systems built', value: '3' },
  { label: 'API routes designed', value: '40+' },
  { label: 'Core strengths', value: 'Auth + Realtime' },
  { label: 'Response promise', value: '< 24h' },
]

export const recruiterSignals = [
  'Ships full-stack systems end-to-end, not isolated UI demos.',
  'Comfortable with React, Node.js, MongoDB, REST APIs, Socket.IO, and JWT auth.',
  'Builds for operational clarity: dashboards, workflows, permissions, and trust.',
]

export const homeValueCards = [
  {
    title: 'Clean responsive UI',
    description: 'React interfaces designed to stay readable and usable on mobile first.',
  },
  {
    title: 'Strong backend logic',
    description: 'APIs, auth, realtime flows, and database structure that support real product behavior.',
  },
  {
    title: 'Recruiter-friendly proof',
    description: 'Projects are shown with stack, links, and engineering signals instead of walls of text.',
  },
]

export const homeQuickInfo = [
  'MERN Stack Developer based in India',
  'Comfortable with React, Node.js, Express, MongoDB, JWT, and Socket.IO',
  'Open to full-time roles, internships, and product teams',
]

export const homeStackStrip = [
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'REST APIs',
  'Socket.IO',
  'JWT Auth',
  'JavaScript',
]

export const projects = [
  {
    id: 'event-management-system',
    name: 'Vireon - Event Management App',
    summary:
      'A full-stack event operations app for publishing events, managing registrations, and reducing manual organizer work.',
    recruiterSignal:
      'Shows full-stack ownership across auth, dashboards, workflow automation, and API structure.',
    status: 'Production-ready case study',
    accent: '#62E0C1',
    repoUrl: 'https://github.com/pritish157/vireon',
    liveUrl: null,
    heroTag: 'Event operations',
    categories: ['auth', 'dashboard', 'operations'],
    badges: ['JWT Auth', 'RBAC', 'Dashboard Analytics', 'Email Automation'],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Nodemailer'],
    metrics: [
      { label: 'API surface', value: '18 endpoints' },
      { label: 'Roles', value: '3 user roles' },
      { label: 'Data model', value: '5 collections' },
      { label: 'Workflow', value: 'Registration + confirmation' },
    ],
    architecture: [
      { layer: 'Client', detail: 'Responsive React UI for event discovery, registration, and organizer controls.' },
      { layer: 'API', detail: 'Express routes with JWT middleware, role guards, CRUD handlers, and validation.' },
      { layer: 'Data', detail: 'MongoDB models for events, users, registrations, capacity, and analytics.' },
      { layer: 'Automation', detail: 'Transactional email flows for confirmations and user updates.' },
    ],
    highlights: [
      'Role-based dashboards for admin, organizer, and attendee journeys.',
      'Capacity limits, deadlines, and event state handling built into backend logic.',
      'Search, filtering, and attendance management designed for real operational use.',
    ],
    impact: [
      'Centralized multiple manual event workflows into one product flow.',
      'Demonstrated backend ownership and system modeling beyond basic CRUD.',
      'Created a portfolio project recruiters can map directly to product engineering work.',
    ],
  },
  {
    id: 'knot-of-love',
    name: 'Knot of Love',
    summary:
      'A trust-first matrimonial platform with realtime chat, KYC verification, moderation flows, and admin controls.',
    recruiterSignal:
      'Strong proof of realtime engineering, safety workflows, and product-level full-stack thinking.',
    status: 'Flagship MERN platform',
    accent: '#8CC8FF',
    repoUrl: null,
    liveUrl: 'https://knot-of-love.vercel.app',
    heroTag: 'Realtime product',
    categories: ['auth', 'realtime', 'trust'],
    badges: ['Socket.IO', 'JWT Auth', 'KYC Flow', 'Admin Panel', 'Push Notifications'],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Firebase', 'JWT Auth'],
    metrics: [
      { label: 'API surface', value: '40+ routes' },
      { label: 'Realtime', value: 'Messaging + receipts' },
      { label: 'Trust layer', value: 'KYC + moderation' },
      { label: 'Deployment', value: 'Render + Vercel' },
    ],
    architecture: [
      { layer: 'Client', detail: 'Vite + React SPA for matching, profile flows, and chat experiences.' },
      { layer: 'Realtime', detail: 'Socket.IO for conversations, delivery state, and read receipts.' },
      { layer: 'Backend', detail: 'Express APIs for identity, discovery, profile moderation, and admin workflows.' },
      { layer: 'Notifications', detail: 'Firebase push for offline engagement and user awareness.' },
    ],
    highlights: [
      'Realtime chat with delivery state and product-focused conversation flows.',
      'KYC approval, blocking, archiving, and reporting to improve user trust.',
      'Admin moderation system designed for platform operations instead of surface-only UI.',
    ],
    impact: [
      'Demonstrated product complexity across communication, trust, and moderation.',
      'Proved comfort with cross-cutting concerns such as auth, notifications, and deployment.',
      'Gives recruiters a clear example of scalable full-stack ownership.',
    ],
  },
  {
    id: 'image-steganography-system',
    name: 'Image Steganography System',
    summary:
      'A browser-based steganography tool that hides and extracts messages inside image pixels using LSB encoding.',
    recruiterSignal:
      'Shows browser API fluency, problem-solving depth, and clear technical execution.',
    status: 'Client-side engineering build',
    accent: '#F4B56F',
    repoUrl: null,
    liveUrl: null,
    heroTag: 'Algorithmic utility',
    categories: ['browser', 'privacy'],
    badges: ['Canvas API', 'LSB Encoding', 'No Uploads', 'Client-side Processing'],
    stack: ['JavaScript', 'Canvas API', 'HTML5', 'CSS3', 'Image Processing'],
    metrics: [
      { label: 'Processing', value: '100% client-side' },
      { label: 'Algorithm', value: 'LSB encoding' },
      { label: 'Format focus', value: 'PNG workflows' },
      { label: 'Privacy', value: 'No server upload' },
    ],
    architecture: [
      { layer: 'Interface', detail: 'Clean encode and decode flows built for non-technical users.' },
      { layer: 'Browser APIs', detail: 'Canvas-based pixel access for direct image manipulation.' },
      { layer: 'Logic', detail: 'Bit-level encoding and extraction using least significant bit patterns.' },
      { layer: 'Output', detail: 'Local file generation without external processing or persistence.' },
    ],
    highlights: [
      'Used browser-native APIs to solve an algorithmic problem with a practical UI.',
      'Balanced technical depth with usability for students and demonstration purposes.',
      'Kept privacy strong by avoiding server uploads entirely.',
    ],
    impact: [
      'Adds breadth beyond standard MERN CRUD patterns.',
      'Shows curiosity, experimentation, and implementation discipline.',
      'Improves portfolio credibility by mixing systems work with algorithmic thinking.',
    ],
  },
]

export const projectFilters = [
  { id: 'all', label: 'All projects' },
  { id: 'auth', label: 'Auth systems' },
  { id: 'realtime', label: 'Realtime' },
  { id: 'dashboard', label: 'Dashboards' },
  { id: 'trust', label: 'Trust flows' },
]

export const featuredProjectId = 'knot-of-love'

export const projectPrinciples = [
  {
    title: 'Each project shows product thinking',
    description: 'The focus is on how the system works and why it matters, not just visual polish.',
  },
  {
    title: 'Full-stack integration is the main proof',
    description: 'Auth, workflows, realtime features, and data models appear together instead of as isolated features.',
  },
  {
    title: 'Depth matters more than volume',
    description: 'A few strong systems create more trust than many shallow clones.',
  },
]

export const projectDeliverySignals = [
  'Role-based access and permissions',
  'Realtime events and user communication',
  'Admin and operations surfaces',
  'API design and data modeling',
  'Responsive, recruiter-readable UI systems',
]

export const domainCoverage = [
  { label: 'Frontend', value: 88 },
  { label: 'Backend', value: 90 },
  { label: 'Database', value: 82 },
  { label: 'Realtime', value: 78 },
  { label: 'AI / Integrations', value: 68 },
  { label: 'Deployment', value: 72 },
]

export const skillCategories = [
  {
    title: 'Frontend Engineering',
    summary: 'Responsive React interfaces, component systems, micro-interactions, and routing.',
    accent: '#8CC8FF',
    items: [
      { name: 'React.js', level: 92, detail: 'SPA architecture, reusable components, route-driven UX' },
      { name: 'JavaScript', level: 90, detail: 'Modern ES patterns, async flows, browser APIs' },
      { name: 'Tailwind CSS', level: 86, detail: 'Design systems, responsive spacing, visual consistency' },
      { name: 'Accessibility', level: 78, detail: 'Keyboard support, contrast, semantic structure' },
    ],
  },
  {
    title: 'Backend & APIs',
    summary: 'Express services, authentication, REST design, middleware, and integration workflows.',
    accent: '#62E0C1',
    items: [
      { name: 'Node.js', level: 90, detail: 'API services, app structure, async runtime patterns' },
      { name: 'Express.js', level: 88, detail: 'Routing, middleware chains, validation, controllers' },
      { name: 'REST APIs', level: 87, detail: 'Resource modeling, auth flows, dashboard endpoints' },
      { name: 'JWT Auth', level: 84, detail: 'Token-based auth, protected routes, role checks' },
    ],
  },
  {
    title: 'Data, Realtime & Integration',
    summary: 'Database modeling, live communication, and external service integration.',
    accent: '#F4B56F',
    items: [
      { name: 'MongoDB', level: 85, detail: 'Collections, schema design, queries, dashboard data' },
      { name: 'Socket.IO', level: 80, detail: 'Realtime messaging, receipts, event-driven updates' },
      { name: 'AI Integration', level: 72, detail: 'RAG and LLM-backed features in practical products' },
      { name: 'Firebase / Notifications', level: 70, detail: 'Push flows and user communication' },
    ],
  },
]

export const toolEcosystem = [
  'Git & GitHub',
  'Postman',
  'Vercel',
  'Render',
  'MongoDB Atlas',
  'VS Code',
  'Figma',
  'Framer Motion',
  'Linux CLI',
  'Vite',
]

export const currentlyLearning = [
  'TypeScript for safer frontend and API contracts',
  'Docker-based local environments and deployment workflows',
  'Redis and caching patterns for backend performance',
  'Applied AI product patterns beyond prototypes',
]

export const engineeringPrinciples = [
  {
    title: 'Backend-first product thinking',
    description: 'I usually map the API surface, auth model, and database shape before polishing the UI.',
  },
  {
    title: 'Trust and safety matter',
    description: 'Authentication, moderation, permissions, and secure defaults are part of the product, not afterthoughts.',
  },
  {
    title: 'UI should explain the system',
    description: 'Interfaces should make state, priorities, and user actions obvious across desktop and mobile.',
  },
  {
    title: 'Delivery quality is a feature',
    description: 'Responsive layout, performance, and clean interaction design are part of engineering credibility.',
  },
]

export const journeyTimeline = [
  {
    period: 'Current focus',
    title: 'Building recruiter-ready product engineering proof',
    description:
      'Refining a portfolio around systems that clearly show full-stack execution, architecture judgment, and communication clarity.',
  },
  {
    period: '2024 - 2025',
    title: 'Flagship MERN builds',
    description:
      'Built an event platform, a realtime matrimonial product, and an algorithmic browser utility with practical, production-minded UX.',
  },
  {
    period: 'Foundation',
    title: 'Computer science + systems mindset',
    description:
      'Grounded in DBMS, operating systems, networking, and data structures to support cleaner implementation decisions.',
  },
]

export const quickFacts = [
  { label: 'Base', value: 'India' },
  { label: 'Primary stack', value: 'React + Node + MongoDB' },
  { label: 'Role fit', value: 'Full Stack / MERN / Product Engineer' },
  { label: 'Availability', value: 'Open for 2026 opportunities' },
]

export const contactReasons = [
  'Hiring for a MERN Stack Developer or Full Stack Developer role',
  'Need someone comfortable with frontend polish and backend architecture',
  'Want a developer who can explain systems clearly to product and hiring teams',
]

export const pageMeta = {
  home: {
    key: 'home',
    path: '/',
    title: 'Pritish Kumar Panda | MERN Stack Developer & Full Stack Developer India',
    description:
      'Portfolio of Pritish Kumar Panda, a MERN Stack Developer and Full Stack Developer in India building responsive React interfaces, Node.js APIs, MongoDB systems, realtime workflows, and AI integrations.',
    keywords: ['Pritish Kumar Panda', 'MERN Stack Developer', 'Full Stack Developer India'],
  },
  projects: {
    key: 'projects',
    path: '/projects',
    title: 'Projects | Pritish Kumar Panda - MERN Stack Developer Portfolio',
    description:
      'Explore product-grade projects by Pritish Kumar Panda including an Event Management System, Knot of Love matrimonial platform, and an Image Steganography System.',
    keywords: ['MERN Portfolio', 'Full Stack Developer Portfolio', 'React Developer Portfolio'],
  },
  skills: {
    key: 'skills',
    path: '/skills',
    title: 'Skills | Pritish Kumar Panda - React, Node.js, MongoDB, APIs',
    description:
      'Technical skills of Pritish Kumar Panda across React.js, Node.js, Express.js, MongoDB, REST APIs, Socket.IO, JWT auth, and AI integration.',
    keywords: ['Node.js Developer', 'JavaScript Developer India', 'MERN Stack Developer'],
  },
  about: {
    key: 'about',
    path: '/about',
    title: 'About | Pritish Kumar Panda - Full Stack Developer India',
    description:
      'Learn about Pritish Kumar Panda, a full stack developer in India focused on production-grade MERN systems, strong backend architecture, and responsive product interfaces.',
    keywords: ['Full Stack Developer India', 'Pritish Kumar Panda', 'MERN Stack Developer'],
  },
  contact: {
    key: 'contact',
    path: '/contact',
    title: 'Contact | Hire Pritish Kumar Panda - MERN Stack Developer',
    description:
      'Contact Pritish Kumar Panda for MERN Stack Developer, Full Stack Developer, or product engineering opportunities. Resume download and direct recruiter contact available.',
    keywords: ['Hire MERN Developer', 'Contact Full Stack Developer India', 'Pritish Kumar Panda'],
  },
}

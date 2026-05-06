export const siteConfig = {
  name: 'Pritish Kumar Panda',
  firstName: 'Pritish',
  role: 'MERN Stack Developer',
  secondaryRole: 'Full Stack Engineer',
  location: 'India',
  email: 'pritishpanda157@gmail.com',
  siteUrl: 'https://pritish-dev.vercel.app',
  resumePath: '/resume.pdf',
  defaultImage: '/og-image.png',
  availability: 'Open to remote full-stack and product engineering roles',
  responseTime: 'Usually replies within 24 hours',
  headline:
    'Full-stack engineer building production-grade React, Node.js, and MongoDB systems with secure auth, realtime workflows, and practical AI integration.',
  description:
    'Portfolio of Pritish Kumar Panda, a MERN developer building scalable web applications with React, Node.js, Express, MongoDB, secure authentication, realtime features, and AI-enabled product workflows.',
  keywords: [
    'Pritish Kumar Panda',
    'MERN developer',
    'Full Stack Engineer',
    'React Developer',
    'Node.js Developer',
    'AI Web Developer',
    'Scalable Web Applications',
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
}

export const primaryNav = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/about', label: 'Depth' },
  { to: '/contact', label: 'Contact' },
]

export const heroMetrics = [
  { label: 'Flagship systems', value: '3' },
  { label: 'Largest API surface', value: '40+ routes' },
  { label: 'Core engineering proof', value: 'Auth + Realtime' },
  { label: 'Reply time', value: '< 24h' },
]

export const heroSignals = [
  'Scalable React frontends with clean interaction states',
  'Node.js APIs with JWT auth, RBAC, and operational workflows',
  'Realtime, AI-enabled, and trust-sensitive product features',
]

export const recruiterCopilotOptions = {
  roles: [
    {
      id: 'fullstack',
      label: 'Full-stack product engineer',
      summary: 'End-to-end ownership across UI, APIs, and workflow reliability.',
    },
    {
      id: 'backend',
      label: 'Backend-heavy engineer',
      summary: 'Stronger emphasis on auth, route design, data flow, and operational logic.',
    },
    {
      id: 'frontend',
      label: 'Frontend + UX engineer',
      summary: 'Responsive interfaces with clearer hierarchy, system-aware UI, and product polish.',
    },
    {
      id: 'platform',
      label: 'Product systems engineer',
      summary: 'Comfortable where permissions, trust, automation, and product operations intersect.',
    },
  ],
  stages: [
    {
      id: 'startup',
      label: 'Startup / MVP',
      summary: 'Teams that need fast product delivery without sloppy system boundaries.',
    },
    {
      id: 'growth',
      label: 'Growth-stage product',
      summary: 'Products where auth, reliability, and evolving workflows need cleaner structure.',
    },
    {
      id: 'ops',
      label: 'Operations-heavy platform',
      summary: 'Systems with dashboards, approvals, admin tooling, and business-critical rules.',
    },
  ],
  priorities: [
    {
      id: 'auth',
      label: 'Secure auth + permissions',
      focus: 'auth',
      projectIds: ['knot-of-love', 'event-management-system'],
      strengths: ['JWT auth flows', 'role guards', 'permission-aware product design'],
    },
    {
      id: 'realtime',
      label: 'Realtime communication',
      focus: 'realtime',
      projectIds: ['knot-of-love'],
      strengths: ['Socket.IO', 'delivery state', 'event-driven UX'],
    },
    {
      id: 'dashboard',
      label: 'Dashboards + workflows',
      focus: 'dashboard',
      projectIds: ['event-management-system', 'knot-of-love'],
      strengths: ['admin tooling', 'workflow clarity', 'operational UI'],
    },
    {
      id: 'trust',
      label: 'Trust-sensitive systems',
      focus: 'trust',
      projectIds: ['knot-of-love', 'image-steganography-system'],
      strengths: ['KYC and moderation', 'privacy-first flows', 'backend-enforced constraints'],
    },
    {
      id: 'performance',
      label: 'Scalable web delivery',
      focus: 'deployment',
      projectIds: ['event-management-system', 'knot-of-love'],
      strengths: ['split deployment', 'production routing', 'lighter UX performance work'],
    },
  ],
}

export const systemMapNodes = [
  {
    id: 'auth',
    label: 'Auth',
    summary: 'JWT-secured routes, role-aware UI, and backend permission checks that stay tied to workflow boundaries.',
    evidence: [
      'Role-based dashboards and protected journeys in Vireon.',
      'Identity-aware access control and moderation paths in Knot of Love.',
      'Server-side guards used for critical actions instead of trusting the UI alone.',
    ],
    projectIds: ['event-management-system', 'knot-of-love'],
  },
  {
    id: 'api',
    label: 'API',
    summary: 'REST endpoints structured around product actions like registration, discovery, moderation, and admin operations.',
    evidence: [
      '18 endpoints in Vireon for event workflows and user role behavior.',
      '40+ routes in Knot of Love covering discovery, chat, moderation, and trust systems.',
      'Controllers shaped around business flows instead of page-by-page hacks.',
    ],
    projectIds: ['event-management-system', 'knot-of-love'],
  },
  {
    id: 'database',
    label: 'Database',
    summary: 'MongoDB models designed for stateful workflows, not just flat records.',
    evidence: [
      'Collections structured around users, events, registrations, and analytics in Vireon.',
      'Profile, match, conversation, and moderation state represented as product data in Knot of Love.',
      'Browser-only image processing in the steganography utility avoids remote storage entirely.',
    ],
    projectIds: ['event-management-system', 'knot-of-love', 'image-steganography-system'],
  },
  {
    id: 'realtime',
    label: 'Realtime',
    summary: 'Event-driven product behavior where live state matters to the user experience.',
    evidence: [
      'Socket.IO conversation rooms, read receipts, and delivery feedback in Knot of Love.',
      'Realtime thinking applied as product behavior instead of decorative notifications.',
      'UI state kept focused on conversation clarity rather than noisy, global updates.',
    ],
    projectIds: ['knot-of-love'],
  },
  {
    id: 'deployment',
    label: 'Deployment',
    summary: 'Frontend/backend separation, environment-aware API targeting, and production-friendly hosting patterns.',
    evidence: [
      'Vercel frontend plus Render backend deployment strategy in production-facing projects.',
      'Cross-origin configuration treated as a real product requirement, not a final patch.',
      'Portfolio frontend itself optimized for lighter client routing and smoother scroll behavior.',
    ],
    projectIds: ['event-management-system', 'knot-of-love'],
  },
  {
    id: 'ai',
    label: 'AI',
    summary: 'Practical AI integration through portfolio tooling and AI-aware product direction rather than superficial novelty.',
    evidence: [
      'Backend AI chat route with fallback knowledge retrieval in this portfolio.',
      'Applied AI positioned as a product feature layer, not a separate identity disconnected from engineering depth.',
      'Current growth path includes stronger AI workflows and contract-safe system integration.',
    ],
    projectIds: ['knot-of-love'],
  },
]

export const projectFilters = [
  { id: 'all', label: 'All systems' },
  { id: 'auth', label: 'Auth' },
  { id: 'realtime', label: 'Realtime' },
  { id: 'dashboard', label: 'Dashboards' },
  { id: 'trust', label: 'Trust flows' },
]

export const projects = [
  {
    id: 'knot-of-love',
    name: 'Knot of Love',
    summary:
      'A trust-first matrimonial platform built around verified profiles, realtime messaging, moderation workflows, and admin operations.',
    impactMetric: '40+ backend routes supporting matching, chat, moderation, and platform trust.',
    recruiterSignal:
      'Strong proof of product-level full-stack ownership across realtime communication, safety systems, admin tooling, and deployment.',
    status: 'Flagship MERN platform',
    accent: '#8CC8FF',
    repoUrl: null,
    liveUrl: 'https://knot-of-love.vercel.app',
    heroTag: 'Realtime + trust systems',
    categories: ['auth', 'realtime', 'trust'],
    badges: ['Socket.IO', 'JWT Auth', 'KYC Flow', 'Admin Panel', 'Push Notifications'],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Firebase', 'JWT Auth'],
    metrics: [
      { label: 'API surface', value: '40+ routes' },
      { label: 'Realtime layer', value: 'Messaging + receipts' },
      { label: 'Trust systems', value: 'KYC + moderation' },
      { label: 'Deployment', value: 'Render + Vercel' },
    ],
    architecture: [
      { layer: 'Client', detail: 'Vite + React SPA for discovery, profile flows, messaging, and admin journeys.' },
      { layer: 'Realtime', detail: 'Socket.IO rooms for conversations, delivery state, and read-receipt feedback.' },
      { layer: 'Backend', detail: 'Express APIs for auth, discovery, moderation, KYC review, and platform controls.' },
      { layer: 'Notifications', detail: 'Firebase push for offline engagement and user status awareness.' },
    ],
    engineeringDetails: {
      auth: [
        'JWT-secured session flow for protected product areas.',
        'Route guards and role-aware UI paths for users and admins.',
        'Trust-sensitive actions such as moderation and KYC review kept behind protected backend checks.',
      ],
      api: [
        'Resource-oriented routes for accounts, profiles, discovery, chat, moderation, and admin operations.',
        'Realtime updates layered on top of APIs rather than replacing core REST boundaries.',
        'Separation between user-facing flows and admin-control endpoints to keep contracts clearer.',
      ],
      data: [
        'MongoDB collections modeled around user profiles, conversations, match discovery, and moderation state.',
        'Document structure supports both profile presentation and operational review flows.',
        'Relationship-sensitive reads favor correctness and freshness over premature caching.',
      ],
      security: [
        'KYC approval, block/report/archive flows, and admin review paths raise trust across the platform.',
        'Permission checks exist at both the route and workflow level, not only in the UI.',
        'Push and chat interactions are framed around verified user identity rather than anonymous messaging.',
      ],
      performance: [
        'Socket events scoped to active conversations to avoid unnecessary broadcast noise.',
        'High-friction operations such as moderation and verification are separated from fast user actions.',
        'Frontend routing keeps the messaging and profile experience responsive without full-page reloads.',
      ],
      deployment: [
        'Frontend deployed on Vercel and backend on Render with environment-based API configuration.',
        'Cross-origin communication handled explicitly for production request safety.',
        'Push notification integration extends product behavior beyond active browser sessions.',
      ],
      caching: [
        'Current version prioritizes fresh relationship and moderation state over aggressive caching.',
        'Discovery and reference lookups are structured so a Redis-backed cache can be introduced later without breaking contracts.',
      ],
      scale: [
        'Safety workflows were designed as first-class product systems instead of afterthoughts.',
        'Clear separation of chat, verification, and moderation concerns reduces long-term product complexity.',
      ],
    },
    highlights: [
      'Realtime chat with delivery feedback and product-focused conversation flows.',
      'KYC approval, blocking, archiving, and reporting to improve user trust.',
      'Admin moderation system designed for operational review, not just surface management.',
    ],
    impact: [
      'Demonstrates scalable full-stack thinking across communication, trust, and product operations.',
      'Creates a stronger hiring signal than a standard CRUD app because the workflows mirror real platform concerns.',
      'Shows comfort with auth, deployment, notifications, and cross-cutting reliability concerns in one build.',
    ],
  },
  {
    id: 'event-management-system',
    name: 'Vireon - Event Management App',
    summary:
      'A full-stack event operations system for publishing events, managing registrations, automating confirmations, and reducing organizer overhead.',
    impactMetric: 'Multi-role dashboard flow with 18 backend endpoints and registration lifecycle controls.',
    recruiterSignal:
      'Clear evidence of backend ownership across auth, workflow automation, data modeling, and operational dashboards.',
    status: 'Production-grade case study',
    accent: '#62E0C1',
    repoUrl: 'https://github.com/pritish157/vireon',
    liveUrl: null,
    heroTag: 'Operations + dashboards',
    categories: ['auth', 'dashboard'],
    badges: ['JWT Auth', 'RBAC', 'Email Automation', 'Organizer Dashboard'],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Nodemailer'],
    metrics: [
      { label: 'API surface', value: '18 endpoints' },
      { label: 'User roles', value: '3 roles' },
      { label: 'Core model', value: '5 collections' },
      { label: 'Workflow', value: 'Registration + confirmation' },
    ],
    architecture: [
      { layer: 'Client', detail: 'Responsive React UI for event browsing, registrations, and organizer controls.' },
      { layer: 'API', detail: 'Express routes with JWT middleware, role checks, CRUD handlers, and validation.' },
      { layer: 'Data', detail: 'MongoDB models for events, users, registrations, capacity, and status analytics.' },
      { layer: 'Automation', detail: 'Transactional email flows for confirmations, updates, and organizer actions.' },
    ],
    engineeringDetails: {
      auth: [
        'JWT-based authentication with protected dashboards for admin, organizer, and attendee roles.',
        'Role boundaries help prevent organizer tools from leaking into attendee-facing experiences.',
        'Registration and event management actions are enforced through backend permission checks.',
      ],
      api: [
        'REST endpoints centered on event publishing, registration lifecycle, organizer actions, and analytics.',
        'Business rules such as deadline checks and seat availability live in the backend, not only in the UI.',
        'Controller separation keeps catalog, registration, and admin workflows easier to extend.',
      ],
      data: [
        'Collections model users, events, registrations, attendance state, and operational metrics.',
        'Event and registration data are shaped around real organizer workflows rather than demo-only CRUD.',
        'Structure supports filtering, lifecycle updates, and dashboard summaries from the same core model.',
      ],
      security: [
        'Protected routes and role guards reduce accidental access to organizer and admin operations.',
        'Capacity and registration rules are validated server-side to avoid client-only trust.',
        'Email-triggered workflows keep transactional communication tied to verified backend events.',
      ],
      performance: [
        'Dashboard queries focus on operational slices instead of rendering oversized, generic datasets.',
        'Search and filtering reduce the need for long manual scanning during event discovery.',
        'Frontend structure is split into user-specific surfaces instead of one overloaded dashboard.',
      ],
      deployment: [
        'Designed for split frontend/backend deployment with environment-based API targeting.',
        'Mail automation turns backend state changes into product communication without manual organizer work.',
        'Production configuration is shaped for portfolio-grade demos and future extension.',
      ],
      caching: [
        'Current catalogue size does not require a cache layer yet.',
        'Read-heavy event listings have a clear upgrade path to Redis or edge caching if traffic grows.',
      ],
      scale: [
        'Role separation and workflow-centric modeling make the system easier to extend into approval flows, payments, or reporting later.',
        'Operational logic is centralized enough to support additional organizer automation without a rewrite.',
      ],
    },
    highlights: [
      'Role-based dashboards for admin, organizer, and attendee journeys.',
      'Capacity limits, deadlines, and event state handling built into backend logic.',
      'Search, filtering, and registration management designed for real organizer workflows.',
    ],
    impact: [
      'Shows engineering maturity beyond simple event listing demos by modeling actual operations.',
      'Demonstrates backend-first thinking while still keeping the frontend readable and usable.',
      'Gives recruiters a project they can map directly to product operations and workflow ownership.',
    ],
  },
  {
    id: 'image-steganography-system',
    name: 'Image Steganography System',
    summary:
      'A browser-based utility that hides and extracts text inside image pixels using LSB encoding without uploading files to a server.',
    impactMetric: 'Entire processing pipeline runs in-browser for better privacy and zero backend dependency.',
    recruiterSignal:
      'Shows algorithmic thinking, browser API fluency, and the ability to turn a low-level technique into a usable product flow.',
    status: 'Client-side engineering build',
    accent: '#F4B56F',
    repoUrl: null,
    liveUrl: null,
    heroTag: 'Browser APIs + algorithms',
    categories: ['privacy'],
    badges: ['Canvas API', 'LSB Encoding', 'No Uploads', 'Client-side Processing'],
    stack: ['JavaScript', 'Canvas API', 'HTML5', 'CSS3', 'Image Processing'],
    metrics: [
      { label: 'Processing', value: '100% client-side' },
      { label: 'Algorithm', value: 'LSB encoding' },
      { label: 'Input focus', value: 'PNG workflows' },
      { label: 'Privacy model', value: 'No server upload' },
    ],
    architecture: [
      { layer: 'Interface', detail: 'Simple encode/decode paths designed for quick user understanding.' },
      { layer: 'Browser APIs', detail: 'Canvas access used for pixel inspection and mutation in the browser.' },
      { layer: 'Logic', detail: 'Bit-level embedding and extraction through least significant bit operations.' },
      { layer: 'Output', detail: 'Files are generated locally with no server roundtrip or remote persistence.' },
    ],
    engineeringDetails: {
      auth: [
        'Authentication is intentionally absent because the product runs entirely in the browser.',
        'The privacy boundary comes from local-only processing rather than account-based access.',
      ],
      api: [
        'No remote API dependency keeps the system fast, portable, and easy to demonstrate.',
        'The architecture is a useful contrast to backend-heavy projects because it proves browser-side depth too.',
      ],
      data: [
        'Image data is manipulated in memory through Canvas APIs instead of being stored remotely.',
        'Message encoding and decoding operate on deterministic pixel-level transformations.',
      ],
      security: [
        'Zero-upload workflow reduces data exposure and makes the privacy story easier to explain.',
        'Users retain direct control over source files and outputs throughout the full flow.',
      ],
      performance: [
        'Local processing removes network latency and keeps the feedback loop immediate.',
        'Direct browser APIs minimize architecture overhead for an algorithmic utility.',
      ],
      deployment: [
        'Static, front-end-only deployment keeps the system lightweight and simple to host.',
        'No backend services or data storage are needed to preserve the core value proposition.',
      ],
      caching: [
        'Caching is unnecessary because the workflow is session-local and computation-based.',
      ],
      scale: [
        'The system shows breadth by proving comfort with browser internals, not just API-backed apps.',
      ],
    },
    highlights: [
      'Uses browser-native APIs to solve an algorithmic problem with a usable interface.',
      'Balances technical depth with a privacy-conscious workflow that is easy to explain.',
      'Adds breadth to the portfolio beyond standard MERN CRUD patterns.',
    ],
    impact: [
      'Shows curiosity and implementation depth in a non-standard engineering problem.',
      'Improves hiring credibility by mixing product systems work with algorithmic reasoning.',
      'Provides a compact example of turning low-level logic into a clean user experience.',
    ],
  },
]

export const featuredProjectId = 'knot-of-love'

export const projectDeliverySignals = [
  'Secure auth and protected workflows',
  'Operational dashboards and admin controls',
  'Realtime communication or stateful user flows',
  'API contracts shaped around product behavior',
]

export const skillExperienceTabs = [
  {
    id: 'stack',
    label: 'Core stack',
    intro: 'The strongest fit is full-stack product work that needs clean UI, secure APIs, and maintainable data flow.',
    cards: [
      {
        title: 'Frontend systems',
        detail: 'React interfaces that stay readable on mobile, use clear state transitions, and support recruiter-friendly scan paths.',
        meta: 'React.js, Vite, Tailwind CSS, Framer Motion',
      },
      {
        title: 'Backend services',
        detail: 'Express APIs with auth, middleware, validation, and workflow-oriented business logic.',
        meta: 'Node.js, Express.js, JWT Auth, REST APIs',
      },
      {
        title: 'Data and realtime',
        detail: 'MongoDB modeling, event-driven messaging, and product behavior that depends on fresh state.',
        meta: 'MongoDB, Socket.IO, Firebase, integrations',
      },
    ],
  },
  {
    id: 'strengths',
    label: 'Engineering strengths',
    intro: 'The portfolio is optimized to show systems thinking, not just component-level UI work.',
    bullets: [
      'Designing permission-aware product flows instead of surface-only dashboards.',
      'Keeping backend rules authoritative for trust-sensitive operations.',
      'Turning product behavior into clear route, model, and workflow boundaries.',
      'Building responsive interfaces that explain system state rather than hiding it.',
    ],
    metrics: [
      { label: 'Frontend', value: '88%' },
      { label: 'Backend', value: '90%' },
      { label: 'Database', value: '82%' },
      { label: 'Realtime', value: '78%' },
    ],
  },
  {
    id: 'experience',
    label: 'Experience',
    intro: 'The current trajectory is toward product engineering roles where backend ownership and UI clarity matter equally.',
    timeline: [
      {
        period: 'Current focus',
        title: 'Recruiter-ready product engineering proof',
        description: 'Refining systems and portfolio storytelling to make architecture judgment obvious in fast hiring scans.',
      },
      {
        period: '2024 - 2025',
        title: 'Flagship MERN systems',
        description: 'Built event operations, realtime matrimonial workflows, and browser-side algorithmic tooling with practical UX.',
      },
      {
        period: 'Foundation',
        title: 'CS-backed systems mindset',
        description: 'Grounded in DBMS, networking, operating systems, and data structures to support cleaner implementation decisions.',
      },
    ],
  },
  {
    id: 'growth',
    label: 'Current focus',
    intro: 'The next layer is about stronger contracts, deployment maturity, and AI-assisted product architecture.',
    bullets: [
      'TypeScript for safer frontend and API contracts',
      'Docker-based local and deployment workflows',
      'Redis-backed caching for read-heavy service paths',
      'Applied AI product patterns beyond novelty demos',
    ],
    chips: ['Git & GitHub', 'Postman', 'Vercel', 'Render', 'MongoDB Atlas', 'Linux CLI', 'Figma'],
  },
]

export const engineeringPrinciples = [
  {
    title: 'Backend-first product thinking',
    description: 'API shape, auth boundaries, and data models should make the UI easier, not harder, to reason about.',
  },
  {
    title: 'Trust and permissions are product features',
    description: 'Moderation, verification, and role boundaries belong in the core design, not in a later cleanup pass.',
  },
  {
    title: 'UI should expose system clarity',
    description: 'The best interfaces make workflow state, constraints, and next actions obvious across desktop and mobile.',
  },
]

export const caseStudies = [
  {
    id: 'case-knot-of-love',
    projectId: 'knot-of-love',
    eyebrow: 'Case study 01',
    title: 'Designing trust, moderation, and realtime chat into one product system.',
    summary:
      'The challenge was not just building chat. It was keeping a sensitive social product reliable, moderated, and identity-aware without collapsing into one giant backend surface.',
    challenge:
      'A matrimonial product needs more than messaging. It needs trust signals, admin intervention paths, and user safety systems that still feel usable.',
    diagram: [
      { label: 'Client', detail: 'Discovery, profile, chat, and admin surfaces in React.' },
      { label: 'API', detail: 'Protected workflows for auth, discovery, moderation, and review.' },
      { label: 'Realtime', detail: 'Socket.IO for conversations and delivery state.' },
      { label: 'Trust layer', detail: 'KYC, reporting, blocking, and admin review actions.' },
    ],
    decisions: [
      {
        title: 'Separated trust workflows from conversation speed',
        detail: 'Realtime messaging remains responsive while moderation and KYC stay under stricter backend control.',
      },
      {
        title: 'Used permission boundaries as product architecture',
        detail: 'Admin actions, review states, and user-visible flows are modeled differently to reduce accidental overlap.',
      },
      {
        title: 'Kept deployment practical',
        detail: 'Frontend, backend, and push systems are split cleanly enough to ship and debug independently.',
      },
    ],
    wins: [
      'Shows a stronger systems signal than a generic social clone because trust is built into the architecture.',
      'Creates direct interview talking points around auth, moderation, realtime, and deployment.',
      'Balances product UX with operational control surfaces.',
    ],
  },
  {
    id: 'case-vireon',
    projectId: 'event-management-system',
    eyebrow: 'Case study 02',
    title: 'Turning event registration from basic CRUD into an operations workflow.',
    summary:
      'The core problem was reducing organizer friction while keeping role permissions, registration constraints, and communication logic reliable.',
    challenge:
      'Event products look simple until capacity rules, role differences, deadlines, and organizer actions all need to work together cleanly.',
    diagram: [
      { label: 'Discovery UI', detail: 'Users browse and register through a responsive React interface.' },
      { label: 'Workflow API', detail: 'Express endpoints enforce auth, registration rules, and organizer actions.' },
      { label: 'Data model', detail: 'Events, registrations, and status transitions support dashboard reporting.' },
      { label: 'Automation', detail: 'Email confirmations and updates reduce manual follow-up work.' },
    ],
    decisions: [
      {
        title: 'Put event rules in backend logic',
        detail: 'Capacity, deadlines, and role checks live with the APIs so organizer behavior stays consistent.',
      },
      {
        title: 'Modeled around operations, not just pages',
        detail: 'The system is easier to extend because workflows were defined before polishing the surfaces.',
      },
      {
        title: 'Kept the UI compact and role-aware',
        detail: 'Attendee and organizer experiences serve different jobs instead of sharing one overloaded interface.',
      },
    ],
    wins: [
      'Proves backend ownership and product-operations thinking in a straightforward domain.',
      'Creates a clean story around RBAC, workflow automation, and data modeling.',
      'Feels closer to a real internal tool or startup workflow product than a student demo.',
    ],
  },
]

export const contactReasons = [
  'Hiring for a MERN developer or full-stack product engineering role',
  'Need someone comfortable with frontend polish and backend architecture',
  'Want a developer who can explain system decisions clearly to product and engineering teams',
]

export const quickFacts = [
  { label: 'Base', value: 'India' },
  { label: 'Primary stack', value: 'React + Node + MongoDB' },
  { label: 'Best-fit roles', value: 'Full Stack / MERN / Product Engineer' },
  { label: 'Availability', value: 'Open for 2026 opportunities' },
]

export const pageMeta = {
  home: {
    key: 'home',
    path: '/',
    title: 'Pritish Kumar Panda | MERN Developer and Full Stack Engineer',
    description:
      'Portfolio of Pritish Kumar Panda, a MERN developer building scalable React, Node.js, Express, MongoDB, realtime, and AI-enabled web applications.',
    keywords: ['MERN developer', 'Full Stack Engineer', 'Scalable Web Applications'],
  },
  projects: {
    key: 'projects',
    path: '/projects',
    title: 'Projects | Pritish Kumar Panda - Engineering Portfolio',
    description:
      'Explore engineering case studies by Pritish Kumar Panda across secure auth, realtime workflows, event operations, and browser-side product engineering.',
    keywords: ['React Developer Portfolio', 'Node.js Developer Portfolio', 'Engineering Case Studies'],
  },
  skills: {
    key: 'skills',
    path: '/skills',
    title: 'Skills and Experience | Pritish Kumar Panda',
    description:
      'Technical strengths of Pritish Kumar Panda across React, Node.js, Express, MongoDB, auth systems, realtime flows, and AI integrations.',
    keywords: ['MERN developer skills', 'Full Stack Engineer India', 'Node.js Developer'],
  },
  about: {
    key: 'about',
    path: '/about',
    title: 'Engineering Depth | Pritish Kumar Panda',
    description:
      'A deeper look at how Pritish Kumar Panda approaches architecture, product workflows, and engineering tradeoffs in full-stack systems.',
    keywords: ['Engineering Portfolio', 'System Design Portfolio', 'Full Stack Engineer'],
  },
  contact: {
    key: 'contact',
    path: '/contact',
    title: 'Contact | Pritish Kumar Panda',
    description:
      'Contact Pritish Kumar Panda for MERN developer, React developer, Node.js developer, or full-stack product engineering opportunities.',
    keywords: ['Contact MERN developer', 'Hire React Developer', 'Hire Node.js Developer'],
  },
}

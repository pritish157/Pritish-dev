export type NavItem = {
  href: string;
  label: string;
};

export type ExternalLink = {
  label: string;
  href: string;
  shortLabel: string;
  description: string;
  category: "profile" | "project" | "contact";
};

export type Metric = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  impact: string;
  accent: string;
  preview: "chat" | "events" | "security" | "ops" | "agent" | "payment";
  stack: string[];
  metrics: Metric[];
  links: {
    live?: string;
    github?: string;
  };
  challenge: string;
  outcome: string[];
  architecture: string[];
  highlights: string[];
};

export type WorkExperience = {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
  technologies: string[];
};

export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
};

export type Certification = {
  title: string;
  issuer: string;
};

export type SkillGroup = {
  title: string;
  eyebrow: string;
  description: string;
  items: string[];
};

export const siteConfig = {
  name: "Pritish Kumar Panda",
  shortName: "Pritish.dev",
  role: "Backend Developer · Java & MERN Engineer",
  headline: "Designing & shipping production-grade REST APIs, payment switches & distributed systems.",
  subheadline:
    "B.Tech CSE (2026) graduate specialized in Java 21 / Spring Boot payment switching architectures, Node.js/Express REST APIs, concurrency control, database-safe idempotency, and secure authentication.",
  description:
    "Official engineering portfolio of Pritish Kumar Panda — Backend Developer skilled in Java 21, Spring Boot, Spring Security, MySQL/Hibernate, Node.js, Express.js, MongoDB, REST API Architecture, TOTP 2FA, Docker, and CI/CD.",
  email: "pritishpanda157@gmail.com",
  phone: "+91-6372591970",
  location: "India",
  siteUrl: "https://pritish-dev.vercel.app",
  github: "https://github.com/pritish157",
  linkedin: "https://www.linkedin.com/in/pritish-kumar-panda-dev",
  resumePath: "/pritish-resume.pdf",
  availability: "Seeking Backend or Full-Stack Developer roles (2026)"
} as const;

export const navigation: NavItem[] = [
  { href: "#profile", label: "Profile" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" }
];

export const quickAccessLinks: ExternalLink[] = [
  {
    label: "Portfolio",
    href: siteConfig.siteUrl,
    shortLabel: "Live site",
    description: "The current portfolio experience and landing surface.",
    category: "profile"
  },
  {
    label: "GitHub",
    href: siteConfig.github,
    shortLabel: "@pritish157",
    description: "Main GitHub profile with public code repositories.",
    category: "profile"
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    shortLabel: "Connect",
    description: "Professional profile, updates, and career history.",
    category: "profile"
  },
  {
    label: "PayGuard",
    href: "https://github.com/pritish157/PayGuard",
    shortLabel: "Payment Switch Engine",
    description: "Java 21 / Spring Boot switch with ISO-8583 codes, @Version locking, and fraud checks.",
    category: "project"
  },
  {
    label: "Knot of Love",
    href: "https://knot-of-love.vercel.app",
    shortLabel: "Matrimonial Platform",
    description: "40+ REST endpoints, TOTP 2FA, Socket.io chat, GitHub Actions CI/CD.",
    category: "project"
  },
  {
    label: "Vireon",
    href: "https://vireon-swart.vercel.app",
    shortLabel: "Event Platform",
    description: "10+ REST endpoints, Razorpay payment engine, concurrency seat protection.",
    category: "project"
  },
  {
    label: "AstroAgent",
    href: "https://astro-agent-wheat.vercel.app",
    shortLabel: "AI Assistant",
    description: "LLM API orchestration backend, middleware, and Jest test suite.",
    category: "project"
  }
];

export const heroSignals = [
  "Java 21 / Spring Boot Payment Switching & Transaction Engineering",
  "Concurrency Protection: @Version Optimistic Locking & Idempotency",
  "Production-grade Node.js / Express REST API Architecture",
  "Secure Auth: Spring Security RBAC + JWT Session Management + TOTP 2FA"
];

export const credibilityMetrics: Metric[] = [
  { label: "REST Endpoints Shipped", value: "70+" },
  { label: "Backend Flagship Systems", value: "04" },
  { label: "Industry Internships", value: "02" },
  { label: "B.Tech CSE Degree", value: "2026" }
];

export const trustPills = [
  "Java 21",
  "Spring Boot",
  "Spring Security",
  "Spring Data JPA",
  "MySQL",
  "Hibernate",
  "Node.js",
  "Express.js",
  "REST API Design",
  "MongoDB",
  "JWT + TOTP 2FA",
  "Socket.io",
  "Docker",
  "GitHub Actions",
  "JUnit / Test"
];

export const credibilityNotes = [
  {
    title: "GitHub-Verified Production Systems",
    detail: "Production-grade codebases featuring resilient payment switches, 70+ REST endpoints, CI/CD pipelines, and clean architecture."
  },
  {
    title: "Backend-First Concurrency & Rigor",
    detail: "Deep expertise in transactional integrity, @Version optimistic locking, ISO-8583 standard codes, database indexing, and auth flows."
  },
  {
    title: "Polyglot Architecture",
    detail: "Proven capability building high-throughput Java / Spring Boot services and scalable Node.js/MERN real-time applications."
  }
] as const;

export const featuredProjects: Project[] = [
  {
    id: "payguard",
    title: "PayGuard",
    eyebrow: "Payment Switch & Investigation Engine",
    summary:
      "Resilient, high-throughput payment switch built with Java 21 and Spring Boot 4.x, featuring atomic dual-account fund transfers, ISO-8583 response codes, database-enforced idempotency, and automated fraud/velocity rules.",
    impact:
      "Engineered database-enforced @Version optimistic locking on Account and PaymentTransaction entities to eliminate race conditions and double-spending, built dynamic JPA Specification transaction investigations, and established an immutable event audit trail.",
    accent: "#10B981",
    preview: "payment",
    stack: ["Java 21", "Spring Boot", "Spring Security", "Spring Data JPA", "MySQL", "Hibernate", "JWT", "Swagger / OpenAPI", "Maven"],
    metrics: [
      { label: "Core Switch", value: "Java 21 / Spring Boot" },
      { label: "Standard Codes", value: "ISO-8583 Compliant" },
      { label: "Concurrency Control", value: "@Version Optimistic Lock" },
      { label: "Automated Tests", value: "34 Concurrency & Unit Tests" }
    ],
    links: {
      github: "https://github.com/pritish157/PayGuard"
    },
    challenge:
      "Designing an electronic fund transfer switch that guarantees atomic balance consistency under concurrent traffic, prevents duplicate charge execution during network timeouts/retries, and enforces real-time fraud thresholds without degrading throughput.",
    outcome: [
      "Architected atomic dual-account fund transfers with @Transactional integrity, generating System Trace Audit Numbers (STAN) and standard ISO-8583 response codes (00 Success, 14 Invalid Account, 51 Insufficient Funds, 57 Blocked).",
      "Enforced database-level optimistic concurrency control via @Version on Account and PaymentTransaction entities to prevent simultaneous double-debits.",
      "Implemented database-safe idempotency via unique constraints on idempotency_key with automatic collision recovery and original response replay.",
      "Engineered a multi-rule fraud and velocity engine (amount limit > ₹50,000, 5 attempts/min velocity cap, frozen account blocking) and an in-memory sliding window rate limiter (20 req/min).",
      "Built dynamic multi-criteria transaction investigation via JPA Specifications and an immutable chronological audit trail tracking all payment lifecycle milestones.",
      "Wrote 34 automated unit, integration, concurrency, and security test cases verifying double-spending prevention and reversal integrity."
    ],
    architecture: [
      "Spring Boot 4.x REST API layer with SpringDoc OpenAPI 3.0 documentation and JWT-authenticated endpoints.",
      "Spring Security 6.x stateless filter chain with BCrypt password hashing and role-based access control (ADMIN, OPERATOR, AUDITOR).",
      "Transaction processing service with @Transactional boundary management, STAN generator, and ISO-8583 mapping.",
      "Optimistic locking (@Version) and unique idempotency keys in MySQL 8.0 / Hibernate ORM preventing duplicate charges.",
      "In-memory sliding window rate limiter filter backed by ConcurrentHashMap to throttle abusive traffic.",
      "Event-driven TransactionAudit entity pipeline logging immutable chronological state transitions."
    ],
    highlights: [
      "Production-ready payment switch with ISO-8583 standard response codes and STAN generation.",
      "Database-level optimistic locking and idempotency protection against double-spending and network retries.",
      "Multi-criteria JPA Specification transaction investigation and 34 automated concurrency/fraud tests."
    ]
  },
  {
    id: "knot-of-love",
    title: "Knot of Love",
    eyebrow: "Matrimonial Platform",
    summary:
      "Production-grade matrimonial platform featuring 40+ REST API endpoints, JWT + TOTP 2FA security, real-time Socket.io chat, and automated GitHub Actions CI/CD to Render.",
    impact:
      "Architected complete backend infrastructure with role-based access control (Admin, User, Guest), TOTP time-based OTP validation, optimized MongoDB collections, and CDN media delivery.",
    accent: "#8B5CF6",
    preview: "chat",
    stack: ["Node.js", "Express.js", "MongoDB", "Socket.io", "JWT", "TOTP 2FA", "Cloudinary", "ImageKit", "GitHub Actions"],
    metrics: [
      { label: "API Endpoints", value: "40+ Routes" },
      { label: "Security Layer", value: "JWT + TOTP 2FA" },
      { label: "Realtime Systems", value: "Socket.io Chat" },
      { label: "Deployment", value: "GitHub Actions → Render" }
    ],
    links: {
      live: "https://knot-of-love.vercel.app",
      github: "https://github.com/pritish157/knot-of-love"
    },
    challenge:
      "Designing a high-trust matrimonial platform requiring multi-role permissions, secure two-factor authentication for sensitive routes, zero-downtime media delivery, and optimized search query performance.",
    outcome: [
      "Architected and implemented 40+ REST API endpoints (auth, user profiles, media, admin) with role-based access control for Admin, User, and Guest roles using Node.js/Express.js.",
      "Designed and enforced secure authentication: JWT session management + TOTP 2FA with time-based OTP verification, protecting all sensitive routes.",
      "Engineered real-time chat and notification system using Socket.io; integrated Cloudinary and ImageKit for media upload, transformation, and CDN delivery.",
      "Applied MongoDB indexing and query optimisation across profile and search collections to improve data retrieval consistency and reduce query overhead.",
      "Configured GitHub Actions CI/CD pipeline for automated testing and deployment to Render, enabling fast, repeatable production releases."
    ],
    architecture: [
      "Node.js + Express REST server handling 40+ endpoints with custom security middleware.",
      "MongoDB database with query indexing across search and profile collections.",
      "Socket.io server instance for bidirectional real-time chat rooms and notifications.",
      "Cloudinary & ImageKit integrations for on-the-fly media transformations and global CDN delivery.",
      "GitHub Actions automated CI/CD pipeline triggering automated tests and deployment to Render."
    ],
    highlights: [
      "40+ REST endpoints with granular RBAC (Admin, User, Guest).",
      "Time-based OTP 2FA verification protecting sensitive actions.",
      "Automated CI/CD deployment pipeline with Render and GitHub Actions."
    ]
  },
  {
    id: "vireon",
    title: "Vireon",
    eyebrow: "Event Management Platform",
    summary:
      "Full-featured event management system with 10+ Express REST endpoints, end-to-end Razorpay payment processing, and server-side concurrent seat reservation safeguards.",
    impact:
      "Streamlines complete event booking lifecycles with order creation, payment webhooks, concurrency control to prevent overbooking, and transactional NodeMailer OTP communications.",
    accent: "#A855F7",
    preview: "events",
    stack: ["Node.js", "Express.js", "MongoDB", "Razorpay", "NodeMailer", "JWT", "GitHub Actions"],
    metrics: [
      { label: "REST Endpoints", value: "10+ Routes" },
      { label: "Payment Gateway", value: "Razorpay Full Lifecycle" },
      { label: "Concurrency", value: "Two-stage Seat Lock" },
      { label: "Notifications", value: "NodeMailer OTP" }
    ],
    links: {
      live: "https://vireon-swart.vercel.app",
      github: "https://github.com/pritish157/vireon"
    },
    challenge:
      "Handling concurrent booking edge cases and preventing ticket overbooking while processing asynchronous payment verifications and refunds reliably.",
    outcome: [
      "Built 10+ Express.js REST endpoints with optimised query logic, response shaping, and error handling for event listings, bookings, and admin operations.",
      "Integrated Razorpay end-to-end: order creation, checkout session, payment verification, refund processing, and webhook handling for async payment events.",
      "Designed a two-stage seat reservation flow with server-side validation to handle concurrent booking edge cases and prevent overbooking.",
      "Implemented NodeMailer OTP for account activation and booking confirmation emails; deployed continuously via GitHub Actions CI/CD."
    ],
    architecture: [
      "Express.js backend providing 10+ endpoints with custom response shaping and centralized error handling.",
      "Razorpay integration managing checkout sessions, webhook secret verification, and refund state management.",
      "Two-stage database reservation lock ensuring seat integrity during peak booking spikes.",
      "NodeMailer integration for asynchronous transactional emails (OTP activation & booking confirmations)."
    ],
    highlights: [
      "End-to-end Razorpay integration with secure webhook verification.",
      "Two-stage server-side seat reservation logic preventing overbooking.",
      "NodeMailer transactional OTP workflow and continuous deployment."
    ]
  },
  {
    id: "astro-agent",
    title: "AstroAgent",
    eyebrow: "AI-Powered Conversational Assistant",
    summary:
      "Node.js/Express backend orchestrating LLM API calls, managing session query histories, and executing rate-aware prompt middleware with Jest endpoint unit test coverage.",
    impact:
      "Delivers rapid structured responses from LLM APIs with robust request validation, rate control, and automated endpoint verification.",
    accent: "#3B82F6",
    preview: "agent",
    stack: ["Node.js", "Express.js", "LLM APIs", "Jest", "Middleware", "JavaScript"],
    metrics: [
      { label: "Backend Core", value: "Node.js / Express" },
      { label: "LLM Orchestration", value: "Rate-Aware Pipeline" },
      { label: "Test Suite", value: "Jest Endpoint Coverage" },
      { label: "History Layer", value: "Session Query Store" }
    ],
    links: {
      live: "https://astro-agent-wheat.vercel.app",
      github: "https://github.com/pritish157/AstroAgent"
    },
    challenge:
      "Orchestrating raw LLM API calls with reliable error handling, request validation middleware, session-based context, and rate-aware prompt throttling.",
    outcome: [
      "Built a Node.js/Express backend to orchestrate LLM API calls, manage session-based query history, and serve structured responses to the frontend.",
      "Designed API middleware for request validation, error handling, and rate-aware LLM prompt orchestration; wrote Jest unit tests for endpoint logic."
    ],
    architecture: [
      "Node.js / Express server managing LLM API requests and session memory.",
      "Custom express middleware stack validating payloads, enforcing rate limits, and catching exceptions.",
      "Jest test suite providing continuous unit verification for endpoint handlers."
    ],
    highlights: [
      "Custom API middleware for request validation & error handling.",
      "Session-based history store for multi-turn conversational context.",
      "Jest unit test suite ensuring endpoint reliability."
    ]
  },
  {
    id: "django-fuel-route",
    title: "Fuel Route Optimisation",
    eyebrow: "Backend Logistics Engine",
    summary:
      "Python/Django REST service calculating cost-optimized refueling stops along geographic routes to minimize total travel and fuel costs.",
    impact:
      "Demonstrates complex server-side algorithmic logic, geo-spatial data handling, and clean machine-to-machine API design.",
    accent: "#7C3AED",
    preview: "ops",
    stack: ["Python", "Django REST", "PostgreSQL", "Routing Algorithms", "REST API"],
    metrics: [
      { label: "Architecture", value: "Headless REST Engine" },
      { label: "Algorithm Focus", value: "Cost & Route Optimization" },
      { label: "Stack", value: "Python / Django" },
      { label: "Domain", value: "Logistics & GIS" }
    ],
    links: {
      github: "https://github.com/pritish157/Django-backend-fuel-route-optimisation-"
    },
    challenge:
      "Computing optimal refueling stops considering vehicle tank capacity, fuel consumption rate, and variable station pricing across multi-state routes.",
    outcome: [
      "Engineered an API capable of ingesting route data and returning optimized waypoints.",
      "Handled complex logic around range limits, fuel capacity, and dynamic pricing.",
      "Solidified pure backend system design without relying on visual crutches."
    ],
    architecture: [
      "Django REST Framework exposing routing calculation endpoints.",
      "Algorithmic layer evaluating route segments and station costs.",
      "Data modeling for stations, prices, and vehicle profiles."
    ],
    highlights: [
      "Pure algorithmic backend logic in Python/Django.",
      "Handling geospatial data structures and multi-factor optimization.",
      "Clean API contract for headless M2M consumption."
    ]
  },
  {
    id: "imagesteg",
    title: "ImageSteg",
    eyebrow: "Security & Cryptography Utility",
    summary:
      "Python utility embedding encrypted data into image pixels using Least Significant Bit (LSB) steganography techniques.",
    impact:
      "Demonstrates byte-level data manipulation, binary encoding, and cryptography-oriented problem solving.",
    accent: "#C084FC",
    preview: "security",
    stack: ["Python", "Cryptography", "Image Processing", "CLI", "Byte Manipulation"],
    metrics: [
      { label: "Technique", value: "LSB Steganography" },
      { label: "Interface", value: "Python CLI" },
      { label: "Data Integrity", value: "Lossless Extraction" },
      { label: "Domain", value: "Security" }
    ],
    links: {
      github: "https://github.com/pritish157/imagesteg."
    },
    challenge:
      "Encoding secret text payload into pixel channels without generating visual artifacts or compromising image header structures.",
    outcome: [
      "Implemented algorithms that parse and safely modify the Least Significant Bits of pixel arrays.",
      "Ensured data could be both accurately embedded and retrieved losslessly.",
      "Built a functional security utility completely from scratch."
    ],
    architecture: [
      "Python CLI reading raw byte streams.",
      "Bit-shifting engine embedding payloads into RGB color channels.",
      "Lossless decoder restoring exact binary content."
    ],
    highlights: [
      "Byte manipulation and low-level cryptography concepts.",
      "Lossless data hiding and recovery in Python.",
      "Independent CLI tool design."
    ]
  }
];

export const workExperiences: WorkExperience[] = [
  {
    company: "Rooman Technologies Pvt Ltd",
    location: "Bangalore",
    role: "Application Developer Intern",
    period: "Jan 2026 – May 2026",
    bullets: [
      "Built and integrated Node.js/Express backend features and React.js UI components end-to-end across the MERN stack within an Agile development team.",
      "Contributed to REST API development, participated in code reviews, and iterated on features through sprint cycles — prioritising code quality and timely delivery.",
      "Applied Java/JDBC for database-layer tasks; built working knowledge of HTTP/TCP-IP/DNS fundamentals to support reliable client-server communication in shipped features."
    ],
    technologies: ["Node.js", "Express.js", "React.js", "MERN Stack", "Core Java", "JDBC", "Agile"]
  },
  {
    company: "Parala Maharaja Engineering College (PMEC)",
    location: "Berhampur",
    role: "Web Development Intern",
    period: "May 2024 – Aug 2024",
    bullets: [
      "Integrated REST APIs and managed client-server data flow for dynamic, data-driven institutional web modules, ensuring reliable backend-to-frontend communication.",
      "Built responsive web interfaces across devices; collaborated with faculty stakeholders to iterate on requirements and deliver working features within deadlines."
    ],
    technologies: ["REST APIs", "JavaScript", "HTML5", "CSS3", "Web Modules", "Client-Server Data Flow"]
  }
];

export const educationList: Education[] = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Parala Maharaja Engineering College (PMEC)",
    location: "Berhampur, Odisha",
    period: "2022 – 2026"
  }
];

export const certificationList: Certification[] = [
  {
    title: "Complete Web Development Bootcamp",
    issuer: "Udemy"
  },
  {
    title: "Web Development Internship Certificate",
    issuer: "PMEC, Berhampur"
  }
];

export const skillGroups: SkillGroup[] = [
  {
    eyebrow: "Languages",
    title: "Core Programming",
    description: "Languages used for server logic, database interactions, concurrency control, and system algorithms.",
    items: ["Java 21 / Core Java", "JavaScript (ES6+)", "Python", "SQL"]
  },
  {
    eyebrow: "Backend Frameworks",
    title: "Server & Switch Architecture",
    description: "Enterprise payment switching, production REST APIs, session/token security, and middleware pipelines.",
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Spring Data JPA",
      "Node.js",
      "Express.js",
      "REST API Design",
      "JWT Auth",
      "TOTP 2FA",
      "Socket.io",
      "Sliding-Window Rate Limiting"
    ]
  },
  {
    eyebrow: "Databases & ORM",
    title: "Data Modeling & Storage",
    description: "Database schema design, indexing strategies, optimistic concurrency locking, and aggregation pipelines.",
    items: [
      "MySQL",
      "Hibernate ORM",
      "MongoDB",
      "Mongoose ODM",
      "Schema Design",
      "Indexing Strategies",
      "@Version Optimistic Locking",
      "Aggregation Pipelines",
      "Query Optimisation"
    ]
  },
  {
    eyebrow: "Systems & Standards",
    title: "Transactional Engineering",
    description: "Financial switch mechanisms, payment reversals, idempotency keys, and role-based access control.",
    items: [
      "ISO-8583 Response Codes",
      "Idempotency Controls",
      "Payment Reversals",
      "STAN Generation",
      "JPA Specifications",
      "Role-Based Access Control (RBAC)",
      "Immutable Audit Trails"
    ]
  },
  {
    eyebrow: "Testing & Quality",
    title: "Verification & Test Suites",
    description: "Automated unit, integration, concurrency, and security testing verifying contracts and double-spend protection.",
    items: [
      "JUnit / Spring Boot Test",
      "Jest",
      "Supertest",
      "Concurrency & Race Condition Testing",
      "Security Endpoint Testing",
      "Integration Testing"
    ]
  },
  {
    eyebrow: "DevOps & Cloud",
    title: "CI/CD & Deployment",
    description: "Containerization, automated release pipelines, server hosting, and API specification tooling.",
    items: [
      "Git",
      "GitHub",
      "GitHub Actions (CI/CD)",
      "Docker",
      "Docker Compose",
      "Maven",
      "Swagger / OpenAPI 3.0",
      "Vercel",
      "Render",
      "Linux CLI"
    ]
  },
  {
    eyebrow: "Integrations",
    title: "Third-Party & Ecosystem",
    description: "Payment processing gateways, cloud media management, and LLM API orchestrations.",
    items: ["Razorpay (Orders, Webhooks, Refunds)", "Cloudinary", "ImageKit", "LLM APIs", "NodeMailer"]
  }
];

export const contactReasons = [
  "Hiring for Backend Developer or Software Engineer roles (Java / Spring Boot / Node.js).",
  "Need an engineer with hands-on experience in payment switches, concurrency control, ISO-8583 standards, and REST API architecture.",
  "Looking for someone who has shipped production-grade code with database-level idempotency, JWT/TOTP security, and automated test coverage."
];

export const socialLinks = [
  {
    label: "GitHub",
    href: siteConfig.github,
    shortLabel: "@pritish157"
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    shortLabel: "LinkedIn"
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    shortLabel: siteConfig.email
  }
] as const;


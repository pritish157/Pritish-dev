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
  preview: "chat" | "events" | "security" | "ops" | "agent";
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
  role: "Backend Developer · MERN Stack Engineer",
  headline: "Designing & shipping production-grade REST APIs, secure auth & real-time systems.",
  subheadline:
    "B.Tech CSE (2026) graduate specialized in Node.js/Express REST API design, secure JWT + TOTP 2FA authentication, MongoDB query optimization, Socket.io real-time systems, and payment gateway integration.",
  description:
    "Official engineering portfolio of Pritish Kumar Panda — Backend-focused Full-Stack Developer skilled in Node.js, Express.js, MongoDB, REST API Architecture, TOTP 2FA, Razorpay, Docker, and CI/CD.",
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
  "Production-grade Node.js / Express REST API Design",
  "Secure Auth: JWT Session Management + TOTP 2FA",
  "MongoDB Aggregations, Indexing & Query Optimisation",
  "Realtime Systems with Socket.io & Payment Gates (Razorpay)"
];

export const credibilityMetrics: Metric[] = [
  { label: "REST Endpoints Shipped", value: "58+" },
  { label: "MERN Stack Systems", value: "03" },
  { label: "Industry Internships", value: "02" },
  { label: "B.Tech CSE Degree", value: "2026" }
];

export const trustPills = [
  "Node.js",
  "Express.js",
  "REST API Design",
  "MongoDB",
  "JWT + TOTP 2FA",
  "Socket.io",
  "Razorpay",
  "React.js",
  "Next.js",
  "Docker",
  "GitHub Actions",
  "Jest / Supertest"
];

export const credibilityNotes = [
  {
    title: "GitHub-Verified Code",
    detail: "Production repos with 40+ REST endpoints, CI/CD pipelines, and clean architecture."
  },
  {
    title: "Backend-First Rigor",
    detail: "Deep expertise in REST API design, query optimization, security middleware, and auth flows."
  },
  {
    title: "Full-Stack Capability",
    detail: "MERN stack proficiency with responsive React/Next.js frontends connected to robust Node servers."
  }
] as const;

export const featuredProjects: Project[] = [
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
    description: "Languages used for server logic, database interactions, scripting, and system algorithms.",
    items: ["JavaScript (ES6+)", "Core Java", "Python", "SQL"]
  },
  {
    eyebrow: "Backend",
    title: "Server & API Architecture",
    description: "Production REST APIs, session/token security, real-time messaging layers, and middleware pipelines.",
    items: ["Node.js", "Express.js", "REST API Design", "JWT Auth", "TOTP 2FA", "OAuth", "Socket.io", "NodeMailer", "Middleware Architecture"]
  },
  {
    eyebrow: "Databases",
    title: "Data Modeling & Storage",
    description: "Database schema design, indexing strategies, aggregation pipelines, and relational query design.",
    items: ["MongoDB", "Mongoose ODM", "Schema Design", "Indexing", "Aggregation Pipelines", "Query Optimisation", "MySQL"]
  },
  {
    eyebrow: "Frontend",
    title: "Client-Side Engineering",
    description: "Modern component architecture, state management, and responsive interface building.",
    items: ["React.js", "Next.js", "Redux Toolkit", "HTML5", "CSS3", "Tailwind CSS"]
  },
  {
    eyebrow: "Testing",
    title: "API Verification & Quality",
    description: "Automated unit and integration testing suites verifying REST endpoint contracts and logic.",
    items: ["Jest", "Supertest", "REST Endpoint Testing", "Unit Testing", "Integration Testing"]
  },
  {
    eyebrow: "DevOps & Cloud",
    title: "CI/CD & Deployment",
    description: "Containerization, automated release pipelines, server hosting, and version control workflows.",
    items: ["Git", "GitHub", "GitHub Actions (CI/CD)", "Docker", "Docker Compose", "Vercel", "Render", "Linux CLI"]
  },
  {
    eyebrow: "Integrations",
    title: "Third-Party & Ecosystem",
    description: "Payment processing, cloud media management, and LLM API orchestrations.",
    items: ["Razorpay (Orders, Checkout, Verification, Refunds, Webhooks)", "Cloudinary", "ImageKit", "LLM APIs"]
  }
];

export const contactReasons = [
  "Hiring for Backend or Full-Stack Developer roles (2026).",
  "Need a developer with strong REST API architecture, JWT/TOTP security, and MongoDB optimization experience.",
  "Looking for someone who has shipped production-grade MERN applications with real-time Socket.io and Razorpay integrations."
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


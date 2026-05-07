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
  preview: "chat" | "events" | "security" | "ops";
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

export type TimelineItem = {
  period: string;
  title: string;
  description: string;
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
  role: "Frontend Engineer With Full-Stack Depth",
  headline: "Building AI-era frontends with production-grade systems underneath.",
  subheadline:
    "I craft cinematic product interfaces, secure backend workflows, and performance-first web experiences that feel engineered from the first scroll.",
  description:
    "Premium portfolio of Pritish Kumar Panda, a frontend engineer with full-stack depth building modern product systems with Next.js, React, Node.js, realtime workflows, security-minded architecture, and AI-ready interaction design.",
  email: "pritishpanda157@gmail.com",
  location: "India",
  siteUrl: "https://pritish-dev.vercel.app",
  github: "https://github.com/pritish157",
  linkedin: "https://www.linkedin.com/in/pritish-kumar-panda-dev/",
  resumePath: "/resume.pdf",
  availability: "Open to 2026 full-time, internship, and selective freelance opportunities"
} as const;

export const navigation: NavItem[] = [
  { href: "#profile", label: "Profile" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
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
    description: "Main GitHub profile with public code and activity.",
    category: "profile"
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    shortLabel: "Connect",
    description: "Professional profile, updates, and hiring context.",
    category: "profile"
  },
  {
    label: "Knot of Love",
    href: "https://knot-of-love.vercel.app",
    shortLabel: "Live project",
    description: "Realtime trust-focused product with chat and moderation.",
    category: "project"
  },
  {
    label: "Vireon",
    href: "https://github.com/pritish157/vireon",
    shortLabel: "GitHub repo",
    description: "Event management app source and workflow architecture.",
    category: "project"
  }
];

export const heroSignals = [
  "Premium product interfaces with technical depth",
  "Realtime, trust-sensitive, and workflow-heavy systems",
  "Obsessive performance, motion, and shipping discipline"
];

export const credibilityMetrics: Metric[] = [
  { label: "Flagship systems", value: "03" },
  { label: "Product endpoints", value: "58+" },
  { label: "Realtime + trust flows", value: "Socket + KYC" },
  { label: "Deployment pattern", value: "Render + Vercel" }
];

export const trustPills = [
  "Next.js 15",
  "TypeScript",
  "Framer Motion",
  "GSAP",
  "Lenis",
  "Node.js",
  "MongoDB",
  "Socket.IO",
  "JWT Auth",
  "AI-ready UX",
  "Performance-first UI",
  "Product systems"
];

export const credibilityNotes = [
  {
    title: "GitHub-proof work",
    detail: "Public builds, live systems, and repo-linked engineering signals."
  },
  {
    title: "Recruiter scan speed",
    detail: "Clear product outcomes, architecture depth, and system metrics in one pass."
  },
  {
    title: "Best-fit roles",
    detail: "Frontend-heavy product engineering, full-stack systems, and AI-native interfaces."
  }
] as const;

export const featuredProjects: Project[] = [
  {
    id: "knot-of-love",
    title: "Knot of Love",
    eyebrow: "Realtime trust platform",
    summary:
      "A matrimonial product built around verified identity, realtime messaging, moderation workflows, and admin control surfaces.",
    impact:
      "Combines chat speed, platform safety, and operational review into one coherent product system.",
    accent: "#8B5CF6",
    preview: "chat",
    stack: ["React", "Node.js", "MongoDB", "Socket.IO", "Firebase", "JWT"],
    metrics: [
      { label: "API surface", value: "40+ routes" },
      { label: "Realtime layer", value: "Rooms + receipts" },
      { label: "Trust stack", value: "KYC + moderation" },
      { label: "Delivery", value: "Render + Vercel" }
    ],
    links: {
      live: "https://knot-of-love.vercel.app"
    },
    challenge:
      "The core challenge was making a sensitive social product feel fast and modern without compromising verification, safety, or moderation boundaries.",
    outcome: [
      "Realtime messaging with read receipts and presence-aware feedback.",
      "KYC, block, archive, and report flows designed as first-class trust systems.",
      "Admin workflows separated from user speed paths to keep the product safer and easier to evolve."
    ],
    architecture: [
      "React client for discovery, profile journeys, chat, and admin surfaces.",
      "Socket.IO rooms scoped to conversations instead of noisy global broadcasts.",
      "Express APIs for auth, discovery, moderation, and verification workflows.",
      "Firebase push notifications for offline engagement."
    ],
    highlights: [
      "Proves full-stack ownership across UX, auth, realtime, and deployment.",
      "Creates strong interview depth around trust-sensitive product design.",
      "Shows system thinking beyond CRUD and dashboard cosmetics."
    ]
  },
  {
    id: "vireon",
    title: "Vireon",
    eyebrow: "Event product brand layer",
    summary:
      "A modern event experience for discovery, registration, and organizer communication with a cleaner, product-facing interface.",
    impact:
      "Turns operational event workflows into a polished user-facing system with clear hierarchy and role-aware behavior.",
    accent: "#A855F7",
    preview: "events",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Nodemailer"],
    metrics: [
      { label: "User roles", value: "3 roles" },
      { label: "Workflow", value: "Registration lifecycle" },
      { label: "Core model", value: "5 collections" },
      { label: "Automation", value: "Transactional email" }
    ],
    links: {
      github: "https://github.com/pritish157/vireon"
    },
    challenge:
      "The surface needed to feel simple for attendees while still respecting organizer workflows, seat limits, deadlines, and state changes underneath.",
    outcome: [
      "Role-aware journeys for admins, organizers, and attendees.",
      "Sharper registration UX with confirmation-driven product feedback.",
      "Cleaner product framing for an operations-heavy backend."
    ],
    architecture: [
      "Responsive React UI for event browsing, registration, and organizer actions.",
      "Express routes for event publishing, permissions, and workflow rules.",
      "MongoDB models for events, registrations, and analytics slices.",
      "Email automation for confirmations and organizer updates."
    ],
    highlights: [
      "Shows frontend polish without hiding the workflow logic underneath.",
      "Good proof for product engineering roles that care about clarity and system behavior.",
      "Balances consumer UX with operational requirements."
    ]
  },
  {
    id: "suspicious-login-detection",
    title: "Suspicious Login Detection System",
    eyebrow: "Security signal engine",
    summary:
      "A security-focused flow for flagging anomalous sign-ins using device, IP, location, and session-risk signals before trust is granted.",
    impact:
      "Brings machine-learning-adjacent detection thinking into product UX instead of leaving security as a backend afterthought.",
    accent: "#7C3AED",
    preview: "security",
    stack: ["Python", "ML Heuristics", "Flask", "MongoDB", "Risk Scoring", "Email Alerts"],
    metrics: [
      { label: "Signal sources", value: "IP + geo + device" },
      { label: "Decision layer", value: "Risk scoring" },
      { label: "Protective action", value: "Alert + challenge" },
      { label: "Focus", value: "Account trust" }
    ],
    links: {},
    challenge:
      "Detection systems are only useful if the product can explain risk clearly and respond without burying users in false alarms or opaque states.",
    outcome: [
      "Risk scoring centered on abnormal session context rather than a single hardcoded rule.",
      "Product-friendly response states for alerts, step-up checks, and account protection.",
      "A stronger portfolio signal around applied security and AI-era detection thinking."
    ],
    architecture: [
      "Feature extraction from login context such as IP shifts, device changes, and geolocation jumps.",
      "Risk evaluation layer that turns signals into a usable confidence score.",
      "Alerting and response flow for suspicious sessions and protected account actions.",
      "Dashboard-ready event model for future review and investigation surfaces."
    ],
    highlights: [
      "Adds a security and anomaly-detection angle to the portfolio.",
      "Shows comfort with productizing technical signals into understandable UX.",
      "Useful talking point for AI, security, and platform roles."
    ]
  },
  {
    id: "event-management-platform",
    title: "Event Management Platform",
    eyebrow: "Workflow system behind Vireon",
    summary:
      "The operational core that powers publishing, registrations, capacity rules, confirmations, and dashboard reporting for event teams.",
    impact:
      "Demonstrates backend-first product architecture where rules, permissions, and automation drive the UX instead of patching it later.",
    accent: "#C084FC",
    preview: "ops",
    stack: ["Node.js", "Express", "MongoDB", "JWT", "RBAC", "Email Workflow"],
    metrics: [
      { label: "API surface", value: "18 endpoints" },
      { label: "Permissions", value: "RBAC" },
      { label: "State logic", value: "Deadlines + capacity" },
      { label: "Ops layer", value: "Organizer tooling" }
    ],
    links: {
      github: "https://github.com/pritish157/vireon"
    },
    challenge:
      "The system needed to model real event operations, not just store event data, while keeping organizer actions reliable and scalable.",
    outcome: [
      "Business rules such as seat limits and deadlines enforced at the API layer.",
      "Organizer workflows shaped around actual state transitions rather than generic CRUD.",
      "An operations story recruiters can map directly to internal tools and startup products."
    ],
    architecture: [
      "Express controllers shaped around publishing, registration, and operational actions.",
      "JWT-secured routes with role boundaries between attendee, organizer, and admin experiences.",
      "MongoDB collections modeled for event state, registrations, and reporting slices.",
      "Email confirmations triggered by trusted backend workflow changes."
    ],
    highlights: [
      "Strong proof of backend ownership and workflow modeling.",
      "Explains how product reliability starts in system boundaries, not only UI decisions.",
      "Pairs well with Vireon to show both product surface and platform core."
    ]
  }
];

export const experienceTimeline: TimelineItem[] = [
  {
    period: "Now",
    title: "AI-native product interface focus",
    description:
      "Leaning hard into premium frontend systems, motion discipline, and product experiences that feel built for the modern AI era."
  },
  {
    period: "2024 - 2025",
    title: "Full-stack product systems",
    description:
      "Built realtime communication workflows, event operations tooling, and trust-sensitive platform features across React, Node.js, and MongoDB."
  },
  {
    period: "Core foundation",
    title: "Systems-backed engineering mindset",
    description:
      "Grounded in DBMS, networking, operating systems, and data structures so architecture decisions stay practical under product pressure."
  }
];

export const skillGroups: SkillGroup[] = [
  {
    eyebrow: "Frontend",
    title: "Interface systems",
    description: "High-signal UI architecture, motion design, responsive layout systems, and obsessive detail around interaction quality.",
    items: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "GSAP"]
  },
  {
    eyebrow: "Backend",
    title: "Workflow engines",
    description: "Secure APIs, role-aware flows, validation layers, and backend logic that keeps product behavior trustworthy.",
    items: ["Node.js", "Express", "REST APIs", "JWT Auth", "RBAC", "Middleware"]
  },
  {
    eyebrow: "AI / ML",
    title: "Applied intelligence",
    description: "Practical AI-ready thinking focused on product outcomes, retrieval, anomaly signals, and feature-level integration.",
    items: ["RAG Concepts", "Prompt UX", "Risk Scoring", "Python", "ML Basics", "AI Product Thinking"]
  },
  {
    eyebrow: "Databases",
    title: "State and modeling",
    description: "Data shapes designed around workflows, relationships, moderation state, and operational reporting.",
    items: ["MongoDB", "Mongoose", "Schema Design", "Aggregation", "Indexing", "MySQL"]
  },
  {
    eyebrow: "DevOps",
    title: "Shipping discipline",
    description: "Deployment-aware engineering with environment boundaries, split hosting, and performance-sensitive delivery decisions.",
    items: ["Vercel", "Render", "Docker", "Environment Config", "CORS", "Performance"]
  },
  {
    eyebrow: "Tools",
    title: "Product workflow",
    description: "The stack around building, debugging, and collaborating on modern product systems with speed and clarity.",
    items: ["Git", "GitHub", "Postman", "Figma", "VS Code", "Linux CLI"]
  }
];

export const contactReasons = [
  "Hiring for frontend-heavy product engineering with full-stack ownership.",
  "Need premium UI craft without sacrificing backend clarity.",
  "Want an engineer who can explain system tradeoffs as clearly as they ship them."
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

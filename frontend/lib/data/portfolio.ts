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
  resumePath: "/pritish-resume.pdf",
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
    label: "AstroAgent",
    href: "https://astro-agent-wheat.vercel.app",
    shortLabel: "Live project",
    description: "Stateful AI astrologer with LangGraph and natal charts.",
    category: "project"
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
    href: "https://vireon-swart.vercel.app",
    shortLabel: "Live project",
    description: "Event management app with clean UI and workflows.",
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
    id: "astro-agent",
    title: "Aradhana AstroAgent",
    eyebrow: "Agentic AI Astrologer",
    summary:
      "A stateful, multi-turn AI astrology agent built with LangGraph.js, featuring astronomical planetary longitude calculations, real-time Server-Sent Events (SSE) token streaming, and dynamic SVG natal chart generation.",
    impact:
      "Demonstrates advanced state machine flow control, real-time streamed responses, and mathematical client-side visualization in a production-ready system.",
    accent: "#3B82F6",
    preview: "agent",
    stack: ["LangGraph.js", "Gemini 3.1", "Node.js", "Express", "MongoDB", "React", "Tailwind CSS", "SSE"],
    metrics: [
      { label: "Agent Architecture", value: "3-Node Stateful Graph" },
      { label: "Execution Safeguard", value: "4-Step Hard Loop Cap" },
      { label: "Calculations Engine", value: "astronomy-engine" },
      { label: "Testing Suite", value: "30-case Golden Set" }
    ],
    links: {
      live: "https://astro-agent-wheat.vercel.app",
      github: "https://github.com/pritish157/Aradhana-Astroagent"
    },
    challenge:
      "Ensuring the agent resolves complex birth chart details, filters sensitive questions (medical/financial/legal), and streams output in real time without entering infinite tool loops.",
    outcome: [
      "Built a stateful agent graph in LangGraph.js with routing logic based on rule-based fast paths and LLM intent classification.",
      "Calculated exact celestial coordinate longitudes using astronomy-engine and computed Equal House Ascendant coordinates using spherical trigonometry.",
      "Implemented a comprehensive evaluation runner with automatic tone scoring, geocoding validation, and Git hash tracking for regression testing."
    ],
    architecture: [
      "Node.js + Express backend orchestrating API streams and database connections.",
      "LangGraph.js state manager implementing the Router-Agent-Tools control loop.",
      "MongoDB Atlas for session persistence, user profiles, and 30-day TTL geocoding cache.",
      "Vite + React frontend displaying real-time streaming tokens and dynamic circular SVG charts."
    ],
    highlights: [
      "Rigorous LLM-as-judge and deterministic testing harness.",
      "Token-by-token streaming with Server-Sent Events (SSE).",
      "Pure mathematical calculations with high precision."
    ]
  },
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
      live: "https://knot-of-love.vercel.app",
      github: "https://github.com/pritish157/Knot-of-Love"
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
      live: "https://vireon-swart.vercel.app",
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
    id: "django-fuel-route",
    title: "Fuel Route Optimisation",
    eyebrow: "Backend logistics engine",
    summary:
      "A Python/Django backend service designed to optimize fuel station stops along mapped routes to minimize travel and refueling costs.",
    impact:
      "Demonstrates backend logic complexity, handling geo-spatial routing data, cost analysis, and API design without relying on a GUI.",
    accent: "#7C3AED",
    preview: "ops",
    stack: ["Python", "Django", "PostgreSQL", "Routing Algorithms", "REST API"],
    metrics: [
      { label: "System type", value: "Headless backend" },
      { label: "Logic focus", value: "Cost algorithms" },
      { label: "Framework", value: "Django REST" },
      { label: "Data structure", value: "Geo-spatial" }
    ],
    links: {
      github: "https://github.com/pritish157/Django-backend-fuel-route-optimisation-"
    },
    challenge:
      "Calculating the most cost-efficient fuel stops requires balancing travel deviations with fuel price differentials across multiple nodes.",
    outcome: [
      "Engineered an API capable of ingesting route data and returning optimized waypoints.",
      "Handled complex logic around range limits, fuel capacity, and dynamic pricing.",
      "Solidified pure backend system design without relying on visual crutches."
    ],
    architecture: [
      "Django REST Framework exposing routing calculation endpoints.",
      "Algorithmic layer evaluating route segments and station costs.",
      "Data modeling for stations, prices, and vehicle profiles.",
      "Headless system meant for M2M (machine-to-machine) interaction."
    ],
    highlights: [
      "Highlights strong Python and Django capability.",
      "Proves ability to write complex, logic-heavy headless systems.",
      "Great talking point for backend-centric or algorithm-focused engineering roles."
    ]
  },
  {
    id: "imagesteg",
    title: "ImageSteg",
    eyebrow: "Security & Cryptography",
    summary:
      "A Python script and utility for hiding hidden data/text inside images using Least Significant Bit (LSB) steganography techniques.",
    impact:
      "Provides a raw, low-level demonstration of data manipulation, byte-level processing, and security-oriented problem solving.",
    accent: "#C084FC",
    preview: "security",
    stack: ["Python", "Cryptography", "Image Processing", "CLI", "Byte Manipulation"],
    metrics: [
      { label: "Technique", value: "LSB Steganography" },
      { label: "Platform", value: "Python CLI" },
      { label: "Focus", value: "Data hiding" },
      { label: "Domain", value: "Security" }
    ],
    links: {
      github: "https://github.com/pritish157/imagesteg."
    },
    challenge:
      "Altering image pixels to encode data without causing visually detectable artifacts or corrupting the image file structure.",
    outcome: [
      "Implemented algorithms that parse and safely modify the Least Significant Bits of pixel arrays.",
      "Ensured data could be both accurately embedded and retrieved losslessly.",
      "Built a functional security utility completely from scratch."
    ],
    architecture: [
      "Python scripts parsing raw image byte data.",
      "Encoding module converting text/payloads to binary streams.",
      "Injection algorithm dispersing bits across RGB channels.",
      "Extraction module reading bits to rebuild the hidden payload."
    ],
    highlights: [
      "Adds a strong security, cryptography, and low-level system capability to the portfolio.",
      "Proves you can build pure CLI utilities and work with binary data.",
      "Shows versatility outside of traditional web frameworks."
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

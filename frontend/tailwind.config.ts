import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--surface-base)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        dimmed: "var(--dimmed)",
        border: "var(--border)",
        card: "var(--surface-card)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)"
        },
        secondary: "var(--secondary)",
        glow: "var(--glow)",
        accent: {
          blue: "var(--accent-blue)",
          violet: "var(--accent-violet)",
          fuchsia: "var(--accent-fuchsia)",
          purple: "var(--accent-purple)",
          lightPurple: "var(--accent-light-purple)"
        },
        surface: {
          base: "var(--surface-base)",
          tier1: "var(--surface-tier-1)",
          tier2: "var(--surface-tier-2)",
          tier3: "var(--surface-tier-3)",
          card: "var(--surface-card)"
        },
        status: {
          success: "var(--success)",
          successBg: "var(--success-bg)",
          warning: "var(--warning)",
          warningBg: "var(--warning-bg)",
          danger: "var(--danger)",
          dangerBg: "var(--danger-bg)",
          info: "var(--info)",
          infoBg: "var(--info-bg)"
        }
      },
      fontFamily: {
        display: ["var(--font-space)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-sans)", "General Sans", "Satoshi", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"]
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        large: "var(--shadow-large)",
        glow: "var(--shadow-glow)",
        accentGlow: "var(--shadow-accent-glow)",
        inset: "var(--shadow-inset)",
        hover: "var(--shadow-hover)",
        luxe: "var(--shadow-luxe)"
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "4xl": "var(--radius-4xl)",
        full: "var(--radius-full)"
      },
      spacing: {
        "1": "var(--space-1)",
        "2": "var(--space-2)",
        "3": "var(--space-3)",
        "4": "var(--space-4)",
        "5": "var(--space-5)",
        "6": "var(--space-6)",
        "8": "var(--space-8)",
        "10": "var(--space-10)",
        "12": "var(--space-12)",
        "16": "var(--space-16)",
        "20": "var(--space-20)",
        "24": "var(--space-24)"
      },
      zIndex: {
        below: "var(--z-below)",
        base: "var(--z-base)",
        above: "var(--z-above)",
        dock: "var(--z-dock)",
        nav: "var(--z-nav)",
        modal: "var(--z-modal)",
        toast: "var(--z-toast)"
      },
      backgroundImage: {
        "mesh-main":
          "radial-gradient(circle at 20% 20%, rgba(139,92,246,0.22), transparent 26%), radial-gradient(circle at 80% 18%, rgba(168,85,247,0.20), transparent 22%), radial-gradient(circle at 50% 85%, rgba(59,130,246,0.12), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "glow-line":
          "linear-gradient(90deg, transparent, rgba(139,92,246,0.9), rgba(168,85,247,0.9), transparent)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" }
        },
        orb: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(0, -24px, 0) scale(1.04)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.95" }
        },
        marquee: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" }
        },
        shimmer: {
          from: { transform: "translateX(-120%)" },
          to: { transform: "translateX(120%)" }
        },
        scrollHint: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.9" },
          "50%": { transform: "translateY(10px)", opacity: "0.3" }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        orb: "orb 16s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3.4s ease-in-out infinite",
        marquee: "marquee 24s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        "scroll-hint": "scrollHint 1.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

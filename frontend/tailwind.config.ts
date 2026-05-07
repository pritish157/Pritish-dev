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
        background: "#050816",
        foreground: "#ffffff",
        muted: "#94A3B8",
        border: "rgba(255,255,255,0.08)",
        card: "rgba(255,255,255,0.04)",
        primary: "#8B5CF6",
        secondary: "#A855F7",
        glow: "rgba(139,92,246,0.35)"
      },
      fontFamily: {
        display: ["var(--font-space)", "Space Grotesk", "sans-serif"],
        sans: ["General Sans", "Satoshi", "var(--font-space)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(10, 10, 30, 0.35)",
        glow: "0 0 0 1px rgba(139, 92, 246, 0.15), 0 24px 80px rgba(81, 43, 161, 0.25)",
        luxe: "0 30px 120px rgba(4, 7, 20, 0.7)"
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
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
};

export default config;

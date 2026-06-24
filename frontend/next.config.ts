import type { NextConfig } from "next";

const apiOrigin = process.env.PORTFOLIO_API_ORIGIN ?? "https://pritish-dev.onrender.com";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["app", "components", "lib"]
  },
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      },
      {
        source: "/(.*)\\.(svg|png|jpg|jpeg|webp|avif|ico|pdf|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400"
          }
        ]
      },
      {
        source: "/(robots.txt|sitemap.xml|site.webmanifest)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600"
          }
        ]
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/ai/:path*",
        destination: `${apiOrigin}/api/ai/:path*`
      },
      {
        source: "/api/health",
        destination: `${apiOrigin}/api/health`
      },
      {
        source: "/api/metrics",
        destination: `${apiOrigin}/api/metrics`
      }
    ];
  }
};

export default nextConfig;

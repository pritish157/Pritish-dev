import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";

import { BackToTop } from "@/components/layout/back-to-top";
import { MobileDock } from "@/components/layout/mobile-dock";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SiteFooter } from "@/components/layout/site-footer";
import { TopNav } from "@/components/layout/top-nav";
import { SiteProviders } from "@/components/providers/site-providers";
import { siteConfig } from "@/lib/data/portfolio";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  manifest: "/site.webmanifest",
  keywords: [
    "frontend engineer",
    "next.js portfolio",
    "premium developer portfolio",
    "full-stack engineer",
    "AI-ready product engineer",
    "Framer Motion portfolio"
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.shortName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio preview`
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    images: ["/og-image.png"]
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} bg-background font-sans text-foreground antialiased`}>
        <SiteProviders>
          <div className="relative min-h-screen overflow-x-clip">
            <ScrollProgress />
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-[-2] bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_24%),linear-gradient(180deg,#060914_0%,#050816_45%,#040611_100%)]"
            />
            <div aria-hidden="true" className="noise-overlay pointer-events-none fixed inset-0 z-[-1]" />
            <TopNav />
            <main className="pb-28 md:pb-0">{children}</main>
            <SiteFooter />
            <MobileDock />
            <BackToTop />
          </div>
        </SiteProviders>
      </body>
    </html>
  );
}

import dynamic from "next/dynamic";

import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { siteConfig } from "@/lib/data/portfolio";

const FeaturedProjects = dynamic(() => import("@/components/sections/featured-projects"), {
  loading: () => <SectionFallback label="Loading flagship projects" />
});

const SkillsSection = dynamic(() => import("@/components/sections/skills-section"), {
  loading: () => <SectionFallback label="Loading skill systems" />
});

const ContactSection = dynamic(() => import("@/components/sections/contact-section"), {
  loading: () => <SectionFallback label="Loading contact surface" />
});

function SectionFallback({ label }: { label: string }) {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-10 text-sm text-slate-400 backdrop-blur-xl">
        {label}
      </div>
    </section>
  );
}

export default function HomePage() {
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    sameAs: [siteConfig.github, siteConfig.linkedin]
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} Portfolio`,
    url: siteConfig.siteUrl
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personStructuredData, websiteStructuredData])
        }}
      />
      <HeroSection />
      <TrustBar />
      <FeaturedProjects />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}

"use client";

import type { ReactNode } from "react";

import { CursorGlow } from "@/components/effects/cursor-glow";
import { LenisProvider } from "@/components/effects/lenis-provider";
import { ScrollProgress } from "@/components/effects/scroll-progress";

type SiteProvidersProps = {
  children: ReactNode;
};

export function SiteProviders({ children }: SiteProvidersProps) {
  return (
    <>
      <LenisProvider />
      <ScrollProgress />
      <CursorGlow />
      {children}
    </>
  );
}

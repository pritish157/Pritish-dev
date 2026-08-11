"use client";

import { useEffect, useState } from "react";

export type UseScrollSpyOptions = {
  defaultActiveId?: string;
  rootMargin?: string;
  threshold?: number | number[];
};

export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
): [string, (id: string) => void] {
  const {
    defaultActiveId = sectionIds[0] ?? "profile",
    rootMargin = "-30% 0px -45% 0px",
    threshold = [0.1, 0.3, 0.5, 0.7]
  } = options;

  const [activeId, setActiveId] = useState<string>(defaultActiveId);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionIds.length) {
      return;
    }

    // Clean section ids (remove '#' if present)
    const cleanIds = sectionIds.map((id) => id.replace(/^#/, ""));

    const elements: HTMLElement[] = [];
    cleanIds.forEach((id) => {
      const el = document.getElementById(id) ?? document.querySelector<HTMLElement>(`[data-nav-section="${id}"]`);
      if (el) {
        elements.push(el);
      }
    });

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (!intersecting.length) {
          return;
        }

        // Sort by highest intersection ratio
        intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topEntry = intersecting[0];
        if (topEntry) {
          const targetId =
            topEntry.target.id || topEntry.target.getAttribute("data-nav-section") || topEntry.target.getAttribute("data-nav-group");
          if (targetId && cleanIds.includes(targetId)) {
            setActiveId(targetId);
          }
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, rootMargin, threshold]);

  return [activeId, setActiveId];
}

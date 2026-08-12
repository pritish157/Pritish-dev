"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  RiCodeSSlashLine,
  RiServerLine,
  RiDatabase2Line,
  RiLayout4Line,
  RiFlaskLine,
  RiCloudLine,
  RiPlugLine,
  RiTerminalBoxLine
} from "react-icons/ri";

import { SectionReveal } from "@/components/effects/section-reveal";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { skillGroups } from "@/lib/data/portfolio";

const icons = [
  RiCodeSSlashLine,
  RiServerLine,
  RiDatabase2Line,
  RiLayout4Line,
  RiFlaskLine,
  RiCloudLine,
  RiPlugLine
];

export default function SkillsSection() {
  const reduceMotion = useReducedMotion();
  const [allowFloat, setAllowFloat] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");

    const update = () => {
      setAllowFloat(query.matches);
    };

    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  return (
    <section id="skills" data-nav-section data-nav-group="experience" className="content-auto px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeading
            eyebrow="Technical Stack & Skills"
            title="Production tools and backend capabilities."
            description="Categorized engineering skills from REST API design to database query optimization, testing, containerization, and third-party integrations."
          />
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = icons[index] || RiTerminalBoxLine;

            return (
              <SectionReveal key={group.title} delay={index * 0.05}>
                <motion.div
                  animate={!reduceMotion && allowFloat ? { y: [0, index % 2 === 0 ? -10 : 10, 0] } : undefined}
                  transition={{ duration: 8 + index, repeat: Infinity, ease: "easeInOut" }}
                >
                  <SpotlightCard className="h-full p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">{group.eyebrow}</p>
                        <h3 className="mt-3 font-display text-2xl tracking-[-0.05em] text-white">{group.title}</h3>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-violet-200">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-8 text-slate-400">{group.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Badge key={item} className="bg-black/20 text-slate-300">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


"use client";

import { useMemo, useState } from "react";
import { RiArrowRightUpLine, RiMailLine, RiMapPinLine, RiTimeLine } from "react-icons/ri";

import { SectionReveal } from "@/components/effects/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { contactReasons, quickAccessLinks, siteConfig } from "@/lib/data/portfolio";
import { sanitizeInput } from "@/lib/utils";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

type FieldName = keyof typeof initialForm;

const contactLinks = [
  ...quickAccessLinks,
  {
    label: "Resume",
    href: siteConfig.resumePath,
    shortLabel: "PDF",
    description: "Resume download for a quick screening pass."
  }
] as const;

function validateField(name: FieldName, value: string) {
  const trimmed = value.trim();

  if ((name === "name" || name === "email" || name === "message") && !trimmed) {
    return "This field is required.";
  }

  if (name === "email" && trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Enter a valid email address.";
  }

  if (name === "message" && trimmed.length > 0 && trimmed.length < 24) {
    return "Please share a little more context.";
  }

  return "";
}

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const counters = useMemo(
    () => ({
      subject: `${form.subject.length}/120`,
      message: `${form.message.length}/1200`
    }),
    [form.message.length, form.subject.length]
  );

  const handleChange = (name: FieldName, value: string) => {
    const limits: Record<FieldName, number> = { name: 100, email: 254, subject: 120, message: 1200 };

    if (value.length > limits[name]) {
      return;
    }

    setForm((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = Object.fromEntries(
      Object.entries(form).map(([name, value]) => [name, validateField(name as FieldName, value)])
    );

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setStatus({ type: "error", message: "Please fix the highlighted fields before sending." });
      return;
    }

    setSending(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: sanitizeInput(form.name.trim()),
          email: form.email.trim(),
          subject: sanitizeInput(form.subject.trim()),
          message: sanitizeInput(form.message.trim())
        })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Unable to send your message right now.");
      }

      setForm(initialForm);
      setErrors({});
      setStatus({ type: "success", message: "Message sent. I will get back to you within 24 hours." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send your message right now.";
      setStatus({ type: "error", message });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" data-nav-section className="content-auto px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeading
            eyebrow="Contact"
            title="Start the conversation without leaving the app-like flow."
            description="Mobile visitors get the same speed as desktop visitors here: direct links, live work, and a clean contact form without another long detour."
          />
        </SectionReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <SectionReveal className="space-y-5">
            <SpotlightCard className="p-6">
              <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">Available now</Badge>
              <h3 className="mt-5 font-display text-3xl tracking-[-0.06em] text-white">
                Product-facing frontend polish. Backend-backed confidence.
              </h3>
              <p className="mt-4 text-sm leading-8 text-slate-400">
                Best for teams that want an engineer who can shape the interface, respect system constraints, and keep the overall product experience feeling premium.
              </p>

              <div className="mt-6 space-y-3">
                {contactReasons.map((reason) => (
                  <div key={reason} className="flex gap-3 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4">
                    <span className="mt-2 h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(196,181,253,0.8)]" />
                    <p className="text-sm leading-7 text-slate-300">{reason}</p>
                  </div>
                ))}
              </div>
            </SpotlightCard>

            <div className="grid gap-5 sm:grid-cols-2">
              <SpotlightCard className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Direct line</p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-3 text-sm text-slate-300">
                    <RiMailLine className="mt-1 h-4 w-4 text-violet-200" />
                    <span>{siteConfig.email}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-300">
                    <RiMapPinLine className="mt-1 h-4 w-4 text-violet-200" />
                    <span>{siteConfig.location}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-300">
                    <RiTimeLine className="mt-1 h-4 w-4 text-violet-200" />
                    <span>Usually replies within 24 hours</span>
                  </div>
                </div>

                <div className="mt-5">
                  <MagneticLink href={`mailto:${siteConfig.email}`} variant="secondary" external>
                    Email directly
                  </MagneticLink>
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Link directory</p>
                <div className="mt-4 grid gap-3">
                  {contactLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "noreferrer" : undefined}
                      className="group flex items-start justify-between gap-3 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 transition hover:border-white/20 hover:bg-black/25"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-violet-200/75">{item.shortLabel}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                      </div>
                      <RiArrowRightUpLine className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.06}>
            <SpotlightCard className="p-6 sm:p-7">
              <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => handleChange("name", event.target.value)}
                      className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition focus:border-violet-300/40 focus:bg-black/30"
                      placeholder="Your name"
                    />
                    {errors.name ? <p className="text-sm text-rose-300">{errors.name}</p> : null}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) => handleChange("email", event.target.value)}
                      className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition focus:border-violet-300/40 focus:bg-black/30"
                      placeholder="you@company.com"
                    />
                    {errors.email ? <p className="text-sm text-rose-300">{errors.email}</p> : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label htmlFor="subject" className="text-sm font-medium text-white">
                      Subject
                    </label>
                    <span className="text-xs text-slate-500">{counters.subject}</span>
                  </div>
                  <input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={(event) => handleChange("subject", event.target.value)}
                    className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition focus:border-violet-300/40 focus:bg-black/30"
                    placeholder="Role, collaboration, product challenge..."
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label htmlFor="message" className="text-sm font-medium text-white">
                      Message
                    </label>
                    <span className="text-xs text-slate-500">{counters.message}</span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    value={form.message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    className="w-full rounded-[1.5rem] border border-white/10 bg-black/20 px-4 py-4 text-white outline-none transition focus:border-violet-300/40 focus:bg-black/30"
                    placeholder="Tell me what you're building, the role, the timeline, and what kind of engineering ownership you need."
                  />
                  {errors.message ? <p className="text-sm text-rose-300">{errors.message}</p> : null}
                </div>

                {status ? (
                  <div
                    className={`rounded-[1.3rem] border px-4 py-3 text-sm ${
                      status.type === "success"
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                        : "border-rose-400/20 bg-rose-400/10 text-rose-100"
                    }`}
                  >
                    {status.message}
                  </div>
                ) : null}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-lg text-sm leading-7 text-slate-400">
                    Best messages include the role, current product stage, and where you want frontend quality to level up.
                  </p>
                  <Button type="submit" size="lg" disabled={sending}>
                    {sending ? "Sending..." : "Send message"}
                  </Button>
                </div>
              </form>
            </SpotlightCard>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

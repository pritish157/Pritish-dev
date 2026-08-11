"use client";

import * as React from "react";
import { Container, Section, ResponsiveGrid, Flex, Cluster } from "@/components/ui/layout-primitives";
import { Heading, Text, Paragraph, Eyebrow, Code, GradientText, Highlight, SectionHeading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { BaseCard, MetricCard, ProjectCardBase, InteractiveCard, FloatingCard } from "@/components/ui/cards";
import { Badge, StatusBadge, AvailabilityBadge, TechBadge, GradientBadge, OutlineBadge, MetricBadge } from "@/components/ui/badges";
import { Tooltip, Popover, Drawer, AccordionItem, Tabs, ContextMenu } from "@/components/ui/interactive";
import { Toast, LoadingSpinner, Skeleton, Progress, EmptyState, ErrorState, SuccessState } from "@/components/ui/feedback";
import { Avatar, BrowserMockup, PhoneMockup, VideoWrapper } from "@/components/ui/media";
import { Divider, BorderGlow, AmbientLight } from "@/components/ui/decorative";
import { AnimatedText, Reveal, FadeIn, Stagger, StaggerItem, HoverScale } from "@/components/ui/motion-primitives";
import { SocialIcon, TechIcon, ActionIcon, StatusIcon } from "@/components/ui/icon-system";
import { Label, Input, Textarea, Checkbox, Switch, Select, HelperText } from "@/components/ui/form-controls";
import { Mail, Search, ArrowRight, Layers, Sparkles } from "lucide-react";

export default function ShowcasePage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [switchState, setSwitchState] = React.useState(true);
  const [checkboxState, setCheckboxState] = React.useState(true);
  const [accordionOpen, setAccordionOpen] = React.useState<string | null>("acc-1");
  const [btnLoading, setBtnLoading] = React.useState(false);

  const handleBtnClick = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#050816] text-white py-12 px-4 sm:px-6">
      <AmbientLight />

      <Container size="7xl" className="space-y-16">
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <AvailabilityBadge />
          <Heading level={1} size="hero" gradient>
            UI Component Library Showcase
          </Heading>
          <Paragraph lead className="mx-auto">
            Interactive verification suite for all 17 Milestone 2 shared UI components, design tokens, accessible primitives, and motion wrappers.
          </Paragraph>
        </div>

        <Divider glow />

        {/* 1. Typography */}
        <Section className="space-y-8">
          <SectionHeading eyebrow="Part 2" title="Typography Components" description="Inherits Space Grotesk and General Sans typography hierarchy." />
          <BaseCard className="space-y-6">
            <div className="space-y-2">
              <Eyebrow>ENGINEERING HIGHLIGHT</Eyebrow>
              <Heading level={2} size="h2">
                Display & Body Copy
              </Heading>
            </div>
            <Paragraph>
              Standard paragraph text with <Highlight>highlight accent</Highlight> and inline <Code>npm run typecheck</Code> snippets.
            </Paragraph>
            <Flex gap="md" wrap>
              <GradientText className="text-2xl">Gradient Accent Headline</GradientText>
              <Text variant="muted">Muted Sub-text</Text>
              <Text variant="mono">Mono Font Tag</Text>
              <Text variant="accent">Accent Text</Text>
            </Flex>
          </BaseCard>
        </Section>

        {/* 2. Buttons */}
        <Section className="space-y-8">
          <SectionHeading eyebrow="Part 3" title="Button System" description="Full variant matrix with CVA, loading states, icons, and keyboard focus." />
          <BaseCard className="space-y-6">
            <Cluster gap="md">
              <Button variant="default" onClick={handleBtnClick} loading={btnLoading} rightIcon={<ArrowRight className="h-4 w-4" />}>
                Primary Action
              </Button>
              <Button variant="secondary" leftIcon={<Mail className="h-4 w-4" />}>
                Secondary Button
              </Button>
              <Button variant="outline">Outline Variant</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Action</Button>
              <Button variant="link">Link Style CTA</Button>
              <Button size="icon" variant="secondary" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
              <Button disabled>Disabled State</Button>
            </Cluster>
          </BaseCard>
        </Section>

        {/* 3. Cards */}
        <Section className="space-y-8">
          <SectionHeading eyebrow="Part 4" title="Card Family" description="Shared glassmorphic card architecture and radial spotlights." />
          <ResponsiveGrid columns={3}>
            <MetricCard value="99.9%" label="API Uptime" subtext="MongoDB Atlas / Redis cache" glow />
            <InteractiveCard glow>
              <div className="space-y-2">
                <Badge variant="accent">Interactive</Badge>
                <h4 className="text-lg font-bold text-white">Hover Lift & Glow</h4>
                <p className="text-sm text-slate-400">Card lifts on pointer hover with smooth spring dynamics.</p>
              </div>
            </InteractiveCard>
            <FloatingCard>
              <div className="space-y-2">
                <Badge variant="status">Ambient</Badge>
                <h4 className="text-lg font-bold text-white">Floating Surface</h4>
                <p className="text-sm text-slate-400">Continuous gentle pulse animation for floating highlights.</p>
              </div>
            </FloatingCard>
          </ResponsiveGrid>

          <BorderGlow>
            <ProjectCardBase
              title="Aradhana AstroAgent — Realtime AI Service"
              description="Stateful Express/Node.js backend with Mongoose connection pooling, 90-day TTL indexes, and Pino structured logs."
              tags={["Node.js", "Express", "MongoDB", "Redis", "TypeScript"]}
              metrics={[
                { label: "Throughput", value: "1.2k req/sec" },
                { label: "Latency p95", value: "<45ms" }
              ]}
              githubUrl="https://github.com/pritish157"
              liveUrl="https://pritish.dev"
            />
          </BorderGlow>
        </Section>

        {/* 4. Badges */}
        <Section className="space-y-8">
          <SectionHeading eyebrow="Part 5" title="Badges & Status Indicators" description="Realtime pulse dot status tags and tech stack badges." />
          <BaseCard>
            <Cluster gap="md">
              <StatusBadge status="online">System Operational</StatusBadge>
              <StatusBadge status="deploying">Deploying v3.0</StatusBadge>
              <AvailabilityBadge />
              <TechBadge icon={<Layers className="h-3.5 w-3.5" />}>Next.js 15 App Router</TechBadge>
              <GradientBadge>Gradient Glow</GradientBadge>
              <OutlineBadge>Outline Tag</OutlineBadge>
              <MetricBadge value="100%">Lighthouse Score</MetricBadge>
            </Cluster>
          </BaseCard>
        </Section>

        {/* 5. Interactive Components */}
        <Section className="space-y-8">
          <SectionHeading eyebrow="Part 7" title="Interactive Components" description="Modal overlays, drawers, tooltips, popovers, and accessible tabs." />
          <BaseCard className="space-y-6">
            <Cluster gap="lg">
              <Tooltip content="Accessible focus/hover trigger tooltip">
                <Button variant="secondary">Hover Tooltip</Button>
              </Tooltip>

              <Popover trigger={<Button variant="outline">Open Popover</Button>}>
                <div className="space-y-2">
                  <h5 className="font-semibold text-white">Popover Header</h5>
                  <p className="text-xs text-slate-400">Rich contextual panel overlay with auto-dismiss.</p>
                </div>
              </Popover>

              <ContextMenu
                menuItems={[
                  { label: "Copy Component Code", action: () => {} },
                  { label: "View Specifications", action: () => {} }
                ]}
              >
                <Button variant="ghost">Right-Click Context Menu</Button>
              </ContextMenu>

              <Button variant="default" onClick={() => setDrawerOpen(true)}>
                Open Slide Sheet Drawer
              </Button>
            </Cluster>

            <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="System Controls Sheet">
              <div className="space-y-4 text-sm text-slate-300">
                <p>Slide-over side drawer panel for mobile navigation or inspect overlays.</p>
                <Button size="sm" variant="secondary" onClick={() => setDrawerOpen(false)}>
                  Close Panel
                </Button>
              </div>
            </Drawer>

            <Divider />

            <Tabs
              tabs={[
                {
                  id: "tab-1",
                  label: "Architecture",
                  icon: <Layers className="h-4 w-4" />,
                  content: (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300">
                      Clean architectural layer separating UI primitives, layout frames, section components, and serverless API handlers.
                    </div>
                  )
                },
                {
                  id: "tab-2",
                  label: "Performance Budget",
                  icon: <Sparkles className="h-4 w-4" />,
                  content: (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300">
                      Total JS bundle budget &lt;150KB gzipped. Dynamic imports for below-the-fold surfaces.
                    </div>
                  )
                }
              ]}
            />

            <AccordionItem
              id="acc-1"
              title="What is the zero-defect standard?"
              isOpen={accordionOpen === "acc-1"}
              onToggle={() => setAccordionOpen(accordionOpen === "acc-1" ? null : "acc-1")}
            >
              Every line of TypeScript code must compile cleanly with 0 errors, pass ESLint 9 checks with 0 warnings, and adhere to WCAG AA keyboard contrast standards.
            </AccordionItem>
          </BaseCard>
        </Section>

        {/* 6. Feedback */}
        <Section className="space-y-8">
          <SectionHeading eyebrow="Part 8" title="Feedback & States" description="Alert notifications, spinners, skeleton placeholders, and error callouts." />
          <ResponsiveGrid columns={2}>
            <BaseCard className="space-y-4">
              <h4 className="font-semibold text-white">Loaders & Progress</h4>
              <Flex gap="md">
                <LoadingSpinner size="sm" />
                <LoadingSpinner size="md" />
                <LoadingSpinner size="lg" />
              </Flex>
              <Progress value={75} />
              <Skeleton className="h-10 w-full" />
            </BaseCard>

            <Toast type="success" title="API Status" message="Nodemailer email transport service connected successfully." />
          </ResponsiveGrid>

          <ResponsiveGrid columns={2}>
            <ErrorState message="Failed to communicate with remote serverless endpoint." onRetry={() => {}} />
            <SuccessState message="Case study details copied to clipboard." />
          </ResponsiveGrid>

          <EmptyState title="No Active Pipeline Tasks" description="All backend deployments are currently up to date." />
        </Section>

        {/* 7. Media & Mockups */}
        <Section className="space-y-8">
          <SectionHeading eyebrow="Part 9" title="Media & Device Frames" description="macOS browser frame, mobile device notch, and avatar fallbacks." />
          <ResponsiveGrid columns={2}>
            <BrowserMockup url="https://pritish.dev" title="Flagship Case Study">
              <div className="p-6 text-center space-y-2 bg-slate-900 rounded-xl">
                <Avatar size="lg" fallback="PK" status="online" />
                <h4 className="font-bold text-white">Pritish Kumar Panda</h4>
                <p className="text-xs text-slate-400">Backend Engineer with Full-Stack Depth</p>
              </div>
            </BrowserMockup>

            <PhoneMockup>
              <div className="p-6 text-center space-y-4 pt-8">
                <StatusBadge status="online">Mobile Dock</StatusBadge>
                <h5 className="font-semibold text-white">Responsive Viewport</h5>
                <p className="text-xs text-slate-400">Tested down to 375px touch viewports.</p>
              </div>
            </PhoneMockup>
          </ResponsiveGrid>

          <VideoWrapper poster="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80" />
        </Section>

        {/* 8. Form Controls */}
        <Section className="space-y-8">
          <SectionHeading eyebrow="Part 13" title="Form Controls System" description="Inputs, textareas, accessible switches, checkboxes, and select dropdowns." />
          <BaseCard className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-2">
              <Label required htmlFor="input-demo">Full Name</Label>
              <Input id="input-demo" placeholder="e.g. Hiring Manager" leftIcon={<Mail className="h-4 w-4" />} />
              <HelperText>Enter your full primary contact name.</HelperText>
            </div>

            <div className="space-y-2">
              <Label required htmlFor="select-demo">Inquiry Subject</Label>
              <Select
                id="select-demo"
                options={[
                  { label: "Engineering Role Interview", value: "interview" },
                  { label: "Project Collaboration", value: "collab" },
                  { label: "General Technical Inquiry", value: "general" }
                ]}
              />
            </div>

            <div className="space-y-2">
              <Label required htmlFor="textarea-demo">Message Body</Label>
              <Textarea id="textarea-demo" placeholder="Details of project or role offer..." maxLength={500} />
            </div>

            <Cluster gap="lg">
              <Checkbox label="Send copy to my email" checked={checkboxState} onChange={(e) => setCheckboxState(e.target.checked)} />
              <Switch label="Subscribe to release notes" checked={switchState} onChange={setSwitchState} />
            </Cluster>
          </BaseCard>
        </Section>

        {/* 9. Icons & Motion */}
        <Section className="space-y-8">
          <SectionHeading eyebrow="Parts 11 & 12" title="Icon System & Motion Wrappers" description="Lucide & React Icons helpers and Framer Motion entrance primitives." />
          <BaseCard className="space-y-6">
            <Cluster gap="md">
              <SocialIcon platform="github" />
              <SocialIcon platform="linkedin" />
              <SocialIcon platform="twitter" />
              <SocialIcon platform="email" />
              <SocialIcon platform="resume" />
              <TechIcon name="react" />
              <TechIcon name="node" />
              <TechIcon name="mongodb" />
              <TechIcon name="docker" />
              <ActionIcon action="copy" />
              <ActionIcon action="external" />
              <ActionIcon action="download" />
              <StatusIcon status="success" />
              <StatusIcon status="warning" />
              <StatusIcon status="error" />
            </Cluster>

            <Divider />

            <Reveal direction="up">
              <AnimatedText text="Staggered Entrance Animation Reveal" className="text-xl font-bold font-display text-violet-300" />
            </Reveal>

            <FadeIn delay={0.2}>
              <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StaggerItem>
                  <HoverScale>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center text-sm font-semibold text-white">
                      Stagger Item 1
                    </div>
                  </HoverScale>
                </StaggerItem>
                <StaggerItem>
                  <HoverScale>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center text-sm font-semibold text-white">
                      Stagger Item 2
                    </div>
                  </HoverScale>
                </StaggerItem>
                <StaggerItem>
                  <HoverScale>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center text-sm font-semibold text-white">
                      Stagger Item 3
                    </div>
                  </HoverScale>
                </StaggerItem>
              </Stagger>
            </FadeIn>
          </BaseCard>
        </Section>
      </Container>
    </div>
  );
}

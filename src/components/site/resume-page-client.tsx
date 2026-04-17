"use client";

import Link from "next/link";
import {
  useEffect,
  useEffectEvent,
  useState,
  type CSSProperties,
  type ComponentType,
  type ReactNode,
} from "react";
import { motion, useMotionValueEvent, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  IconApi,
  IconAtom2,
  IconBrandAws,
  IconBrandCloudflare,
  IconBrandCpp,
  IconBrandDocker,
  IconBrandFirebase,
  IconBrandFramerMotion,
  IconBrandGithub,
  IconBrandGithubFilled,
  IconBrandJavascript,
  IconBrandMongodb,
  IconBrandMysql,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandPrisma,
  IconBrandPython,
  IconBrandReact,
  IconBrandSupabase,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVercel,
  IconDatabase,
  IconShieldLock,
  IconSql,
  IconWebhook,
} from "@tabler/icons-react";

import { ResumePrintButton } from "@/components/site/resume-print-button";
import {
  educationItems,
  experienceItems,
  profileIntro,
  resumeStats,
  skillGroups,
  socialLinks,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type ResumeProjectSummary = {
  impact: string;
  links: Array<{
    href: string;
    label: string;
  }>;
  roles: string[];
  slug: string;
  stack: string[];
  summary: string;
  title: string;
};

const resumeSections = [
  { id: "profile", label: "Profile", meta: "identity" },
  { id: "signal", label: "Signal", meta: "metrics" },
  { id: "experience", label: "Experience", meta: "timeline" },
  { id: "work", label: "Work", meta: "projects" },
  { id: "stack", label: "Stack", meta: "tooling" },
  { id: "education", label: "Education", meta: "foundation" },
] as const;

type ResumeSectionId = (typeof resumeSections)[number]["id"];

const railStart = 0.08;
const railEnd = 0.88;

function getRailStop(index: number) {
  return railStart + ((railEnd - railStart) * index) / (resumeSections.length - 1);
}

const railStops = resumeSections.map((_, index) => getRailStop(index));

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getSectionVisualState(emphasis: number) {
  const opacity = 0.42 + emphasis * 0.58;
  const brightness = 0.58 + emphasis * 0.42;
  const saturate = 0.72 + emphasis * 0.5;

  return {
    opacity,
    filter: `brightness(${brightness}) saturate(${saturate})`,
  };
}

function getInitialContentEmphasis() {
  return Object.fromEntries(
    resumeSections.map((section, index) => [section.id, index === 0 ? 1 : 0.12]),
  ) as Record<ResumeSectionId, number>;
}

function getViewportCenteredEmphasis(rect: DOMRect, viewportHeight: number) {
  const viewportCenter = viewportHeight / 2;
  const sectionCenter = rect.top + rect.height / 2;
  const centerDistance = Math.abs(sectionCenter - viewportCenter);
  const edgeDistance =
    viewportCenter < rect.top
      ? rect.top - viewportCenter
      : viewportCenter > rect.bottom
        ? viewportCenter - rect.bottom
        : 0;
  const centeredFocus = clamp(1 - centerDistance / (viewportHeight * 0.46), 0, 1);
  const edgeFocus = clamp(1 - edgeDistance / (viewportHeight * 0.24), 0, 1);

  if (viewportCenter >= rect.top && viewportCenter <= rect.bottom) {
    return Math.max(0.84, centeredFocus);
  }

  return edgeFocus * 0.72;
}

function getActiveRailSection(progress: number) {
  let activeIndex = 0;
  let smallestDistance = Number.POSITIVE_INFINITY;

  railStops.forEach((stop, index) => {
    const distance = Math.abs(progress - stop);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      activeIndex = index;
    }
  });

  return resumeSections[activeIndex].id;
}

type TechIcon = ComponentType<{
  className?: string;
  stroke?: string | number;
}>;

function getTechIcon(name: string): TechIcon | null {
  const normalized = name.toLowerCase();

  if (normalized.includes("next.js")) return IconBrandNextjs;
  if (normalized.includes("react")) return IconBrandReact;
  if (normalized.includes("tailwind")) return IconBrandTailwind;
  if (normalized.includes("typescript")) return IconBrandTypescript;
  if (normalized.includes("python")) return IconBrandPython;
  if (normalized.includes("javascript")) return IconBrandJavascript;
  if (normalized.includes("node.js") || normalized.includes("express")) return IconBrandNodejs;
  if (normalized.includes("c++")) return IconBrandCpp;
  if (normalized.includes("fastapi")) return IconApi;
  if (normalized.includes("websocket") || normalized.includes("webhook")) return IconWebhook;
  if (normalized.includes("cloudflare") || normalized.includes("hono")) return IconBrandCloudflare;
  if (normalized.includes("postgresql")) return IconDatabase;
  if (normalized.includes("prisma")) return IconBrandPrisma;
  if (normalized.includes("mongodb")) return IconBrandMongodb;
  if (normalized.includes("mysql")) return IconBrandMysql;
  if (normalized.includes("sqlite")) return IconSql;
  if (normalized.includes("docker")) return IconBrandDocker;
  if (normalized.includes("aws")) return IconBrandAws;
  if (normalized.includes("firebase")) return IconBrandFirebase;
  if (normalized.includes("supabase")) return IconBrandSupabase;
  if (normalized.includes("github")) return IconBrandGithub;
  if (normalized.includes("vercel")) return IconBrandVercel;
  if (normalized.includes("nextauth")) return IconShieldLock;
  if (normalized.includes("recoil")) return IconAtom2;
  if (normalized.includes("motion")) return IconBrandFramerMotion;

  return null;
}

type ResumeChipTone = "default" | "warm" | "cool" | "lime";

const resumeChipTones: Record<
  ResumeChipTone,
  {
    border: string;
    glow: string;
    hoverBorder: string;
    hoverEnd: string;
    hoverStart: string;
    text: string;
  }
> = {
  default: {
    border: "var(--resume-chip-border)",
    glow: "rgba(74, 214, 255, 0.16)",
    hoverBorder: "color-mix(in srgb, var(--accent-secondary) 32%, var(--resume-chip-border))",
    hoverEnd: "color-mix(in srgb, var(--accent) 12%, var(--resume-chip-bg))",
    hoverStart: "color-mix(in srgb, var(--accent-secondary) 18%, var(--resume-chip-bg))",
    text: "var(--text-faint)",
  },
  warm: {
    border: "rgba(255, 141, 111, 0.22)",
    glow: "rgba(255, 141, 111, 0.2)",
    hoverBorder: "rgba(255, 141, 111, 0.42)",
    hoverEnd: "rgba(255, 141, 111, 0.24)",
    hoverStart: "rgba(255, 141, 111, 0.12)",
    text: "var(--accent-tertiary)",
  },
  cool: {
    border: "rgba(74, 214, 255, 0.22)",
    glow: "rgba(74, 214, 255, 0.22)",
    hoverBorder: "rgba(74, 214, 255, 0.46)",
    hoverEnd: "rgba(74, 214, 255, 0.24)",
    hoverStart: "rgba(74, 214, 255, 0.12)",
    text: "var(--accent-secondary)",
  },
  lime: {
    border: "rgba(184, 255, 111, 0.22)",
    glow: "rgba(184, 255, 111, 0.22)",
    hoverBorder: "rgba(184, 255, 111, 0.46)",
    hoverEnd: "rgba(184, 255, 111, 0.22)",
    hoverStart: "rgba(184, 255, 111, 0.12)",
    text: "var(--accent)",
  },
};

function ResumeChipRack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-start gap-2.5", className)}>{children}</div>
  );
}

function ResumeChip({
  children,
  className,
  icon: Icon,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  icon?: TechIcon | null;
  tone?: ResumeChipTone;
}) {
  const palette = resumeChipTones[tone];

  return (
    <span
      className={cn(
        "group relative inline-flex min-h-9 w-fit items-center gap-2 overflow-hidden rounded-full border px-3.5 py-2 text-left font-mono text-[11px] uppercase tracking-[0.2em] transition-[transform,box-shadow,border-color,color,background] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        "bg-[linear-gradient(135deg,var(--chip-bg),var(--chip-bg))] text-[color:var(--chip-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] before:opacity-0 before:transition-opacity before:duration-300",
        "hover:z-10 hover:-translate-y-0.5 hover:border-[color:var(--chip-hover-border)] hover:text-[color:var(--text-strong)] hover:shadow-[0_16px_30px_-18px_var(--chip-glow),0_0_0_1px_var(--chip-hover-border)] hover:before:opacity-100",
        className,
      )}
      style={
        {
          "--chip-bg": "var(--resume-chip-bg)",
          "--chip-glow": palette.glow,
          "--chip-hover-border": palette.hoverBorder,
          "--chip-hover-end": palette.hoverEnd,
          "--chip-hover-start": palette.hoverStart,
          "--chip-text": palette.text,
          borderColor: palette.border,
        } as CSSProperties
      }
    >
      {Icon ? <Icon className="h-3.5 w-3.5 shrink-0" stroke={1.8} /> : null}
      {children}
    </span>
  );
}

function ResumeSection({
  children,
  emphasis,
  eyebrow,
  id,
  title,
}: {
  children: ReactNode;
  emphasis: number;
  eyebrow: string;
  id: ResumeSectionId;
  title: string;
}) {
  const visualState = getSectionVisualState(emphasis);

  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-[color:var(--resume-line)] px-4 py-6 md:px-10 md:py-10"
      style={{
        ...visualState,
        transition: "opacity 320ms ease, filter 320ms ease",
      }}
    >
      <div className="grid gap-6 xl:grid-cols-[180px_minmax(0,1fr)]">
        <div className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-tertiary)]">
            {eyebrow}
          </p>
          <h2 className="text-xl font-semibold tracking-[-0.05em] text-[color:var(--text-strong)] md:text-3xl">
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export function ResumePageClient({
  projects,
}: {
  projects: ResumeProjectSummary[];
}) {
  const [railProgressTarget, setRailProgressTarget] = useState(railStart);
  const [railProgress, setRailProgress] = useState(railStart);
  const [contentEmphasis, setContentEmphasis] = useState<Record<ResumeSectionId, number>>(
    getInitialContentEmphasis,
  );
  const smoothRailProgress = useSpring(railStart, {
    damping: 28,
    mass: 0.38,
    stiffness: 220,
  });
  const activeBarWidth = "calc(min(300px, 100vw - 2rem) - 0rem)";
  const activeSection = getActiveRailSection(railProgress);

  useEffect(() => {
    smoothRailProgress.set(railProgressTarget);
  }, [railProgressTarget, smoothRailProgress]);

  useMotionValueEvent(smoothRailProgress, "change", (latest) => {
    setRailProgress(latest);
  });

  const handleScrollState = useEffectEvent(() => {
    const sectionNodes = resumeSections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    if (sectionNodes.length === 0) {
      return;
    }

    const viewportAnchor = window.scrollY + window.innerHeight * 0.34;
    const sectionOffsets = sectionNodes.map(
      (node) => window.scrollY + node.getBoundingClientRect().top,
    );

    let currentIndex = 0;

    for (let index = 0; index < sectionOffsets.length; index += 1) {
      if (viewportAnchor >= sectionOffsets[index]) {
        currentIndex = index;
      }
    }

    const currentOffset = sectionOffsets[currentIndex];
    const nextOffset = sectionOffsets[currentIndex + 1];
    const currentStop = railStops[currentIndex];
    const nextStop = railStops[currentIndex + 1] ?? currentStop;

    const localProgress =
      nextOffset && nextOffset > currentOffset
        ? Math.min(
            Math.max((viewportAnchor - currentOffset) / (nextOffset - currentOffset), 0),
            1,
          )
        : 1;

    setRailProgressTarget(currentStop + (nextStop - currentStop) * localProgress);

    const viewportHeight = window.innerHeight;
    const nextContentEmphasis = {} as Record<ResumeSectionId, number>;

    sectionNodes.forEach((node) => {
      nextContentEmphasis[node.id as ResumeSectionId] = getViewportCenteredEmphasis(
        node.getBoundingClientRect(),
        viewportHeight,
      );
    });

    setContentEmphasis(nextContentEmphasis);
  });

  useEffect(() => {
    let frame = 0;

    const scheduleUpdate = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        handleScrollState();
      });
    };

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <section className="space-y-8 pb-8 xl:pl-[11.5rem]">
      <div className="print-hidden flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[var(--accent-secondary)]">
            Digital Resume 
          </p>
          <div className="space-y-3">
            
          </div>
        </div>
        <ResumePrintButton />
      </div>

      <aside className="print-hidden fixed left-0 top-0 z-30 hidden h-screen w-[180px] xl:block">
        <div className="flex h-screen flex-col pb-8 pt-28">
          <div className="flex-1">
            <div className="relative h-full">
              <div className="absolute left-2 top-0 h-full w-px bg-[repeating-linear-gradient(to_bottom,var(--resume-rail-base)_0px,var(--resume-rail-base)_1px,transparent_1px,transparent_14px)]" />
              <motion.div
                className="absolute left-2 top-0 w-px bg-[repeating-linear-gradient(to_bottom,var(--resume-rail-accent)_0px,var(--resume-rail-accent)_1px,transparent_1px,transparent_14px)]"
                style={{
                  height: `${railProgress * 100}%`,
                  width: "8px",
                  boxShadow: "0 0 24px rgba(255, 141, 111, 0.14)",
                  willChange: "height",
                }}
              />
              <motion.div
                className="absolute left-[-8px] h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-[color:var(--resume-rail-accent)] bg-[color:var(--resume-rail-accent-soft)]"
                style={{
                  top: `${railProgress * 100}%`,
                  filter: "drop-shadow(0 0 14px rgba(255, 141, 111, 0.18))",
                  willChange: "top",
                }}
              />
              <motion.div
                className="absolute left-2 z-10 h-px -translate-y-1/2 bg-[color:var(--resume-rail-accent)]"
                style={{
                  top: `${railProgress * 100}%`,
                  width: activeBarWidth,
                  boxShadow: "0 0 22px rgba(255, 141, 111, 0.2)",
                  willChange: "top,width",
                }}
              />

              {resumeSections.map((section, index) => {
                const active = activeSection === section.id;
                const passed = railProgress >= railStops[index];
                const distance = Math.abs(railProgress - railStops[index]);
                const proximity = clamp(1 - distance / 0.16, 0, 1);
                const emphasis = passed ? Math.max(0.72, proximity) : proximity;
                const tickWidth = 18 + emphasis * 28;
                const tickOpacity = 0.18 + emphasis * 0.82;
                const labelOpacity = 0.16 + emphasis * 0.84;
                const metaOpacity = 0.1 + emphasis * 0.58;

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group absolute left-0 right-0 block -translate-y-1/2"
                    style={{
                      top: `${railStops[index] * 100}%`,
                    }}
                    onClick={() => {
                      setRailProgressTarget(railStops[index]);
                    }}
                  >
                    <span
                      className={cn(
                        "absolute left-2 top-1/2 h-px -translate-y-1/2 transition-all duration-300",
                        passed
                          ? "bg-[color:var(--resume-rail-accent)]"
                          : "bg-[color:var(--resume-rail-tick)] group-hover:bg-[color:var(--resume-rail-accent)]",
                      )}
                      style={{
                        opacity: tickOpacity,
                        width: `${tickWidth}px`,
                      }}
                    />
                    <span
                      className={cn(
                        "absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border transition-all duration-300",
                        active
                          ? "border-[color:var(--resume-rail-accent)] bg-[color:var(--resume-rail-accent-soft)]"
                          : passed
                            ? "border-[color:var(--resume-rail-accent)] bg-transparent"
                            : "border-[color:var(--resume-line)] bg-transparent group-hover:border-[color:var(--resume-rail-accent)]",
                      )}
                      style={{
                        left: `${tickWidth + 24}px`,
                        opacity: 0.3 + emphasis * 0.7,
                      }}
                    />
                    <span
                      className="block transition-all duration-300"
                      style={{
                        marginLeft: `${tickWidth + 42}px`,
                        opacity: labelOpacity,
                        filter: `brightness(${0.42 + emphasis * 0.58}) saturate(${0.55 + emphasis * 0.65})`,
                      }}
                    >
                      <span
                        className={cn(
                          "block font-mono text-[11px] uppercase tracking-[0.3em] transition",
                          active || passed
                            ? "text-[var(--resume-rail-accent)]"
                            : "text-[color:var(--text-faint)] group-hover:text-[var(--resume-rail-accent)]",
                        )}
                      >
                        {section.label}
                      </span>
                      <span
                        className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--text-faint)]"
                        style={{
                          opacity: metaOpacity,
                        }}
                      >
                        {section.meta}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      <div className="relative z-20">
        <div className="resume-print  relative overflow-hidden rounded-[40px] border border-[color:var(--resume-deck-border)] bg-[linear-gradient(180deg,var(--resume-deck-top),var(--resume-deck-bottom))] shadow-[var(--resume-deck-shadow)]">
          <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(90deg,var(--resume-overlay-warm),transparent_24%,transparent_74%,var(--resume-overlay-cool))]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--resume-glow-warm),transparent_28%),radial-gradient(circle_at_80%_18%,var(--resume-glow-cool),transparent_26%)]" />

          <div className="relative z-50">
            <section
              id="profile"
              className="scroll-mt-28 px-4 py-6 md:px-10 md:py-10"
              style={{
                ...getSectionVisualState(contentEmphasis.profile),
                transition: "opacity 320ms ease, filter 320ms ease",
              }}
            >
              <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[var(--accent)]">
                      {profileIntro.title}
                    </p>
                    <h2 className="max-w-3xl text-[2.15rem] font-semibold tracking-[-0.06em] text-[color:var(--text-strong)] md:text-6xl">
                      {profileIntro.name}
                    </h2>
                  </div>
                  <p className="max-w-3xl text-[14px] leading-6 text-[color:var(--text-muted)] md:text-lg md:leading-8">
                    {profileIntro.professionalSummary}
                  </p>
                  <ResumeChipRack>
                    <ResumeChip tone="warm">
                      Backend systems
                    </ResumeChip>
                    <ResumeChip tone="cool">
                      Full-stack delivery
                    </ResumeChip>
                    <ResumeChip tone="lime">
                      Production focus
                    </ResumeChip>
                  </ResumeChipRack>
                </div>

                <div className="space-y-4 rounded-[28px] border border-[color:var(--resume-line)] bg-[linear-gradient(180deg,var(--resume-panel-top),var(--resume-panel-bottom))] p-4 md:rounded-[32px] md:p-6">
                  <div className="space-y-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-secondary)]">
                      Contact
                    </p>
                    <p className="text-[13px] leading-6 text-[color:var(--text-muted)] md:text-sm md:leading-7">{profileIntro.location}</p>
                    <p className="text-[13px] leading-6 text-[color:var(--text-muted)] md:text-sm md:leading-7">{profileIntro.phone}</p>
                    <p className="text-[13px] leading-6 text-[color:var(--text-muted)] md:text-sm md:leading-7">{profileIntro.email}</p>
                  </div>
                  <div className="h-px bg-[color:var(--resume-line)]" />
                  <div className="space-y-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                      Links
                    </p>
                    {socialLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center justify-between gap-3 text-[13px] text-[color:var(--text-soft)] transition hover:text-[color:var(--text-strong)] md:text-sm"
                      >
                        <span>{link.label}</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-faint)]">
                          open
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="h-px bg-[color:var(--resume-line)]" />
                  <p className="text-[13px] leading-6 text-[color:var(--text-soft)] md:text-sm md:leading-7">{profileIntro.availability}</p>
                </div>
              </div>
            </section>

            <ResumeSection
              id="signal"
              emphasis={contentEmphasis.signal}
              eyebrow="Signal"
              title="Scale, focus, and the systems I like shipping."
            >
              <div className="grid gap-4 md:grid-cols-3">
                {resumeStats.map((item, index) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-[color:var(--resume-line)] bg-[linear-gradient(180deg,var(--resume-panel-top),var(--resume-panel-bottom))] p-4 md:rounded-[28px] md:p-5"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent-tertiary)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[color:var(--text-strong)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection
              id="experience"
              emphasis={contentEmphasis.experience}
              eyebrow="Experience"
              title="Where I shipped, led, and learned how to scale under pressure."
            >
              <div className="space-y-10">
                {experienceItems.map((item) => (
                  <article
                    key={`${item.company}-${item.role}`}
                    className="relative space-y-4 border-t border-[color:var(--resume-line)] pt-5 first:border-t-0 first:pt-0"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <div className="space-y-2">
                        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                          {item.company}
                        </p>
                        <h3 className="text-[1.35rem] font-semibold tracking-[-0.04em] text-[color:var(--text-strong)] md:text-2xl">
                          {item.role}
                        </h3>
                      </div>
                      <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[var(--accent-secondary)]">
                        {item.period}
                      </p>
                    </div>

                    <ul className="space-y-2.5 text-[13px] leading-6 text-[color:var(--text-soft)] md:text-base md:leading-7">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--accent-tertiary)]">
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                      <ResumeChipRack>
                        {item.tech.map((tech) => (
                          <ResumeChip key={tech} icon={getTechIcon(tech)}>
                            {tech}
                          </ResumeChip>
                        ))}
                      </ResumeChipRack>
                      <ResumeChipRack>
                        {item.outcomes.map((outcome) => (
                          <ResumeChip key={outcome} tone="cool">
                            {outcome}
                          </ResumeChip>
                        ))}
                      </ResumeChipRack>
                    </div>
                  </article>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection
              id="work"
              emphasis={contentEmphasis.work}
              eyebrow="Work"
              title="Selected builds with backend depth, product thinking, and visible impact."
            >
              <div className="space-y-8">
                {projects.map((project, index) => (
                  <article
                    key={project.slug}
                    className="grid gap-4 border-t border-[color:var(--resume-line)] pt-5 first:border-t-0 first:pt-0 lg:grid-cols-[72px_minmax(0,1fr)]"
                  >
                    <div className="font-mono text-4xl font-semibold tracking-[-0.08em] text-[var(--resume-count)] md:text-5xl">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-2">
                          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                            {project.roles.join(" / ")}
                          </p>
                          <h3 className="text-[1.35rem] font-semibold tracking-[-0.04em] text-[color:var(--text-strong)] md:text-2xl">
                            {project.title}
                          </h3>
                        </div>
                        <p className="max-w-sm text-[13px] leading-6 text-[color:var(--text-soft)] md:text-sm md:leading-7">{project.impact}</p>
                      </div>
                      <p className="max-w-3xl text-[13px] leading-6 text-[color:var(--text-muted)] md:text-base md:leading-7">
                        {project.summary}
                      </p>
                      <ResumeChipRack>
                        {project.stack.map((stackItem) => (
                          <ResumeChip key={stackItem} icon={getTechIcon(stackItem)}>
                            {stackItem}
                          </ResumeChip>
                        ))}
                      </ResumeChipRack>
                      <div className="flex flex-wrap gap-4 pt-1">
                        {project.links.map((link) => (
                          (() => {
                            const isGithubLink =
                              link.href.includes("github.com") ||
                              link.label.toLowerCase().includes("github") ||
                              link.label.toLowerCase().includes("repo");

                            return (
                              <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition duration-300 md:px-3.5 md:py-2 md:text-sm",
                                  isGithubLink
                                    ? "border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.03)] text-[color:var(--text-strong)] hover:border-[color:var(--accent-secondary)] hover:bg-[color:rgba(74,214,255,0.08)]"
                                    : "border-transparent text-[var(--accent-secondary)] hover:text-[color:var(--text-strong)]",
                                )}
                              >
                                {isGithubLink ? (
                                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:rgba(255,255,255,0.08)] text-[color:var(--text-strong)]">
                                    <IconBrandGithubFilled className="h-3.5 w-3.5" />
                                  </span>
                                ) : (
                                  <ArrowUpRight className="h-4 w-4" />
                                )}
                                <span>{isGithubLink ? "Repository" : link.label}</span>
                              </Link>
                            );
                          })()
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection
              id="stack"
              emphasis={contentEmphasis.stack}
              eyebrow="Stack"
              title="Grouped by how I actually use the tools, not just by logo count."
            >
              <div className="space-y-8">
                {skillGroups.map((group) => (
                  <article
                    key={group.category}
                    className="grid gap-3 border-t border-[color:var(--resume-line)] pt-4 first:border-t-0 first:pt-0 lg:grid-cols-[200px_minmax(0,1fr)]"
                  >
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--text-strong)]">
                        {group.category}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <ResumeChipRack>
                        {group.items.map((item) => (
                          <ResumeChip key={item.name} icon={getTechIcon(item.name)}>
                            {item.name}
                          </ResumeChip>
                        ))}
                      </ResumeChipRack>
                      <div className="grid gap-3">
                        {group.items.map((item) => (
                          <p key={`${group.category}-${item.name}`} className="text-[13px] leading-6 text-[color:var(--text-soft)] md:text-sm md:leading-7">
                            <span className="text-[color:var(--text-strong)]">{item.name}</span>
                            {` / ${item.context}`}
                          </p>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection
              id="education"
              emphasis={contentEmphasis.education}
              eyebrow="Education"
              title="Formal training, plus the systems lens that keeps the work grounded."
            >
              <div className="space-y-6">
                {educationItems.map((item) => (
                  <article
                    key={item.institution}
                    className="space-y-3 border-t border-[color:var(--resume-line)] pt-4 first:border-t-0 first:pt-0"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <div className="space-y-2">
                        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                          {item.institution}
                        </p>
                        <h3 className="text-[1.35rem] font-semibold tracking-[-0.04em] text-[color:var(--text-strong)] md:text-2xl">
                          {item.credential}
                        </h3>
                      </div>
                      <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[var(--accent)]">
                        {item.period}
                      </p>
                    </div>
                    <ul className="space-y-2.5 text-[13px] leading-6 text-[color:var(--text-soft)] md:text-base md:leading-7">
                      {item.notes.map((note) => (
                        <li key={note} className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--accent)]">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </ResumeSection>
          </div>
        </div>
      </div>
    </section>
  );
}

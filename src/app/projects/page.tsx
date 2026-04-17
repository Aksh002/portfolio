import type { CSSProperties } from "react";
import type { Metadata } from "next";

import { ArrowUpRight } from "lucide-react";
import { IconBrandGithubFilled } from "@tabler/icons-react";

import { ProjectEffectCard } from "@/components/site/project-effect-card";
import { PageShell } from "@/components/site/page-shell";
import { ProjectsShowcase } from "@/components/site/projects-showcase";
import { Badge } from "@/components/ui/badge";
import { getAllProjects } from "@/lib/content";

const accentStyles = {
  anime: {
    canvasColors: [
      [255, 141, 111],
      [255, 196, 146],
      [255, 237, 208],
    ] as [number, number, number][],
    glow: "rgba(255, 141, 111, 0.22)",
    glowColors: [
      "rgba(255, 141, 111, 0.85)",
      "rgba(255, 196, 146, 0.72)",
      "rgba(255, 222, 197, 0.64)",
      "rgba(255, 141, 111, 0.58)",
    ] as [string, string, string, string],
    line: "var(--accent-tertiary)",
    text: "var(--accent-tertiary)",
  },
  football: {
    canvasColors: [
      [184, 255, 111],
      [138, 230, 109],
      [74, 214, 255],
    ] as [number, number, number][],
    glow: "rgba(184, 255, 111, 0.22)",
    glowColors: [
      "rgba(184, 255, 111, 0.84)",
      "rgba(138, 230, 109, 0.68)",
      "rgba(74, 214, 255, 0.62)",
      "rgba(184, 255, 111, 0.54)",
    ] as [string, string, string, string],
    line: "var(--accent)",
    text: "var(--accent)",
  },
  music: {
    canvasColors: [
      [74, 214, 255],
      [126, 203, 255],
      [180, 236, 255],
    ] as [number, number, number][],
    glow: "rgba(74, 214, 255, 0.24)",
    glowColors: [
      "rgba(74, 214, 255, 0.86)",
      "rgba(126, 203, 255, 0.74)",
      "rgba(180, 236, 255, 0.62)",
      "rgba(74, 214, 255, 0.56)",
    ] as [string, string, string, string],
    line: "var(--accent-secondary)",
    text: "var(--accent-secondary)",
  },
} as const;

const caseVisibilityStyle = {
  filter:
    "brightness(calc(0.68 + var(--project-focus) * 0.32)) saturate(calc(0.74 + var(--project-focus) * 0.46))",
  opacity: "calc(0.28 + var(--project-focus) * 0.72)",
  transition: "opacity 220ms ease, filter 220ms ease, border-color 220ms ease",
} satisfies CSSProperties;

const panelVisibilityStyle = {
  filter:
    "brightness(calc(0.72 + var(--project-focus) * 0.28)) saturate(calc(0.78 + var(--project-focus) * 0.42))",
  opacity: "calc(0.34 + var(--project-focus) * 0.66)",
  transition: "opacity 220ms ease, filter 220ms ease, transform 220ms ease",
} satisfies CSSProperties;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work across backend systems, product engineering, and motion-aware interfaces.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <PageShell className="space-y-8 md:space-y-14">
      <section className="page-section grid gap-5 border-b border-[color:var(--panel-border)] pb-6 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:pb-12">
        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[var(--accent-secondary)]">
            Projects / editorial split
          </p>
          <h1 className="max-w-4xl text-[2rem] font-semibold tracking-[-0.06em] text-[color:var(--text-strong)] md:text-5xl">
            PROJECTS :-
          </h1>
        </div>

        <div className="space-y-4">
          
          <p className="max-w-3xl text-sm leading-7 text-[color:var(--text-muted)] md:text-base">
            Some picture
          </p>
        </div>
      </section>

      <ProjectsShowcase>
        {projects.map((project, index) => {
          const accent = accentStyles[project.themeTag];

          return (
            <article
              key={project.slug}
              data-project-case
              className="grid gap-5 border-t border-[color:var(--panel-border)] py-6 md:gap-10 md:py-10 lg:min-h-[85vh] lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-14"
              style={{ "--project-focus": 0.14 } as CSSProperties}
            >
              <div data-project-left className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
                <ProjectEffectCard
                  spotlight
                  glowColors={accent.glowColors}
                  spotlightCanvasColors={accent.canvasColors}
                  spotlightColor={accent.glow}
                  spotlightRadius={320}
                  style={caseVisibilityStyle}
                  className="overflow-hidden"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)`,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute -right-10 top-10 h-28 w-28 rounded-full blur-3xl"
                    style={{ backgroundColor: accent.glow }}
                  />

                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge>{project.themeTag}</Badge>
                      <span className="font-mono text-[12px] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                        [{String(index + 1).padStart(2, "0")}]
                      </span>
                    </div>

                    <div className="space-y-4">
                      <p
                        className="font-mono text-[12px] uppercase tracking-[0.26em]"
                        style={{ color: accent.text }}
                      >
                        {project.roles.join(" / ")}
                      </p>
                      <h2 className="max-w-sm text-[2rem] font-semibold tracking-[-0.06em] text-[color:var(--text-strong)] md:text-5xl">
                        {project.title}
                      </h2>
                      <p className="max-w-md text-[13px] leading-6 text-[color:var(--text-muted)] md:text-base md:leading-7">
                        {project.impact}
                      </p>
                    </div>
                  </div>
                </ProjectEffectCard>
              </div>

              <div data-project-right className="space-y-5 md:space-y-6 lg:pt-6">
                <ProjectEffectCard
                  data-project-panel
                  glowColors={accent.glowColors}
                  spotlight
                  spotlightCanvasColors={accent.canvasColors}
                  spotlightColor={accent.glow}
                  spotlightRadius={620}
                  className="overflow-hidden"
                  style={panelVisibilityStyle}
                >
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                    <div className="space-y-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                        Overview
                      </p>
                      <p className="max-w-3xl text-[14px] leading-6.5 text-[color:var(--text-muted)] md:text-lg md:leading-8">
                        {project.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 lg:max-w-[16rem] lg:justify-end">
                      {project.links.map((link) => {
                        const isGithubLink =
                          link.href.includes("github.com") ||
                          link.label.toLowerCase().includes("github") ||
                          link.label.toLowerCase().includes("repo");

                        return (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--panel-border)] bg-[color:rgba(255,255,255,0.03)] px-3 py-1.5 text-xs text-[color:var(--text-strong)] transition duration-300 hover:border-[color:var(--accent-secondary)] hover:bg-[color:rgba(74,214,255,0.08)] md:px-3.5 md:py-2 md:text-sm"
                          >
                            {isGithubLink ? (
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:rgba(255,255,255,0.08)]">
                                <IconBrandGithubFilled className="h-3.5 w-3.5" />
                              </span>
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                            <span>{isGithubLink ? "Repository" : link.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </ProjectEffectCard>

                <ProjectEffectCard
                  data-project-panel
                  glowColors={accent.glowColors}
                  spotlight
                  spotlightCanvasColors={accent.canvasColors}
                  spotlightColor={accent.glow}
                  spotlightRadius={620}
                  className="overflow-hidden"
                  style={panelVisibilityStyle}
                >
                  <div className="space-y-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="inline-flex w-fit items-center rounded-full border border-[color:var(--panel-border)] bg-[color:rgba(255,255,255,0.04)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent-secondary)] hover:bg-[color:rgba(74,214,255,0.09)] hover:text-[color:var(--text-strong)] md:px-3.5 md:py-2 md:text-[11px]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </ProjectEffectCard>

                <ProjectEffectCard
                  data-project-panel
                  glowColors={accent.glowColors}
                  spotlight
                  spotlightCanvasColors={accent.canvasColors}
                  spotlightColor={accent.glow}
                  spotlightRadius={620}
                  className="overflow-hidden"
                  style={panelVisibilityStyle}
                >
                  <div className="space-y-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                      Build Story
                    </p>
                    <div className="space-y-1">{project.content}</div>
                  </div>
                </ProjectEffectCard>
              </div>
            </article>
          );
        })}
      </ProjectsShowcase>
    </PageShell>
  );
}

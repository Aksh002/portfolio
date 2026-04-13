import type { Metadata } from "next";
import Link from "next/link";

import { ResumePrintButton } from "@/components/site/resume-print-button";
import { Card } from "@/components/ui/card";
import { getAllProjects } from "@/lib/content";
import {
  educationItems,
  experienceItems,
  profileIntro,
  resumeStats,
  skillGroups,
  socialLinks,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "Professional resume view with a print-friendly layout and PDF-friendly output.",
};

export default async function ResumePage() {
  const projects = await getAllProjects();

  return (
    <section className="space-y-8">
      <div className="print-hidden flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--accent-secondary)]">Digital resume</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text-strong)] md:text-4xl">
            Professional mode, with the same substance.
          </h1>
        </div>
        <ResumePrintButton />
      </div>

      <Card className="resume-print resume-surface rounded-[36px] p-6 md:p-10">
        <div className="space-y-10">
          <section className="grid gap-8 border-b border-[color:var(--panel-border)] pb-8 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">
                  {profileIntro.title}
                </p>
                <h2 className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-[color:var(--text-strong)] md:text-5xl">
                  {profileIntro.name}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[color:var(--text-muted)] md:text-base">
                {profileIntro.professionalSummary}
              </p>
              <p className="text-sm leading-7 text-[color:var(--text-soft)]">{profileIntro.availability}</p>
            </div>
            <div className="surface-dark space-y-4 rounded-[28px] p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent-secondary)]">Contact</p>
              <div className="space-y-2 text-sm text-[color:var(--text-muted)]">
                <p>{profileIntro.location}</p>
                <p>{profileIntro.phone}</p>
                <p>{profileIntro.email}</p>
                {socialLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block hover:text-[color:var(--text-strong)]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-3">
            {resumeStats.map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-[color:var(--panel-border)] bg-[color:rgba(0,0,0,0.08)] p-5"
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--accent-tertiary)]">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-medium text-[color:var(--text-strong)]">{item.value}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-8 border-b border-[color:var(--panel-border)] pb-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">Experience</p>
            </div>
            <div className="space-y-8">
              {experienceItems.map((item) => (
                <div key={`${item.company}-${item.role}`} className="space-y-3">
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-[color:var(--text-strong)]">{item.role}</h3>
                      <p className="text-sm text-[color:var(--text-soft)]">{item.company}</p>
                    </div>
                    <p className="text-sm text-[color:var(--text-faint)]">{item.period}</p>
                  </div>
                  <ul className="space-y-2 text-sm leading-7 text-[color:var(--text-soft)]">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 border-b border-[color:var(--panel-border)] pb-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">Projects</p>
            </div>
            <div className="space-y-8">
              {projects.map((project) => (
                <div key={project.slug} className="space-y-3">
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                    <h3 className="text-xl font-semibold text-[color:var(--text-strong)]">{project.title}</h3>
                    <p className="text-sm text-[color:var(--text-faint)]">{project.roles.join(" / ")}</p>
                  </div>
                  <p className="text-sm leading-7 text-[color:var(--text-soft)]">{project.summary}</p>
                  <p className="text-sm text-[color:var(--text-faint)]">{project.stack.join(" • ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 border-b border-[color:var(--panel-border)] pb-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">Skills</p>
            </div>
            <div className="space-y-6">
              {skillGroups.map((group) => (
                <div key={group.category} className="space-y-2">
                  <h3 className="text-base font-semibold text-[color:var(--text-strong)]">{group.category}</h3>
                  <p className="text-sm leading-7 text-[color:var(--text-soft)]">
                    {group.items.map((item) => item.name).join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">Education</p>
            </div>
            <div className="space-y-6">
              {educationItems.map((item) => (
                <div key={item.institution} className="space-y-2">
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                    <h3 className="text-xl font-semibold text-[color:var(--text-strong)]">{item.credential}</h3>
                    <p className="text-sm text-[color:var(--text-faint)]">{item.period}</p>
                  </div>
                  <p className="text-sm text-[color:var(--text-soft)]">{item.institution}</p>
                  <ul className="space-y-2 text-sm leading-7 text-[color:var(--text-soft)]">
                    {item.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Card>
    </section>
  );
}

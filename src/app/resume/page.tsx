import type { Metadata } from "next";

import { ResumePageClient } from "@/components/site/resume-page-client";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
  description: "Professional resume view with a print-friendly layout and PDF-friendly output.",
};

export default async function ResumePage() {
  const projects = await getAllProjects();
  const resumeProjects = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    roles: project.roles,
    stack: project.stack,
    impact: project.impact,
    links: project.links,
  }));

  return <ResumePageClient projects={resumeProjects} />;
}

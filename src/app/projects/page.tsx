import type { Metadata } from "next";

import { PageShell } from "@/components/site/page-shell";
import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work across immersive UI, product engineering, and motion-led frontend experiences.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <PageShell className="space-y-16">
      <section className="page-section space-y-6">
        <SectionHeading
          eyebrow="Projects"
          title="Case studies that translate personality into product execution."
          description="These project cards are backed by MDX content so the portfolio can grow without hard-coding each case study. The design stays expressive, but the reading experience is clear and recruiter-friendly."
        />
      </section>

      <div className="space-y-8">
        {projects.map((project) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} showContent />
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}

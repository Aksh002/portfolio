import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/types";

const accentClasses = {
  football: "text-lime-200",
  anime: "text-orange-200",
  music: "text-sky-200",
} as const;

export function ProjectCard({
  project,
  showContent = false,
}: {
  project: Project;
  showContent?: boolean;
}) {
  return (
    <Card className="h-full">
      <div className="flex h-full flex-col gap-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{project.themeTag}</Badge>
            <span className={`text-sm font-medium ${accentClasses[project.themeTag]}`}>
              {project.impact}
            </span>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text-strong)]">
              {project.title}
            </h3>
            <p className="text-sm leading-7 text-[color:var(--text-muted)]">{project.summary}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[color:var(--panel-border)] bg-[color:rgba(0,0,0,0.08)] px-3 py-1 text-xs text-[color:var(--text-soft)]"
            >
              {item}
            </span>
          ))}
        </div>
        {showContent ? <div className="space-y-2">{project.content}</div> : null}
        <div className="mt-auto flex flex-wrap gap-3">
          {project.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 text-sm text-[color:var(--text-muted)] transition hover:text-[color:var(--text-strong)]"
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}

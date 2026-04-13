import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { HeroScene } from "@/components/site/hero-scene";
import { PageShell } from "@/components/site/page-shell";
import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { WorldCard } from "@/components/site/world-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeaturedProjects } from "@/lib/content";
import { interestWorlds, profileHighlights, profileIntro, socialLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <PageShell className="space-y-24 md:space-y-32">
      <section className="page-section section-orb grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-5">
            <Badge>Immersive portfolio / maximal experimental</Badge>
            <div className="space-y-4">
              <p className="eyebrow-accent text-sm uppercase tracking-[0.34em]">
                {profileIntro.location}
              </p>
              <h1 className="display max-w-4xl text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.06em] md:text-7xl lg:text-[5.8rem]">
                <span className="accent-gradient-text">
                Engineering with matchday intensity, anime-scale drama, and music-driven rhythm.
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[color:var(--text-soft)] md:text-lg">
                {profileIntro.longBio}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/projects" className={buttonVariants({ variant: "default", size: "lg" })}>
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/resume" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Open Digital Resume
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {profileHighlights.map((item) => (
              <Card key={item.label} className="space-y-2 rounded-[28px] p-5">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent-secondary)]">
                  {item.label}
                </p>
                <p className="text-sm leading-7 text-[color:var(--text-muted)]">{item.value}</p>
              </Card>
            ))}
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-[color:var(--text-soft)]">
            {socialLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[color:var(--text-strong)]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <Reveal>
          <HeroScene />
        </Reveal>
      </section>

      <Reveal className="page-section space-y-8">
        <SectionHeading
          eyebrow="Worlds"
          title="One portfolio, three distinct energy systems."
          description="The home page is structured like a curated crossover. Football brings tactical shape, anime brings scene-making, and music brings rhythm to the way content moves."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {interestWorlds.map((world) => (
            <WorldCard key={world.key} world={world} />
          ))}
        </div>
      </Reveal>

      <Reveal className="page-section space-y-8">
        <SectionHeading
          eyebrow="Featured Work"
          title="Proof points with atmosphere still intact."
          description="Featured projects stay technical and structured, but they still carry the tone of the broader brand system. Each case study is designed to read fast while feeling intentional."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Reveal>

      <Reveal className="page-section">
        <Card className="overflow-hidden rounded-[36px] border-[color:var(--panel-border)] bg-[linear-gradient(120deg,rgba(184,255,111,0.22),rgba(74,214,255,0.16)_38%,rgba(255,141,111,0.18)_100%)] p-0">
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1fr_auto] md:items-end md:px-8 md:py-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[var(--accent-secondary)]">
                <Sparkles className="h-4 w-4" />
                <span className="text-[11px] uppercase tracking-[0.32em]">Professional mode</span>
              </div>
              <h2 className="accent-gradient-text text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
                Need the recruiter-safe version?
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[color:var(--text-soft)] md:text-base">
                The resume route strips back the theatrical layer and turns the same profile into a
                clean, scannable professional presentation.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/resume" className={buttonVariants({ variant: "default" })}>
                Open Resume
              </Link>
              <Link
                href="/about"
                className={cn(buttonVariants({ variant: "outline" }), "print-hidden")}
              >
                About the Builder
              </Link>
            </div>
          </div>
        </Card>
      </Reveal>
    </PageShell>
  );
}

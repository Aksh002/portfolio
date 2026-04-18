import Link from "next/link";
import { Sparkles } from "lucide-react";

import { AboutMeSurface } from "@/components/site/about-me-surface";
import { LandingHeroShowcase } from "@/components/site/landing-hero-showcase";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeaturedProjects } from "@/lib/content";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <PageShell className="space-y-24 md:space-y-32">
      <LandingHeroShowcase featuredProjects={featuredProjects} />

      <AboutMeSurface />

      

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
              <Link href="/resume" className={cn(buttonVariants({ variant: "outline" }), "print-hidden")}>
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

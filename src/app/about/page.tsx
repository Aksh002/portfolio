import type { Metadata } from "next";

import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { WorldCard } from "@/components/site/world-card";
import { Card } from "@/components/ui/card";
import {
  experienceItems,
  interestWorlds,
  profileIntro,
  skillGroups,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Technical profile, working style, and the cultural influences behind the portfolio.",
};

export default function AboutPage() {
  return (
    <PageShell className="space-y-20">
      <Reveal className="space-y-6">
        <SectionHeading
          eyebrow="About"
          title="The technical profile behind the atmosphere."
          description="This page translates the home page vibe into a clearer explanation of how I work: what I build, how I think, and which influences actually shape the interfaces."
        />
        <Card className="grid gap-6 rounded-[34px] md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-base leading-8 text-[color:var(--text-muted)]">{profileIntro.longBio}</p>
            <p className="text-base leading-8 text-[color:var(--text-soft)]">{profileIntro.professionalSummary}</p>
          </div>
          <div className="surface-dark space-y-4 rounded-[28px] p-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent-tertiary)]">Working style</p>
            <ul className="space-y-3 text-sm leading-7 text-[color:var(--text-soft)]">
              <li>Build the content model first so the visuals scale cleanly.</li>
              <li>Use motion to support hierarchy, not compete with it.</li>
              <li>Design components like systems, even when the output feels highly personal.</li>
            </ul>
          </div>
        </Card>
      </Reveal>

      <Reveal className="space-y-8">
        <SectionHeading
          eyebrow="Skills"
          title="Technical depth organized by how it actually gets used."
          description="Instead of one long toolkit list, the stack is grouped by capability: engineering fundamentals, interface craft, and product-level thinking."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <Card key={group.category} className="space-y-5">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-[color:var(--text-strong)]">
                {group.category}
              </h3>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <p className="text-sm font-medium text-[var(--accent-secondary)]">{item.name}</p>
                    <p className="text-sm leading-7 text-[color:var(--text-soft)]">{item.context}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="space-y-8">
        <SectionHeading
          eyebrow="Interests"
          title="Cultural references that actually affect the interface."
          description="These are not decorative references pasted on top. Each world changes pacing, composition, and the way information is framed."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {interestWorlds.map((world) => (
            <WorldCard key={world.key} world={world} />
          ))}
        </div>
      </Reveal>

      <Reveal className="space-y-8">
        <SectionHeading
          eyebrow="Experience"
          title="Recent roles and the kind of impact I like to make."
          description="This is still personality-aware, but the emphasis here is execution: shipping better interfaces, improving systems, and making teams move faster with clearer frontend architecture."
        />
        <div className="space-y-5">
          {experienceItems.map((item) => (
            <Card
              key={`${item.company}-${item.role}`}
              className="grid gap-6 md:grid-cols-[0.7fr_1.3fr]"
            >
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
                  {item.period}
                </p>
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text-strong)]">
                  {item.role}
                </h3>
                <p className="text-sm text-[color:var(--text-soft)]">{item.company}</p>
              </div>
              <div className="space-y-5">
                <ul className="space-y-3 text-sm leading-7 text-[color:var(--text-soft)]">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[color:var(--panel-border)] bg-[color:rgba(0,0,0,0.08)] px-3 py-1 text-xs text-[color:var(--text-soft)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Reveal>
    </PageShell>
  );
}

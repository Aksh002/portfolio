import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Globe, MapPin } from "lucide-react";

import CometCardDemo from "@/components/comet-card-demo";
import { AboutInterestsPlayer } from "@/components/site/about-interests-player";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import {
  experienceItems,
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
      <Reveal>
        <section className="relative overflow-hidden rounded-[42px] border border-[color:color-mix(in_srgb,var(--text-strong)_9%,transparent)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--page-base)_84%,rgba(7,10,18,0.96)),color-mix(in_srgb,var(--page-mid)_76%,rgba(10,11,20,0.92))_42%,color-mix(in_srgb,var(--page-end)_66%,rgba(16,12,28,0.88))_100%)] px-6 py-7 shadow-[0_24px_70px_color-mix(in_srgb,var(--text-strong)_12%,transparent)] md:px-8 md:py-9 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,color-mix(in_srgb,var(--accent-secondary)_14%,transparent),transparent_26%),radial-gradient(circle_at_82%_20%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_24%),linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_8%,transparent),transparent_34%,color-mix(in_srgb,var(--page-base)_28%,transparent)_100%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] lg:items-center">
            <div className="space-y-7">
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-[color:color-mix(in_srgb,var(--text-strong)_58%,transparent)]">
                <span>Profile / About</span>
                <span className="h-px w-10 bg-[color:color-mix(in_srgb,var(--text-strong)_16%,transparent)]" />
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {profileIntro.location}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="display max-w-[11ch] text-[clamp(3rem,6vw,6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.065em] text-[color:var(--text-strong)]">
                  The engineer behind the atmosphere.
                </h1>
                <p className="max-w-[44rem] text-[1.02rem] leading-8 text-[color:color-mix(in_srgb,var(--text-strong)_74%,transparent)] md:text-[1.08rem]">
                  {profileIntro.longBio}
                </p>
                <p className="max-w-[42rem] text-[15px] leading-8 text-[color:color-mix(in_srgb,var(--text-strong)_66%,transparent)]">
                  {profileIntro.professionalSummary}
                </p>
              </div>
            </div>

            <div className="relative mx-auto flex w-full justify-center lg:justify-end">
              <CometCardDemo className="mx-auto lg:mr-0" />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal className="space-y-8">
        <div className="space-y-5">
          <div className="space-y-3 xl:pr-3">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[color:color-mix(in_srgb,var(--text-strong)_54%,transparent)]">
              Skills / Capability map
            </p>
            <h2 className="display max-w-[10ch] text-[clamp(2.4rem,4.6vw,5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.06em] text-[color:var(--text-strong)]">
              Technical depth, grouped by how it gets used.
            </h2>
            <p className="max-w-[28rem] text-[15px] leading-8 text-[color:color-mix(in_srgb,var(--text-strong)_70%,transparent)]">
              Four capability lanes, one per working layer: problem solving, interfaces,
              backend systems, and the infrastructure that turns ideas into reliable
              products.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2 xl:grid-rows-2 xl:items-stretch">
            {skillGroups.map((group, index) => {
            const palettes: number[][][] = [
              [[184, 255, 111], [249, 255, 223]],
              [[74, 214, 255], [208, 244, 255]],
              [[255, 141, 111], [255, 214, 176]],
              [[214, 167, 255], [165, 215, 255]],
            ];
            const accentClasses = [
              "text-[color:var(--accent)]",
              "text-[color:var(--accent-secondary)]",
              "text-[color:var(--accent-tertiary)]",
              "text-[color:color-mix(in_srgb,var(--text-strong)_86%,transparent)]",
            ] as const;

            return (
              <section
                key={group.category}
                className="group relative min-h-[28rem] overflow-hidden rounded-[30px] border border-[color:color-mix(in_srgb,var(--text-strong)_9%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_88%,rgba(255,255,255,0.58)),color-mix(in_srgb,var(--page-mid)_78%,rgba(255,255,255,0.24)))] p-5 shadow-[0_18px_48px_color-mix(in_srgb,var(--text-strong)_8%,transparent)] backdrop-blur-md"
              >
                <div className="absolute inset-0">
                  <CanvasRevealEffect
                    animationSpeed={index === 0 ? 4.8 : index === 1 ? 4.2 : index === 2 ? 3.8 : 3.4}
                    containerClassName="bg-transparent"
                    colors={palettes[index]}
                    dotSize={2}
                    fadeColor="var(--page-base)"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_10%,rgba(255,255,255,0.06)),color-mix(in_srgb,var(--page-base)_34%,transparent)_34%,color-mix(in_srgb,var(--page-base)_88%,transparent)_100%)]" />
                <div className="relative flex h-full flex-col">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[color:color-mix(in_srgb,var(--text-strong)_54%,transparent)]">
                      {group.category}
                    </p>
                    <h3 className="text-[1.85rem] font-semibold tracking-[-0.04em] text-[color:var(--text-strong)]">
                      {group.category}
                    </h3>
                  </div>

                  <div className="mt-6 space-y-4">
                    {group.items.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-[20px] border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--page-base)_78%,rgba(255,255,255,0.34))] px-4 py-4 backdrop-blur-sm"
                      >
                        <p className={`text-sm font-medium ${accentClasses[index]}`}>
                          {item.name}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[color:color-mix(in_srgb,var(--text-strong)_78%,transparent)]">
                          {item.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
          </div>
        </div>
      </Reveal>

      <Reveal className="space-y-8">
        <AboutInterestsPlayer />
      </Reveal>

      <Reveal className="space-y-8">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[color:color-mix(in_srgb,var(--text-strong)_54%,transparent)]">
            Experience / Execution
          </p>
          <h2 className="display max-w-[12ch] text-[clamp(2.3rem,4.4vw,4.8rem)] font-semibold uppercase leading-[0.92] tracking-[-0.06em] text-[color:var(--text-strong)]">
            Roles where product, traffic, and ownership all matter.
          </h2>
          <p className="max-w-[44rem] text-[15px] leading-8 text-[color:color-mix(in_srgb,var(--text-strong)_70%,transparent)]">
            Personality still matters here, but the emphasis is delivery: clearer systems,
            better interface architecture, and product surfaces that stay stable under load.
          </p>
        </div>
        <div className="space-y-5">
          {experienceItems.map((item) => (
            <section
              key={`${item.company}-${item.role}`}
              className="relative overflow-hidden rounded-[32px] border border-[color:color-mix(in_srgb,var(--text-strong)_9%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_5%,rgba(255,255,255,0.28)),color-mix(in_srgb,var(--background)_2%,rgba(255,255,255,0.08)))] p-6 shadow-[0_18px_48px_color-mix(in_srgb,var(--text-strong)_8%,transparent)] backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_28%),radial-gradient(circle_at_80%_24%,color-mix(in_srgb,var(--accent-secondary)_10%,transparent),transparent_30%)]" />
              <div className="relative grid gap-6 md:grid-cols-[0.72fr_1.28fr]">
                <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
                  {item.period}
                </p>
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text-strong)]">
                  {item.role}
                </h3>
                <p className="text-sm text-[color:color-mix(in_srgb,var(--text-strong)_70%,transparent)]">{item.company}</p>
              </div>
              <div className="space-y-5">
                <ul className="space-y-3 text-sm leading-7 text-[color:color-mix(in_srgb,var(--text-strong)_76%,transparent)]">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[color:color-mix(in_srgb,var(--text-strong)_9%,transparent)] bg-[color:color-mix(in_srgb,var(--background)_4%,rgba(255,255,255,0.1))] px-3 py-1.5 text-xs text-[color:color-mix(in_srgb,var(--text-strong)_74%,transparent)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href="https://falak.mitblr.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--background)_5%,rgba(255,255,255,0.12))] px-4 py-2 text-sm text-[color:color-mix(in_srgb,var(--text-strong)_82%,transparent)] transition hover:border-[color:color-mix(in_srgb,var(--accent-secondary)_26%,transparent)] hover:text-[color:var(--text-strong)]"
                  >
                    <Globe className="h-4 w-4" />
                    Falak website
                  </Link>
                  <Link
                    href="https://github.com/Aksh002"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--background)_5%,rgba(255,255,255,0.12))] px-4 py-2 text-sm text-[color:color-mix(in_srgb,var(--text-strong)_82%,transparent)] transition hover:border-[color:color-mix(in_srgb,var(--accent-secondary)_26%,transparent)] hover:text-[color:var(--text-strong)]"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    GitHub
                  </Link>
                </div>
              </div>
              </div>
            </section>
          ))}
        </div>
      </Reveal>
    </PageShell>
  );
}

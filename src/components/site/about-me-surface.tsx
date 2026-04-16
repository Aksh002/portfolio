"use client";

import { MapPin } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { profileIntro, profileHighlights } from "@/lib/site";
import CometCardDemo from "../comet-card-demo";

const aboutPoints = [
  "I like taking ambitious product ideas and making the underlying systems feel composed, understandable, and dependable.",
  "Most of my work lives where backend architecture, full-stack execution, and real traffic meet, so I care as much about clarity and resilience as I do raw implementation speed.",
  "Outside of building, I naturally gravitate toward high-energy worlds like football, anime, and music because they all sharpen the way I think about pacing, mood, and systems under pressure.",
];

export function AboutMeSurface() {
  const [focusHighlight] = profileHighlights;

  return (
    <Reveal className="page-section">
      <section className="relative overflow-hidden rounded-[40px] bg-[linear-gradient(90deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.88)_44%,rgba(255,255,255,0.18)_72%,transparent_100%)] px-6 py-7 md:px-8 md:py-9 lg:px-10 lg:py-10">
        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center">
          <div className="rounded-[32px] border border-[rgba(8,18,29,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.46))] px-6 py-7 shadow-[0_18px_48px_rgba(15,18,26,0.08)] backdrop-blur-md md:px-8 md:py-8 lg:px-9">
            <div className="space-y-8">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-[color:rgba(18,22,32,0.46)]">
                  <span>About me</span>
                  <span className="h-px w-10 bg-[color:rgba(18,22,32,0.16)]" />
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {profileIntro.location}
                  </span>
                </div>
                <h2 className="display max-w-[10ch] text-[clamp(2.8rem,6vw,5.4rem)] font-semibold uppercase leading-[0.92] tracking-[-0.06em] text-[#08121d]">
                  Building calm surfaces over serious systems.
                </h2>
                <p className="max-w-[42rem] text-lg leading-9 text-[rgba(8,18,29,0.68)] md:text-[1.15rem]">
                  {profileIntro.tagline}
                </p>
              </div>

              <div className="space-y-6 text-[1.05rem] leading-9 text-[rgba(8,18,29,0.78)]">
                <div className="space-y-6">
                  {aboutPoints.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </div>

                <div className="rounded-[24px] border border-[rgba(8,18,29,0.08)] bg-[rgba(255,255,255,0.5)] px-5 py-4 text-sm leading-7 text-[rgba(8,18,29,0.72)]">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[rgba(8,18,29,0.44)]">
                    {focusHighlight.label}
                  </p>
                  <p className="mt-3">{focusHighlight.value}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[32rem] lg:ml-auto">
            <CometCardDemo className="mx-auto" />
          </div>
        </div>
      </section>
    </Reveal>
  );
}

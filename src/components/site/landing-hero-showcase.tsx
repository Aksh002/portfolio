"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";

import falakHomepagePreview from "@/public/image.png";
import GlassSurface from "@/components/GlassSurface";
import { HeroTechStackParallax } from "@/components/site/hero-tech-stack-parallax";
import { Keyboard } from "@/components/ui/keyboard";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Meteors } from "@/components/ui/meteors";
import { profileHighlights, profileIntro } from "@/lib/site";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const HERO_BIO_FADE_START = 0.08;
const HERO_BIO_FADE_DURATION = 0.22;

const falakStoryCards = [
  {
    label: "Tech Stack",
    title: "Next.js + Supabase, tuned for live event traffic.",
    body:
      "The platform combined Next.js, Supabase, auth workflows, admin tooling, and a production deployment path that could stay stable under heavy demand.",
    pills: ["Next.js", "Supabase", "TypeScript", "Auth", "Admin tooling"],
  },
  {
    label: "Scale",
    title: "50K+ visitors in a month.",
    body:
      "The system held up through marketing surges, registration spikes, and the kind of deadline-driven traffic that exposes weak product foundations fast.",
    pills: ["50K+ visitors", "Peak-hour traffic", "Stable UX", "Real users"],
  },
  {
    label: "Commerce",
    title: "5.5K+ passes sold cleanly.",
    body:
      "Ticketing and operational flows had to stay dependable, legible, and fast enough that users could move through purchase without friction.",
    pills: ["5.5K+ passes", "Reliable checkout", "Ops-ready flows"],
  },
  {
    label: "Team Systems",
    title: "1K+ team registrations, with scalable workflows behind it.",
    body:
      "The real win was building a system that felt composed under pressure: role-based tools, async operations, and architecture that could absorb real-world load.",
    pills: ["1K+ team registrations", "Role-based admin", "Scalable systems"],
  },
];

function InitialBadge() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-black/10 font-mono text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--text-strong)] backdrop-blur-sm">
      AG
    </div>
  );
}

const themeGlowClasses: Record<Project["themeTag"], string> = {
  football:
    "bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_58%),linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_88%,white_4%),color-mix(in_srgb,var(--page-mid)_92%,transparent))]",
  anime:
    "bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--accent-tertiary)_18%,transparent),transparent_58%),linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_88%,white_4%),color-mix(in_srgb,var(--page-mid)_92%,transparent))]",
  music:
    "bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--accent-secondary)_18%,transparent),transparent_58%),linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_88%,white_4%),color-mix(in_srgb,var(--page-mid)_92%,transparent))]",
};

const falakBentoAccents = [
  {
    glow: "rgba(74, 214, 255, 0.1)",
    canvasColors: [
      [74, 214, 255],
      [205, 241, 255],
    ] as [number, number, number][],
  },
  {
    glow: "rgba(184, 255, 111, 0.09)",
    canvasColors: [
      [184, 255, 111],
      [232, 255, 205],
    ] as [number, number, number][],
  },
  {
    glow: "rgba(255, 141, 111, 0.1)",
    canvasColors: [
      [255, 141, 111],
      [255, 223, 214],
    ] as [number, number, number][],
  },
  {
    glow: "rgba(246, 210, 255, 0.1)",
    canvasColors: [
      [214, 171, 255],
      [246, 210, 255],
    ] as [number, number, number][],
  },
];

export function LandingHeroShowcase({ featuredProjects }: { featuredProjects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const bioRef = useRef<HTMLParagraphElement | null>(null);
  const keyboardRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const topHighlights = profileHighlights.slice(0, 3);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const section = sectionRef.current;
      const text = textRef.current;
      const bio = bioRef.current;
      const keyboard = keyboardRef.current;
      const watermark = watermarkRef.current;

      if (!section || !text || !bio || !keyboard || !watermark) {
        return;
      }

      gsap.set([text, keyboard, watermark], {
        force3D: true,
        transformPerspective: 1200,
        willChange: "transform",
      });
      gsap.set(bio, {
        autoAlpha: 0.16,
        y: 18,
        filter: "blur(10px)",
        willChange: "transform, opacity, filter",
      });

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            scrub: 1.8,
          },
        });

        timeline
          .to(
            bio,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: HERO_BIO_FADE_DURATION,
              ease: "none",
            },
            HERO_BIO_FADE_START,
          )
          .to(
            text,
            {
              yPercent: -42,
              ease: "none",
            },
            0,
          )
          .to(
            keyboard,
            {
              x: () => window.innerWidth * 0.3,
              yPercent: -10,
              rotate: -5.5,
              scale: 0.98,
              ease: "none",
            },
            0,
          )
          .to(
            watermark,
            {
              yPercent: -18,
              ease: "none",
            },
            0,
          );
      });

      media.add("(max-width: 1023px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            scrub: 1.3,
          },
        });

        timeline
          .to(
            bio,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: HERO_BIO_FADE_DURATION,
              ease: "none",
            },
            HERO_BIO_FADE_START,
          )
          .to(
            text,
            {
              yPercent: -18,
              ease: "none",
            },
            0,
          );
      });

      return () => {
        media.revert();
      };
    }, sectionRef);

    return () => context.revert();
  }, [prefersReducedMotion]);

  const macbookTitle = useMemo(
    () => (
      <span>
        Backend-first systems with product rhythm. <br /> Built to open clean and scale well.
      </span>
    ),
    [],
  );

  return (
    <div className="space-y-0 md:space-y-0">
      <section className="page-section relative left-1/2 z-30 -mt-10 w-screen -translate-x-1/2 md:-mt-37 md:mb-0">
        <div ref={sectionRef} className="min-h-[170vh] lg:min-h-[210vh]">
          <div className="sticky top-0 h-screen overflow-visible bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_84%,transparent),color-mix(in_srgb,var(--page-mid)_72%,transparent))] pt-16 sm:pt-18 lg:pt-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%)]" />

            <div
              ref={watermarkRef}
              className="pointer-events-none absolute inset-x-0 bottom-[-6%] z-[1] hidden px-4 text-[clamp(5rem,23vw,21rem)] font-semibold uppercase leading-[0.82] tracking-[-0.08em] text-[color:color-mix(in_srgb,var(--text-strong)_14%,transparent)] sm:block"
            >
              <div>Akshit</div>
              <div className="-mt-4 ml-[12vw]">Gangwar</div>
            </div>

            <div className="relative z-20 mx-auto grid h-full w-full max-w-[1500px] grid-cols-1 px-4 pb-8 pt-6 md:px-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:px-10 lg:pb-10 lg:pt-8">
              <div ref={textRef} className="relative flex max-w-[640px] flex-col justify-between gap-5 lg:py-6">
                <div className="space-y-5">
                  <Badge className="w-fit rounded-full border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--page-base)_55%,rgba(255,255,255,0.2)),color-mix(in_srgb,var(--accent-secondary)_10%,transparent)_100%)] px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-[color:color-mix(in_srgb,var(--accent-secondary)_58%,var(--text-strong))] shadow-[0_10px_28px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                    HI! I AM
                  </Badge>
                  <div className="space-y-4">
                    <h1 className="display text-[clamp(3.2rem,9vw,7.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.07em] text-[color:var(--text-strong)]">
                      <span className="block">Akshit</span>
                      <span className="block text-[color:var(--text-soft)]">Gangwar</span>
                    </h1>
                    <p className="max-w-md text-base leading-8 text-[color:var(--text-soft)] md:text-lg">
                      {profileIntro.title}
                    </p>
                    <p
                      ref={bioRef}
                      className="max-w-xl min-h-[7rem] text-sm leading-7 text-[color:var(--text-faint)] md:min-h-[8.5rem] md:text-base"
                    >
                      {profileIntro.longBio}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                    <Link
                      href="/projects"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "group w-full justify-center border-[color:color-mix(in_srgb,var(--text-strong)_12%,transparent)] bg-[linear-gradient(140deg,color-mix(in_srgb,var(--page-base)_80%,transparent),color-mix(in_srgb,var(--text-strong)_4%,transparent))] text-[color:var(--text-strong)] shadow-[0_16px_34px_rgba(11,10,20,0.08)] hover:border-[color:color-mix(in_srgb,var(--accent-secondary)_44%,transparent)] hover:bg-[linear-gradient(140deg,color-mix(in_srgb,var(--accent-secondary)_12%,transparent),color-mix(in_srgb,var(--page-base)_74%,transparent))] sm:w-auto",
                      )}
                    >
                      <span>Explore Projects</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href="/resume"
                      className="group inline-block h-14 w-full min-w-[11.5rem] rounded-full shadow-[0_22px_48px_rgba(137,94,182,0.18)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f6d2ff]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto"
                    >
                      <GlassSurface
                        width="100%"
                        height="100%"
                        borderRadius={999}
                        backgroundOpacity={0.1}
                        brightness={66}
                        opacity={0.92}
                        blur={10}
                        displace={1.1}
                        saturation={1.2}
                        distortionScale={-140}
                        greenOffset={8}
                        blueOffset={14}
                        mixBlendMode="screen"
                        className="h-full w-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(246,210,255,0.08)_42%,rgba(255,255,255,0.04)_100%)] text-[color:var(--text-strong)] transition-[transform,box-shadow,border-color] duration-300 group-hover:border-[#f6d2ff]/40 group-hover:shadow-[0_26px_58px_rgba(137,94,182,0.24)]"
                      >
                        <span className="inline-flex items-center justify-center px-6 text-sm font-medium tracking-[0.08em] text-[color:var(--text-strong)]">
                          Open Resume
                        </span>
                      </GlassSurface>
                    </Link>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {topHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[24px] border border-[color:var(--panel-border)] bg-[color:var(--hero-panel-bg)] px-4 py-4 backdrop-blur-md"
                    >
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative hidden lg:block">
                <p className="absolute right-6 top-6 z-30 max-w-[300px] text-right text-sm uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                  Scroll to shift the interface.
                </p>
              </div>
            </div>

            <div
              ref={keyboardRef}
              className="pointer-events-none absolute left-[79%] top-[44%] z-30 hidden w-[min(104vw,1320px)] -translate-x-1/2 -translate-y-1/2 select-none will-change-transform lg:block"
            >
              <div className="origin-center scale-[0.42] sm:scale-[0.5] md:scale-[0.64] lg:scale-[0.82] xl:scale-[0.96] 2xl:scale-[1.06]">
                <Keyboard className="drop-shadow-[0_45px_90px_rgba(0,0,0,0.28)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HeroTechStackParallax />

      <section className="page-section relative left-1/2 z-10 w-screen -translate-x-1/2 overflow-hidden">
        <div className="relative bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-start)_38%,transparent),transparent_22%,color-mix(in_srgb,var(--page-base)_24%,transparent)_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,color-mix(in_srgb,var(--accent-secondary)_8%,transparent),transparent_24%),radial-gradient(circle_at_28%_70%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_18%),radial-gradient(circle_at_76%_18%,color-mix(in_srgb,var(--accent-tertiary)_8%,transparent),transparent_16%)]" />
          <div className="mx-auto max-w-[1500px] px-4 py-18 md:px-8 md:py-24 lg:px-10">
            <div className="mb-12 max-w-[760px]">
              <p className="mb-4 text-[11px] uppercase tracking-[0.38em] text-[color:var(--text-faint)]">
                Falak case study
              </p>
              <h2 className="display text-[clamp(2.8rem,6vw,5.2rem)] font-semibold uppercase leading-[0.92] tracking-[-0.06em] text-[color:var(--text-strong)]">
                Scalable systems,
                <span className="block text-[color:var(--text-soft)]">shipped under real pressure.</span>
              </h2>
              <p className="mt-5 max-w-[620px] text-sm leading-7 text-[color:var(--text-soft)] md:text-base">
                A live event platform that had to feel polished for users, reliable for admins,
                and resilient during the exact moments where traffic and operations got real.
              </p>
            </div>

            <div className="grid gap-10 xl:grid-cols-[minmax(0,1.14fr)_minmax(360px,0.86fr)] xl:items-start">
              <div className="xl:sticky xl:top-24">
                <MacbookScroll
                  badge={<InitialBadge />}
                  hideTitle
                  showGradient={false}
                  screenHref="https://falak.mitblr.in"
                  src={falakHomepagePreview.src}
                  title={macbookTitle}
                  className="min-h-[auto] scale-[0.28] py-0 sm:scale-[0.38] md:scale-[0.5] lg:scale-[0.62] xl:scale-[0.72] 2xl:scale-[0.82]"
                  backPanelClassName="h-[18rem] w-[52rem]"
                  frontPanelClassName="h-[30rem] w-[52rem]"
                  baseClassName="h-[35.75rem] w-[52rem]"
                  screenFit="contain"
                  lidTilt={-31}
                  rotateRange={[-28, 0]}
                  imageClassName="p-1.5"
                />
                <div className="-mt-8 flex justify-center xl:mt-2">
                  <a
                    href="https://falak.mitblr.in"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--panel-border)] bg-[color:color-mix(in_srgb,var(--page-base)_74%,transparent)] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[color:var(--text-soft)] transition hover:border-[color:color-mix(in_srgb,var(--accent-secondary)_44%,transparent)] hover:text-[color:var(--text-strong)]"
                  >
                    Visit Falak
                    <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              <div className="hidden xl:block">
                <div className="relative grid min-h-[44rem] grid-cols-2 grid-rows-2 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_18%,transparent),transparent)]">
                  <div className="pointer-events-none absolute inset-y-6 left-1/2 z-10 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--panel-border)_92%,transparent)_16%,color-mix(in_srgb,var(--panel-border)_92%,transparent)_84%,transparent)]" />
                  <div className="pointer-events-none absolute inset-x-6 top-1/2 z-10 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--panel-border)_92%,transparent)_16%,color-mix(in_srgb,var(--panel-border)_92%,transparent)_84%,transparent)]" />
                  {falakStoryCards.map((card, index) => {
                    const accent = falakBentoAccents[index % falakBentoAccents.length];

                    return (
                      <CardSpotlight
                        key={card.title}
                        radius={260}
                        color={accent.glow}
                        canvasColors={accent.canvasColors}
                        className="h-full rounded-none border-transparent bg-transparent p-0 shadow-none"
                      >
                        <div className="relative flex h-full min-h-[22rem] flex-col justify-between px-8 py-8">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.34em] text-[color:var(--text-faint)]">
                              {card.label}
                            </p>
                            <h3 className="mt-4 max-w-[20rem] text-[1.75rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[color:var(--text-strong)]">
                              {card.title}
                            </h3>
                            <p className="mt-5 max-w-[28rem] text-sm leading-7 text-[color:var(--text-soft)]">
                              {card.body}
                            </p>
                          </div>
                          <div className="mt-6 flex flex-wrap gap-2">
                            {card.pills.map((pill) => (
                              <span
                                key={pill}
                                className="rounded-full border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--page-base)_68%,transparent)] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-soft)]"
                              >
                                {pill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardSpotlight>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-10 grid xl:hidden">
              {falakStoryCards.map((card, index) => (
                <div
                  key={card.title}
                  className={cn(
                    "relative px-5 py-6",
                    index > 0 &&
                      "border-t border-[color:color-mix(in_srgb,var(--panel-border)_92%,transparent)]",
                    index % 2 === 0
                      ? "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_82%,transparent),color-mix(in_srgb,var(--accent-secondary)_6%,transparent))]"
                      : "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_84%,transparent),color-mix(in_srgb,var(--accent-tertiary)_7%,transparent))]",
                  )}
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                    {card.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-[color:var(--text-strong)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text-soft)]">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-20 space-y-8">
              <div className="max-w-[760px]">
                <p className="mb-4 text-[11px] uppercase tracking-[0.38em] text-[color:var(--text-faint)]">
                  Selected projects
                </p>
                <h2 className="display text-[clamp(2.4rem,5vw,4.4rem)] font-semibold uppercase leading-[0.94] tracking-[-0.06em] text-[color:var(--text-strong)]">
                  More systems,
                  <span className="block text-[color:var(--text-soft)]">each with its own weather.</span>
                </h2>
                <p className="mt-5 max-w-[620px] text-sm leading-7 text-[color:var(--text-soft)] md:text-base">
                  Featured builds, condensed into fast-scanning project cards with a more atmospheric treatment.
                </p>
              </div>

              <div className="grid gap-6 xl:grid-cols-3 bg-transparent">
                {featuredProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href="/projects"
                    className={cn(
                      "group relative overflow-hidden rounded-[32px] border border-[color:var(--panel-border)] p-7 shadow-[var(--panel-shadow)] backdrop-blur-xl",
                      themeGlowClasses[project.themeTag],
                    )}
                  >
                    <Meteors
                      number={20}
                      className={cn(
                        project.themeTag === "football" &&
                          "bg-[color:color-mix(in_srgb,var(--accent)_72%,white)] before:from-[color:color-mix(in_srgb,var(--accent)_74%,transparent)]",
                        project.themeTag === "anime" &&
                          "bg-[color:color-mix(in_srgb,var(--accent-tertiary)_72%,white)] before:from-[color:color-mix(in_srgb,var(--accent-tertiary)_74%,transparent)]",
                        project.themeTag === "music" &&
                          "bg-[color:color-mix(in_srgb,var(--accent-secondary)_72%,white)] before:from-[color:color-mix(in_srgb,var(--accent-secondary)_74%,transparent)]",
                      )}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-4">
                        <span className="rounded-full border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--page-base)_66%,transparent)] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-faint)]">
                          {project.themeTag}
                        </span>
                        <span className="text-xs uppercase tracking-[0.22em] text-[color:var(--text-faint)]">
                          {project.impact}
                        </span>
                      </div>
                      <h3 className="mt-5 text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[color:var(--text-strong)]">
                        {project.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-[color:var(--text-soft)]">
                        {project.summary}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--page-base)_66%,transparent)] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-soft)]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[color:var(--text-strong)]">
                        Explore case study
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getProjectFocus({
  rect,
  stickyHeight,
  stickyTop,
  viewportHeight,
}: {
  rect: DOMRect;
  stickyHeight: number;
  stickyTop: number;
  viewportHeight: number;
}) {
  const stickyBottom = stickyTop + stickyHeight;

  if (rect.top <= stickyTop && rect.bottom >= stickyBottom) {
    return 1;
  }

  if (rect.top > stickyTop) {
    const entryDistance = rect.top - stickyTop;
    return clamp(1 - entryDistance / (viewportHeight * 0.46), 0.16, 1);
  }

  const exitDistance = stickyBottom - rect.bottom;
  return clamp(1 - exitDistance / (viewportHeight * 0.3), 0, 1);
}

export function ProjectsShowcase({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = ref.current;

    if (!root || prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const cases = gsap.utils.toArray<HTMLElement>("[data-project-case]");
      const isCompactViewport = window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches;

      if (isCompactViewport) {
        cases.forEach((caseElement) => {
          caseElement.style.setProperty("--project-focus", "1");
        });
        return;
      }

      cases.forEach((caseElement) => {
        const left = caseElement.querySelector<HTMLElement>("[data-project-left]");
        const right = caseElement.querySelector<HTMLElement>("[data-project-right]");
        const panels = gsap.utils.toArray<HTMLElement>(
          caseElement.querySelectorAll("[data-project-panel]"),
        );

        caseElement.style.setProperty("--project-focus", "0.14");

        if (left) {
          gsap.fromTo(
            left,
            { autoAlpha: 0.42, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: caseElement,
                start: "top 82%",
                end: "top 34%",
                scrub: 0.85,
              },
            },
          );
        }

        if (right) {
          gsap.fromTo(
            right,
            { autoAlpha: 0.28, y: 64 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: caseElement,
                start: "top 84%",
                end: "top 34%",
                scrub: 0.95,
              },
            },
          );
        }

        panels.forEach((panel, index) => {
          gsap.fromTo(
            panel,
            { autoAlpha: 0.2, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: caseElement,
                start: `top ${78 - index * 5}%`,
                end: "top 28%",
                scrub: 0.9,
              },
            },
          );
        });

        ScrollTrigger.create({
          trigger: caseElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          onUpdate: () => {
            const rect = caseElement.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const stickyTop = left ? Number.parseFloat(window.getComputedStyle(left).top) || 112 : 112;
            const stickyHeight = left?.offsetHeight ?? Math.min(rect.height * 0.4, viewportHeight * 0.42);
            const focus = getProjectFocus({
              rect,
              stickyHeight,
              stickyTop,
              viewportHeight,
            });

            caseElement.style.setProperty("--project-focus", focus.toFixed(4));
          },
        });
      });

      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={ref} className={cn("space-y-10 md:space-y-12", className)}>
      {children}
    </div>
  );
}

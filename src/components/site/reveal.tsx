"use client";

import { useLayoutEffect, useRef, type HTMLAttributes } from "react";

import gsap from "gsap";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type RevealVariant = "rise" | "hero" | "panel" | "gallery";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  staggerSelector?: string;
  variant?: RevealVariant;
};

const variantPresets = {
  rise: {
    from: { opacity: 0, y: 36, filter: "blur(10px)" },
    to: { opacity: 1, y: 0, filter: "blur(0px)" },
    duration: 0.9,
  },
  hero: {
    from: { opacity: 0, y: 44, scale: 0.985, filter: "blur(14px)" },
    to: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    duration: 1.05,
  },
  panel: {
    from: { opacity: 0, y: 28, scale: 0.98, filter: "blur(8px)" },
    to: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    duration: 0.82,
  },
  gallery: {
    from: { opacity: 0, y: 18, scale: 0.96, rotateX: 7, filter: "blur(12px)" },
    to: { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" },
    duration: 1,
  },
} satisfies Record<
  RevealVariant,
  {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
    duration: number;
  }
>;

export function Reveal({
  className,
  delay = 0,
  staggerSelector,
  variant = "rise",
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1, clearProps: "transform,filter" });
      return;
    }

    const preset = variantPresets[variant];
    const children = staggerSelector ? gsap.utils.toArray<HTMLElement>(staggerSelector, element) : [];
    const ctx = gsap.context(() => {
      gsap.set(element, preset.from);
      if (children.length) {
        gsap.set(children, { opacity: 0, y: 22, filter: "blur(8px)" });
      }
    }, element);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

          timeline.to(element, {
            ...preset.to,
            delay,
            duration: preset.duration,
          });

          if (children.length) {
            timeline.to(
              children,
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.64,
                stagger: 0.07,
              },
              "-=0.58",
            );
          }

          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [delay, prefersReducedMotion, staggerSelector, variant]);

  return <div ref={ref} className={cn("will-change-transform", className)} {...props} />;
}

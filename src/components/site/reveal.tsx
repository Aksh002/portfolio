"use client";

import { useLayoutEffect, useRef, type HTMLAttributes } from "react";

import gsap from "gsap";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export function Reveal({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element || prefersReducedMotion) {
      return;
    }

    gsap.set(element, { opacity: 0, y: 36 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return <div ref={ref} className={cn("will-change-transform", className)} {...props} />;
}


"use client";

import { useEffect } from "react";

import {
  IconBrandAws,
  IconBrandDocker,
  IconBrandGithub,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandReact,
  IconBrandTypescript,
} from "@tabler/icons-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

type StackPosition =
  | "top-left"
  | "top-right"
  | "mid-left"
  | "mid-right"
  | "bottom-left"
  | "bottom-right"
  | "far-left"
  | "far-right";

type StackBadge = {
  name: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  position: StackPosition;
  depth: number;
  delay: number;
  accentClassName: string;
};

const positionStyles: Record<
  StackPosition,
  { top: string; left?: string; right?: string }
> = {
  "top-left": { top: "8%", left: "4%" },
  "top-right": { top: "8%", right: "4%" },
  "mid-left": { top: "38%", left: "6%" },
  "mid-right": { top: "38%", right: "6%" },
  "bottom-left": { top: "68%", left: "4%" },
  "bottom-right": { top: "68%", right: "4%" },
  "far-left": { top: "52%", left: "2%" },
  "far-right": { top: "52%", right: "2%" },
};

const stackBadges: StackBadge[] = [
  {
    name: "Next.js",
    icon: IconBrandNextjs,
    position: "top-left",
    depth: 0.85,
    delay: 0,
    accentClassName:
      "text-[color:var(--text-strong)] shadow-[0_20px_44px_rgba(10,12,24,0.12)]",
  },
  {
    name: "TypeScript",
    icon: IconBrandTypescript,
    position: "top-right",
    depth: 0.9,
    delay: 0.08,
    accentClassName:
      "text-[color:color-mix(in_srgb,var(--accent-secondary)_84%,var(--text-strong))] shadow-[0_20px_44px_rgba(74,214,255,0.18)]",
  },
  {
    name: "React",
    icon: IconBrandReact,
    position: "mid-left",
    depth: 0.3,
    delay: 0.16,
    accentClassName:
      "text-[color:color-mix(in_srgb,var(--accent-secondary)_72%,var(--text-strong))] shadow-[0_18px_40px_rgba(74,214,255,0.14)]",
  },
  {
    name: "Node.js",
    icon: IconBrandNodejs,
    position: "mid-right",
    depth: 0.35,
    delay: 0.24,
    accentClassName:
      "text-[color:color-mix(in_srgb,var(--accent)_76%,var(--text-strong))] shadow-[0_18px_40px_rgba(184,255,111,0.16)]",
  },
  {
    name: "Docker",
    icon: IconBrandDocker,
    position: "bottom-left",
    depth: 0.8,
    delay: 0.32,
    accentClassName:
      "text-[color:color-mix(in_srgb,var(--accent-secondary)_80%,var(--text-strong))] shadow-[0_20px_44px_rgba(74,214,255,0.18)]",
  },
  {
    name: "Python",
    icon: IconBrandPython,
    position: "bottom-right",
    depth: 0.85,
    delay: 0.4,
    accentClassName:
      "text-[color:color-mix(in_srgb,var(--accent-tertiary)_74%,var(--text-strong))] shadow-[0_20px_44px_rgba(255,141,111,0.16)]",
  },
  {
    name: "AWS",
    icon: IconBrandAws,
    position: "far-left",
    depth: 0.4,
    delay: 0.48,
    accentClassName:
      "text-[color:color-mix(in_srgb,var(--accent-tertiary)_64%,var(--text-strong))] shadow-[0_18px_40px_rgba(255,141,111,0.14)]",
  },
  {
    name: "GitHub",
    icon: IconBrandGithub,
    position: "far-right",
    depth: 0.45,
    delay: 0.56,
    accentClassName:
      "text-[color:var(--text-strong)] shadow-[0_18px_40px_rgba(10,12,24,0.12)]",
  },
];

const SPRING_CONFIG = { damping: 25, stiffness: 120 };

function StackOrb({
  badge,
  smoothMouseX,
  smoothMouseY,
}: {
  badge: StackBadge;
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
}) {
  const Icon = badge.icon;
  const posStyle = positionStyles[badge.position];
  const maxOffset = 40;

  const translateX = useTransform(
    smoothMouseX,
    [-1, 1],
    [-maxOffset * badge.depth, maxOffset * badge.depth],
  );

  const translateY = useTransform(
    smoothMouseY,
    [-1, 1],
    [-maxOffset * badge.depth, maxOffset * badge.depth],
  );

  return (
    <motion.div
      className="absolute hidden md:block"
      style={{
        top: posStyle.top,
        left: posStyle.left,
        right: posStyle.right,
        x: translateX,
        y: translateY,
        zIndex: Math.round(badge.depth * 10),
      }}
      initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.8, delay: badge.delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-1.5, 1.5, -1.5],
        }}
        transition={{
          duration: 4.8 + badge.depth * 1.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: badge.delay,
        }}
        className={cn(
          "relative flex h-24 w-24 items-center justify-center rounded-[30px] border border-[color:color-mix(in_srgb,var(--text-strong)_12%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_88%,transparent),color-mix(in_srgb,var(--page-mid)_74%,transparent))] backdrop-blur-xl md:h-28 md:w-28",
          badge.accentClassName,
        )}
      >
        <div className="absolute inset-[1px] rounded-[28px] bg-[radial-gradient(circle_at_28%_24%,color-mix(in_srgb,var(--text-strong)_12%,transparent),transparent_38%),linear-gradient(180deg,color-mix(in_srgb,var(--background)_10%,transparent),transparent)]" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <Icon className="h-8 w-8 md:h-9 md:w-9" strokeWidth={1.7} />
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--text-soft)]">
            {badge.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HeroTechStackParallax() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, SPRING_CONFIG);
  const smoothMouseY = useSpring(mouseY, SPRING_CONFIG);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="page-section relative left-1/2 z-20 w-screen -translate-x-1/2 overflow-hidden">
      <div className="relative bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-start)_38%,transparent),transparent_22%,color-mix(in_srgb,var(--page-base)_24%,transparent)_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,color-mix(in_srgb,var(--accent-secondary)_8%,transparent),transparent_24%),radial-gradient(circle_at_28%_70%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_18%),radial-gradient(circle_at_76%_18%,color-mix(in_srgb,var(--accent-tertiary)_8%,transparent),transparent_16%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-[1500px] items-center justify-center px-4 py-12 sm:py-14 md:min-h-[72vh] md:px-8 md:py-18 lg:min-h-[88vh] lg:px-10 lg:py-20">
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {stackBadges.map((badge) => (
              <StackOrb
                key={badge.name}
                badge={badge}
                smoothMouseX={smoothMouseX}
                smoothMouseY={smoothMouseY}
              />
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-[760px] text-center">
            <p className="mb-5 text-[11px] uppercase tracking-[0.38em] text-[color:var(--text-faint)]">
              Stack in motion
            </p>
            <h2 className="display text-[clamp(2.15rem,11vw,5.8rem)] font-semibold uppercase leading-[0.92] tracking-[-0.06em] text-[color:var(--text-strong)]">
              Production tools,
              <span className="block text-[color:var(--text-soft)]">held in orbit.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-sm leading-7 text-[color:var(--text-soft)] md:text-base">
              The stack I reach for most often across backend systems, full-stack
              delivery, deployment workflows, and the infrastructure around them.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-2.5 md:hidden">
              {stackBadges.map((badge) => {
                const Icon = badge.icon;

                return (
                  <motion.div
                    key={badge.name}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{
                      duration: 3.6 + badge.depth * 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: badge.delay,
                    }}
                    className={cn(
                      "flex items-center gap-2.5 rounded-[22px] border border-[color:color-mix(in_srgb,var(--text-strong)_12%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_88%,transparent),color-mix(in_srgb,var(--page-mid)_76%,transparent))] px-3 py-3 backdrop-blur-xl",
                      badge.accentClassName,
                    )}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--text-strong)_8%,transparent)]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <span className="text-[13px] font-medium text-[color:var(--text-soft)]">
                      {badge.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

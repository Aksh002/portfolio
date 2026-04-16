"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { CardSpotlight } from "@/components/ui/card-spotlight";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

type ProjectEffectCardProps = {
  children: ReactNode;
  spotlight?: boolean;
  spotlightColor?: string;
  glowColors?: [string, string, string, string?];
  spotlightCanvasColors?: [number, number, number][];
  spotlightRadius?: number;
} & HTMLAttributes<HTMLDivElement>;

export function ProjectEffectCard({
  children,
  className,
  spotlight = false,
  spotlightColor = "rgba(74, 214, 255, 0.16)",
  glowColors,
  spotlightCanvasColors,
  spotlightRadius = 320,
  style,
  ...props
}: ProjectEffectCardProps) {
  const content = (
    <>
      <GlowingEffect
        blur={6}
        borderWidth={7.75}
        colors={glowColors}
        disabled={false}
        glow
        inactiveZone={0.04}
        movementDuration={0.62}
        proximity={140}
        spread={48}
        className="rounded-[inherit] [opacity:var(--project-effect-glow-opacity)]"
      />
      <div className="relative z-20 p-6 md:p-7">{children}</div>
    </>
  );

  if (spotlight) {
    return (
      <CardSpotlight
        radius={spotlightRadius}
        color={spotlightColor}
        canvasColors={spotlightCanvasColors}
        className={cn(
          "!rounded-[32px] !border-[color:rgba(255,255,255,0.06)] !bg-[linear-gradient(180deg,var(--panel-core-top),var(--panel-core-bottom))] !p-0 shadow-[var(--panel-shadow)] backdrop-blur-xl",
          className,
        )}
        style={style}
        {...props}
      >
        {content}
      </CardSpotlight>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[30px] border border-[color:var(--panel-border)] bg-[linear-gradient(180deg,var(--panel-core-top),var(--panel-core-bottom))] shadow-[var(--panel-shadow)] backdrop-blur-xl",
        className,
      )}
      style={style}
      {...props}
    >
      {content}
    </div>
  );
}

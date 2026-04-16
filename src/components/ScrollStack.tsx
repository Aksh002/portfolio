"use client";

import React from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={cn(
      "scroll-stack-card relative w-full rounded-[34px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)] box-border origin-top will-change-transform md:p-10",
      itemClassName,
    )}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 108,
  itemScale = 0.03,
  itemStackDistance = 20,
  stackPosition = "4rem",
  baseScale = 0.91,
  rotationAmount = -0.35,
}) => {
  const items = React.Children.toArray(children);

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-y-auto overflow-x-visible",
        className,
      )}
      style={{
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="scroll-stack-inner relative min-h-full px-4 py-8 md:px-6">
        {items.map((child, index) => {
          const scale = Math.min(1, baseScale + index * itemScale);
          const rotate = index * rotationAmount;
          const topValue = `calc(${stackPosition} + ${index * itemStackDistance}px)`;

          return (
            <div
              key={index}
              className="relative"
              style={{
                marginBottom: index === items.length - 1 ? 0 : itemDistance,
                zIndex: index + 1,
              }}
            >
              <div className="sticky" style={{ top: topValue }}>
                <div
                  style={{
                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                    transformOrigin: "top center",
                  }}
                >
                  {child}
                </div>
              </div>
            </div>
          );
        })}
        <div className="h-28" />
      </div>
    </div>
  );
};

export default ScrollStack;

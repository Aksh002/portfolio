"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { motion } from "motion/react";

import { useTheme } from "@/components/site/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ size = "default" }: { size?: "default" | "compact" }) {
  const { mounted, theme, toggleTheme } = useTheme();
  const compact = size === "compact";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Toggle theme"}
      aria-pressed={mounted ? theme === "light" : false}
      className={cn(
        "theme-toggle relative inline-flex shrink-0 items-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        compact ? "h-10 w-[64px] px-1" : "h-12 w-[76px] px-1.5",
        mounted && theme === "light" ? "justify-end" : "justify-start",
      )}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(135deg,var(--toggle-track-start),var(--toggle-track-end))]" />
      <span className="pointer-events-none absolute inset-[1px] rounded-full border border-[var(--toggle-track-border)]" />
      <motion.span
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-[var(--toggle-icon-muted)]",
          compact ? "left-2.5" : "left-3",
        )}
        animate={{
          opacity: mounted && theme === "dark" ? 1 : 0.35,
          scale: mounted && theme === "dark" ? 1 : 0.8,
        }}
        transition={{ duration: 0.25 }}
      >
        <MoonStar className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
      </motion.span>
      <motion.span
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-[var(--toggle-icon-muted)]",
          compact ? "right-2.5" : "right-3",
        )}
        animate={{
          opacity: mounted && theme === "light" ? 1 : 0.35,
          scale: mounted && theme === "light" ? 1 : 0.8,
        }}
        transition={{ duration: 0.25 }}
      >
        <SunMedium className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
      </motion.span>
      <motion.span
        layout
        className={cn(
          "theme-toggle-thumb relative z-[1] flex items-center justify-center rounded-full border",
          compact ? "h-[1.875rem] w-[1.875rem]" : "h-9 w-9",
        )}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        {mounted && theme === "light" ? (
          <SunMedium className={cn("text-[var(--toggle-thumb-icon)]", compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
        ) : (
          <MoonStar className={cn("text-[var(--toggle-thumb-icon)]", compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
        )}
      </motion.span>
    </button>
  );
}

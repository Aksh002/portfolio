"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { motion } from "motion/react";

import { useTheme } from "@/components/site/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { mounted, theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Toggle theme"}
      aria-pressed={mounted ? theme === "light" : false}
      className={cn(
        "theme-toggle relative inline-flex h-12 w-[76px] shrink-0 items-center rounded-full border px-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
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
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--toggle-icon-muted)]"
        animate={{
          opacity: mounted && theme === "dark" ? 1 : 0.35,
          scale: mounted && theme === "dark" ? 1 : 0.8,
        }}
        transition={{ duration: 0.25 }}
      >
        <MoonStar className="h-4 w-4" />
      </motion.span>
      <motion.span
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--toggle-icon-muted)]"
        animate={{
          opacity: mounted && theme === "light" ? 1 : 0.35,
          scale: mounted && theme === "light" ? 1 : 0.8,
        }}
        transition={{ duration: 0.25 }}
      >
        <SunMedium className="h-4 w-4" />
      </motion.span>
      <motion.span
        layout
        className="theme-toggle-thumb relative z-[1] flex h-9 w-9 items-center justify-center rounded-full border"
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        {mounted && theme === "light" ? (
          <SunMedium className="h-4 w-4 text-[var(--toggle-thumb-icon)]" />
        ) : (
          <MoonStar className="h-4 w-4 text-[var(--toggle-thumb-icon)]" />
        )}
      </motion.span>
    </button>
  );
}

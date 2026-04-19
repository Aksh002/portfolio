"use client";

import { Monitor, X } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISS_KEY = "portfolio-mobile-desktop-toast-dismissed";

export function MobileDesktopToast() {
  const [shouldRender, setShouldRender] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const hasDismissed = sessionStorage.getItem(DISMISS_KEY) === "1";

    if (!mediaQuery.matches || hasDismissed) {
      return;
    }

    setShouldRender(true);

    const revealTimer = window.setTimeout(() => {
      setVisible(true);
    }, 700);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(DISMISS_KEY, "1");
    }, 9500);

    const onMediaChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        setVisible(false);
      }
    };

    mediaQuery.addEventListener("change", onMediaChange);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideTimer);
      mediaQuery.removeEventListener("change", onMediaChange);
    };
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-70 px-4 md:hidden">
      <div
        className={`mx-auto max-w-sm transform-gpu rounded-2xl border border-[color-mix(in_srgb,var(--panel-border)_90%,transparent)] bg-[linear-gradient(155deg,color-mix(in_srgb,var(--page-base)_74%,rgba(7,10,18,0.95)),color-mix(in_srgb,var(--page-mid)_68%,rgba(9,11,20,0.92))_55%,color-mix(in_srgb,var(--page-end)_64%,rgba(14,9,24,0.9))_100%)] p-3.5 shadow-[0_18px_42px_color-mix(in_srgb,var(--text-strong)_20%,transparent)] backdrop-blur-md transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="pointer-events-auto flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-(--panel-border) bg-[color-mix(in_srgb,var(--accent-secondary)_16%,transparent)] text-(--text-strong)">
            <Monitor className="h-4.5 w-4.5" strokeWidth={2} />
          </span>

          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-(--accent-secondary)">
              Viewing tip
            </p>
            <p className="mt-1 text-sm leading-5 text-(--text-soft)">
              This portfolio is best experienced on desktop for the full visual effects.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setVisible(false);
              sessionStorage.setItem(DISMISS_KEY, "1");
            }}
            className="ml-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--panel-border) bg-[color-mix(in_srgb,var(--background)_10%,transparent)] text-(--text-soft) transition hover:text-(--text-strong)"
            aria-label="Dismiss desktop recommendation"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

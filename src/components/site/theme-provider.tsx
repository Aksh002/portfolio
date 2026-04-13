"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Theme = "dark" | "light";

type RevealState = {
  x: number;
  y: number;
  scale: number;
  theme: Theme;
  id: number;
} | null;

type ThemeContextValue = {
  mounted: boolean;
  theme: Theme;
  toggleTheme: (origin: { x: number; y: number }) => void;
};

const STORAGE_KEY = "portfolio-theme";
const TRANSITION_ATTR = "data-theme-transition";
const REVEAL_X = "--theme-reveal-x";
const REVEAL_Y = "--theme-reveal-y";
const REVEAL_RADIUS = "--theme-reveal-radius";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getRevealRadius(x: number, y: number) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const horizontal = Math.max(x, width - x);
  const vertical = Math.max(y, height - y);
  return Math.hypot(horizontal, vertical);
}

function getRevealScale(x: number, y: number) {
  return getRevealRadius(x, y) / 14;
}

function getRevealFill(theme: Theme) {
  if (theme === "light") {
    return "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98), rgba(244,239,229,0.98) 62%, rgba(230,226,217,0.98) 100%)";
  }

  return "radial-gradient(circle at 30% 30%, rgba(14,18,33,0.98), rgba(7,9,16,0.98) 62%, rgba(4,6,12,0.98) 100%)";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.dataset.theme === "light" ? "light" : "dark";
    }

    return "dark";
  });
  const [reveal, setReveal] = useState<RevealState>(null);
  const revealTimer = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (revealTimer.current) {
        window.clearTimeout(revealTimer.current);
      }
    };
  }, []);

  const toggleTheme = useCallback(
    (origin: { x: number; y: number }) => {
      const nextTheme: Theme = theme === "dark" ? "light" : "dark";
      const root = document.documentElement;
      const radius = getRevealRadius(origin.x, origin.y);

      if (prefersReducedMotion) {
        setTheme(nextTheme);
        return;
      }

      root.style.setProperty(REVEAL_X, `${origin.x}px`);
      root.style.setProperty(REVEAL_Y, `${origin.y}px`);
      root.style.setProperty(REVEAL_RADIUS, `${radius}px`);

      const supportsViewTransitions =
        typeof document !== "undefined" &&
        "startViewTransition" in document &&
        typeof document.startViewTransition === "function";

      if (supportsViewTransitions) {
        root.setAttribute(TRANSITION_ATTR, "expanding");

        const transition = document.startViewTransition(() => {
          flushSync(() => {
            setTheme(nextTheme);
          });
        });

        transition.finished.finally(() => {
          root.removeAttribute(TRANSITION_ATTR);
          root.style.removeProperty(REVEAL_X);
          root.style.removeProperty(REVEAL_Y);
          root.style.removeProperty(REVEAL_RADIUS);
        });

        return;
      }

      if (revealTimer.current) {
        window.clearTimeout(revealTimer.current);
      }

      setReveal({
        x: origin.x,
        y: origin.y,
        scale: getRevealScale(origin.x, origin.y),
        theme: nextTheme,
        id: Date.now(),
      });

      revealTimer.current = window.setTimeout(() => {
        setTheme(nextTheme);
      }, 140);
    },
    [prefersReducedMotion, theme],
  );

  const value = useMemo(
    () => ({
      mounted,
      theme,
      toggleTheme,
    }),
    [mounted, theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {reveal ? (
          <motion.div
            key={reveal.id}
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[120] h-7 w-7 rounded-full border border-[color:var(--panel-border)] shadow-[0_0_60px_rgba(0,0,0,0.18)]"
            initial={{
              opacity: 1,
              scale: 0,
              x: reveal.x - 14,
              y: reveal.y - 14,
            }}
            animate={{
              opacity: 1,
              scale: reveal.scale,
              x: reveal.x - 14,
              y: reveal.y - 14,
            }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => {
              setReveal(null);
              document.documentElement.style.removeProperty(REVEAL_RADIUS);
            }}
            transition={{
              duration: 2.92,
              ease: [0.2, 0.84, 0.22, 1],
            }}
            style={{
              background: getRevealFill(reveal.theme),
            }}
          />
        ) : null}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

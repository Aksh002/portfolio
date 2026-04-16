"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import FloatingLines from "@/components/FloatingLines";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { SparklesCore } from "@/components/ui/sparkles";

type BackgroundPalette = {
  lineGradient: string[];
  sparkleColor: string;
};

const defaultPalette: BackgroundPalette = {
  lineGradient: ["#5f4b69", "#f1c6ff"],
  sparkleColor: "rgba(247, 248, 251, 0.72)",
};

function readCssValue(propertyName: string, fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }

  return getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim() || fallback;
}

export function SiteBackgroundStage() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [palette, setPalette] = useState<BackgroundPalette>(defaultPalette);

  useEffect(() => {
    const syncPalette = () => {
      setPalette({
        lineGradient: [
          readCssValue("--background-line-dark", defaultPalette.lineGradient[0]),
          readCssValue("--background-line-light", defaultPalette.lineGradient[1]),
        ],
        sparkleColor: readCssValue("--background-sparkle-particle", defaultPalette.sparkleColor),
      });
    };

    syncPalette();

    const observer = new MutationObserver(syncPalette);
    observer.observe(document.documentElement, {
      attributeFilter: ["data-theme"],
      attributes: true,
    });

    window.addEventListener("resize", syncPalette);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncPalette);
    };
  }, []);

  return (
    <div aria-hidden className="site-background-stage">
      <div className="site-background-ripple">
        <BackgroundRippleEffect
          ambient={false}
          captureViewportClicks
          cellSize={56}
          interactive
        />
      </div>

      {isHome ? (
        <div className="home-floating-lines">
          <FloatingLines
            animationSpeed={2}
            bendRadius={5}
            bendStrength={-0.5}
            enabledWaves={["top", "middle", "bottom"]}
            interactive
            lineCount={9}
            lineDistance={17.5}
            linesGradient={palette.lineGradient}
            mixBlendMode="normal"
            parallax
          />
        </div>
      ) : (
        <div className="site-sparkles-foreground">
          <SparklesCore
            background="transparent"
            className="h-full w-full"
            id="site-background-sparkles"
            maxSize={1.95}
            minSize={0.45}
            particleColor={palette.sparkleColor}
            particleDensity={82}
            speed={1.85}
          />
        </div>
      )}

      <div className="site-background-vignette" />
    </div>
  );
}

"use client";

import ThreeDCardDemo from "@/components/3d-card-demo";
import { Reveal } from "@/components/site/reveal";

export function AboutMeSurface() {
  return (
    <Reveal className="page-section">
      <ThreeDCardDemo />
    </Reveal>
  );
}

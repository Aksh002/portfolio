"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { profileIntro } from "@/lib/site";

export default function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var" containerClassName="py-6 md:py-8">
      <CardBody className="relative h-auto w-full max-w-[72rem] rounded-[28px] border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--background)_4%,rgba(255,255,255,0.42)),color-mix(in_srgb,var(--background)_1%,rgba(255,255,255,0.18)))] p-4 shadow-[0_24px_60px_color-mix(in_srgb,var(--text-strong)_10%,transparent)] backdrop-blur-md sm:p-8 sm:rounded-[34px]">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-center lg:gap-8">
          <div className="space-y-5 md:space-y-6">
            <CardItem
              translateZ="35"
              className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-[color:color-mix(in_srgb,var(--text-strong)_50%,transparent)]"
            >
              <span>About me</span>
              <span className="h-px w-10 bg-[color:color-mix(in_srgb,var(--text-strong)_16%,transparent)]" />
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {profileIntro.location}
              </span>
            </CardItem>
            <CardItem
              translateZ="50"
              className="display max-w-[10ch] text-[clamp(2.2rem,11vw,5.2rem)] font-semibold uppercase leading-[0.92] tracking-[-0.06em] text-[color:var(--text-strong)]"
            >
              Calm surfaces. Serious systems.
            </CardItem>
            <CardItem
              translateZ="60"
              className="max-w-[42rem] text-[15px] leading-7 text-[color:color-mix(in_srgb,var(--text-strong)_74%,transparent)] md:text-[1.06rem] md:leading-8"
            >
              {profileIntro.tagline}
            </CardItem>
            <CardItem
              translateZ="68"
              className="max-w-[42rem] text-[13px] leading-6 text-[color:color-mix(in_srgb,var(--text-strong)_66%,transparent)] md:text-[1rem] md:leading-8"
            >
              I like taking ambitious product ideas and making the underlying
              systems feel composed, understandable, and dependable.
            </CardItem>
          </div>

          <CardItem translateZ="95" className="w-full">
            <div className="overflow-hidden rounded-[24px] border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--background)_4%,rgba(255,255,255,0.18))] p-2.5 shadow-[0_18px_48px_rgba(0,0,0,0.18)] md:rounded-[28px] md:p-3">
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height="1000"
                width="1000"
                className="h-[18rem] w-full rounded-[20px] object-cover sm:h-[20rem] lg:h-[26rem]"
                alt="thumbnail"
              />
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

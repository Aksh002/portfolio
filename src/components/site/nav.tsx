"use client";

import { usePathname } from "next/navigation";
import {
  FileText,
  FolderKanban,
  House,
  Mail,
  UserRound,
} from "lucide-react";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconCamera,
  IconShare3,
} from "@tabler/icons-react";

import GlassSurface from "@/components/GlassSurface";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { FloatingDock, type FloatingDockItem } from "@/components/ui/floating-dock";
import { navItems, profileIntro, socialLinks } from "@/lib/site";

const navIcons = {
  "/": House,
  "/projects": FolderKanban,
  "/about": UserRound,
  "/resume": FileText,
} as const;

export function SiteNav() {
  const pathname = usePathname();
  const linkedInHref =
    socialLinks.find((item) => item.label === "LinkedIn")?.href ??
    "https://linkedin.com/in/akshit-gangwar-b93840282";
  const mailHref =
    socialLinks.find((item) => item.label === "Email")?.href ?? `mailto:${profileIntro.email}`;

  const dockItems: FloatingDockItem[] = navItems.map((item) => {
    const Icon = navIcons[item.href as keyof typeof navIcons] ?? House;

    return {
      href: item.href,
      title: item.label,
      icon: <Icon className="h-full w-full" strokeWidth={2} />,
    };
  });
  dockItems.push({
    title: "Socials",
    icon: <IconShare3 className="h-full w-full" strokeWidth={1.9} />,
    items: [
      {
        title: "Mail",
        href: mailHref,
        icon: <Mail className="h-full w-full" strokeWidth={2} />,
      },
      {
        title: "LinkedIn",
        href: linkedInHref,
        icon: <IconBrandLinkedin className="h-full w-full" strokeWidth={1.9} />,
      },
      {
        title: "Instagram",
        icon: <IconBrandInstagram className="h-full w-full" strokeWidth={1.9} />,
      },
      {
        title: "X",
        icon: <IconBrandX className="h-full w-full" strokeWidth={1.9} />,
      },
      {
        title: "Photo Insta",
        icon: <IconCamera className="h-full w-full" strokeWidth={1.9} />,
      },
    ],
  });

  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-[1480px] px-4 pt-4 md:px-6">
      <GlassSurface
        width="100%"
        height={76}
        borderRadius={30}
        backgroundOpacity={0.14}
        brightness={56}
        opacity={0.9}
        blur={12}
        displace={0.45}
        saturation={1.18}
        distortionScale={-120}
        greenOffset={8}
        blueOffset={14}
        mixBlendMode="screen"
        className="overflow-visible border border-[color:color-mix(in_srgb,var(--text-strong)_12%,transparent)] bg-[linear-gradient(135deg,rgba(6,9,16,0.54),rgba(10,13,24,0.72)_38%,rgba(16,18,30,0.58)_100%)] shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
      >
        <div className="relative hidden w-full items-center gap-3 overflow-visible px-2 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
          <div className="hidden md:flex md:items-center">
            <span className="pl-3 text-xs font-medium uppercase tracking-[0.34em] text-[color:var(--text-soft)]">
              PORTFOLIO&apos;26
            </span>
          </div>
          <div className="flex items-center gap-3 md:justify-self-center">
            <div className="md:hidden">
              <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--text-soft)]">
                PORTFOLIO&apos;26
              </span>
            </div>
            <FloatingDock
              items={dockItems}
              activeHref={pathname}
              desktopClassName="max-w-none bg-transparent shadow-none border-transparent"
              mobileClassName="shrink-0"
            />
          </div>
          <div className="flex items-center justify-end md:justify-self-end">
            <ThemeToggle />
          </div>
        </div>
        <div className="relative flex w-full items-center justify-between px-2 md:hidden">
          <FloatingDock
            items={dockItems}
            activeHref={pathname}
            mobileClassName="shrink-0"
          />
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.34em] text-[color:var(--text-soft)]">
            PORTFOLIO&apos;26
          </span>
          <ThemeToggle size="compact" />
        </div>
      </GlassSurface>
    </header>
  );
}

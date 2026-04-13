"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/site/theme-toggle";
import { navItems, profileIntro } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-[1280px] px-4 pt-4 md:px-6">
      <div className="surface-dark flex items-center justify-between gap-4 rounded-full px-4 py-3 backdrop-blur-xl">
        <Link href="/" className="min-w-0">
          <p className="eyebrow-accent text-[11px] uppercase tracking-[0.34em]">
            {profileIntro.name}
          </p>
          <p className="truncate text-sm text-[color:var(--text-strong)]">{profileIntro.title}</p>
        </Link>
        <div className="flex items-center gap-3">
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition",
                  active
                    ? "bg-[linear-gradient(135deg,var(--accent),var(--accent-secondary))] text-[#07101a]"
                    : "text-[color:var(--text-soft)] hover:bg-[color:var(--nav-hover)] hover:text-[var(--accent-secondary)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

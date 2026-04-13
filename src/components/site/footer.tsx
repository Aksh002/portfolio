import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { profileIntro, socialLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-[1280px] px-4 pb-8 md:px-6">
      <div className="surface-dark rounded-[32px] px-6 py-8 backdrop-blur-xl md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="eyebrow-accent text-[11px] uppercase tracking-[0.34em]">
              Contact / Next move
            </p>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text-strong)] md:text-4xl">
              Let&apos;s build something with clear thinking and real atmosphere.
            </h2>
            <p className="text-sm leading-7 text-[color:var(--text-soft)] md:text-base">
              {profileIntro.availability} If you&apos;re hiring for backend-heavy product work,
              full-stack systems, or engineering roles that value ownership and scale, I&apos;d
              love to connect.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--panel-border)] bg-[color:rgba(0,0,0,0.08)] px-4 py-2 text-sm text-[color:var(--text-muted)] transition hover:border-[color:rgba(74,214,255,0.35)] hover:text-[color:var(--text-strong)]"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

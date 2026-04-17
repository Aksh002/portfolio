import Link from "next/link";
import { ArrowUpRight, Code2, Mail } from "lucide-react";
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";

import { profileIntro, socialLinks } from "@/lib/site";

const socialIconMap = {
  Email: Mail,
  GitHub: IconBrandGithub,
  LinkedIn: IconBrandLinkedin,
  LeetCode: Code2,
  Instagram: IconBrandInstagram,
} as const;

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-[1280px] px-4 pb-8 md:px-6">
      <div className="relative overflow-hidden rounded-[34px] border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--page-base)_76%,rgba(7,10,18,0.96)),color-mix(in_srgb,var(--page-mid)_74%,rgba(9,11,20,0.92))_42%,color-mix(in_srgb,var(--page-end)_68%,rgba(14,9,24,0.9))_100%)] shadow-[0_28px_80px_color-mix(in_srgb,var(--text-strong)_16%,transparent)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,color-mix(in_srgb,var(--accent-secondary)_14%,transparent),transparent_26%),radial-gradient(circle_at_82%_20%,color-mix(in_srgb,var(--accent-tertiary)_12%,transparent),transparent_24%),linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_14%,transparent),color-mix(in_srgb,var(--page-base)_34%,transparent)_72%,color-mix(in_srgb,var(--page-base)_58%,transparent)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--page-base)_64%,transparent),transparent)]" />
        </div>

        <div className="relative grid gap-10 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end">
          <div className="max-w-2xl space-y-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[color:color-mix(in_srgb,var(--text-strong)_62%,transparent)]">
              Contact / Next move
            </p>
            <h2 className="display max-w-[14ch] text-[clamp(2.2rem,4.2vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-[color:var(--text-strong)]">
              Let&apos;s build with calm systems and a little voltage.
            </h2>
            
          </div>

          <div className="relative">
            <div className="grid gap-5 sm:grid-cols-2 sm:grid-rows-2">
            {socialLinks.map((link) => {
              const Icon = socialIconMap[link.label as keyof typeof socialIconMap] ?? ArrowUpRight;
              const isEmail = link.href.startsWith("mailto:");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noreferrer"}
                  className={`group relative overflow-hidden rounded-[24px] border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_4%,rgba(255,255,255,0.4)),color-mix(in_srgb,var(--background)_2%,rgba(255,255,255,0.2)))] px-4 py-4 text-[color:var(--text-strong)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--text-strong)_6%,transparent)] backdrop-blur-md transition duration-300 hover:border-[color:color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] hover:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_6%,rgba(255,255,255,0.46)),color-mix(in_srgb,var(--background)_3%,rgba(255,255,255,0.24)))]`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_42%),radial-gradient(circle_at_bottom_right,color-mix(in_srgb,var(--accent-secondary)_14%,transparent),transparent_38%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--text-strong)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--background)_6%,rgba(255,255,255,0.18))] text-[color:color-mix(in_srgb,var(--text-strong)_92%,transparent)]">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[color:color-mix(in_srgb,var(--text-strong)_50%,transparent)]">
                          {link.label}
                        </p>
                        <p className="mt-1 truncate text-sm font-medium text-[color:color-mix(in_srgb,var(--text-strong)_90%,transparent)]">
                          {link.label === "Email" ? profileIntro.email : link.label}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[color:color-mix(in_srgb,var(--text-strong)_64%,transparent)] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:color-mix(in_srgb,var(--text-strong)_96%,transparent)]" />
                  </div>
                </Link>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

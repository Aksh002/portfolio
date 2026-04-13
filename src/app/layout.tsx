import type { Metadata } from "next";
import Script from "next/script";

import { SiteFooter } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";
import { ThemeProvider } from "@/components/site/theme-provider";
import { profileIntro, siteUrl } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profileIntro.name} | Immersive Portfolio`,
    template: `%s | ${profileIntro.name}`,
  },
  description: profileIntro.shortBio,
  openGraph: {
    title: `${profileIntro.name} | Immersive Portfolio`,
    description: profileIntro.shortBio,
    url: siteUrl,
    siteName: `${profileIntro.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileIntro.name} | Immersive Portfolio`,
    description: profileIntro.shortBio,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profileIntro.name,
  jobTitle: profileIntro.title,
  description: profileIntro.professionalSummary,
  url: siteUrl,
  email: profileIntro.email,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grid-glow" suppressHydrationWarning>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const stored = localStorage.getItem('portfolio-theme');
                const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                document.documentElement.dataset.theme = stored === 'light' || stored === 'dark' ? stored : system;
              } catch {
                document.documentElement.dataset.theme = 'dark';
              }
            })();`,
          }}
        />
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider>
          <div className="relative isolate overflow-x-clip">
            <div className="theme-atmosphere pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] blur-3xl" />
            <SiteNav />
            <main className="mx-auto w-full max-w-[1280px] px-4 pb-10 pt-10 md:px-6 md:pt-14">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

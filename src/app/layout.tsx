import type { Metadata } from "next";
import { JetBrains_Mono, Play } from "next/font/google";
import Script from "next/script";

import { SiteFooter } from "@/components/site/footer";
import { SiteBackgroundStage } from "@/components/site/site-background-stage";
import { SiteNav } from "@/components/site/nav";
import { ThemeProvider } from "@/components/site/theme-provider";
import { profileIntro, siteUrl } from "@/lib/site";

import "./globals.css";

const play = Play({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-play",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

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
    <html lang="en" data-theme="dark">
      <body className={`${play.className} ${play.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const stored = localStorage.getItem('portfolio-theme');
                document.documentElement.dataset.theme =
                  stored === 'light' || stored === 'dark' ? stored : 'dark';
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
            <SiteBackgroundStage />
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

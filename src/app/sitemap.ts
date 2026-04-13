import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/projects", "/about", "/resume"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}


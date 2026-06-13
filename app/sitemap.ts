import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";
import { categorySkeletons } from "@/lib/data/categories";
import { moduleSkeletons } from "@/lib/data/modules";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/platform", priority: 0.9 },
    { path: "/deployments", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/demo", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
    { path: "/resources", priority: 0.5 },
    { path: "/legal/privacy", priority: 0.3 },
    { path: "/legal/terms", priority: 0.3 },
    ...categorySkeletons.map((c) => ({ path: `/platform/${c.slug}`, priority: 0.7 })),
    ...moduleSkeletons.map((m) => ({ path: `/modules/${m.slug}`, priority: 0.6 })),
  ];

  // One entry per route per locale, with hreflang alternates pointing at every
  // locale variant (default locale unprefixed, the rest under their prefix).
  return routes.flatMap((r) =>
    routing.locales.map((locale) => ({
      url: `${base}${localizedPath(locale, r.path)}`,
      changeFrequency: "monthly" as const,
      priority: r.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${base}${localizedPath(l, r.path)}`]),
        ),
      },
    })),
  );
}

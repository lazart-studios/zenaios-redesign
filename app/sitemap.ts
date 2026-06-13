import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";
import { categories } from "@/lib/data/categories";
import { modules } from "@/lib/data/modules";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/platform", priority: 0.9 },
    { path: "/deployments", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/demo", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
    { path: "/resources", priority: 0.5 },
    { path: "/legal/privacy", priority: 0.3 },
    { path: "/legal/terms", priority: 0.3 },
  ].map((r) => ({
    url: `${base}${r.path}`,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/platform/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const moduleRoutes = modules.map((m) => ({
    url: `${base}/modules/${m.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...moduleRoutes];
}

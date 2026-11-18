import type { MetadataRoute } from "next";
import { allEvents, site } from "@/content";

/** Static export: metadata routes must be prerendered. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/credits`, changeFrequency: "yearly", priority: 0.2 },
    ...allEvents.map((e) => ({
      url: `${base}/events/${e.slug}`,
      lastModified: new Date(e.endsAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

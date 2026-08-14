import type { MetadataRoute } from "next";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { announcements, services } from "@/db/schema";
import { getTechnicalSettings } from "@/lib/data/technical";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");

  const [technical, serviceRows, announcementRows] = await Promise.all([
    getTechnicalSettings(),
    db
      .select({ slug: services.slug })
      .from(services)
      .where(eq(services.published, true))
      .orderBy(asc(services.sortOrder)),
    db
      .select({ slug: announcements.slug })
      .from(announcements)
      .where(eq(announcements.published, true))
      .orderBy(desc(announcements.date)),
  ]);

  const now = new Date();
  return [
    // Panelden yönetilen sabit sayfalar
    ...technical.sitemap.map((path) => ({
      url: `${base}${path === "/" ? "" : path}` || base,
      lastModified: now,
    })),
    // Yayındaki hizmet ve duyuru sayfaları otomatik eklenir
    ...serviceRows.map((s) => ({
      url: `${base}/hizmetlerimiz/${s.slug}`,
      lastModified: now,
    })),
    ...announcementRows.map((a) => ({
      url: `${base}/duyurular/${a.slug}`,
      lastModified: now,
    })),
  ];
}

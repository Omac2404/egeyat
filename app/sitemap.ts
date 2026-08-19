import type { MetadataRoute } from "next";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { announcements, services } from "@/db/schema";
import { getTechnicalSettings } from "@/lib/data/technical";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [base, technical, serviceRows, announcementRows] = await Promise.all([
    getSiteUrl(),
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

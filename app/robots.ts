import type { MetadataRoute } from "next";
import { getTechnicalSettings } from "@/lib/data/technical";
import { getSiteUrl } from "@/lib/site-url";

// Ayar panelden değişebildiği için her istekte DB'den okunur
export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const [base, technical] = await Promise.all([
    getSiteUrl(),
    getTechnicalSettings(),
  ]);

  // İndekslemeye kapalıyken tüm site engellenir, sitemap verilmez
  if (technical.noindex) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin/" },
    sitemap: `${base}/sitemap.xml`,
  };
}

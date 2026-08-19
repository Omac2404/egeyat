import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import {
  defaultTechnicalSettings,
  type TechnicalSettings,
} from "@/lib/technical-settings";

const KEY = "teknik";

export async function getTechnicalSettings(): Promise<TechnicalSettings> {
  let rows;
  try {
    rows = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, KEY))
      .limit(1);
  } catch (err) {
    // Build sırasında (statik sayfa üretimi) veritabanına erişilemez;
    // varsayılanlarla devam edilir, çalışma anında gerçek değerler okunur.
    console.warn("Teknik ayarlar okunamadı, varsayılanlar kullanılıyor:", err);
    return defaultTechnicalSettings;
  }
  if (!rows[0]) return defaultTechnicalSettings;
  const stored = rows[0].value as Partial<TechnicalSettings>;
  return {
    headCode: stored.headCode ?? defaultTechnicalSettings.headCode,
    smtp: { ...defaultTechnicalSettings.smtp, ...stored.smtp },
    mailTo: stored.mailTo ?? defaultTechnicalSettings.mailTo,
    favicon: stored.favicon ?? defaultTechnicalSettings.favicon,
    seo: { ...defaultTechnicalSettings.seo, ...stored.seo },
    noindex: stored.noindex ?? defaultTechnicalSettings.noindex,
    sitemap: stored.sitemap ?? defaultTechnicalSettings.sitemap,
  };
}

export async function saveTechnicalSettingsToDb(value: TechnicalSettings) {
  await db
    .insert(siteSettings)
    .values({ key: KEY, value, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value, updatedAt: new Date() },
    });
}

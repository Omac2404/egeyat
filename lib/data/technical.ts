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
  const rows = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, KEY))
    .limit(1);
  if (!rows[0]) return defaultTechnicalSettings;
  const stored = rows[0].value as Partial<TechnicalSettings>;
  return {
    headCode: stored.headCode ?? defaultTechnicalSettings.headCode,
    smtp: { ...defaultTechnicalSettings.smtp, ...stored.smtp },
    mailTo: stored.mailTo ?? defaultTechnicalSettings.mailTo,
    favicon: stored.favicon ?? defaultTechnicalSettings.favicon,
    seo: { ...defaultTechnicalSettings.seo, ...stored.seo },
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

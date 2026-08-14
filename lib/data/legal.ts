import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import {
  defaultLegalSettings,
  type LegalSettings,
} from "@/lib/legal-settings";

const KEY = "yasal";

export async function getLegalSettings(): Promise<LegalSettings> {
  const rows = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, KEY))
    .limit(1);
  if (!rows[0]) return defaultLegalSettings;
  const stored = rows[0].value as Partial<LegalSettings>;
  // Varsayılanda olup kayıtta olmayan sayfalar korunur
  const docs = defaultLegalSettings.docs.map(
    (d) => stored.docs?.find((s) => s.slug === d.slug) ?? d
  );
  return { docs };
}

export async function getLegalPage(slug: string) {
  const settings = await getLegalSettings();
  return settings.docs.find((d) => d.slug === slug);
}

export async function saveLegalSettingsToDb(value: LegalSettings) {
  await db
    .insert(siteSettings)
    .values({ key: KEY, value, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value, updatedAt: new Date() },
    });
}

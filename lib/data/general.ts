import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import {
  defaultGeneralSettings,
  type GeneralSettings,
} from "@/lib/general-settings";

const KEY = "genel";

export async function getGeneralSettings(): Promise<GeneralSettings> {
  const rows = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, KEY))
    .limit(1);
  if (!rows[0]) return defaultGeneralSettings;
  const stored = rows[0].value as Partial<GeneralSettings>;
  // Bölüm bazında birleştir: eski kayıtlarda eksik bölüm varsa varsayılan kullanılır
  return {
    hero: { ...defaultGeneralSettings.hero, ...stored.hero },
    flags: stored.flags ?? defaultGeneralSettings.flags,
    about: { ...defaultGeneralSettings.about, ...stored.about },
    cta: { ...defaultGeneralSettings.cta, ...stored.cta },
    social: { ...defaultGeneralSettings.social, ...stored.social },
  };
}

export async function saveGeneralSettingsToDb(value: GeneralSettings) {
  await db
    .insert(siteSettings)
    .values({ key: KEY, value, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value, updatedAt: new Date() },
    });
}

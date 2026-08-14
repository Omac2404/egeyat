import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import {
  defaultAboutSettings,
  type AboutSettings,
} from "@/lib/about-settings";

const KEY = "hakkimizda";

export async function getAboutSettings(): Promise<AboutSettings> {
  const rows = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, KEY))
    .limit(1);
  if (!rows[0]) return defaultAboutSettings;
  return { ...defaultAboutSettings, ...(rows[0].value as AboutSettings) };
}

export async function saveAboutSettingsToDb(value: AboutSettings) {
  await db
    .insert(siteSettings)
    .values({ key: KEY, value, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value, updatedAt: new Date() },
    });
}

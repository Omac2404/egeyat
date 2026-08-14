import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import {
  defaultContactSettings,
  type ContactSettings,
} from "@/lib/contact-settings";

const KEY = "iletisim";

export async function getContactSettings(): Promise<ContactSettings> {
  const rows = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, KEY))
    .limit(1);
  if (!rows[0]) return defaultContactSettings;
  return { ...defaultContactSettings, ...(rows[0].value as ContactSettings) };
}

export async function saveContactSettingsToDb(value: ContactSettings) {
  await db
    .insert(siteSettings)
    .values({ key: KEY, value, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value, updatedAt: new Date() },
    });
}

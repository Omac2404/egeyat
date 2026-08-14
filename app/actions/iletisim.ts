"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSection } from "@/lib/auth/session";
import { saveContactSettingsToDb } from "@/lib/data/contact";

const settingsSchema = z.object({
  subtitle: z.string().trim().min(1, "Alt başlık gerekli"),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, "WhatsApp numarası yalnızca rakam olmalı (örn. 905339289590)"),
  mapsUrl: z.string().trim().url("Google Haritalar bağlantısı geçerli olmalı"),
  mapEmbedUrl: z.string().trim().url("Harita embed adresi geçerli olmalı"),
  offices: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Ofis adı gerekli"),
        address: z.string().trim().min(1, "Adres gerekli"),
        lines: z.array(
          z.object({
            label: z.string().trim().min(1, "Satır etiketi gerekli"),
            value: z.string().trim().min(1, "Satır değeri gerekli"),
          })
        ),
      })
    )
    .min(1, "En az bir ofis olmalı"),
});

export type ContactSettingsState = { ok?: boolean; error?: string };

export async function saveContactSettings(
  _prev: ContactSettingsState,
  formData: FormData
): Promise<ContactSettingsState> {
  await requireSection("iletisim");

  let officesRaw: unknown;
  try {
    officesRaw = JSON.parse(String(formData.get("offices") ?? "[]"));
  } catch {
    return { error: "Ofis bilgileri okunamadı." };
  }

  const parsed = settingsSchema.safeParse({
    subtitle: formData.get("subtitle"),
    whatsapp: formData.get("whatsapp"),
    mapsUrl: formData.get("mapsUrl"),
    mapEmbedUrl: formData.get("mapEmbedUrl"),
    offices: officesRaw,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }

  await saveContactSettingsToDb(parsed.data);
  revalidatePath("/iletisim");
  revalidatePath("/admin/iletisim");
  return { ok: true };
}

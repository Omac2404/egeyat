"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSection } from "@/lib/auth/session";
import { getAboutSettings, saveAboutSettingsToDb } from "@/lib/data/about";
import type { AboutReference } from "@/lib/about-settings";
import {
  IMAGE_EXTENSIONS,
  saveUploadedFile,
  removeUploadedFile,
} from "@/lib/uploads";

const settingsSchema = z.object({
  subtitle: z.string().trim().min(1, "Alt başlık gerekli"),
  heading: z.string().trim().min(1, "Başlık gerekli"),
  paragraphs: z
    .array(z.string().trim().min(1))
    .min(1, "En az bir paragraf ekleyin"),
  mission: z.string().trim().min(1, "Misyon metni gerekli"),
  vision: z.string().trim().min(1, "Vizyon metni gerekli"),
});

export type AboutSettingsState = { ok?: boolean; error?: string };

export async function saveAboutSettings(
  _prev: AboutSettingsState,
  formData: FormData
): Promise<AboutSettingsState> {
  await requireSection("hakkimizda");

  let paragraphsRaw: unknown;
  try {
    paragraphsRaw = JSON.parse(String(formData.get("paragraphs") ?? "[]"));
  } catch {
    return { error: "Paragraflar okunamadı." };
  }

  const parsed = settingsSchema.safeParse({
    subtitle: formData.get("subtitle"),
    heading: formData.get("heading"),
    paragraphs: paragraphsRaw,
    mission: formData.get("mission"),
    vision: formData.get("vision"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }

  // Referans logoları bu formda düzenlenmez; mevcut liste korunur
  const current = await getAboutSettings();
  await saveAboutSettingsToDb({ ...current, ...parsed.data });
  revalidatePath("/hakkimizda");
  revalidatePath("/admin/hakkimizda");
  return { ok: true };
}

export type ReferenceState = { ok?: boolean; error?: string };

export async function addReference(
  _prev: ReferenceState,
  formData: FormData
): Promise<ReferenceState> {
  await requireSection("hakkimizda");

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Referans adı gerekli." };

  const upload = await saveUploadedFile(
    formData.get("image"),
    "referanslar",
    IMAGE_EXTENSIONS
  );
  if (!upload.ok) return { error: upload.error };
  if (!upload.publicPath) return { error: "Logo dosyası seçin." };

  const current = await getAboutSettings();
  await saveAboutSettingsToDb({
    ...current,
    references: [
      ...current.references,
      { name, image: upload.publicPath },
    ],
  });
  revalidatePath("/hakkimizda");
  revalidatePath("/admin/hakkimizda");
  return { ok: true };
}

// Sürükle-bırak sonrası yeni sıralamayı kaydeder (image yolları sıralı gelir)
export async function reorderReferences(images: string[]) {
  await requireSection("hakkimizda");
  if (!Array.isArray(images)) return;

  const current = await getAboutSettings();
  const byImage = new Map(current.references.map((r) => [r.image, r]));
  const next = images
    .map((img) => byImage.get(img))
    .filter(Boolean) as AboutReference[];
  // Gelen listede olmayan kayıtlar (eşzamanlı eklenmiş olabilir) sona eklenir
  for (const r of current.references) {
    if (!images.includes(r.image)) next.push(r);
  }

  await saveAboutSettingsToDb({ ...current, references: next });
  revalidatePath("/hakkimizda");
  revalidatePath("/admin/hakkimizda");
}

export async function deleteReference(formData: FormData) {
  await requireSection("hakkimizda");
  const image = String(formData.get("image") ?? "");
  if (!image) return;

  const current = await getAboutSettings();
  await removeUploadedFile(image, "referanslar");
  await saveAboutSettingsToDb({
    ...current,
    references: current.references.filter((r) => r.image !== image),
  });
  revalidatePath("/hakkimizda");
  revalidatePath("/admin/hakkimizda");
}

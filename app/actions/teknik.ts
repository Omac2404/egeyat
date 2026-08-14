"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSection } from "@/lib/auth/session";
import {
  getTechnicalSettings,
  saveTechnicalSettingsToDb,
} from "@/lib/data/technical";
import { saveUploadedFile, removeUploadedFile } from "@/lib/uploads";

export type TechnicalState = { ok?: boolean; error?: string };

function revalidateTechnical() {
  // headCode/favicon/SEO kök layout'ta kullanılıyor: tüm site etkilenir
  revalidatePath("/", "layout");
  revalidatePath("/admin/teknik");
}

export async function saveHeadCode(
  _prev: TechnicalState,
  formData: FormData
): Promise<TechnicalState> {
  await requireSection("teknik");
  const headCode = String(formData.get("headCode") ?? "").trim();
  const current = await getTechnicalSettings();
  await saveTechnicalSettingsToDb({ ...current, headCode });
  revalidateTechnical();
  return { ok: true };
}

const smtpSchema = z.object({
  host: z.string().trim(),
  port: z.coerce.number().int().min(1).max(65535),
  user: z.string().trim(),
  pass: z.string(),
  from: z.string().trim(),
  mailTo: z.string().trim(),
});

export async function saveSmtp(
  _prev: TechnicalState,
  formData: FormData
): Promise<TechnicalState> {
  await requireSection("teknik");
  const parsed = smtpSchema.safeParse({
    host: formData.get("host") ?? "",
    port: formData.get("port") || 587,
    user: formData.get("user") ?? "",
    pass: formData.get("pass") ?? "",
    from: formData.get("from") ?? "",
    mailTo: formData.get("mailTo") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }
  const { mailTo, ...smtp } = parsed.data;
  const current = await getTechnicalSettings();
  // Şifre boş bırakıldıysa mevcut şifre korunur
  const pass = smtp.pass === "" ? current.smtp.pass : smtp.pass;
  await saveTechnicalSettingsToDb({
    ...current,
    smtp: { ...smtp, pass },
    mailTo,
  });
  revalidateTechnical();
  return { ok: true };
}

const FAVICON_EXTENSIONS = new Set(["ico", "png", "svg"]);

export async function saveFavicon(
  _prev: TechnicalState,
  formData: FormData
): Promise<TechnicalState> {
  await requireSection("teknik");
  const upload = await saveUploadedFile(
    formData.get("favicon"),
    "teknik",
    FAVICON_EXTENSIONS
  );
  if (!upload.ok) return { error: upload.error };
  const removeFavicon = formData.get("removeFavicon") === "on";

  const current = await getTechnicalSettings();
  let favicon = current.favicon;
  if (upload.publicPath) {
    await removeUploadedFile(favicon, "teknik");
    favicon = upload.publicPath;
  } else if (removeFavicon) {
    await removeUploadedFile(favicon, "teknik");
    favicon = null;
  } else {
    return { error: "Favicon dosyası seçin (.ico, .png veya .svg)." };
  }

  await saveTechnicalSettingsToDb({ ...current, favicon });
  revalidateTechnical();
  return { ok: true };
}

const seoSchema = z.object({
  title: z.string().trim().min(3, "Site başlığı gerekli").max(70),
  description: z
    .string()
    .trim()
    .min(10, "Açıklama en az 10 karakter olmalı")
    .max(200),
});

export async function saveSeo(
  _prev: TechnicalState,
  formData: FormData
): Promise<TechnicalState> {
  await requireSection("teknik");
  const parsed = seoSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }
  const current = await getTechnicalSettings();
  await saveTechnicalSettingsToDb({ ...current, seo: parsed.data });
  revalidateTechnical();
  return { ok: true };
}

const sitemapSchema = z.array(
  z
    .string()
    .trim()
    .regex(/^\/[^\s]*$/, "Yollar / ile başlamalı ve boşluk içermemeli")
);

export async function saveSitemap(
  _prev: TechnicalState,
  formData: FormData
): Promise<TechnicalState> {
  await requireSection("teknik");
  let raw: unknown;
  try {
    raw = JSON.parse(String(formData.get("paths") ?? "[]"));
  } catch {
    return { error: "Sitemap listesi okunamadı." };
  }
  const parsed = sitemapSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Listeyi kontrol edin." };
  }
  const current = await getTechnicalSettings();
  await saveTechnicalSettingsToDb({
    ...current,
    sitemap: [...new Set(parsed.data)],
  });
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/teknik");
  return { ok: true };
}

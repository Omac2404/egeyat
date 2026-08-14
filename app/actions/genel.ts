"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSection } from "@/lib/auth/session";
import {
  getGeneralSettings,
  saveGeneralSettingsToDb,
} from "@/lib/data/general";
import type { HomeFlag } from "@/lib/general-settings";
import {
  IMAGE_EXTENSIONS,
  saveUploadedFile,
  removeUploadedFile,
} from "@/lib/uploads";

export type GeneralState = { ok?: boolean; error?: string };

function revalidateGeneral() {
  revalidatePath("/");
  revalidatePath("/admin");
}

// Buton için: site içi yol (/iletisim) veya tam adres (https://, tel:, mailto:)
const hrefSchema = z
  .string()
  .trim()
  .min(1, "Buton adresi gerekli")
  .refine(
    (v) =>
      v.startsWith("/") ||
      v.startsWith("http://") ||
      v.startsWith("https://") ||
      v.startsWith("tel:") ||
      v.startsWith("mailto:"),
    "Adres / ile başlamalı veya tam bağlantı olmalı (https://, tel:, mailto:)"
  );

const buttonSchema = z.object({
  label: z.string().trim().min(1, "Buton yazısı gerekli"),
  href: hrefSchema,
});

// ---------- Hero ----------

const heroSchema = z.object({
  title: z.string().trim().min(3, "Başlık gerekli"),
  highlight: z.string().trim(),
  text: z.string().trim().min(1, "Açıklama metni gerekli"),
  primary: buttonSchema,
  secondary: buttonSchema,
});

export async function saveHero(
  _prev: GeneralState,
  formData: FormData
): Promise<GeneralState> {
  await requireSection("genel");
  const parsed = heroSchema.safeParse({
    title: formData.get("title"),
    highlight: formData.get("highlight") ?? "",
    text: formData.get("text"),
    primary: {
      label: formData.get("primaryLabel"),
      href: formData.get("primaryHref"),
    },
    secondary: {
      label: formData.get("secondaryLabel"),
      href: formData.get("secondaryHref"),
    },
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }
  const current = await getGeneralSettings();
  await saveGeneralSettingsToDb({ ...current, hero: parsed.data });
  revalidateGeneral();
  return { ok: true };
}

// ---------- Ana sayfa Hakkımızda ----------

const aboutSchema = z.object({
  title: z.string().trim().min(3, "Başlık gerekli"),
  text1: z.string().trim().min(1, "İlk paragraf gerekli"),
  text2: z.string().trim(),
});

export async function saveHomeAbout(
  _prev: GeneralState,
  formData: FormData
): Promise<GeneralState> {
  await requireSection("genel");
  const parsed = aboutSchema.safeParse({
    title: formData.get("title"),
    text1: formData.get("text1"),
    text2: formData.get("text2") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }

  const upload = await saveUploadedFile(
    formData.get("image"),
    "genel",
    IMAGE_EXTENSIONS
  );
  if (!upload.ok) return { error: upload.error };
  const removeImage = formData.get("removeImage") === "on";

  const current = await getGeneralSettings();
  let image = current.about.image;
  if (upload.publicPath) {
    await removeUploadedFile(image, "genel");
    image = upload.publicPath;
  } else if (removeImage) {
    await removeUploadedFile(image, "genel");
    image = null;
  }

  await saveGeneralSettingsToDb({
    ...current,
    about: { ...parsed.data, image },
  });
  revalidateGeneral();
  return { ok: true };
}

// ---------- CTA ----------

const ctaSchema = z.object({
  title: z.string().trim().min(3, "Başlık gerekli"),
  text: z.string().trim().min(1, "Açıklama metni gerekli"),
  primary: buttonSchema,
  secondary: buttonSchema,
});

export async function saveCta(
  _prev: GeneralState,
  formData: FormData
): Promise<GeneralState> {
  await requireSection("genel");
  const parsed = ctaSchema.safeParse({
    title: formData.get("title"),
    text: formData.get("text"),
    primary: {
      label: formData.get("primaryLabel"),
      href: formData.get("primaryHref"),
    },
    secondary: {
      label: formData.get("secondaryLabel"),
      href: formData.get("secondaryHref"),
    },
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }
  const current = await getGeneralSettings();
  await saveGeneralSettingsToDb({ ...current, cta: parsed.data });
  revalidateGeneral();
  return { ok: true };
}

// ---------- Sosyal medya ----------

const optionalUrl = z
  .string()
  .trim()
  .url("Geçerli bir bağlantı girin")
  .optional()
  .or(z.literal("").transform(() => ""));

const socialSchema = z.object({
  instagram: optionalUrl,
  facebook: optionalUrl,
  linkedin: optionalUrl,
  x: optionalUrl,
});

export async function saveSocial(
  _prev: GeneralState,
  formData: FormData
): Promise<GeneralState> {
  await requireSection("genel");
  const parsed = socialSchema.safeParse({
    instagram: formData.get("instagram") ?? "",
    facebook: formData.get("facebook") ?? "",
    linkedin: formData.get("linkedin") ?? "",
    x: formData.get("x") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }
  const current = await getGeneralSettings();
  await saveGeneralSettingsToDb({
    ...current,
    social: {
      instagram: parsed.data.instagram ?? "",
      facebook: parsed.data.facebook ?? "",
      linkedin: parsed.data.linkedin ?? "",
      x: parsed.data.x ?? "",
    },
  });
  revalidateGeneral();
  return { ok: true };
}

// ---------- Bayraklar ----------

export async function addFlag(
  _prev: GeneralState,
  formData: FormData
): Promise<GeneralState> {
  await requireSection("genel");
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Bayrak adı gerekli." };

  const upload = await saveUploadedFile(
    formData.get("image"),
    "bayraklar",
    IMAGE_EXTENSIONS
  );
  if (!upload.ok) return { error: upload.error };
  if (!upload.publicPath) return { error: "Bayrak görseli seçin." };

  const current = await getGeneralSettings();
  await saveGeneralSettingsToDb({
    ...current,
    flags: [...current.flags, { name, image: upload.publicPath }],
  });
  revalidateGeneral();
  return { ok: true };
}

export async function deleteFlag(formData: FormData) {
  await requireSection("genel");
  const image = String(formData.get("image") ?? "");
  if (!image) return;
  const current = await getGeneralSettings();
  await removeUploadedFile(image, "bayraklar");
  await saveGeneralSettingsToDb({
    ...current,
    flags: current.flags.filter((f) => f.image !== image),
  });
  revalidateGeneral();
}

export async function reorderFlags(images: string[]) {
  await requireSection("genel");
  if (!Array.isArray(images)) return;
  const current = await getGeneralSettings();
  const byImage = new Map(current.flags.map((f) => [f.image, f]));
  const next = images
    .map((img) => byImage.get(img))
    .filter(Boolean) as HomeFlag[];
  for (const f of current.flags) {
    if (!images.includes(f.image)) next.push(f);
  }
  await saveGeneralSettingsToDb({ ...current, flags: next });
  revalidateGeneral();
}

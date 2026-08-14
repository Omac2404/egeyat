"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { services } from "@/db/schema";
import { requireSection } from "@/lib/auth/session";
import {
  IMAGE_EXTENSIONS,
  saveUploadedFile,
  removeUploadedFile,
} from "@/lib/uploads";

const IMAGE_DIR = "hizmet-gorselleri";

const sectionSchema = z.object({
  title: z.string().trim(),
  description: z.string().trim().optional(),
  items: z.array(z.string().trim().min(1)),
});

const saveSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  title: z.string().trim().min(3, "Başlık en az 3 karakter olmalı"),
  shortTitle: z.string().trim().min(1, "Kısa başlık gerekli"),
  summary: z.string().trim().min(1, "Özet gerekli"),
  intro: z.string().trim().min(1, "Giriş metni gerekli"),
  published: z.boolean(),
  sections: z
    .array(sectionSchema)
    .min(1, "En az bir dolu bölüm ekleyin (başlık, açıklama veya madde)"),
});

function slugify(text: string) {
  const map: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", i: "i", ö: "o", ş: "s", ü: "u",
    Ç: "c", Ğ: "g", İ: "i", I: "i", Ö: "o", Ş: "s", Ü: "u",
  };
  return text
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function uniqueSlug(base: string) {
  let slug = base || "hizmet";
  for (let n = 2; ; n++) {
    const rows = await db
      .select({ id: services.id })
      .from(services)
      .where(eq(services.slug, slug))
      .limit(1);
    if (rows.length === 0) return slug;
    slug = `${base}-${n}`;
  }
}

function revalidateService(slug: string) {
  revalidatePath("/");
  revalidatePath("/hizmetlerimiz");
  revalidatePath(`/hizmetlerimiz/${slug}`);
  revalidatePath("/admin/hizmetler");
}

export type SaveServiceState = { error?: string };

export async function saveService(
  _prev: SaveServiceState,
  formData: FormData
): Promise<SaveServiceState> {
  await requireSection("hizmetler");

  let sectionsRaw: unknown;
  try {
    sectionsRaw = JSON.parse(String(formData.get("sections") ?? "[]"));
  } catch {
    return { error: "Bölümler okunamadı." };
  }

  const parsed = saveSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    shortTitle: formData.get("shortTitle"),
    summary: formData.get("summary"),
    intro: formData.get("intro"),
    published: formData.get("published") === "on",
    sections: sectionsRaw,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }
  const { id, sections, ...fields } = parsed.data;

  const upload = await saveUploadedFile(
    formData.get("image"),
    IMAGE_DIR,
    IMAGE_EXTENSIONS
  );
  if (!upload.ok) return { error: upload.error };
  const removeImage = formData.get("removeImage") === "on";

  let slug: string;
  if (id) {
    const rows = await db
      .select({ slug: services.slug, image: services.image })
      .from(services)
      .where(eq(services.id, id))
      .limit(1);
    if (!rows[0]) return { error: "Hizmet bulunamadı." };
    slug = rows[0].slug;

    let image = rows[0].image;
    if (upload.publicPath) {
      await removeUploadedFile(image, IMAGE_DIR);
      image = upload.publicPath;
    } else if (removeImage) {
      await removeUploadedFile(image, IMAGE_DIR);
      image = null;
    }

    await db
      .update(services)
      .set({ ...fields, sections, image, updatedAt: new Date() })
      .where(eq(services.id, id));
  } else {
    slug = await uniqueSlug(slugify(fields.title));
    const maxRow = await db
      .select({ max: sql<number>`coalesce(max(${services.sortOrder}), -1)` })
      .from(services);
    await db.insert(services).values({
      slug,
      sections,
      image: upload.publicPath,
      sortOrder: (maxRow[0]?.max ?? -1) + 1,
      ...fields,
    });
  }

  revalidateService(slug);
  redirect("/admin/hizmetler?kaydedildi=1");
}

export async function deleteService(formData: FormData) {
  await requireSection("hizmetler");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  const rows = await db
    .select({ slug: services.slug, image: services.image })
    .from(services)
    .where(eq(services.id, id))
    .limit(1);
  await removeUploadedFile(rows[0]?.image, IMAGE_DIR);
  await db.delete(services).where(eq(services.id, id));
  revalidateService(rows[0]?.slug ?? "");
}

export async function toggleServicePublished(formData: FormData) {
  await requireSection("hizmetler");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  const rows = await db
    .select({ published: services.published, slug: services.slug })
    .from(services)
    .where(eq(services.id, id))
    .limit(1);
  if (!rows[0]) return;
  await db
    .update(services)
    .set({ published: !rows[0].published, updatedAt: new Date() })
    .where(eq(services.id, id));
  revalidateService(rows[0].slug);
}

// Sürükle-bırak sonrası yeni sıralamayı kaydeder
export async function reorderServices(ids: number[]) {
  await requireSection("hizmetler");
  if (!Array.isArray(ids)) return;
  for (let i = 0; i < ids.length; i++) {
    const id = Number(ids[i]);
    if (!Number.isInteger(id)) continue;
    await db
      .update(services)
      .set({ sortOrder: i, updatedAt: new Date() })
      .where(eq(services.id, id));
  }
  revalidatePath("/");
  revalidatePath("/hizmetlerimiz");
  revalidatePath("/admin/hizmetler");
}

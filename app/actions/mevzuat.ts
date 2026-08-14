"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { mevzuat, usefulLinks } from "@/db/schema";
import { requireSection } from "@/lib/auth/session";
import {
  DOCUMENT_EXTENSIONS,
  saveUploadedFile,
  removeUploadedFile,
} from "@/lib/uploads";

const itemSchema = z.object({
  title: z.string().trim().min(3, "Başlık en az 3 karakter olmalı"),
  href: z
    .string()
    .trim()
    .url("Geçerli bir bağlantı girin")
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

const saveUpload = (value: FormDataEntryValue | null) =>
  saveUploadedFile(value, "belgeler", DOCUMENT_EXTENSIONS);
const removeFileFromDisk = (publicPath: string | null) =>
  removeUploadedFile(publicPath, "belgeler");

function revalidateMevzuat() {
  revalidatePath("/mevzuat");
  revalidatePath("/admin/mevzuat");
}

export type MevzuatState = { ok?: boolean; error?: string };

export async function createMevzuat(
  _prev: MevzuatState,
  formData: FormData
): Promise<MevzuatState> {
  await requireSection("mevzuat");
  const parsed = itemSchema.safeParse({
    title: formData.get("title"),
    href: formData.get("href") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }
  const upload = await saveUpload(formData.get("file"));
  if (!upload.ok) return { error: upload.error };

  const maxRow = await db
    .select({ max: sql<number>`coalesce(max(${mevzuat.sortOrder}), -1)` })
    .from(mevzuat);
  await db.insert(mevzuat).values({
    title: parsed.data.title,
    href: parsed.data.href ?? null,
    filePath: upload.publicPath,
    published: true,
    sortOrder: (maxRow[0]?.max ?? -1) + 1,
  });
  revalidateMevzuat();
  return { ok: true };
}

export async function updateMevzuat(formData: FormData) {
  await requireSection("mevzuat");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  const rows = await db
    .select()
    .from(mevzuat)
    .where(eq(mevzuat.id, id))
    .limit(1);
  const current = rows[0];
  if (!current) return;

  const parsed = itemSchema.safeParse({
    title: formData.get("title"),
    href: formData.get("href") ?? "",
  });
  if (!parsed.success) return;

  const upload = await saveUpload(formData.get("file"));
  if (!upload.ok) return;

  const removeFile = formData.get("removeFile") === "on";
  let filePath = current.filePath;
  if (upload.publicPath) {
    await removeFileFromDisk(current.filePath);
    filePath = upload.publicPath;
  } else if (removeFile) {
    await removeFileFromDisk(current.filePath);
    filePath = null;
  }

  await db
    .update(mevzuat)
    .set({
      title: parsed.data.title,
      href: parsed.data.href ?? null,
      filePath,
      updatedAt: new Date(),
    })
    .where(eq(mevzuat.id, id));
  revalidateMevzuat();
  redirect("/admin/mevzuat?kaydedildi=1");
}

export async function toggleMevzuatPublished(formData: FormData) {
  await requireSection("mevzuat");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  const rows = await db
    .select({ published: mevzuat.published })
    .from(mevzuat)
    .where(eq(mevzuat.id, id))
    .limit(1);
  if (!rows[0]) return;
  await db
    .update(mevzuat)
    .set({ published: !rows[0].published, updatedAt: new Date() })
    .where(eq(mevzuat.id, id));
  revalidateMevzuat();
}

export async function deleteMevzuat(formData: FormData) {
  await requireSection("mevzuat");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  const rows = await db
    .select({ filePath: mevzuat.filePath })
    .from(mevzuat)
    .where(eq(mevzuat.id, id))
    .limit(1);
  await removeFileFromDisk(rows[0]?.filePath ?? null);
  await db.delete(mevzuat).where(eq(mevzuat.id, id));
  revalidateMevzuat();
}

// ---------- Faydalı bağlantılar ----------

const linkSchema = z.object({
  title: z.string().trim().min(2, "Bağlantı adı en az 2 karakter olmalı"),
  href: z.string().trim().url("Geçerli bir bağlantı girin"),
});

export async function createUsefulLink(
  _prev: MevzuatState,
  formData: FormData
): Promise<MevzuatState> {
  await requireSection("mevzuat");
  const parsed = linkSchema.safeParse({
    title: formData.get("title"),
    href: formData.get("href"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }
  const maxRow = await db
    .select({ max: sql<number>`coalesce(max(${usefulLinks.sortOrder}), -1)` })
    .from(usefulLinks);
  await db.insert(usefulLinks).values({
    title: parsed.data.title,
    href: parsed.data.href,
    sortOrder: (maxRow[0]?.max ?? -1) + 1,
  });
  revalidateMevzuat();
  return { ok: true };
}

export async function updateUsefulLink(formData: FormData) {
  await requireSection("mevzuat");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  const parsed = linkSchema.safeParse({
    title: formData.get("title"),
    href: formData.get("href"),
  });
  if (!parsed.success) return;
  await db
    .update(usefulLinks)
    .set({
      title: parsed.data.title,
      href: parsed.data.href,
      updatedAt: new Date(),
    })
    .where(eq(usefulLinks.id, id));
  revalidateMevzuat();
  redirect("/admin/mevzuat?kaydedildi=1");
}

export async function deleteUsefulLink(formData: FormData) {
  await requireSection("mevzuat");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await db.delete(usefulLinks).where(eq(usefulLinks.id, id));
  revalidateMevzuat();
}

// Sürükle-bırak sonrası yeni sıralamayı kaydeder
export async function reorderMevzuat(ids: number[]) {
  await requireSection("mevzuat");
  if (!Array.isArray(ids)) return;
  for (let i = 0; i < ids.length; i++) {
    const id = Number(ids[i]);
    if (!Number.isInteger(id)) continue;
    await db
      .update(mevzuat)
      .set({ sortOrder: i, updatedAt: new Date() })
      .where(eq(mevzuat.id, id));
  }
  revalidateMevzuat();
}

export async function reorderUsefulLinks(ids: number[]) {
  await requireSection("mevzuat");
  if (!Array.isArray(ids)) return;
  for (let i = 0; i < ids.length; i++) {
    const id = Number(ids[i]);
    if (!Number.isInteger(id)) continue;
    await db
      .update(usefulLinks)
      .set({ sortOrder: i, updatedAt: new Date() })
      .where(eq(usefulLinks.id, id));
  }
  revalidateMevzuat();
}

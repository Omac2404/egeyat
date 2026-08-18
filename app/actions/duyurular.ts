"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { requireSection } from "@/lib/auth/session";

const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("p"), text: z.string().trim().min(1) }),
  z.object({
    type: z.literal("table"),
    caption: z.string().trim().optional(),
    head: z.array(z.string()).min(1),
    rows: z.array(z.array(z.string())).min(1),
  }),
  z.object({
    type: z.literal("link"),
    href: z.string().trim().url("Bağlantı adresi geçerli bir URL olmalı"),
    label: z.string().trim().min(1),
  }),
]);

const saveSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  title: z.string().trim().min(3, "Başlık en az 3 karakter olmalı"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Tarih seçin"),
  summary: z.string().trim().min(1, "Özet gerekli"),
  published: z.boolean(),
  blocks: z.array(blockSchema).min(1, "En az bir içerik bloğu ekleyin"),
});

// Türkçe karakterleri sadeleştirerek URL dostu slug üretir
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
  let slug = base || "duyuru";
  for (let n = 2; ; n++) {
    const rows = await db
      .select({ id: announcements.id })
      .from(announcements)
      .where(eq(announcements.slug, slug))
      .limit(1);
    if (rows.length === 0) return slug;
    slug = `${base}-${n}`;
  }
}

export type SaveAnnouncementState = { error?: string };

export async function saveAnnouncement(
  _prev: SaveAnnouncementState,
  formData: FormData
): Promise<SaveAnnouncementState> {
  await requireSection("duyurular");

  let blocksRaw: unknown;
  try {
    blocksRaw = JSON.parse(String(formData.get("blocks") ?? "[]"));
  } catch {
    return { error: "İçerik blokları okunamadı." };
  }

  const parsed = saveSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    date: formData.get("date"),
    summary: formData.get("summary"),
    published: formData.get("published") === "on",
    blocks: blocksRaw,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }
  const { id, title, date, summary, published, blocks } = parsed.data;

  let slug: string;
  let savedId: number;
  if (id) {
    const rows = await db
      .select({ slug: announcements.slug })
      .from(announcements)
      .where(eq(announcements.id, id))
      .limit(1);
    if (!rows[0]) return { error: "Duyuru bulunamadı." };
    slug = rows[0].slug;
    savedId = id;
    await db
      .update(announcements)
      .set({ title, date, summary, published, blocks, updatedAt: new Date() })
      .where(eq(announcements.id, id));
  } else {
    slug = await uniqueSlug(slugify(title));
    const inserted = await db
      .insert(announcements)
      .values({ slug, title, date, summary, published, blocks })
      .returning({ id: announcements.id });
    savedId = inserted[0].id;
  }

  revalidatePath("/");
  revalidatePath("/duyurular");
  revalidatePath(`/duyurular/${slug}`);
  revalidatePath("/admin/duyurular");
  // Kayıttan sonra listeye dönmek yerine düzenleme sayfasında kalınır
  redirect(`/admin/duyurular/${savedId}?kaydedildi=1`);
}

export async function deleteAnnouncement(formData: FormData) {
  await requireSection("duyurular");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await db.delete(announcements).where(eq(announcements.id, id));
  revalidatePath("/");
  revalidatePath("/duyurular");
}

export async function togglePublished(formData: FormData) {
  await requireSection("duyurular");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  const rows = await db
    .select({ published: announcements.published, slug: announcements.slug })
    .from(announcements)
    .where(eq(announcements.id, id))
    .limit(1);
  if (!rows[0]) return;
  await db
    .update(announcements)
    .set({ published: !rows[0].published, updatedAt: new Date() })
    .where(eq(announcements.id, id));
  revalidatePath("/");
  revalidatePath("/duyurular");
  revalidatePath(`/duyurular/${rows[0].slug}`);
  revalidatePath("/admin/duyurular");
}

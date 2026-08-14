"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSection } from "@/lib/auth/session";
import { getLegalSettings, saveLegalSettingsToDb } from "@/lib/data/legal";
import {
  DOCUMENT_EXTENSIONS,
  saveUploadedFile,
  removeUploadedFile,
} from "@/lib/uploads";

const docSchema = z.object({
  slug: z.string().trim().min(1),
  title: z.string().trim().min(3, "Başlık gerekli"),
  subtitle: z.string().trim().min(3, "Alt başlık gerekli"),
  content: z.string().trim().min(10, "İçerik gerekli"),
});

export type LegalDocState = { ok?: boolean; error?: string };

export async function saveLegalDoc(
  _prev: LegalDocState,
  formData: FormData
): Promise<LegalDocState> {
  await requireSection("genel");

  const parsed = docSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    content: formData.get("content"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }
  const { slug, ...fields } = parsed.data;

  const settings = await getLegalSettings();
  const doc = settings.docs.find((d) => d.slug === slug);
  if (!doc) return { error: "Yasal sayfa bulunamadı." };

  const upload = await saveUploadedFile(
    formData.get("file"),
    "yasal",
    DOCUMENT_EXTENSIONS
  );
  if (!upload.ok) return { error: upload.error };
  const removeFile = formData.get("removeFile") === "on";

  let file = doc.file;
  if (upload.publicPath) {
    await removeUploadedFile(file, "yasal");
    file = upload.publicPath;
  } else if (removeFile) {
    await removeUploadedFile(file, "yasal");
    file = null;
  }

  await saveLegalSettingsToDb({
    docs: settings.docs.map((d) =>
      d.slug === slug ? { ...d, ...fields, file } : d
    ),
  });
  revalidatePath(`/${slug}`);
  revalidatePath("/admin");
  return { ok: true };
}

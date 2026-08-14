"use server";

import { revalidatePath } from "next/cache";
import { eq, not } from "drizzle-orm";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { requireSection } from "@/lib/auth/session";

export async function toggleRead(formData: FormData) {
  await requireSection("iletisim");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await db
    .update(submissions)
    .set({ read: not(submissions.read) })
    .where(eq(submissions.id, id));
  revalidatePath("/admin/iletisim");
  revalidatePath("/admin");
}

export async function deleteSubmission(formData: FormData) {
  await requireSection("iletisim");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await db.delete(submissions).where(eq(submissions.id, id));
  revalidatePath("/admin/iletisim");
  revalidatePath("/admin");
}

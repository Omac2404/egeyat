"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { checkRateLimit } from "@/lib/auth/rate-limit";
import { getTechnicalSettings } from "@/lib/data/technical";
import { verifyRecaptcha } from "@/lib/recaptcha";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Adınızı yazın").max(120),
  email: z.string().trim().toLowerCase().email("Geçerli bir e-posta girin"),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10, "Mesajınız çok kısa").max(4000),
});

export type ContactState = {
  ok?: boolean;
  error?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Bot tuzağı: gizli alan doluysa sessizce başarılı gibi davran
  if (formData.get("website")) return { ok: true };

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject") || undefined,
    message: formData.get("message"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }

  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(`contact:${ip}`)) {
    return { error: "Çok fazla gönderim yaptınız. Lütfen daha sonra deneyin." };
  }

  // reCAPTCHA yalnızca panelde iki anahtar da doluysa zorunlu olur
  const { recaptcha } = await getTechnicalSettings();
  if (recaptcha.siteKey && recaptcha.secretKey) {
    const token = String(formData.get("g-recaptcha-response") ?? "");
    const check = await verifyRecaptcha(token, recaptcha.secretKey, ip);
    if (!check.ok) return { error: check.error };
  }

  const { name, email, phone, subject, message } = parsed.data;
  await db.insert(submissions).values({
    kind: "contact",
    name,
    email,
    phone,
    message,
    meta: subject ? { subject } : undefined,
  });

  // E-posta bildirimi (SMTP ayarlıysa); hata mesaj kaydını engellemesin
  try {
    const { sendContactNotification } = await import("@/lib/mailer");
    await sendContactNotification({ name, email, phone, subject, message });
  } catch (err) {
    console.error("İletişim e-postası gönderilemedi:", err);
  }

  return { ok: true };
}

"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { verifyPassword, DUMMY_HASH } from "@/lib/auth/password";
import { createSession, destroySession } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/auth/rate-limit";

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
  next: z.string().optional(),
});

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") ?? undefined,
  });
  if (!parsed.success) {
    return { error: "E-posta ve şifre gerekli." };
  }
  const { email, password, next } = parsed.data;

  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(`login:${ip}`) || !checkRateLimit(`login:${email}`)) {
    return { error: "Çok fazla deneme. 15 dakika sonra tekrar deneyin." };
  }

  const rows = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  const user = rows[0];

  const ok = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) {
    return { error: "E-posta veya şifre hatalı." };
  }

  await createSession(user.id);

  // Açık yönlendirme saldırısını önle: yalnızca site içi /admin yolları
  const target =
    next && next.startsWith("/admin") && !next.startsWith("//")
      ? next
      : "/admin";
  redirect(target);
}

export async function logout() {
  await destroySession();
  redirect("/admin/giris");
}

import "server-only";

// Google reCAPTCHA v2 doğrulaması. Anahtarlar panelden (Teknik) yönetilir.

type VerifyResult = { ok: true } | { ok: false; error: string };

export async function verifyRecaptcha(
  token: string,
  secretKey: string,
  ip?: string
): Promise<VerifyResult> {
  if (!token) {
    return { ok: false, error: "Lütfen \"Ben robot değilim\" kutusunu işaretleyin." };
  }

  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (ip && ip !== "unknown") body.set("remoteip", ip);

  let data: { success?: boolean; "error-codes"?: string[] };
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      // Google'a ulaşılamıyorsa form dakikalarca askıda kalmasın
      signal: AbortSignal.timeout(10_000),
    });
    data = await res.json();
  } catch (err) {
    console.error("reCAPTCHA doğrulaması yapılamadı:", err);
    return {
      ok: false,
      error: "Doğrulama servisine ulaşılamadı. Lütfen tekrar deneyin.",
    };
  }

  if (data.success) return { ok: true };

  // Anahtar yanlışsa bunu ziyaretçiye değil loga yazıyoruz
  const codes = data["error-codes"] ?? [];
  if (codes.some((c) => c.startsWith("invalid-input-secret"))) {
    console.error("reCAPTCHA gizli anahtarı hatalı:", codes);
  }
  return {
    ok: false,
    error: "Doğrulama başarısız. Lütfen kutuyu tekrar işaretleyip deneyin.",
  };
}

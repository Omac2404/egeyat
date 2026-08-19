import "server-only";
import { headers } from "next/headers";

/**
 * Sitenin genel adresi. İsteğin Host başlığından okunur; böylece alan adı
 * değiştiğinde yeniden derleme gerekmez (NEXT_PUBLIC_SITE_URL derleme anında
 * koda gömülür ve eski değerde kalabilir).
 * Başlık okunamazsa env'e, o da yoksa localhost'a düşer.
 */
export async function getSiteUrl(): Promise<string> {
  const hdrs = await headers();
  const host = hdrs.get("x-forwarded-host") ?? hdrs.get("host");
  if (host) {
    const proto = hdrs.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";
    return `${proto}://${host}`.replace(/\/$/, "");
  }
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    ""
  );
}

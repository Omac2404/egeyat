import { site } from "@/lib/site";

// İletişim sayfası içeriği: panelden düzenlenir, site_settings("iletisim") altında saklanır.
export type ContactLine = { label: string; value: string };
export type ContactOffice = {
  name: string;
  address: string;
  lines: ContactLine[];
};
export type ContactSettings = {
  subtitle: string;
  whatsapp: string;
  mapsUrl: string;
  mapEmbedUrl: string;
  offices: ContactOffice[];
};

export const defaultContactSettings: ContactSettings = {
  subtitle: "Sorularınız için bize ulaşın; aynı gün dönüş yapıyoruz.",
  whatsapp: site.whatsapp,
  mapsUrl: site.mapsUrl,
  mapEmbedUrl:
    "https://maps.google.com/maps?q=%C4%B0hsan%20Kay%C4%B1n%20Plaza%20Konak%20%C4%B0zmir&z=16&output=embed",
  offices: site.offices.map((o) => ({
    name: o.name,
    address: o.address,
    lines: o.lines.map((l) => ({ label: l.label, value: l.value })),
  })),
};

// Web adresi mi? (http(s) ile başlayan ya da alan adı görünümlü değer)
function isWebValue(value: string): boolean {
  const v = value.trim();
  return /^https?:\/\//i.test(v) || /^(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(v);
}

// Web adresini mutlak URL'ye çevirir; takip parametrelerini (?exln=... gibi) atar
export function normalizeWebUrl(value: string): string {
  let v = value.trim();
  if (!/^https?:\/\//i.test(v)) v = `https://${v}`;
  try {
    const url = new URL(v);
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return v;
  }
}

// Sitede gösterilecek kısa metin: protokol ve "www." kaldırılır, sondaki "/" atılır
export function displayWebUrl(value: string): string {
  return normalizeWebUrl(value)
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "");
}

export type ContactLineLink = {
  href: string;
  text: string;
  external: boolean;
};

// Satır türüne göre tıklanabilir bağlantı üretir (faks gibi türlerde null)
export function lineLink(line: ContactLine): ContactLineLink | null {
  const label = line.label.toLowerCase();
  const value = line.value.trim();

  if (label.includes("posta") || label.includes("mail")) {
    return { href: `mailto:${value}`, text: value, external: false };
  }
  if (label.includes("gsm") || label.includes("tel")) {
    if (label.includes("fax") || label.includes("faks")) return null;
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10) return null;
    let href: string;
    if (digits.startsWith("90")) href = `tel:+${digits}`;
    else if (digits.startsWith("0")) href = `tel:+9${digits}`;
    else href = `tel:+90${digits}`;
    return { href, text: value, external: false };
  }
  // Instagram, web sitesi vb. — değer bir web adresiyse dış bağlantı olarak aç
  if (isWebValue(value)) {
    return {
      href: normalizeWebUrl(value),
      text: displayWebUrl(value),
      external: true,
    };
  }
  return null;
}

// Geriye dönük uyumluluk: yalnızca href gerekiyorsa
export function lineHref(line: ContactLine): string | null {
  return lineLink(line)?.href ?? null;
}

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

// Satır etiketi türüne göre tıklanabilir bağlantı üretir (faks gibi türlerde null)
export function lineHref(line: ContactLine): string | null {
  const label = line.label.toLowerCase();
  if (label.includes("posta") || label.includes("mail")) {
    return `mailto:${line.value.trim()}`;
  }
  if (label.includes("gsm") || label.includes("tel")) {
    if (label.includes("fax") || label.includes("faks")) return null;
    const digits = line.value.replace(/\D/g, "");
    if (digits.length < 10) return null;
    if (digits.startsWith("90")) return `tel:+${digits}`;
    if (digits.startsWith("0")) return `tel:+9${digits}`;
    return `tel:+90${digits}`;
  }
  return null;
}

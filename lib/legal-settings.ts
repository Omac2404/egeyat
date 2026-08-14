import { legalDocs, type LegalSection } from "@/lib/content/legal";

// Yasal sayfa içerikleri: panelden düzenlenir, site_settings("yasal") altında saklanır.
// İçerik basit bir metin formatıyla tutulur:
//   "## Başlık"  → bölüm başlığı
//   "- madde"    → liste maddesi
//   boş satırla ayrılan bloklar → paragraf

export type LegalPageDoc = {
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  // public/yasal altındaki ek belge (PDF vb.), null → belge yok
  file: string | null;
};

export type LegalSettings = { docs: LegalPageDoc[] };

function sectionsToContent(sections: LegalSection[]) {
  return sections
    .map((s) => {
      const parts = [`## ${s.heading}`];
      for (const p of s.paragraphs ?? []) parts.push(p);
      if (s.list?.length) parts.push(s.list.map((i) => `- ${i}`).join("\n"));
      return parts.join("\n\n");
    })
    .join("\n\n");
}

export const defaultLegalSettings: LegalSettings = {
  docs: legalDocs.map((d) => ({
    slug: d.slug,
    title: d.title,
    subtitle: d.subtitle,
    content: sectionsToContent(d.sections),
    file: null,
  })),
};

export type LegalBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export function parseLegalContent(content: string): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  // Boş satırlarla ayrılan bloklar tek tek yorumlanır
  for (const raw of content.split(/\n\s*\n/)) {
    const block = raw.trim();
    if (!block) continue;
    if (block.startsWith("## ")) {
      blocks.push({ type: "h2", text: block.slice(3).trim() });
      continue;
    }
    const lines = block.split(/\r?\n/).map((l) => l.trim());
    if (lines.every((l) => l.startsWith("- "))) {
      blocks.push({ type: "ul", items: lines.map((l) => l.slice(2).trim()) });
      continue;
    }
    blocks.push({ type: "p", text: lines.join(" ") });
  }
  return blocks;
}

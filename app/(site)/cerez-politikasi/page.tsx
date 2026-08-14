import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/site/LegalPage";
import { getLegalPage } from "@/lib/data/legal";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalPage("cerez-politikasi");
  if (!doc) return {};
  return { title: doc.title, description: doc.subtitle };
}

export default async function CerezPage() {
  const doc = await getLegalPage("cerez-politikasi");
  if (!doc) notFound();
  return <LegalPage doc={doc} />;
}

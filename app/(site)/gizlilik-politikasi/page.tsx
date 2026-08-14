import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/site/LegalPage";
import { getLegalPage } from "@/lib/data/legal";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalPage("gizlilik-politikasi");
  if (!doc) return {};
  return { title: doc.title, description: doc.subtitle };
}

export default async function GizlilikPage() {
  const doc = await getLegalPage("gizlilik-politikasi");
  if (!doc) notFound();
  return <LegalPage doc={doc} />;
}

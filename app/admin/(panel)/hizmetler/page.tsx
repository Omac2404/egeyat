import Link from "next/link";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { services } from "@/db/schema";
import { requireSection } from "@/lib/auth/session";
import { ServicesList } from "@/components/admin/ServicesList";
import { SavedToast } from "@/components/admin/SavedToast";

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ kaydedildi?: string }>;
}) {
  await requireSection("hizmetler");
  const saved = (await searchParams).kaydedildi === "1";
  const rows = await db
    .select()
    .from(services)
    .orderBy(asc(services.sortOrder), asc(services.id));

  const items = rows.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    published: s.published,
  }));

  return (
    <div className="max-w-5xl">
      <SavedToast show={saved} clearQuery />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy-900">Hizmetler</h1>
        <Link
          href="/admin/hizmetler/yeni"
          className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-700"
        >
          + Yeni Hizmet
        </Link>
      </div>

      <div className="mt-6">
        <ServicesList key={JSON.stringify(items)} items={items} />
      </div>
    </div>
  );
}

import { asc } from "drizzle-orm";
import { db } from "@/db";
import { mevzuat, usefulLinks } from "@/db/schema";
import { MevzuatAddForm } from "@/components/admin/MevzuatAddForm";
import { UsefulLinkAddForm } from "@/components/admin/UsefulLinkAddForm";
import { MevzuatList } from "@/components/admin/MevzuatList";
import { UsefulLinksList } from "@/components/admin/UsefulLinksList";
import { SavedToast } from "@/components/admin/SavedToast";
import { requireSection } from "@/lib/auth/session";

export default async function AdminMevzuatPage({
  searchParams,
}: {
  searchParams: Promise<{ kaydedildi?: string }>;
}) {
  await requireSection("mevzuat");
  const saved = (await searchParams).kaydedildi === "1";
  const [rows, links] = await Promise.all([
    db.select().from(mevzuat).orderBy(asc(mevzuat.sortOrder), asc(mevzuat.id)),
    db
      .select()
      .from(usefulLinks)
      .orderBy(asc(usefulLinks.sortOrder), asc(usefulLinks.id)),
  ]);

  const mevzuatItems = rows.map((m) => ({
    id: m.id,
    title: m.title,
    href: m.href,
    filePath: m.filePath,
    published: m.published,
  }));
  const linkItems = links.map((l) => ({
    id: l.id,
    title: l.title,
    href: l.href,
  }));

  return (
    <div>
      <SavedToast show={saved} clearQuery />
      <h1 className="text-2xl font-bold text-navy-900">Mevzuat</h1>

      <div className="mt-6 grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <MevzuatAddForm />
          {/* key: veriler sunucuda değişince liste tazelenir */}
          <MevzuatList
            key={JSON.stringify(mevzuatItems)}
            items={mevzuatItems}
          />
        </div>

        <aside className="space-y-5">
          <h2 className="text-lg font-bold text-navy-900">
            Faydalı Bağlantılar
          </h2>
          <UsefulLinkAddForm />
          <UsefulLinksList key={JSON.stringify(linkItems)} items={linkItems} />
        </aside>
      </div>
    </div>
  );
}

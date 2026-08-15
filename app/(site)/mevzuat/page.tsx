import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { mevzuat, usefulLinks as usefulLinksTable } from "@/db/schema";
import { PageHero } from "@/components/site/PageHero";
import { Icon } from "@/components/site/Icon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mevzuat",
  description:
    "Yat turizmi, deniz turizmi ve tekne işlemlerine ilişkin güncel mevzuat ve faydalı bağlantılar.",
};

export default async function MevzuatPage() {
  const rows = await db
    .select()
    .from(mevzuat)
    .where(eq(mevzuat.published, true))
    .orderBy(asc(mevzuat.sortOrder), asc(mevzuat.id));
  // Yüklenen dosya varsa o, yoksa dış bağlantı kullanılır
  const mevzuatList = rows.map((m) => ({
    ...m,
    href: m.filePath ?? m.href,
  }));
  const usefulLinks = await db
    .select()
    .from(usefulLinksTable)
    .orderBy(asc(usefulLinksTable.sortOrder), asc(usefulLinksTable.id));

  return (
    <>
      <PageHero
        title="Mevzuat"
        subtitle="Denizcilik ve yat işlemlerine ilişkin yönetmelik, tebliğ ve yönergeler."
        crumbs={[{ label: "Mevzuat" }]}
      />
      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {mevzuatList.map((m) => (
            <div
              key={m.title}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <Icon
                  name="doc"
                  className="mt-0.5 size-5 shrink-0 text-orange-600"
                />
                <p className="font-semibold text-navy-900">{m.title}</p>
              </div>
              {m.href ? (
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 self-start rounded-lg bg-navy-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600 sm:self-center"
                >
                  İncele
                </a>
              ) : (
                <span
                  className="shrink-0 self-start rounded-lg bg-navy-50 px-4 py-2 text-sm font-semibold text-navy-400 sm:self-center"
                  title="Belge yayın öncesi eklenecek"
                >
                  Belge eklenecek
                </span>
              )}
            </div>
          ))}
        </div>

        <aside className="rounded-2xl border border-line bg-navy-50/50 p-6">
          <h2 className="font-bold text-navy-900">Faydalı Bağlantılar</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {usefulLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 font-medium text-navy-700 hover:text-orange-600"
                >
                  <Icon
                    name="external"
                    className="mt-0.5 size-3.5 shrink-0"
                  />
                  {l.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}

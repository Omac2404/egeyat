import type { Metadata } from "next";
import Link from "next/link";
import { announcements } from "@/lib/content/announcements";
import { PageHero } from "@/components/site/PageHero";
import { Icon } from "@/components/site/Icon";

export const metadata: Metadata = {
  title: "Duyurular",
  description:
    "Bağlama kütüğü harçları, transitlog ücretleri ve denizcilik sektörüne dair güncel duyurular.",
};

export default function AnnouncementsPage() {
  return (
    <>
      <PageHero
        title="Duyurular"
        subtitle="Harç güncellemeleri, mevzuat değişiklikleri ve sektör haberleri."
        crumbs={[{ label: "Duyurular" }]}
      />
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="space-y-5">
          {announcements.map((a) => (
            <Link
              key={a.slug}
              href={`/duyurular/${a.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:border-orange-200 hover:shadow-md sm:flex-row sm:items-center"
            >
              <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-50 text-navy-800">
                <span className="text-xl font-bold">
                  {new Date(a.date + "T00:00:00").getDate()}
                </span>
                <span className="text-[10px] font-semibold uppercase">
                  {new Date(a.date + "T00:00:00").toLocaleDateString("tr-TR", {
                    month: "short",
                    year: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-navy-900 group-hover:text-orange-700">
                  {a.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
                  {a.summary}
                </p>
              </div>
              <Icon
                name="arrow"
                className="hidden size-5 shrink-0 text-orange-600 transition group-hover:translate-x-1 sm:block"
              />
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted">
          Duyurular admin panelinden yönetilecek — yıllık harç güncellemeleri
          buradan yayınlanacak.
        </p>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedServices } from "@/lib/data/services";
import { PageHero } from "@/components/site/PageHero";
import { Icon } from "@/components/site/Icon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "Yat bayrak tescili, ABD ve İngiltere şirket kuruluşu, acentelik, gümrük ve ticari gemi işlemleri.",
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <>
      <PageHero
        title="Hizmetlerimiz"
        subtitle="Türk ve yabancı bayraklı tüm tekneler için acentelik ve müşavirlik hizmetleri."
        crumbs={[{ label: "Hizmetlerimiz" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/hizmetlerimiz/${s.slug}`}
              className="group rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition group-hover:bg-orange-50 group-hover:text-orange-600">
                <Icon name={s.icon} className="size-6" />
              </div>
              <h2 className="font-bold text-navy-900 group-hover:text-orange-700">
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.summary}
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-orange-600">
                Detaylı bilgi
                <Icon
                  name="arrow"
                  className="size-4 transition group-hover:translate-x-1"
                />
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

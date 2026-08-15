import type { Metadata } from "next";
import { getPublishedServices } from "@/lib/data/services";
import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/ServiceCard";

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
            <ServiceCard
              key={s.slug}
              slug={s.slug}
              title={s.title}
              summary={s.summary}
              icon={s.icon}
            />
          ))}
        </div>
      </section>
    </>
  );
}

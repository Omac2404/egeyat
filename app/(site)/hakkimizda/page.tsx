/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { getAboutSettings } from "@/lib/data/about";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Ege Yatçılık Gemi Acenteliği Müşavirlik, 2002'den beri İzmir merkezli acentelik ve danışmanlık hizmeti.",
};

export default async function AboutPage() {
  const about = await getAboutSettings();

  return (
    <>
      <PageHero
        title="Hakkımızda"
        subtitle={about.subtitle}
        crumbs={[{ label: "Hakkımızda" }]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">{about.heading}</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-navy-50/50 p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-orange-600">
              Misyonumuz
            </p>
            <p className="mt-3 leading-relaxed text-navy-900">
              {about.mission}
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-navy-50/50 p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-orange-600">
              Vizyonumuz
            </p>
            <p className="mt-3 leading-relaxed text-navy-900">
              {about.vision}
            </p>
          </div>
        </div>

        {/* Referanslar (admin panelden yönetilir) */}
        {about.references.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-navy-900">
              Referanslarımız
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {about.references.map((r) => (
                <div
                  key={r.image}
                  title={r.name}
                  className="flex aspect-[3/2] items-center justify-center rounded-xl border border-line bg-white p-3 shadow-sm"
                >
                  <img
                    src={r.image}
                    alt={r.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

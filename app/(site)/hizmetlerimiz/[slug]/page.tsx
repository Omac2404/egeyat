import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/content/services";
import { PageHero } from "@/components/site/PageHero";
import { MediaPlaceholder } from "@/components/site/MediaPlaceholder";
import { Icon } from "@/components/site/Icon";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        title={service.title}
        subtitle={service.summary}
        crumbs={[
          { href: "/hizmetlerimiz", label: "Hizmetlerimiz" },
          { label: service.title },
        ]}
      />

      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="leading-relaxed text-muted">{service.intro}</p>

          <div className="mt-8 space-y-8">
            {service.sections.map((sec) => (
              <div key={sec.title}>
                <h2 className="mb-4 text-xl font-bold text-navy-900">
                  {sec.title}
                </h2>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {sec.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy-900"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 size-4 shrink-0 text-orange-600"
                      >
                        <path d="m5 13 4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <MediaPlaceholder
            kind="image"
            label="Hizmet görseli gelecek"
            className="aspect-4/3"
          />
          <div className="rounded-2xl bg-navy-900 p-6 text-white">
            <h3 className="font-bold">Bu hizmet için teklif alın</h3>
            <p className="mt-2 text-sm text-navy-100">
              İşleminizin detaylarını iletin, aynı gün dönüş yapalım.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-bold transition hover:bg-orange-700"
              >
                <Icon name="whatsapp" className="size-4" />
                WhatsApp&apos;tan Yazın
              </a>
              <Link
                href="/iletisim"
                className="flex items-center justify-center gap-2 rounded-lg border border-navy-600 px-4 py-2.5 text-sm font-bold transition hover:border-orange-500"
              >
                İletişim Formu
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-line p-6">
            <h3 className="font-bold text-navy-900">Diğer Hizmetler</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services
                .filter((s) => s.slug !== service.slug)
                .map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/hizmetlerimiz/${s.slug}`}
                      className="flex items-center gap-2 font-medium text-navy-700 hover:text-orange-600"
                    >
                      <Icon name="arrow" className="size-3.5 shrink-0" />
                      {s.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}

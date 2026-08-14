import type { Metadata } from "next";
import { getContactSettings } from "@/lib/data/contact";
import { lineHref } from "@/lib/contact-settings";
import { PageHero } from "@/components/site/PageHero";
import { Icon } from "@/components/site/Icon";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Ege Yatçılık İzmir merkez ve Çeşme irtibat ofisi iletişim bilgileri.",
};

export default async function ContactPage() {
  const settings = await getContactSettings();

  return (
    <>
      <PageHero
        title="İletişim"
        subtitle={settings.subtitle}
        crumbs={[{ label: "İletişim" }]}
      />

      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-2">
          {settings.offices.map((office) => (
            <div
              key={office.name}
              className="rounded-2xl border border-line bg-white p-6 shadow-sm"
            >
              <h2 className="font-bold text-navy-900">{office.name}</h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted">
                <Icon
                  name="pin"
                  className="mt-0.5 size-4 shrink-0 text-orange-600"
                />
                {office.address}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {office.lines.map((line, i) => {
                  const href = lineHref(line);
                  return (
                    <li key={i} className="flex gap-2">
                      <span className="w-14 shrink-0 font-semibold text-navy-500">
                        {line.label}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          className="font-medium text-navy-900 hover:text-orange-600"
                        >
                          {line.value}
                        </a>
                      ) : (
                        <span className="font-medium text-navy-900">
                          {line.value}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#25d366] px-6 py-4 font-bold text-white transition hover:bg-[#1faf53]"
          >
            <Icon name="whatsapp" className="size-5" />
            WhatsApp&apos;tan Yazın
          </a>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-navy-900">
              Bize Mesaj Gönderin
            </h2>
            <p className="mb-6 mt-1 text-sm text-muted">
              Formu doldurun, işleminizle ilgili size dönüş yapalım.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Harita */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="overflow-hidden rounded-2xl border border-line">
          <iframe
            title="Ege Yatçılık İzmir Merkez Ofis Haritası"
            src={settings.mapEmbedUrl}
            className="h-96 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="mt-3 text-right text-sm">
          <a
            href={settings.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-navy-700 hover:text-orange-600"
          >
            Google Haritalar&apos;da aç →
          </a>
        </p>
      </section>
    </>
  );
}

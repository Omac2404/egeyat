import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/content/services";
import { site } from "@/lib/site";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="rounded-t-[2rem] bg-navy-950 text-navy-100 sm:rounded-t-[2.5rem]">
      {/* CTA şeridi */}
      <div className="border-b border-navy-800/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xl font-bold text-white">
              İşleminiz için hemen görüşelim
            </p>
            <p className="mt-1 text-sm text-navy-300">
              Bayrak tescili, transitlog, gümrük — ilk görüşme için bize
              ulaşın, aynı gün dönüş yapalım.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#25d366] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1faf53]"
            >
              <Icon name="whatsapp" className="size-4" />
              WhatsApp
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-700"
            >
              <Icon name="phone" className="size-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Ana alan */}
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="w-fit rounded-2xl bg-white p-3.5 shadow-lg shadow-navy-900/40">
            <Image
              src="/logo.png"
              alt="Ege Yatçılık — Gemi Acenteliği Müşavirlik"
              width={200}
              height={53}
              className="h-11 w-auto"
            />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200">
            2002&apos;den beri İzmir merkezli şirketimizle Türk ve yabancı
            bayraklı yat sahiplerine tek işimiz olan acentelik ve danışmanlık
            hizmetini sunuyoruz.
          </p>
          <div className="mt-6 flex gap-2.5">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-10 items-center justify-center rounded-xl bg-navy-900 text-navy-200 transition hover:bg-orange-600 hover:text-white"
            >
              <Icon name="instagram" className="size-4.5" />
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex size-10 items-center justify-center rounded-xl bg-navy-900 text-navy-200 transition hover:bg-orange-600 hover:text-white"
            >
              <Icon name="whatsapp" className="size-4.5" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="E-posta"
              className="flex size-10 items-center justify-center rounded-xl bg-navy-900 text-navy-200 transition hover:bg-orange-600 hover:text-white"
            >
              <Icon name="mail" className="size-4.5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Menü
          </p>
          <ul className="space-y-2.5 text-sm">
            {[
              ["/hakkimizda", "Hakkımızda"],
              ["/hizmetlerimiz", "Hizmetlerimiz"],
              ["/duyurular", "Duyurular"],
              ["/mevzuat", "Mevzuat"],
              ["/iletisim", "İletişim"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-navy-200 transition hover:text-orange-400"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Hizmetlerimiz
          </p>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/hizmetlerimiz/${s.slug}`}
                  className="text-navy-200 transition hover:text-orange-400"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            İletişim
          </p>
          <ul className="space-y-3.5 text-sm">
            <li className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-orange-400">
                <Icon name="pin" className="size-4" />
              </span>
              <span className="text-navy-200">{site.offices[0].address}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-orange-400">
                <Icon name="phone" className="size-4" />
              </span>
              <a
                href={site.phoneHref}
                className="text-navy-200 hover:text-orange-400"
              >
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-orange-400">
                <Icon name="mail" className="size-4" />
              </span>
              <a
                href={`mailto:${site.email}`}
                className="text-navy-200 hover:text-orange-400"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Alt bar */}
      <div className="border-t border-navy-800/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-navy-300 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName} Her hakkı saklıdır.
          </p>
          <Link href="/admin" className="transition hover:text-orange-400">
            Yönetim
          </Link>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { Icon } from "./Icon";
import type { NavService } from "./Header";

export function Footer({ services }: { services: NavService[] }) {
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
              Bayrak tescili, transitlog, gümrük; ilk görüşme için bize
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
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="text-xl font-bold text-white">{site.name}</p>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-navy-200 sm:mx-0">
            2002&apos;den beri İzmir&apos;de yat sahiplerine acentelik ve
            danışmanlık hizmeti sunuyoruz.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-sm font-semibold text-navy-200 transition hover:text-orange-400"
          >
            {site.email}
          </a>
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

        <div className="lg:col-span-4">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Hizmetlerimiz
          </p>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/hizmetlerimiz/${s.slug}`}
                  className="whitespace-nowrap text-navy-200 transition hover:text-orange-400"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Yasal
          </p>
          <ul className="space-y-2.5 text-sm">
            {[
              ["/kvkk", "KVKK Aydınlatma Metni"],
              ["/gizlilik-politikasi", "Gizlilik Politikası"],
              ["/cerez-politikasi", "Çerez Politikası"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="whitespace-nowrap text-navy-200 transition hover:text-orange-400"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Alt bar */}
      <div className="border-t border-navy-800/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-navy-300 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {site.legalName} Her hakkı saklıdır.
          </p>
          <a
            href="https://webreta.com.tr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Webreta"
            className="opacity-70 transition hover:opacity-100"
          >
            {/* Mavi logo brightness-0 invert ile beyaza çevriliyor */}
            <Image
              src="/webreta-logo.webp"
              alt="Webreta"
              width={343}
              height={54}
              className="h-3 w-auto brightness-0 invert"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

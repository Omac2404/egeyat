import Link from "next/link";
import { services } from "@/lib/content/services";
import { site } from "@/lib/site";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">Ege Yatçılık</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-orange-400">
            Gemi Acenteliği & Müşavirlik
          </p>
          <p className="mt-4 text-sm leading-relaxed text-navy-200">
            2002&apos;den beri İzmir merkezli şirketimizle Türk ve yabancı
            bayraklı yat sahiplerine acentelik ve danışmanlık hizmeti
            veriyoruz.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Menü
          </p>
          <ul className="space-y-2 text-sm">
            {[
              ["/hakkimizda", "Hakkımızda"],
              ["/hizmetlerimiz", "Hizmetlerimiz"],
              ["/duyurular", "Duyurular"],
              ["/mevzuat", "Mevzuat"],
              ["/iletisim", "İletişim"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-orange-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Hizmetlerimiz
          </p>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/hizmetlerimiz/${s.slug}`}
                  className="hover:text-orange-400"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            İletişim
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-orange-400" />
              <span>{site.offices[0].address}</span>
            </li>
            <li className="flex gap-2">
              <Icon name="phone" className="size-4 shrink-0 text-orange-400" />
              <a href={site.phoneHref} className="hover:text-orange-400">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Icon name="mail" className="size-4 shrink-0 text-orange-400" />
              <a
                href={`mailto:${site.email}`}
                className="hover:text-orange-400"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-navy-300 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName} Her hakkı saklıdır.
          </p>
          <Link href="/admin" className="hover:text-orange-400">
            Yönetim
          </Link>
        </div>
      </div>
    </footer>
  );
}

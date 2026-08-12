"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { services } from "@/lib/content/services";
import { site } from "@/lib/site";
import { Icon } from "./Icon";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetlerimiz", label: "Hizmetlerimiz", hasDropdown: true },
  { href: "/duyurular", label: "Duyurular" },
  { href: "/mevzuat", label: "Mevzuat" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Üst bar — kenarlardan kesik, alt köşeleri yumuşak oval */}
      <div className="mx-auto max-w-7xl rounded-b-2xl bg-navy-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 hover:text-orange-400"
            >
              <Icon name="phone" className="size-3.5" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="hidden items-center gap-1.5 hover:text-orange-400 sm:flex"
            >
              <Icon name="mail" className="size-3.5" />
              {site.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400"
              aria-label="Instagram"
            >
              <Icon name="instagram" className="size-3.5" />
            </a>
            <span className="flex gap-1.5 border-l border-navy-700 pl-3 font-semibold">
              <span>TR</span>
              <span
                className="cursor-default text-navy-300"
                title="İngilizce sürüm hazırlanıyor"
              >
                EN
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Ana bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Ege Yatçılık — Gemi Acenteliği Müşavirlik"
            width={220}
            height={58}
            priority
            className="h-11 w-auto sm:h-13"
          />
        </Link>

        {/* Masaüstü menü */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    isActive(item.href)
                      ? "text-orange-600"
                      : "text-navy-900 hover:text-orange-600"
                  }`}
                >
                  {item.label}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="size-3.5"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Link>
                <div className="invisible absolute left-0 top-full w-72 pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-line bg-white p-2 shadow-lg">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/hizmetlerimiz/${s.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50 hover:text-orange-600"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive(item.href)
                    ? "text-orange-600"
                    : "text-navy-900 hover:text-orange-600"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/iletisim"
            className="ml-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-700"
          >
            Teklif Alın
          </Link>
        </nav>

        {/* Mobil menü butonu */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-navy-900 lg:hidden"
          aria-label="Menü"
          aria-expanded={open}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-6"
          >
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobil menü */}
      {open && (
        <nav className="border-t border-line bg-white px-4 pb-4 lg:hidden">
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 font-semibold ${
                  isActive(item.href) ? "text-orange-600" : "text-navy-900"
                }`}
              >
                {item.label}
              </Link>
              {item.hasDropdown &&
                services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/hizmetlerimiz/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg py-2 pl-7 pr-3 text-sm text-muted"
                  >
                    {s.title}
                  </Link>
                ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}

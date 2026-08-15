"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Icon } from "./Icon";

export type NavService = { slug: string; title: string };
export type SocialLinks = {
  instagram: string;
  facebook: string;
  linkedin: string;
  x: string;
};

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetlerimiz", label: "Hizmetlerimiz", hasDropdown: true },
  { href: "/duyurular", label: "Duyurular" },
  { href: "/mevzuat", label: "Mevzuat" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header({
  services,
  social,
}: {
  services: NavService[];
  social: SocialLinks;
}) {
  const socialItems = (
    [
      ["instagram", social.instagram],
      ["facebook", social.facebook],
      ["linkedin", social.linkedin],
      ["x", social.x],
    ] as const
  ).filter(([, href]) => href);

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    // Sayfanın üstünde yüzer; hero header'ın altına uzanır
    <header className="fixed inset-x-0 top-0 z-40">
      {/* Tek parça header kartı — kenarlardan kesik, alt köşeleri oval */}
      <div className="mx-auto max-w-7xl rounded-b-[2.5rem] border border-t-0 border-line bg-white shadow-xl shadow-navy-950/15">
        {/* Üst bar — kartın içinde, dar ve alt köşeleri oval */}
        <div className="mx-auto max-w-6xl rounded-b-2xl bg-navy-900 text-white">
          <div className="flex items-center justify-between gap-4 px-5 py-1.5 text-xs">
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
            {socialItems.map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400"
                aria-label={name}
              >
                <Icon name={name} className="size-3.5" />
              </a>
            ))}
            <span
              className={`text-navy-200 ${
                socialItems.length > 0 ? "border-l border-navy-700 pl-3" : ""
              }`}
            >
              Tüm hakları saklıdır
            </span>
          </div>
        </div>
      </div>

        {/* Ana bar */}
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3">
          <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
            <Image
              src="/logo.png"
              alt="Ege Yatçılık Gemi Acenteliği Müşavirlik"
              width={220}
              height={58}
              priority
              className="h-11 w-auto sm:h-13"
            />
          </Link>

          {/* Masaüstü menü */}
          <nav className="hidden items-center gap-1 lg:flex">
            {/* İletişim masaüstünde turuncu buton olarak ayrıca basılıyor */}
            {navItems
              .filter((item) => item.href !== "/iletisim")
              .map((item) =>
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
                  <div className="invisible absolute left-0 top-full w-max min-w-72 pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
                    <div className="rounded-xl border border-line bg-white p-2 shadow-lg">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/hizmetlerimiz/${s.slug}`}
                          className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50 hover:text-orange-600"
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
              İletişim
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

        {/* Mobil menü — yükseklik ve opaklık animasyonuyla yumuşakça açılıp kapanır */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <nav className="rounded-b-[2.5rem] border-t border-line bg-white px-6 pb-5">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? undefined : -1}
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
                        tabIndex={open ? undefined : -1}
                        className="block rounded-lg py-2 pl-7 pr-3 text-sm text-muted"
                      >
                        {s.title}
                      </Link>
                    ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";

export function PageHero({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  crumbs: { href?: string; label: string }[];
}) {
  return (
    <section className="bg-navy-900 text-white">
      {/* Üstteki boşluk: yüzen header'ın altında kalan alan */}
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-40">
        <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-navy-200">
          <Link href="/" className="hover:text-orange-400">
            Ana Sayfa
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <span className="text-navy-400">/</span>
              {c.href ? (
                <Link href={c.href} className="hover:text-orange-400">
                  {c.label}
                </Link>
              ) : (
                <span className="text-orange-400">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-navy-100">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

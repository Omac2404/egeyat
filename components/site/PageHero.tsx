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
    <section
      className="bg-navy-900 text-white"
      style={{
        // Dalgamsı gradient: koyu lacivertten aydınlığa, turuncu ve mor dalga vurguları
        background:
          "radial-gradient(70% 130% at 82% 15%, rgba(242, 126, 0, 0.10) 0%, transparent 55%)," +
          "radial-gradient(90% 150% at 8% 95%, rgba(90, 72, 181, 0.18) 0%, transparent 60%)," +
          "radial-gradient(60% 110% at 45% 110%, rgba(30, 45, 79, 0.9) 0%, transparent 65%)," +
          "linear-gradient(120deg, #0b1730 0%, #112144 45%, #1e2d4f 100%)",
      }}
    >
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

import Link from "next/link";
import Image from "next/image";

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
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {/* Arka plan: 6628 kesimi — yat sağdan geliyor */}
      <Image
        src="/medya/sayfa-basligi.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center]"
      />
      {/* Sol taraf metin için karartma, sağa doğru açılır */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/55 to-navy-950/15" />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-40">
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

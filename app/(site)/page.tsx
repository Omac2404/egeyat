import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { getPublishedServices } from "@/lib/data/services";
import { getGeneralSettings } from "@/lib/data/general";
import { formatDate } from "@/lib/content/announcements";
import { Icon } from "@/components/site/Icon";
import { MediaPlaceholder } from "@/components/site/MediaPlaceholder";
import { HeroVideo } from "@/components/site/HeroVideo";
import { FlagSlider } from "@/components/site/FlagSlider";

export const dynamic = "force-dynamic";

// Ayarlardaki vurgu kelimesini turuncu renkle işaretleyerek başlığı böler
function renderHighlighted(title: string, highlight: string) {
  const idx = highlight ? title.indexOf(highlight) : -1;
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-orange-500">{highlight}</span>
      {title.slice(idx + highlight.length)}
    </>
  );
}

// Site içi yollar Link, dış adresler (https/tel/mailto) düz bağlantı olur
function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default async function HomePage() {
  const general = await getGeneralSettings();
  const services = await getPublishedServices();
  const latest = await db
    .select()
    .from(announcements)
    .where(eq(announcements.published, true))
    .orderBy(desc(announcements.date), desc(announcements.id))
    .limit(3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        {/* Arka plan videosu — sona yaklaşınca kararıp başa sarar */}
        <HeroVideo />
        {/* Karartma: sol taraf (metin) koyu, sağa doğru açılıyor */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/40 to-transparent" />
        {/* Alt kenar: videodan hizmetler bölümüne homojen beyaz geçiş */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent via-white/30 via-40% to-white" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl items-center px-4 py-32 sm:py-44">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {renderHighlighted(general.hero.title, general.hero.highlight)}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100">
              {general.hero.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SmartLink
                href={general.hero.primary.href}
                className="rounded-lg bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700"
              >
                {general.hero.primary.label}
              </SmartLink>
              <SmartLink
                href={general.hero.secondary.href}
                className="rounded-lg border border-white/30 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:border-orange-500 hover:text-orange-400"
              >
                {general.hero.secondary.label}
              </SmartLink>
            </div>
          </div>
        </div>

      </section>

      {/* HİZMET VERİLEN BAYRAKLAR */}
      <FlagSlider flags={general.flags} />

      {/* HİZMETLER */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-navy-900">
            Denizde ve masada, tüm işlemleriniz tek elden
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/hizmetlerimiz/${s.slug}`}
              className="group rounded-2xl bg-navy-900 p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-md"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white/10 text-white transition group-hover:bg-orange-600">
                <Icon name={s.icon} className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-400">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-100">
                {s.summary}
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-orange-400">
                Detaylı bilgi
                <Icon
                  name="arrow"
                  className="size-4 transition group-hover:translate-x-1"
                />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* DUYURULAR */}
      <section className="bg-navy-50/50">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-orange-600">
                Duyurular
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-900">
                Güncel haberler ve harç duyuruları
              </h2>
            </div>
            <Link
              href="/duyurular"
              className="flex items-center gap-1.5 font-semibold text-navy-700 hover:text-orange-600"
            >
              Tüm duyurular
              <Icon name="arrow" className="size-4" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {latest.map((a) => (
              <Link
                key={a.slug}
                href={`/duyurular/${a.slug}`}
                className="group rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:border-orange-200 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                  {formatDate(a.date)}
                </p>
                <h3 className="mt-2 font-bold leading-snug text-navy-900 group-hover:text-orange-700">
                  {a.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {a.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HAKKIMIZDA ÖZETİ */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 lg:grid-cols-2">
        {general.about.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={general.about.image}
            alt={general.about.title}
            className="aspect-[4/3] w-full rounded-2xl border border-line object-cover shadow-sm"
          />
        ) : (
          <MediaPlaceholder
            kind="image"
            label="Ofis / marina / ekip görseli gelecek"
            className="aspect-4/3"
          />
        )}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-orange-600">
            Hakkımızda
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-900">
            {general.about.title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            {general.about.text1}
          </p>
          {general.about.text2 && (
            <p className="mt-3 leading-relaxed text-muted">
              {general.about.text2}
            </p>
          )}
          <Link
            href="/hakkimizda"
            className="mt-6 inline-flex items-center gap-1.5 font-bold text-orange-600 hover:text-orange-700"
          >
            Devamını okuyun
            <Icon name="arrow" className="size-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {general.cta.title}
          </h2>
          <p className="max-w-xl text-navy-100">{general.cta.text}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <SmartLink
              href={general.cta.primary.href}
              className="rounded-lg bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700"
            >
              {general.cta.primary.label}
            </SmartLink>
            <SmartLink
              href={general.cta.secondary.href}
              className="flex items-center gap-2 rounded-lg border border-navy-500 px-6 py-3 font-bold text-white transition hover:border-orange-500 hover:text-orange-400"
            >
              {general.cta.secondary.href.startsWith("tel:") && (
                <Icon name="phone" className="size-4" />
              )}
              {general.cta.secondary.label}
            </SmartLink>
          </div>
        </div>
      </section>
    </>
  );
}

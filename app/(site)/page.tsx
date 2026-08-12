import Link from "next/link";
import { services } from "@/lib/content/services";
import { announcements, formatDate } from "@/lib/content/announcements";
import { site } from "@/lib/site";
import { Icon } from "@/components/site/Icon";
import { MediaPlaceholder } from "@/components/site/MediaPlaceholder";
import { HeroVideo } from "@/components/site/HeroVideo";

export default function HomePage() {
  const latest = announcements.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        {/* Arka plan videosu — sona yaklaşınca kararıp başa sarar */}
        <HeroVideo />
        {/* Karartma: sol taraf (metin) koyu, sağa doğru açılıyor */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/40 to-transparent" />
        {/* Alt kenar: videodan hizmetler bölümüne homojen beyaz geçiş */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-white/40 to-white" />

        <div className="relative mx-auto flex min-h-[75vh] max-w-6xl items-center px-4 py-28 sm:py-40">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Yat ve Gemi İşlemlerinde{" "}
              <span className="text-orange-500">Güvenilir</span> Çözüm
              Ortağınız
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100">
              Türk ve yabancı bayraklı yat sahiplerine tek işimiz olan
              acentelik ve müşavirlik hizmetini 20 yılı aşkın tecrübemizle
              sunuyoruz. Bayrak tescili, şirket kuruluşu, gümrük ve liman
              işlemleriniz bizde.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/hizmetlerimiz"
                className="rounded-lg bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700"
              >
                Hizmetlerimiz
              </Link>
              <Link
                href="/iletisim"
                className="rounded-lg border border-white/30 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:border-orange-500 hover:text-orange-400"
              >
                Bize Ulaşın
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* HİZMETLER */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-orange-600">
            Hizmetlerimiz
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-900">
            Denizde ve masada, tüm işlemleriniz tek elden
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/hizmetlerimiz/${s.slug}`}
              className="group rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition group-hover:bg-orange-50 group-hover:text-orange-600">
                <Icon name={s.icon} className="size-6" />
              </div>
              <h3 className="font-bold text-navy-900 group-hover:text-orange-700">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.summary}
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-orange-600">
                Detaylı bilgi
                <Icon
                  name="arrow"
                  className="size-4 transition group-hover:translate-x-1"
                />
              </p>
            </Link>
          ))}
          <div className="flex flex-col justify-center rounded-2xl bg-navy-900 p-6 text-white">
            <h3 className="text-xl font-bold">
              Hangi işleme ihtiyacınız olduğundan emin değil misiniz?
            </h3>
            <p className="mt-2 text-sm text-navy-100">
              Durumunuzu anlatın, doğru süreci birlikte belirleyelim.
            </p>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 font-bold transition hover:bg-orange-700"
            >
              <Icon name="whatsapp" className="size-5" />
              WhatsApp&apos;tan Yazın
            </a>
          </div>
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
        <MediaPlaceholder
          kind="image"
          label="Ofis / marina / ekip görseli gelecek"
          className="aspect-4/3"
        />
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-orange-600">
            Hakkımızda
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-900">
            Tek işimiz acentelik ve müşavirlik
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Şirketimiz 2002 yılında kurulmuş olup merkezi Konak, İzmir&apos;de;
            irtibat ofisi Çeşme&apos;dedir. 20 yılı aşkın süredir Türk ve
            yabancı bayraklı yat sahiplerine tek işimiz olan acentelik ve
            danışmanlık hizmeti veriyoruz.
          </p>
          <p className="mt-3 leading-relaxed text-muted">
            En iyi ve sürekli hizmet anlayışıyla müşterilerimize ve denizcilik
            sektörüne katkı sağlıyoruz; mevzuatı sürekli takip ederek
            işlemlerinizi gecikmesiz sonuçlandırıyoruz.
          </p>
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
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white">
            İşlemlerinizi bize bırakın, siz denizin keyfini çıkarın
          </h2>
          <p className="max-w-xl text-navy-100">
            Bayrak tescili, transitlog, gümrük veya şirket kuruluşu — hangi
            konuda olursa olsun, ilk görüşme için bize ulaşın.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/iletisim"
              className="rounded-lg bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700"
            >
              İletişim Formu
            </Link>
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 rounded-lg border border-navy-500 px-6 py-3 font-bold text-white transition hover:border-orange-500 hover:text-orange-400"
            >
              <Icon name="phone" className="size-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

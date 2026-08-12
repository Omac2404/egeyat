import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Ege Yatçılık Gemi Acenteliği Müşavirlik — 2002'den beri İzmir merkezli acentelik ve danışmanlık hizmeti.",
};

// Referans logoları statik gelecek — dosyalar iletilince bu liste
// { name, src } şeklinde güncellenecek.
const referenceCount = 18;

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Hakkımızda"
        subtitle="2002'den beri denizcilik sektörüne hizmet veriyoruz."
        crumbs={[{ label: "Hakkımızda" }]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-navy-900">
            Ege Yatçılık Gemi Acenteliği Müşavirlik Tur. Tic. Ltd. Şti.
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted">
            <p>
              Şirketimiz 2002 yılında kurulmuş olup merkezi Konak,
              İzmir&apos;dedir; Çeşme&apos;de irtibat ofisimiz bulunmaktadır.
              20 yılı aşkın süredir sektörde, Türk ve yabancı bayraklı yat
              sahiplerine tek işimiz olan acentelik ve danışmanlık hizmeti
              vermekteyiz.
            </p>
            <p>
              Şirketimiz en iyi ve sürekli hizmet anlayışı ile müşterilerimize
              ve denizcilik sektörüne katkı sağlamaktadır. Hizmetlerimiz
              hakkında detaylı bilgi almak için iletişim bilgilerimizden bize
              ulaşabilirsiniz.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-navy-50/50 p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-orange-600">
              Misyonumuz
            </p>
            <p className="mt-3 leading-relaxed text-navy-900">
              Türkiye&apos;nin en değerli ve en büyük gemi acenteliği
              müşavirlik şirketi olmak.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-navy-50/50 p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-orange-600">
              Vizyonumuz
            </p>
            <p className="mt-3 leading-relaxed text-navy-900">
              Sektördeki müşterilerine fayda sağlayan, yenilikçi ve mevzuatı
              sürekli takip eden gemi acenteliği müşavirlik hizmeti sunmak.
            </p>
          </div>
        </div>

        {/* Referanslar */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-navy-900">Referanslarımız</h2>
          <p className="mt-2 text-sm text-muted">
            Logolar statik olarak eklenecek.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: referenceCount }, (_, i) => (
              <div
                key={i}
                className="flex aspect-[3/2] items-center justify-center rounded-xl border border-line bg-white shadow-sm"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-navy-200">
                  Logo {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

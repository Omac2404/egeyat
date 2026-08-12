import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { MediaPlaceholder } from "@/components/site/MediaPlaceholder";
import { institutions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Ege Yatçılık Gemi Acenteliği Müşavirlik — 2002'den beri İzmir merkezli acentelik ve danışmanlık hizmeti.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Hakkımızda"
        subtitle="2002'den beri denizcilik sektörüne hizmet veriyoruz."
        crumbs={[{ label: "Hakkımızda" }]}
      />

      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
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
        </div>

        <div className="space-y-5 lg:col-span-2">
          <MediaPlaceholder
            kind="image"
            label="Ofis / ekip görseli gelecek"
            className="aspect-4/3"
          />
          <MediaPlaceholder
            kind="image"
            label="Marina / saha görseli gelecek"
            className="aspect-4/3"
          />
        </div>
      </section>

      <section className="border-t border-line bg-navy-50/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="mb-8 text-center text-sm font-bold uppercase tracking-wider text-navy-500">
            İşlem Yaptığımız Kurumlar
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {institutions.map((k) => (
              <span
                key={k}
                className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy-800"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-navy-100 text-[8px] font-bold text-navy-500">
                  LOGO
                </span>
                {k}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

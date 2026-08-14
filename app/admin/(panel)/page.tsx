import { getGeneralSettings } from "@/lib/data/general";
import { getLegalSettings } from "@/lib/data/legal";
import {
  HeroForm,
  HomeAboutForm,
  CtaForm,
  SocialForm,
} from "@/components/admin/GeneralForms";
import { FlagsManager } from "@/components/admin/FlagsManager";
import { LegalDocsEditor } from "@/components/admin/LegalDocsEditor";

import { requireSection } from "@/lib/auth/session";

export default async function AdminGeneralContentPage() {
  await requireSection("genel");
  const [settings, legal] = await Promise.all([
    getGeneralSettings(),
    getLegalSettings(),
  ]);

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold text-navy-900">Genel İçerikler</h1>

      <div className="mt-6 space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-900">
            Ana Sayfa Hero
          </h2>
          <HeroForm initial={settings.hero} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-900">
            Ülke Bayrakları
          </h2>
          <FlagsManager
            key={JSON.stringify(settings.flags)}
            flags={settings.flags}
          />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-900">
            Ana Sayfa Hakkımızda Bölümü
          </h2>
          <HomeAboutForm
            key={settings.about.image ?? "no-image"}
            initial={settings.about}
          />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-900">
            CTA (Footer Öncesi Alan)
          </h2>
          <CtaForm initial={settings.cta} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-900">
            Sosyal Medya Hesapları
          </h2>
          <SocialForm initial={settings.social} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-900">
            Yasal Sayfalar
          </h2>
          <LegalDocsEditor
            key={JSON.stringify(legal.docs.map((d) => [d.slug, d.file]))}
            docs={legal.docs}
          />
        </section>
      </div>
    </div>
  );
}

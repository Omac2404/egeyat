import { getAboutSettings } from "@/lib/data/about";
import { AboutSettingsForm } from "@/components/admin/AboutSettingsForm";
import { ReferenceAddForm } from "@/components/admin/ReferenceAddForm";
import { ReferenceGrid } from "@/components/admin/ReferenceGrid";

import { requireSection } from "@/lib/auth/session";

export default async function AdminAboutPage() {
  await requireSection("hakkimizda");
  const settings = await getAboutSettings();

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold text-navy-900">Hakkımızda</h1>
      <div className="mt-6">
        <AboutSettingsForm initial={settings} />
      </div>

      <h2 className="mt-10 text-xl font-bold text-navy-900">
        Referans Logoları
      </h2>
      <div className="mt-4 space-y-5">
        <ReferenceAddForm />
        {/* key: liste sunucuda değişince (yeni logo eklenince) bileşen tazelenir */}
        <ReferenceGrid
          key={settings.references.map((r) => r.image).join("|")}
          references={settings.references}
        />
      </div>
    </div>
  );
}

import { asc } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getTechnicalSettings } from "@/lib/data/technical";
import {
  HeadCodeForm,
  SmtpForm,
  FaviconForm,
  SeoForm,
  SitemapForm,
} from "@/components/admin/TechnicalForms";
import { UserCreateForm } from "@/components/admin/UserCreateForm";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { deleteUser } from "@/app/actions/kullanicilar";
import {
  requireSection,
  ADMIN_SECTIONS,
  SUPER_ADMIN_EMAIL,
} from "@/lib/auth/session";

const sectionLabels = Object.fromEntries(
  ADMIN_SECTIONS.map((s) => [s.key, s.label])
);

export default async function AdminTechnicalPage() {
  const currentUser = await requireSection("teknik");
  const [settings, userRows] = await Promise.all([
    getTechnicalSettings(),
    db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        permissions: users.permissions,
      })
      .from(users)
      .orderBy(asc(users.createdAt)),
  ]);

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold text-navy-900">Teknik</h1>

      <div className="mt-6 space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-900">
            Head Kod Alanı
          </h2>
          <HeadCodeForm initial={settings.headCode} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-900">
            SMTP ve E-posta Ayarları
          </h2>
          <SmtpForm initial={settings.smtp} mailTo={settings.mailTo} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-900">Favicon</h2>
          <FaviconForm
            key={settings.favicon ?? "default"}
            initial={settings.favicon}
          />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-900">
            Google Görünümü
          </h2>
          <SeoForm initial={settings.seo} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-900">Sitemap</h2>
          <SitemapForm initial={settings.sitemap} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-900">
            Kullanıcılar
          </h2>
          <div className="space-y-4">
            <UserCreateForm />
            <div className="space-y-2">
              {userRows.map((u) => (
                <div
                  key={u.id}
                  className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white px-4 py-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-navy-900">
                      {u.name}
                      <span className="ml-2 text-xs font-normal text-muted">
                        {u.email}
                      </span>
                    </p>
                    <p className="truncate text-xs text-muted">
                      {u.email === SUPER_ADMIN_EMAIL
                        ? "Süper Admin (tüm sekmeler)"
                        : u.role === "admin"
                          ? "Yönetici (tüm sekmeler)"
                          : `Editör: ${
                              (u.permissions ?? [])
                                .map((p) => sectionLabels[p] ?? p)
                                .join(", ") || "yetki yok"
                            }`}
                    </p>
                  </div>
                  {u.email === SUPER_ADMIN_EMAIL && (
                    <span className="shrink-0 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700">
                      Süper Admin
                    </span>
                  )}
                  {u.id === currentUser.id ? (
                    <span className="shrink-0 rounded-full bg-navy-100 px-2.5 py-1 text-xs font-bold text-navy-500">
                      Siz
                    </span>
                  ) : u.email === SUPER_ADMIN_EMAIL ? null : (
                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={u.id} />
                      <ConfirmSubmit
                        label="Sil"
                        message={`"${u.name}" (${u.email}) kullanıcısı silinecek. Emin misiniz?`}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      />
                    </form>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

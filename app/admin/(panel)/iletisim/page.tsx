import { desc } from "drizzle-orm";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { getContactSettings } from "@/lib/data/contact";
import { toggleRead, deleteSubmission } from "@/app/actions/mesajlar";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { ContactSettingsForm } from "@/components/admin/ContactSettingsForm";

function formatDateTime(d: Date) {
  return d.toLocaleString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

import { requireSection } from "@/lib/auth/session";

export default async function AdminContactPage() {
  await requireSection("iletisim");
  const [settings, messages] = await Promise.all([
    getContactSettings(),
    db.select().from(submissions).orderBy(desc(submissions.createdAt)),
  ]);

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold text-navy-900">İletişim</h1>

      <div className="mt-6">
        <ContactSettingsForm initial={settings} />
      </div>

      <h2 className="mt-10 text-xl font-bold text-navy-900">Gelen Mesajlar</h2>
      <div className="mt-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-2xl border p-5 ${
              m.read
                ? "border-line bg-white"
                : "border-orange-200 bg-orange-50/40"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-bold text-navy-900">
                  {m.name}
                  {!m.read && (
                    <span className="ml-2 rounded-full bg-orange-600 px-2 py-0.5 text-xs font-bold text-white">
                      Yeni
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  <a
                    href={`mailto:${m.email}`}
                    className="hover:text-orange-600"
                  >
                    {m.email}
                  </a>
                  {m.phone && <> · {m.phone}</>}
                  {m.meta?.subject && <> · Konu: {m.meta.subject}</>}
                </p>
              </div>
              <p className="text-xs text-muted">
                {formatDateTime(m.createdAt)}
              </p>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-navy-900">
              {m.message}
            </p>
            <div className="mt-4 flex gap-2">
              <form action={toggleRead}>
                <input type="hidden" name="id" value={m.id} />
                <button
                  type="submit"
                  className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-navy-700 transition hover:border-orange-500 hover:text-orange-600"
                >
                  {m.read ? "Okunmadı işaretle" : "Okundu işaretle"}
                </button>
              </form>
              <form action={deleteSubmission}>
                <input type="hidden" name="id" value={m.id} />
                <ConfirmSubmit
                  label="Sil"
                  message="Bu mesaj kalıcı olarak silinecek. Emin misiniz?"
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                />
              </form>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="rounded-2xl border border-line bg-white p-8 text-center text-sm text-muted">
            Henüz mesaj yok.
          </p>
        )}
      </div>
    </div>
  );
}

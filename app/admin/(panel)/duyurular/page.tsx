import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { formatDate } from "@/lib/content/announcements";
import { deleteAnnouncement, togglePublished } from "@/app/actions/duyurular";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { SavedToast } from "@/components/admin/SavedToast";
import { requireSection } from "@/lib/auth/session";

export default async function AdminAnnouncementsPage({
  searchParams,
}: {
  searchParams: Promise<{ kaydedildi?: string }>;
}) {
  await requireSection("duyurular");
  const saved = (await searchParams).kaydedildi === "1";
  const rows = await db
    .select()
    .from(announcements)
    .orderBy(desc(announcements.date), desc(announcements.id));

  return (
    <div className="max-w-5xl">
      <SavedToast show={saved} clearQuery />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy-900">Duyurular</h1>
        <Link
          href="/admin/duyurular/yeni"
          className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-700"
        >
          + Yeni Duyuru
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-navy-50/60 text-left text-navy-900">
              <th className="px-4 py-3 font-bold">Başlık</th>
              <th className="w-32 px-4 py-3 font-bold">Tarih</th>
              <th className="w-28 px-4 py-3 font-bold">Durum</th>
              <th className="w-56 px-4 py-3 font-bold">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium text-navy-900">
                  {a.title}
                </td>
                <td className="px-4 py-3 text-muted">{formatDate(a.date)}</td>
                <td className="px-4 py-3">
                  {a.published ? (
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
                      Yayında
                    </span>
                  ) : (
                    <span className="rounded-full bg-navy-100 px-2.5 py-1 text-xs font-bold text-navy-500">
                      Taslak
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/duyurular/${a.id}`}
                      className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-navy-700 transition hover:border-orange-500 hover:text-orange-600"
                    >
                      Düzenle
                    </Link>
                    <form action={togglePublished}>
                      <input type="hidden" name="id" value={a.id} />
                      <button
                        type="submit"
                        className="whitespace-nowrap rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-navy-700 transition hover:border-orange-500 hover:text-orange-600"
                      >
                        {a.published ? "Yayından kaldır" : "Yayınla"}
                      </button>
                    </form>
                    <form action={deleteAnnouncement}>
                      <input type="hidden" name="id" value={a.id} />
                      <ConfirmSubmit
                        label="Sil"
                        message={`"${a.title}" duyurusu kalıcı olarak silinecek. Emin misiniz?`}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  Henüz duyuru yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

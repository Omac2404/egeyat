import Link from "next/link";
import { requireUser } from "@/lib/auth/session";
import { logout } from "@/app/actions/auth";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen bg-sand-50">
      <aside className="flex w-60 shrink-0 flex-col border-r border-sand-300 bg-white">
        <div className="border-b border-sand-300 px-5 py-4">
          <p className="font-bold text-sea-900">Ege Yatçılık</p>
          <p className="text-xs text-sea-700">Yönetim Paneli</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3 text-sm">
          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 font-medium text-sea-900 hover:bg-sea-50"
          >
            Genel Bakış
          </Link>
          <Link
            href="/admin/tekneler"
            className="rounded-lg px-3 py-2 font-medium text-sea-900 hover:bg-sea-50"
          >
            Tekneler
          </Link>
          <Link
            href="/admin/mesajlar"
            className="rounded-lg px-3 py-2 font-medium text-sea-900 hover:bg-sea-50"
          >
            Mesajlar
          </Link>
        </nav>
        <div className="border-t border-sand-300 p-3 text-sm">
          <p className="truncate px-3 pb-2 text-xs text-sea-700">
            {user.name} ({user.role})
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left font-medium text-red-700 hover:bg-red-50"
            >
              Çıkış yap
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

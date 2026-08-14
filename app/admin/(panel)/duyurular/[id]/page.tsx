import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { requireSection } from "@/lib/auth/session";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSection("duyurular");
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  const rows = await db
    .select()
    .from(announcements)
    .where(eq(announcements.id, id))
    .limit(1);
  const item = rows[0];
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Duyuruyu Düzenle</h1>
      <div className="mt-6">
        <AnnouncementForm
          initial={{
            id: item.id,
            title: item.title,
            date: item.date,
            summary: item.summary,
            published: item.published,
            blocks: item.blocks,
          }}
        />
      </div>
    </div>
  );
}

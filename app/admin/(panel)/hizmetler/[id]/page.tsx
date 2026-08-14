import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { services } from "@/db/schema";
import { requireSection } from "@/lib/auth/session";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSection("hizmetler");
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  const rows = await db
    .select()
    .from(services)
    .where(eq(services.id, id))
    .limit(1);
  const item = rows[0];
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Hizmeti Düzenle</h1>
      <div className="mt-6">
        <ServiceForm
          initial={{
            id: item.id,
            title: item.title,
            shortTitle: item.shortTitle,
            summary: item.summary,
            intro: item.intro,
            image: item.image,
            published: item.published,
            sections: item.sections,
          }}
        />
      </div>
    </div>
  );
}

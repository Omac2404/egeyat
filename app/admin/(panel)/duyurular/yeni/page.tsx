import { requireSection } from "@/lib/auth/session";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";

export default async function NewAnnouncementPage() {
  await requireSection("duyurular");
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Yeni Duyuru</h1>
      <div className="mt-6">
        <AnnouncementForm />
      </div>
    </div>
  );
}

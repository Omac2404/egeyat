import { requireSection } from "@/lib/auth/session";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default async function NewServicePage() {
  await requireSection("hizmetler");
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Yeni Hizmet</h1>
      <div className="mt-6">
        <ServiceForm />
      </div>
    </div>
  );
}

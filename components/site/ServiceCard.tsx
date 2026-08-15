import Link from "next/link";
import { Icon } from "@/components/site/Icon";
import type { Service } from "@/lib/content/services";

// Ana sayfa ve Hizmetlerimiz sayfasında ortak kullanılan hizmet kartı.
// Hover'da renk değişmez; kartın üzerinden parlak bir ışık süpürmesi geçer (.card-shine).
export function ServiceCard({
  slug,
  title,
  summary,
  icon,
}: {
  slug: string;
  title: string;
  summary: string;
  icon: Service["icon"];
}) {
  return (
    <Link
      href={`/hizmetlerimiz/${slug}`}
      className="group card-shine rounded-2xl bg-navy-900 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white/10 text-white">
        <Icon name={icon} className="size-6" />
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-100">{summary}</p>
      <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-orange-400">
        Detaylı bilgi
        <Icon
          name="arrow"
          className="size-4 transition group-hover:translate-x-1"
        />
      </p>
    </Link>
  );
}

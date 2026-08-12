import { site } from "@/lib/site";
import { Icon } from "./Icon";

export function FloatButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={`mailto:${site.email}`}
        aria-label="E-posta gönder"
        className="flex size-12 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg transition hover:scale-105 hover:bg-orange-700"
      >
        <Icon name="mail" className="size-5" />
      </a>
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile yazın"
        className="flex size-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1faf53]"
      >
        <Icon name="whatsapp" className="size-6" />
      </a>
    </div>
  );
}

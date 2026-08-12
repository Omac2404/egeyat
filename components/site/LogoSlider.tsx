import { institutions } from "@/lib/site";

/**
 * Footer'ın hemen üstünde kayan kurum logo barı.
 * Gerçek logolar geldiğinde "LOGO" rozetleri <Image> ile değiştirilecek.
 */
function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-4 pr-4"
    >
      {institutions.map((k) => (
        <li
          key={k}
          className="flex items-center gap-3 whitespace-nowrap rounded-xl border border-line bg-white px-5 py-3 shadow-sm"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-[9px] font-bold text-navy-400">
            LOGO
          </span>
          <span className="text-sm font-semibold text-navy-800">{k}</span>
        </li>
      ))}
    </ul>
  );
}

export function LogoSlider() {
  return (
    <section className="border-t border-line bg-navy-50/40 py-12">
      <p className="mb-8 text-center text-sm font-bold uppercase tracking-wider text-navy-500">
        İşlem Yaptığımız Kurumlar
      </p>
      <div className="group relative overflow-hidden">
        {/* Kenar solmaları */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f8f8fc] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f8f8fc] to-transparent" />
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <Track />
          <Track ariaHidden />
        </div>
      </div>
    </section>
  );
}

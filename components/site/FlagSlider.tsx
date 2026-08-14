import Image from "next/image";
import type { HomeFlag } from "@/lib/general-settings";

// Ana sayfada hero'nun hemen altında kayan bayrak şeridi
// (bayrak listesi panelden yönetilir)
function Track({
  flags,
  ariaHidden = false,
}: {
  flags: HomeFlag[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-stretch gap-4 pr-4"
    >
      {flags.map((f) => (
        <li
          key={f.name}
          className="flex w-44 flex-col items-center justify-center gap-2.5 rounded-xl border border-line bg-white/50 px-4 py-3 shadow-sm backdrop-blur-sm"
        >
          {/* Bayraklar farklı en-boy oranlarında geliyor; sabit kutuya kırpılıyor */}
          <Image
            src={f.image}
            alt={`${f.name} bayrağı`}
            width={160}
            height={107}
            className="h-10 w-16 shrink-0 rounded border border-line object-cover"
          />
          <span className="whitespace-nowrap text-center text-sm font-semibold text-navy-800">
            {f.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function FlagSlider({ flags }: { flags: HomeFlag[] }) {
  if (flags.length === 0) return null;
  return (
    <section className="relative z-10 -mt-14 pb-10">
      <div className="group relative overflow-hidden">
        {/* Kenar solmaları */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="flex w-max animate-marquee [animation-duration:28s] group-hover:[animation-play-state:paused]">
          <Track flags={flags} />
          <Track flags={flags} ariaHidden />
        </div>
      </div>
    </section>
  );
}

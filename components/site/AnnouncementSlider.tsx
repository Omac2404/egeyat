import Link from "next/link";
import { formatDate } from "@/lib/content/announcements";

export type AnnouncementCard = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

// Ana sayfadaki duyurular şeridi — logolar gibi sürekli kayar,
// üzerine gelince durur. En az 3 duyuru varken kullanılır.
function Track({
  items,
  ariaHidden = false,
}: {
  items: AnnouncementCard[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-stretch gap-5 pr-5"
    >
      {items.map((a) => (
        <li key={a.slug} className="w-72 shrink-0 sm:w-80">
          <Link
            href={`/duyurular/${a.slug}`}
            tabIndex={ariaHidden ? -1 : undefined}
            className="group flex h-full flex-col rounded-2xl border border-navy-900 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
              {formatDate(a.date)}
            </p>
            <h3 className="mt-2 font-bold leading-snug text-navy-900 group-hover:text-orange-700">
              {a.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
              {a.summary}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function AnnouncementSlider({ items }: { items: AnnouncementCard[] }) {
  return (
    <div className="group relative -mx-4 overflow-hidden px-4">
      {/* Kenar solmaları — bölümün navy-50/50 zeminiyle uyumlu */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f8f8fc] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f8f8fc] to-transparent sm:w-24" />
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${items.length * 5.5}s` }}
      >
        <Track items={items} />
        <Track items={items} ariaHidden />
      </div>
    </div>
  );
}

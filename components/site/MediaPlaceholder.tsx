/**
 * Görsel/video gelecek alanlar için tutucu. Gerçek medya geldiğinde
 * bu bileşen next/image veya <video> ile değiştirilecek.
 */
export function MediaPlaceholder({
  kind = "image",
  label,
  className = "",
}: {
  kind?: "image" | "video";
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-navy-200 bg-navy-50/60 text-navy-400 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-10"
        aria-hidden
      >
        {kind === "video" ? (
          <>
            <rect x="2" y="4" width="15" height="16" rx="2" />
            <path d="m22 8-5 4 5 4V8ZM7 10l4 2-4 2v-4Z" />
          </>
        ) : (
          <>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.5-3.5L9 20" />
          </>
        )}
      </svg>
      <p className="px-4 text-center text-xs font-semibold uppercase tracking-wider">
        {label ?? (kind === "video" ? "Video gelecek" : "Görsel gelecek")}
      </p>
    </div>
  );
}

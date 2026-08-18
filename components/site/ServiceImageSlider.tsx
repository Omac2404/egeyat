"use client";

import { useEffect, useState } from "react";

// Hizmet detay sayfasındaki görsel slider'ı (en fazla 3 görsel).
// Tek görsel varsa düz resim, birden fazlaysa otomatik dönen slider.
export function ServiceImageSlider({
  images,
  title,
  className = "",
}: {
  images: string[];
  title: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % count),
      5000
    );
    return () => clearInterval(timer);
  }, [count, paused]);

  if (count === 0) return null;

  if (count === 1) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={images[0]}
        alt={title}
        className={`aspect-[4/3] w-full rounded-2xl border border-line object-cover shadow-sm ${className}`}
      />
    );
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-line shadow-sm ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img}
            src={img}
            alt={`${title} görseli ${i + 1}`}
            className="aspect-[4/3] w-full shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Önceki / sonraki okları */}
      <button
        type="button"
        aria-label="Önceki görsel"
        onClick={() => setIndex((i) => (i - 1 + count) % count)}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-navy-950/45 p-2 text-white backdrop-blur-sm transition hover:bg-navy-950/70"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Sonraki görsel"
        onClick={() => setIndex((i) => (i + 1) % count)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-navy-950/45 p-2 text-white backdrop-blur-sm transition hover:bg-navy-950/70"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>

      {/* Nokta göstergeleri */}
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            aria-label={`${i + 1}. görsele git`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/60 hover:bg-white/90"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

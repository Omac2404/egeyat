"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useTransition } from "react";
import type { AboutReference } from "@/lib/about-settings";
import {
  deleteReference,
  reorderReferences,
} from "@/app/actions/hakkimizda";
import { SavedToast } from "@/components/admin/SavedToast";

export function ReferenceGrid({
  references,
}: {
  references: AboutReference[];
}) {
  const [refs, setRefs] = useState<AboutReference[]>(references);
  const [drag, setDrag] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [savedCount, setSavedCount] = useState(0);
  const [, startTransition] = useTransition();

  if (refs.length === 0) {
    return (
      <p className="rounded-2xl border border-line bg-white p-6 text-center text-sm text-muted">
        Henüz referans logosu eklenmedi. Logolar eklendiğinde sitedeki
        &quot;Referanslarımız&quot; bölümünde görünür.
      </p>
    );
  }

  return (
    <>
      <SavedToast
        show={savedCount > 0}
        label="Sıralama kaydedildi"
        signal={savedCount}
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {refs.map((r, i) => (
          <div
            key={r.image}
            onDragOver={(e) => {
              if (drag !== null) {
                e.preventDefault();
                setDragOver(i);
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (drag !== null && drag !== i) {
                const next = [...refs];
                const [moved] = next.splice(drag, 1);
                next.splice(i, 0, moved);
                setRefs(next);
                setSavedCount((c) => c + 1);
                startTransition(() =>
                  reorderReferences(next.map((x) => x.image))
                );
              }
              setDrag(null);
              setDragOver(null);
            }}
            className={`rounded-2xl border bg-white p-4 text-center transition ${
              dragOver === i ? "border-orange-400 ring-2 ring-orange-200" : "border-line"
            } ${drag === i ? "opacity-50" : ""}`}
          >
            <div
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
                setDrag(i);
              }}
              onDragEnd={() => {
                setDrag(null);
                setDragOver(null);
              }}
              title="Sürükleyerek sırala"
              className="cursor-grab active:cursor-grabbing"
            >
              <div className="flex aspect-[3/2] items-center justify-center overflow-hidden rounded-lg bg-navy-50/50 p-2">
                <img
                  src={r.image}
                  alt={r.name}
                  className="pointer-events-none max-h-full max-w-full object-contain"
                />
              </div>
              <p className="mt-2 truncate text-sm font-semibold text-navy-900">
                <span className="mr-1 select-none text-xs text-navy-400">⠿</span>
                {r.name}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (!window.confirm(`"${r.name}" logosu silinecek. Emin misiniz?`))
                  return;
                setRefs((prev) => prev.filter((x) => x.image !== r.image));
                const fd = new FormData();
                fd.set("image", r.image);
                startTransition(() => deleteReference(fd));
              }}
              className="mt-2 rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

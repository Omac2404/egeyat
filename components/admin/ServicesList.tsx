"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  deleteService,
  toggleServicePublished,
  reorderServices,
} from "@/app/actions/hizmetler";
import { SavedToast } from "@/components/admin/SavedToast";

export type ServiceListItem = {
  id: number;
  title: string;
  slug: string;
  published: boolean;
};

export function ServicesList({ items }: { items: ServiceListItem[] }) {
  const [list, setList] = useState<ServiceListItem[]>(items);
  const [drag, setDrag] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [savedCount, setSavedCount] = useState(0);
  const [, startTransition] = useTransition();

  if (list.length === 0) {
    return (
      <p className="rounded-2xl border border-line bg-white p-6 text-center text-sm text-muted">
        Henüz hizmet yok.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <SavedToast
        show={savedCount > 0}
        label="Sıralama kaydedildi"
        signal={savedCount}
      />
      {list.map((s, i) => (
        <div
          key={s.id}
          onDragOver={(e) => {
            if (drag !== null) {
              e.preventDefault();
              setDragOver(i);
            }
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (drag !== null && drag !== i) {
              const next = [...list];
              const [moved] = next.splice(drag, 1);
              next.splice(i, 0, moved);
              setList(next);
              setSavedCount((c) => c + 1);
              startTransition(() => reorderServices(next.map((x) => x.id)));
            }
            setDrag(null);
            setDragOver(null);
          }}
          className={`flex flex-wrap items-center gap-3 rounded-xl border bg-white px-3 py-2.5 transition ${
            dragOver === i ? "border-orange-400 ring-2 ring-orange-200" : "border-line"
          } ${drag === i ? "opacity-50" : ""}`}
        >
          <span
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
            className="shrink-0 cursor-grab select-none text-navy-400 active:cursor-grabbing"
          >
            ⠿
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-navy-900">
              {s.title}
            </p>
            <p className="truncate text-xs text-muted">
              /hizmetlerimiz/{s.slug}
            </p>
          </div>
          {s.published ? (
            <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
              Yayında
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-navy-100 px-2.5 py-1 text-xs font-bold text-navy-500">
              Taslak
            </span>
          )}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/admin/hizmetler/${s.id}`}
              className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-navy-700 transition hover:border-orange-500 hover:text-orange-600"
            >
              Düzenle
            </Link>
            <form action={toggleServicePublished}>
              <input type="hidden" name="id" value={s.id} />
              <button
                type="submit"
                className="whitespace-nowrap rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-navy-700 transition hover:border-orange-500 hover:text-orange-600"
              >
                {s.published ? "Yayından kaldır" : "Yayınla"}
              </button>
            </form>
            <form
              action={deleteService}
              onSubmit={(e) => {
                if (
                  !window.confirm(
                    `"${s.title}" hizmeti kalıcı olarak silinecek. Emin misiniz?`
                  )
                )
                  e.preventDefault();
              }}
            >
              <input type="hidden" name="id" value={s.id} />
              <button
                type="submit"
                className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                Sil
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

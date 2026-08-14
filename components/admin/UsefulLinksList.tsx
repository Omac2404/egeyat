"use client";

import { useState, useTransition } from "react";
import {
  updateUsefulLink,
  deleteUsefulLink,
  reorderUsefulLinks,
} from "@/app/actions/mevzuat";
import { SavedToast } from "@/components/admin/SavedToast";

export type UsefulLinkItem = {
  id: number;
  title: string;
  href: string;
};

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

export function UsefulLinksList({ items }: { items: UsefulLinkItem[] }) {
  const [list, setList] = useState<UsefulLinkItem[]>(items);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [savedCount, setSavedCount] = useState(0);
  const [, startTransition] = useTransition();

  if (list.length === 0) {
    return (
      <p className="rounded-2xl border border-line bg-white p-5 text-center text-sm text-muted">
        Henüz bağlantı yok.
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
      {list.map((l, i) => (
        <div
          key={l.id}
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
              startTransition(() => reorderUsefulLinks(next.map((x) => x.id)));
            }
            setDrag(null);
            setDragOver(null);
          }}
          className={`rounded-xl border bg-white transition ${
            dragOver === i ? "border-orange-400 ring-2 ring-orange-200" : "border-line"
          } ${drag === i ? "opacity-50" : ""}`}
        >
          <div className="flex items-center gap-2 px-3 py-2">
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
            <button
              type="button"
              onClick={() => setExpanded(expanded === l.id ? null : l.id)}
              className="min-w-0 flex-1 truncate text-left text-sm font-medium text-navy-900 hover:text-orange-600"
            >
              {l.title}
            </button>
            <button
              type="button"
              onClick={() => setExpanded(expanded === l.id ? null : l.id)}
              aria-label={expanded === l.id ? "Kapat" : "Düzenle"}
              className="shrink-0 text-navy-400 transition hover:text-orange-600"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className={`size-4 transition ${expanded === l.id ? "rotate-180" : ""}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          {expanded === l.id && (
            <div className="border-t border-line p-3">
              <form action={updateUsefulLink} className="space-y-2">
                <input type="hidden" name="id" value={l.id} />
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={l.title}
                  className={inputCls}
                />
                <input
                  type="url"
                  name="href"
                  required
                  defaultValue={l.href}
                  className={inputCls}
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-orange-600 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-orange-700"
                  >
                    Kaydet
                  </button>
                </div>
              </form>
              <form
                action={deleteUsefulLink}
                className="mt-2"
                onSubmit={(e) => {
                  if (
                    !window.confirm(
                      `"${l.title}" bağlantısı silinecek. Emin misiniz?`
                    )
                  )
                    e.preventDefault();
                }}
              >
                <input type="hidden" name="id" value={l.id} />
                <button
                  type="submit"
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Sil
                </button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

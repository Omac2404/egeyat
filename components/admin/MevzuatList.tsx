"use client";

import { useState, useTransition } from "react";
import {
  updateMevzuat,
  deleteMevzuat,
  toggleMevzuatPublished,
  reorderMevzuat,
} from "@/app/actions/mevzuat";
import { SavedToast } from "@/components/admin/SavedToast";

export type MevzuatItem = {
  id: number;
  title: string;
  href: string | null;
  filePath: string | null;
  published: boolean;
};

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

export function MevzuatList({ items }: { items: MevzuatItem[] }) {
  const [list, setList] = useState<MevzuatItem[]>(items);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [savedCount, setSavedCount] = useState(0);
  const [, startTransition] = useTransition();

  if (list.length === 0) {
    return (
      <p className="rounded-2xl border border-line bg-white p-6 text-center text-sm text-muted">
        Henüz mevzuat kaydı yok.
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
      {list.map((m, i) => (
        <div
          key={m.id}
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
              startTransition(() => reorderMevzuat(next.map((x) => x.id)));
            }
            setDrag(null);
            setDragOver(null);
          }}
          className={`rounded-xl border bg-white transition ${
            dragOver === i ? "border-orange-400 ring-2 ring-orange-200" : "border-line"
          } ${drag === i ? "opacity-50" : ""}`}
        >
          {/* Kompakt satır */}
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
            <span
              className={`size-2 shrink-0 rounded-full ${
                m.published ? "bg-green-500" : "bg-navy-300"
              }`}
              title={m.published ? "Yayında" : "Taslak"}
            />
            <button
              type="button"
              onClick={() => setExpanded(expanded === m.id ? null : m.id)}
              className="min-w-0 flex-1 truncate text-left text-sm font-medium text-navy-900 hover:text-orange-600"
            >
              {m.title}
            </button>
            {m.filePath && (
              <span className="shrink-0 rounded bg-navy-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-navy-500">
                Dosya
              </span>
            )}
            {m.href && (
              <span className="shrink-0 rounded bg-navy-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-navy-500">
                Link
              </span>
            )}
            <button
              type="button"
              onClick={() => setExpanded(expanded === m.id ? null : m.id)}
              aria-label={expanded === m.id ? "Kapat" : "Düzenle"}
              className="shrink-0 text-navy-400 transition hover:text-orange-600"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className={`size-4 transition ${expanded === m.id ? "rotate-180" : ""}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* Açılır düzenleme alanı */}
          {expanded === m.id && (
            <div className="border-t border-line p-3">
              <div className="mb-3 flex flex-wrap justify-end gap-2">
                <form action={toggleMevzuatPublished}>
                  <input type="hidden" name="id" value={m.id} />
                  <button
                    type="submit"
                    className="whitespace-nowrap rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-navy-700 transition hover:border-orange-500 hover:text-orange-600"
                  >
                    {m.published ? "Yayından kaldır" : "Yayınla"}
                  </button>
                </form>
                <form
                  action={deleteMevzuat}
                  onSubmit={(e) => {
                    if (
                      !window.confirm(
                        `"${m.title}" ve varsa yüklenen dosyası kalıcı olarak silinecek. Emin misiniz?`
                      )
                    )
                      e.preventDefault();
                  }}
                >
                  <input type="hidden" name="id" value={m.id} />
                  <button
                    type="submit"
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Sil
                  </button>
                </form>
              </div>

              <form action={updateMevzuat} className="space-y-3">
                <input type="hidden" name="id" value={m.id} />
                <label className="flex flex-col gap-1 text-xs font-medium text-navy-500">
                  Dosya Adı
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={m.title}
                    className={inputCls}
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1 text-xs font-medium text-navy-500">
                    Dosya
                    {m.filePath && (
                      <p className="flex flex-wrap items-center gap-3 rounded-lg bg-navy-50/60 px-3 py-2">
                        <a
                          href={m.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-navy-800 hover:text-orange-600"
                        >
                          Mevcut dosyayı gör
                        </a>
                        <label className="flex items-center gap-1.5 font-medium text-red-600">
                          <input
                            type="checkbox"
                            name="removeFile"
                            className="size-3.5 accent-red-600"
                          />
                          Dosyayı kaldır
                        </label>
                      </p>
                    )}
                    <input
                      type="file"
                      name="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.rtf,.odt,.ods,.png,.jpg,.jpeg,.webp"
                      className={`${inputCls} file:mr-3 file:rounded-md file:border-0 file:bg-navy-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-navy-700`}
                    />
                  </div>
                  <label className="flex flex-col gap-1 text-xs font-medium text-navy-500">
                    Bağlantı
                    <input
                      type="url"
                      name="href"
                      defaultValue={m.href ?? ""}
                      placeholder="https://..."
                      className={inputCls}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-700"
                >
                  Kaydet
                </button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

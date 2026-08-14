"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, useTransition } from "react";
import { useActionState } from "react";
import type { HomeFlag } from "@/lib/general-settings";
import {
  addFlag,
  deleteFlag,
  reorderFlags,
  type GeneralState,
} from "@/app/actions/genel";
import { SavedToast } from "@/components/admin/SavedToast";

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

export function FlagsManager({ flags }: { flags: HomeFlag[] }) {
  const [list, setList] = useState<HomeFlag[]>(flags);
  const [drag, setDrag] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [savedCount, setSavedCount] = useState(0);
  const [, startTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<GeneralState, FormData>(
    addFlag,
    {}
  );
  useEffect(() => {
    if (state.ok && !pending) formRef.current?.reset();
  }, [state, pending]);

  return (
    <div className="space-y-4">
      <SavedToast
        show={savedCount > 0}
        label="Sıralama kaydedildi"
        signal={savedCount}
      />
      <form
        ref={formRef}
        action={formAction}
        className="rounded-2xl border border-line bg-white p-5"
      >
        <SavedToast show={!!state.ok} label="Bayrak eklendi" signal={state} />
        <p className="mb-3 text-sm font-bold text-navy-900">
          Yeni Bayrak Ekle
        </p>
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input
            type="text"
            name="name"
            required
            placeholder="Ülke adı"
            className={inputCls}
          />
          <input
            type="file"
            name="image"
            required
            accept=".png,.jpg,.jpeg,.webp,.svg"
            className={`${inputCls} file:mr-3 file:rounded-md file:border-0 file:bg-navy-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-navy-700`}
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-orange-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-orange-700 disabled:opacity-60"
          >
            {pending ? "Yükleniyor…" : "Ekle"}
          </button>
        </div>
        {state.error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.error}
          </p>
        )}
      </form>

      {list.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-6 text-center text-sm text-muted">
          Henüz bayrak yok.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {list.map((f, i) => (
            <div
              key={f.image}
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
                  startTransition(() => reorderFlags(next.map((x) => x.image)));
                }
                setDrag(null);
                setDragOver(null);
              }}
              className={`rounded-xl border bg-white p-3 text-center transition ${
                dragOver === i
                  ? "border-orange-400 ring-2 ring-orange-200"
                  : "border-line"
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
                <img
                  src={f.image}
                  alt={f.name}
                  className="pointer-events-none mx-auto h-10 w-16 rounded border border-line object-cover"
                />
                <p className="mt-1.5 truncate text-xs font-semibold text-navy-900">
                  <span className="mr-1 select-none text-navy-400">⠿</span>
                  {f.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (
                    !window.confirm(
                      `"${f.name}" bayrağı silinecek. Emin misiniz?`
                    )
                  )
                    return;
                  setList((prev) => prev.filter((x) => x.image !== f.image));
                  const fd = new FormData();
                  fd.set("image", f.image);
                  startTransition(() => deleteFlag(fd));
                }}
                className="mt-1.5 rounded-lg border border-red-200 px-2.5 py-0.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

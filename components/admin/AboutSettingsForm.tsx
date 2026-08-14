"use client";

import { useState } from "react";
import { useActionState } from "react";
import type { AboutSettings } from "@/lib/about-settings";
import {
  saveAboutSettings,
  type AboutSettingsState,
} from "@/app/actions/hakkimizda";
import { SavedToast } from "@/components/admin/SavedToast";

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";
const smallBtnCls =
  "rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-navy-700 transition hover:border-orange-500 hover:text-orange-600";

export function AboutSettingsForm({ initial }: { initial: AboutSettings }) {
  const [paragraphs, setParagraphs] = useState<string[]>(initial.paragraphs);
  const [state, formAction, pending] = useActionState<
    AboutSettingsState,
    FormData
  >(saveAboutSettings, {});

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-line bg-white p-6"
    >
      <input
        type="hidden"
        name="paragraphs"
        value={JSON.stringify(paragraphs.map((p) => p.trim()).filter(Boolean))}
      />

      <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
        Sayfa Alt Başlığı
        <input
          type="text"
          name="subtitle"
          required
          defaultValue={initial.subtitle}
          className={inputCls}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
        Başlık
        <input
          type="text"
          name="heading"
          required
          defaultValue={initial.heading}
          className={inputCls}
        />
      </label>

      <div className="space-y-3">
        <p className="text-sm font-bold text-navy-900">Tanıtım Paragrafları</p>
        {paragraphs.map((p, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-2 w-6 shrink-0 text-right text-xs font-bold text-navy-400">
              {i + 1}.
            </span>
            <textarea
              rows={3}
              value={p}
              onChange={(e) =>
                setParagraphs((prev) =>
                  prev.map((x, j) => (j === i ? e.target.value : x))
                )
              }
              className={inputCls}
              placeholder="Paragraf metni"
            />
            <button
              type="button"
              onClick={() =>
                setParagraphs((prev) => prev.filter((_, j) => j !== i))
              }
              className="mt-1 shrink-0 rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
            >
              Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setParagraphs((prev) => [...prev, ""])}
          className={smallBtnCls}
        >
          + Paragraf Ekle
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
          Misyonumuz
          <textarea
            name="mission"
            required
            rows={3}
            defaultValue={initial.mission}
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
          Vizyonumuz
          <textarea
            name="vision"
            required
            rows={3}
            defaultValue={initial.vision}
            className={inputCls}
          />
        </label>
      </div>

      <SavedToast show={!!state.ok && !state.error} signal={state} />
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-700 disabled:opacity-60"
      >
        {pending ? "Kaydediliyor…" : "Kaydet"}
      </button>
    </form>
  );
}

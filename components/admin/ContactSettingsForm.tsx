"use client";

import { useState } from "react";
import { useActionState } from "react";
import type {
  ContactOffice,
  ContactSettings,
} from "@/lib/contact-settings";
import {
  saveContactSettings,
  type ContactSettingsState,
} from "@/app/actions/iletisim";
import { SavedToast } from "@/components/admin/SavedToast";

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";
// Etiket girişi dar ve sabit genişlikte (inputCls'teki w-full ile çakışmasın)
const lineLabelCls =
  "w-28 shrink-0 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";
const smallBtnCls =
  "rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-navy-700 transition hover:border-orange-500 hover:text-orange-600";

export function ContactSettingsForm({ initial }: { initial: ContactSettings }) {
  const [offices, setOffices] = useState<ContactOffice[]>(initial.offices);
  const [state, formAction, pending] = useActionState<
    ContactSettingsState,
    FormData
  >(saveContactSettings, {});
  // Sürükle-bırak: taşınan satır ve üzerinde durulan hedef
  const [drag, setDrag] = useState<{ office: number; idx: number } | null>(
    null
  );
  const [dragOver, setDragOver] = useState<{
    office: number;
    idx: number;
  } | null>(null);

  const setOffice = (i: number, patch: Partial<ContactOffice>) =>
    setOffices((prev) => prev.map((o, j) => (j === i ? { ...o, ...patch } : o)));

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-line bg-white p-6"
    >
      <input type="hidden" name="offices" value={JSON.stringify(offices)} />

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

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
          WhatsApp Numarası
          <input
            type="text"
            name="whatsapp"
            required
            defaultValue={initial.whatsapp}
            placeholder="905339289590"
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
          Google Haritalar Bağlantısı
          <input
            type="url"
            name="mapsUrl"
            required
            defaultValue={initial.mapsUrl}
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
          Harita Embed Adresi
          <input
            type="url"
            name="mapEmbedUrl"
            required
            defaultValue={initial.mapEmbedUrl}
            className={inputCls}
          />
        </label>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-bold text-navy-900">Ofisler</p>
        {offices.map((office, i) => (
          <div
            key={i}
            className="rounded-xl border border-line bg-navy-50/40 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-400">
                Ofis {i + 1}
              </span>
              <button
                type="button"
                onClick={() =>
                  setOffices((prev) => prev.filter((_, j) => j !== i))
                }
                className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                Ofisi Kaldır
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={office.name}
                onChange={(e) => setOffice(i, { name: e.target.value })}
                className={inputCls}
                placeholder="Ofis adı (örn. İzmir Merkez Ofis)"
              />
              <textarea
                rows={2}
                value={office.address}
                onChange={(e) => setOffice(i, { address: e.target.value })}
                className={inputCls}
                placeholder="Adres"
              />
              <div className="space-y-2">
                {office.lines.map((line, k) => (
                  <div
                    key={k}
                    onDragOver={(e) => {
                      if (drag?.office === i) {
                        e.preventDefault();
                        setDragOver({ office: i, idx: k });
                      }
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (drag && drag.office === i && drag.idx !== k) {
                        setOffice(i, {
                          lines: (() => {
                            const next = [...office.lines];
                            const [moved] = next.splice(drag.idx, 1);
                            next.splice(k, 0, moved);
                            return next;
                          })(),
                        });
                      }
                      setDrag(null);
                      setDragOver(null);
                    }}
                    className={`flex items-center gap-2 rounded-lg transition ${
                      dragOver?.office === i && dragOver.idx === k
                        ? "ring-2 ring-orange-400"
                        : ""
                    } ${
                      drag?.office === i && drag.idx === k ? "opacity-50" : ""
                    }`}
                  >
                    <span
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.effectAllowed = "move";
                        setDrag({ office: i, idx: k });
                      }}
                      onDragEnd={() => {
                        setDrag(null);
                        setDragOver(null);
                      }}
                      title="Sürükleyerek sırala"
                      className="shrink-0 cursor-grab select-none text-xs font-bold text-navy-400 active:cursor-grabbing"
                    >
                      ⠿
                    </span>
                    <input
                      type="text"
                      value={line.label}
                      onChange={(e) =>
                        setOffice(i, {
                          lines: office.lines.map((l, j) =>
                            j === k ? { ...l, label: e.target.value } : l
                          ),
                        })
                      }
                      className={lineLabelCls}
                      placeholder="Etiket"
                    />
                    <input
                      type="text"
                      value={line.value}
                      onChange={(e) =>
                        setOffice(i, {
                          lines: office.lines.map((l, j) =>
                            j === k ? { ...l, value: e.target.value } : l
                          ),
                        })
                      }
                      className={`${inputCls} min-w-0`}
                      placeholder="Değer (numara / e-posta)"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setOffice(i, {
                          lines: office.lines.filter((_, j) => j !== k),
                        })
                      }
                      className="shrink-0 rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Sil
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setOffice(i, {
                      lines: [...office.lines, { label: "", value: "" }],
                    })
                  }
                  className={smallBtnCls}
                >
                  + Satır Ekle (Tel, GSM, E-posta...)
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setOffices((prev) => [
              ...prev,
              { name: "", address: "", lines: [{ label: "Tel", value: "" }] },
            ])
          }
          className={smallBtnCls}
        >
          + Ofis Ekle
        </button>
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

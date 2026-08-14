"use client";

import { useRef } from "react";
import { useActionState } from "react";
import { useEffect } from "react";
import { createMevzuat, type MevzuatState } from "@/app/actions/mevzuat";
import { SavedToast } from "@/components/admin/SavedToast";

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

export function MevzuatAddForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<MevzuatState, FormData>(
    createMevzuat,
    {}
  );

  // Başarılı ekleme sonrası formu temizle
  useEffect(() => {
    if (state.ok && !pending) formRef.current?.reset();
  }, [state, pending]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-2xl border border-line bg-white p-5"
    >
      <SavedToast show={!!state.ok} label="Belge eklendi" signal={state} />
      <p className="mb-3 text-sm font-bold text-navy-900">Yeni Belge Ekle</p>
      <div className="space-y-3">
        <label className="flex flex-col gap-1 text-xs font-medium text-navy-500">
          Dosya Adı
          <input
            type="text"
            name="title"
            required
            placeholder="Belge başlığı (örn. Yat Turizmi Yönetmeliği)"
            className={inputCls}
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs font-medium text-navy-500">
            Dosya Ekle (PDF, Word, Excel...)
            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.rtf,.odt,.ods,.png,.jpg,.jpeg,.webp"
              className={`${inputCls} file:mr-3 file:rounded-md file:border-0 file:bg-navy-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-navy-700`}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-navy-500">
            Link Ekle (opsiyonel)
            <input
              type="url"
              name="href"
              placeholder="https://..."
              className={inputCls}
            />
          </label>
        </div>
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
  );
}

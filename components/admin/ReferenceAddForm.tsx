"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { addReference, type ReferenceState } from "@/app/actions/hakkimizda";
import { SavedToast } from "@/components/admin/SavedToast";

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

export function ReferenceAddForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<ReferenceState, FormData>(
    addReference,
    {}
  );

  useEffect(() => {
    if (state.ok && !pending) formRef.current?.reset();
  }, [state, pending]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-2xl border border-line bg-white p-5"
    >
      <SavedToast show={!!state.ok} label="Logo eklendi" signal={state} />
      <p className="mb-3 text-sm font-bold text-navy-900">
        Yeni Referans Logosu Ekle
      </p>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input
          type="text"
          name="name"
          required
          placeholder="Referans adı"
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
  );
}

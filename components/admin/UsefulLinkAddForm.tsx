"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { createUsefulLink, type MevzuatState } from "@/app/actions/mevzuat";
import { SavedToast } from "@/components/admin/SavedToast";

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

export function UsefulLinkAddForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<MevzuatState, FormData>(
    createUsefulLink,
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
      <SavedToast show={!!state.ok} label="Bağlantı eklendi" signal={state} />
      <p className="mb-3 text-sm font-bold text-navy-900">
        Yeni Bağlantı Ekle
      </p>
      <div className="space-y-3">
        <input
          type="text"
          name="title"
          required
          placeholder="Bağlantı adı"
          className={inputCls}
        />
        <input
          type="url"
          name="href"
          required
          placeholder="https://..."
          className={inputCls}
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-orange-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-orange-700 disabled:opacity-60"
        >
          {pending ? "Ekleniyor…" : "Ekle"}
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

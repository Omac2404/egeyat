"use client";

import { useState } from "react";
import { useActionState } from "react";
import type { LegalPageDoc } from "@/lib/legal-settings";
import { saveLegalDoc, type LegalDocState } from "@/app/actions/yasal";
import { SavedToast } from "@/components/admin/SavedToast";

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";
const labelCls = "flex flex-col gap-1 text-xs font-medium text-navy-500";

function LegalDocForm({ doc }: { doc: LegalPageDoc }) {
  const [state, formAction, pending] = useActionState<LegalDocState, FormData>(
    saveLegalDoc,
    {}
  );
  return (
    <form action={formAction} className="space-y-3 border-t border-line p-4">
      <SavedToast show={!!state.ok && !state.error} signal={state} />
      <input type="hidden" name="slug" value={doc.slug} />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelCls}>
          Başlık
          <input
            type="text"
            name="title"
            required
            defaultValue={doc.title}
            className={inputCls}
          />
        </label>
        <label className={labelCls}>
          Alt Başlık
          <input
            type="text"
            name="subtitle"
            required
            defaultValue={doc.subtitle}
            className={inputCls}
          />
        </label>
      </div>
      <label className={labelCls}>
        İçerik
        <textarea
          name="content"
          required
          rows={14}
          defaultValue={doc.content}
          className={`${inputCls} font-mono text-xs leading-relaxed`}
        />
      </label>
      <p className="text-[11px] text-muted">
        Biçim: &quot;## Başlık&quot; satırı bölüm başlığı, &quot;- madde&quot;
        satırları liste, boş satırla ayrılan bloklar paragraf olur.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className={labelCls}>
          Ek Belge (sayfada indirme butonu olarak görünür)
          {doc.file && (
            <p className="flex flex-wrap items-center gap-3 rounded-lg bg-navy-50/60 px-3 py-2">
              <a
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-navy-800 hover:text-orange-600"
              >
                Mevcut belgeyi gör
              </a>
              <label className="flex items-center gap-1.5 font-medium text-red-600">
                <input
                  type="checkbox"
                  name="removeFile"
                  className="size-3.5 accent-red-600"
                />
                Belgeyi kaldır
              </label>
            </p>
          )}
          <input
            type="file"
            name="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.rtf,.odt,.ods"
            className={`${inputCls} file:mr-3 file:rounded-md file:border-0 file:bg-navy-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-navy-700`}
          />
        </div>
      </div>
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-orange-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-orange-700 disabled:opacity-60"
      >
        {pending ? "Kaydediliyor…" : "Kaydet"}
      </button>
    </form>
  );
}

export function LegalDocsEditor({ docs }: { docs: LegalPageDoc[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {docs.map((doc) => (
        <div key={doc.slug} className="rounded-xl border border-line bg-white">
          <button
            type="button"
            onClick={() =>
              setExpanded(expanded === doc.slug ? null : doc.slug)
            }
            className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
          >
            <span className="text-sm font-semibold text-navy-900">
              {doc.title}
              <span className="ml-2 text-xs font-normal text-muted">
                /{doc.slug}
              </span>
              {doc.file && (
                <span className="ml-2 rounded bg-navy-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-navy-500">
                  Belge
                </span>
              )}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`size-4 shrink-0 text-navy-400 transition ${
                expanded === doc.slug ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {expanded === doc.slug && <LegalDocForm doc={doc} />}
        </div>
      ))}
    </div>
  );
}

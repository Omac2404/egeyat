"use client";

import { useState } from "react";
import { useActionState } from "react";
import type { TechnicalSettings } from "@/lib/technical-settings";
import {
  saveHeadCode,
  saveSmtp,
  saveFavicon,
  saveSeo,
  saveSitemap,
  type TechnicalState,
} from "@/app/actions/teknik";
import { SavedToast } from "@/components/admin/SavedToast";

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";
const labelCls = "flex flex-col gap-1 text-sm font-medium text-navy-900";
const submitCls =
  "rounded-lg bg-orange-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-orange-700 disabled:opacity-60";

function FormStatus({
  state,
  pending,
}: {
  state: TechnicalState;
  pending: boolean;
}) {
  return (
    <>
      <SavedToast show={!!state.ok && !state.error} signal={state} />
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={submitCls}>
        {pending ? "Kaydediliyor…" : "Kaydet"}
      </button>
    </>
  );
}

export function HeadCodeForm({ initial }: { initial: string }) {
  const [state, formAction, pending] = useActionState<TechnicalState, FormData>(
    saveHeadCode,
    {}
  );
  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-line bg-white p-5"
    >
      <label className={labelCls}>
        Head Kodu (meta, link ve script etiketleri)
        <textarea
          name="headCode"
          rows={6}
          defaultValue={initial}
          placeholder={'<meta name="google-site-verification" content="..." />'}
          className={`${inputCls} font-mono text-xs`}
        />
      </label>
      <FormStatus state={state} pending={pending} />
    </form>
  );
}

export function SmtpForm({
  initial,
  mailTo,
}: {
  initial: TechnicalSettings["smtp"];
  mailTo: string;
}) {
  const [state, formAction, pending] = useActionState<TechnicalState, FormData>(
    saveSmtp,
    {}
  );
  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-line bg-white p-5"
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
        <label className={labelCls}>
          SMTP Sunucusu
          <input
            type="text"
            name="host"
            defaultValue={initial.host}
            placeholder="smtp.orneksaglayici.com"
            className={inputCls}
          />
        </label>
        <label className={labelCls}>
          Port
          <input
            type="number"
            name="port"
            defaultValue={initial.port}
            className={inputCls}
          />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelCls}>
          Kullanıcı Adı
          <input
            type="text"
            name="user"
            defaultValue={initial.user}
            className={inputCls}
          />
        </label>
        <label className={labelCls}>
          Şifre (değiştirmeyeceksen boş bırak)
          <input
            type="password"
            name="pass"
            placeholder={initial.pass ? "••••••••" : ""}
            autoComplete="new-password"
            className={inputCls}
          />
        </label>
      </div>
      <label className={labelCls}>
        Gönderen Adresi (From)
        <input
          type="text"
          name="from"
          defaultValue={initial.from}
          placeholder="info@egeyatcilik.com"
          className={inputCls}
        />
      </label>
      <label className={labelCls}>
        Formdan Gelen E-postaların Alıcıları (virgülle ayır)
        <input
          type="text"
          name="mailTo"
          defaultValue={mailTo}
          placeholder="info@egeyatcilik.com, muhasebe@egeyatcilik.com"
          className={inputCls}
        />
      </label>
      <FormStatus state={state} pending={pending} />
    </form>
  );
}

export function FaviconForm({ initial }: { initial: string | null }) {
  const [state, formAction, pending] = useActionState<TechnicalState, FormData>(
    saveFavicon,
    {}
  );
  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-line bg-white p-5"
    >
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-line bg-navy-50/50">
          {initial ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={initial} alt="Favicon" className="size-8" />
          ) : (
            <span className="text-[10px] font-bold text-navy-400">Varsayılan</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="file"
            name="favicon"
            accept=".ico,.png,.svg"
            className={`${inputCls} file:mr-3 file:rounded-md file:border-0 file:bg-navy-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-navy-700`}
          />
          {initial && (
            <label className="flex items-center gap-1.5 text-xs font-medium text-red-600">
              <input
                type="checkbox"
                name="removeFavicon"
                className="size-3.5 accent-red-600"
              />
              Özel faviconu kaldır (varsayılana dön)
            </label>
          )}
        </div>
      </div>
      <FormStatus state={state} pending={pending} />
    </form>
  );
}

export function SeoForm({ initial }: { initial: TechnicalSettings["seo"] }) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [state, formAction, pending] = useActionState<TechnicalState, FormData>(
    saveSeo,
    {}
  );
  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-line bg-white p-5"
    >
      <label className={labelCls}>
        Site Başlığı ({title.length}/70)
        <input
          type="text"
          name="title"
          required
          maxLength={70}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputCls}
        />
      </label>
      <label className={labelCls}>
        Site Açıklaması ({description.length}/200)
        <textarea
          name="description"
          required
          maxLength={200}
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputCls}
        />
      </label>

      {/* Google arama sonucu önizlemesi */}
      <div className="rounded-xl border border-line bg-navy-50/30 p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-navy-400">
          Google Önizlemesi
        </p>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="text-sm text-[#202124]">
            www.egeyatcilik.com
            <span className="text-[#5f6368]"> › </span>
          </p>
          <p className="mt-1 truncate text-xl leading-snug text-[#1a0dab]">
            {title || "Site başlığı"}
          </p>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#4d5156]">
            {description || "Site açıklaması burada görünür."}
          </p>
        </div>
      </div>

      <FormStatus state={state} pending={pending} />
    </form>
  );
}

export function SitemapForm({ initial }: { initial: string[] }) {
  const [paths, setPaths] = useState<string[]>(initial);
  const [newPath, setNewPath] = useState("");
  const [state, formAction, pending] = useActionState<TechnicalState, FormData>(
    saveSitemap,
    {}
  );

  const addPath = () => {
    const p = newPath.trim();
    if (!p || !p.startsWith("/") || paths.includes(p)) return;
    setPaths((prev) => [...prev, p]);
    setNewPath("");
  };

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-line bg-white p-5"
    >
      <input type="hidden" name="paths" value={JSON.stringify(paths)} />
      <div className="flex flex-wrap gap-2">
        {paths.map((p) => (
          <span
            key={p}
            className="flex items-center gap-1.5 rounded-lg bg-navy-50 px-2.5 py-1 text-xs font-semibold text-navy-800"
          >
            {p}
            <button
              type="button"
              onClick={() => setPaths((prev) => prev.filter((x) => x !== p))}
              aria-label={`${p} yolunu kaldır`}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </span>
        ))}
        {paths.length === 0 && (
          <span className="text-sm text-muted">Sitemap&apos;te sabit yol yok.</span>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newPath}
          onChange={(e) => setNewPath(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addPath();
            }
          }}
          placeholder="/ornek-sayfa"
          className={inputCls}
        />
        <button
          type="button"
          onClick={addPath}
          className="shrink-0 rounded-lg border border-line px-4 py-2 text-sm font-semibold text-navy-700 transition hover:border-orange-500 hover:text-orange-600"
        >
          + Ekle
        </button>
      </div>
      <FormStatus state={state} pending={pending} />
    </form>
  );
}

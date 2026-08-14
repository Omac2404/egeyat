"use client";

import { useActionState } from "react";
import type { GeneralSettings } from "@/lib/general-settings";
import {
  saveHero,
  saveHomeAbout,
  saveCta,
  saveSocial,
  type GeneralState,
} from "@/app/actions/genel";
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
  state: GeneralState;
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

function ButtonFields({
  legend,
  prefix,
  initial,
}: {
  legend: string;
  prefix: string;
  initial: { label: string; href: string };
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className={labelCls}>
        {legend} Yazısı
        <input
          type="text"
          name={`${prefix}Label`}
          required
          defaultValue={initial.label}
          className={inputCls}
        />
      </label>
      <label className={labelCls}>
        {legend} Adresi
        <input
          type="text"
          name={`${prefix}Href`}
          required
          defaultValue={initial.href}
          placeholder="/iletisim veya https://... veya tel:..."
          className={inputCls}
        />
      </label>
    </div>
  );
}

export function HeroForm({ initial }: { initial: GeneralSettings["hero"] }) {
  const [state, formAction, pending] = useActionState<GeneralState, FormData>(
    saveHero,
    {}
  );
  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-line bg-white p-5"
    >
      <label className={labelCls}>
        Başlık
        <input
          type="text"
          name="title"
          required
          defaultValue={initial.title}
          className={inputCls}
        />
      </label>
      <label className={labelCls}>
        Vurgulanan Kelime (başlıkta turuncu görünür, boş bırakılabilir)
        <input
          type="text"
          name="highlight"
          defaultValue={initial.highlight}
          className={inputCls}
        />
      </label>
      <label className={labelCls}>
        Açıklama Metni
        <textarea
          name="text"
          required
          rows={3}
          defaultValue={initial.text}
          className={inputCls}
        />
      </label>
      <ButtonFields legend="1. Buton" prefix="primary" initial={initial.primary} />
      <ButtonFields
        legend="2. Buton"
        prefix="secondary"
        initial={initial.secondary}
      />
      <FormStatus state={state} pending={pending} />
    </form>
  );
}

export function HomeAboutForm({
  initial,
}: {
  initial: GeneralSettings["about"];
}) {
  const [state, formAction, pending] = useActionState<GeneralState, FormData>(
    saveHomeAbout,
    {}
  );
  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-line bg-white p-5"
    >
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-4">
          <label className={labelCls}>
            Başlık
            <input
              type="text"
              name="title"
              required
              defaultValue={initial.title}
              className={inputCls}
            />
          </label>
          <label className={labelCls}>
            1. Paragraf
            <textarea
              name="text1"
              required
              rows={3}
              defaultValue={initial.text1}
              className={inputCls}
            />
          </label>
          <label className={labelCls}>
            2. Paragraf (opsiyonel)
            <textarea
              name="text2"
              rows={3}
              defaultValue={initial.text2}
              className={inputCls}
            />
          </label>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-navy-900">Bölüm Görseli</p>
          {initial.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={initial.image}
                alt="Ana sayfa hakkımızda görseli"
                className="aspect-[4/3] w-full rounded-xl border border-line object-cover"
              />
              <label className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                <input
                  type="checkbox"
                  name="removeImage"
                  className="size-3.5 accent-red-600"
                />
                Görseli kaldır
              </label>
            </>
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl border border-dashed border-line bg-navy-50/40 text-xs font-semibold text-navy-400">
              Henüz görsel yok
            </div>
          )}
          <input
            type="file"
            name="image"
            accept=".png,.jpg,.jpeg,.webp,.svg"
            className={`${inputCls} file:mr-3 file:rounded-md file:border-0 file:bg-navy-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-navy-700`}
          />
        </div>
      </div>
      <p className="text-xs text-muted">
        Bu bölümdeki &quot;Devamını okuyun&quot; butonu sabittir, Hakkımızda
        sayfasına gider.
      </p>
      <FormStatus state={state} pending={pending} />
    </form>
  );
}

export function CtaForm({ initial }: { initial: GeneralSettings["cta"] }) {
  const [state, formAction, pending] = useActionState<GeneralState, FormData>(
    saveCta,
    {}
  );
  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-line bg-white p-5"
    >
      <label className={labelCls}>
        Başlık
        <input
          type="text"
          name="title"
          required
          defaultValue={initial.title}
          className={inputCls}
        />
      </label>
      <label className={labelCls}>
        Açıklama Metni
        <textarea
          name="text"
          required
          rows={2}
          defaultValue={initial.text}
          className={inputCls}
        />
      </label>
      <ButtonFields legend="1. Buton" prefix="primary" initial={initial.primary} />
      <ButtonFields
        legend="2. Buton"
        prefix="secondary"
        initial={initial.secondary}
      />
      <FormStatus state={state} pending={pending} />
    </form>
  );
}

export function SocialForm({
  initial,
}: {
  initial: GeneralSettings["social"];
}) {
  const [state, formAction, pending] = useActionState<GeneralState, FormData>(
    saveSocial,
    {}
  );
  const fields = [
    ["instagram", "Instagram"],
    ["facebook", "Facebook"],
    ["linkedin", "LinkedIn"],
    ["x", "X (Twitter)"],
  ] as const;
  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-line bg-white p-5"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map(([key, label]) => (
          <label key={key} className={labelCls}>
            {label}
            <input
              type="url"
              name={key}
              defaultValue={initial[key]}
              placeholder="https://..."
              className={inputCls}
            />
          </label>
        ))}
      </div>
      <p className="text-xs text-muted">
        Boş bırakılan hesaplar sitede gösterilmez. Dolu olanlar üst barda sağda
        yan yana görünür.
      </p>
      <FormStatus state={state} pending={pending} />
    </form>
  );
}

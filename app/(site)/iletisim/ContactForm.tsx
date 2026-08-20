"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { submitContact, type ContactState } from "@/app/actions/contact";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; hl?: string }
      ) => number;
      reset: (widgetId?: number) => void;
      ready?: (cb: () => void) => void;
    };
  }
}

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

export function ContactForm({
  recaptchaSiteKey = "",
}: {
  recaptchaSiteKey?: string;
}) {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    {}
  );
  const captchaBox = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  // Kutuyu yalnızca bir kez çiz; script yüklenmeden grecaptcha tanımlı değildir
  useEffect(() => {
    if (!recaptchaSiteKey || !scriptReady) return;
    const g = window.grecaptcha;
    if (!g?.render) return;
    const draw = () => {
      if (captchaBox.current && widgetId.current === null) {
        widgetId.current = g.render(captchaBox.current, {
          sitekey: recaptchaSiteKey,
          hl: "tr",
        });
      }
    };
    if (typeof g.ready === "function") g.ready(draw);
    else draw();
  }, [recaptchaSiteKey, scriptReady]);

  // Gönderim hatayla dönerse token tükenmiştir; kutuyu sıfırla
  useEffect(() => {
    if (state.error && widgetId.current !== null) {
      window.grecaptcha?.reset(widgetId.current);
    }
  }, [state]);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-line bg-navy-50/50 p-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-orange-600 text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-7"
          >
            <path d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-navy-900">
          Mesajınız alındı
        </h3>
        <p className="mt-2 text-sm text-muted">
          En kısa sürede size dönüş yapacağız. Acil konular için bizi
          telefonla arayabilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Bot tuzağı — gerçek kullanıcılar görmez */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-navy-900">
          Ad Soyad *
          <input type="text" name="name" required className={`mt-1.5 ${inputCls}`} />
        </label>
        <label className="block text-sm font-semibold text-navy-900">
          E-posta *
          <input type="email" name="email" required className={`mt-1.5 ${inputCls}`} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-navy-900">
          Telefon
          <input type="tel" name="phone" className={`mt-1.5 ${inputCls}`} />
        </label>
        <label className="block text-sm font-semibold text-navy-900">
          Konu
          <select name="subject" className={`mt-1.5 ${inputCls}`}>
            <option value="">Seçiniz…</option>
            <option>Yat Bayrak Tescili</option>
            <option>Şirket Kuruluşu (ABD / İngiltere)</option>
            <option>Acentelik Hizmetleri</option>
            <option>Gümrük İşlemleri</option>
            <option>Ticari Yat / Balıkçı Gemisi</option>
            <option>Diğer</option>
          </select>
        </label>
      </div>
      <label className="block text-sm font-semibold text-navy-900">
        Mesajınız *
        <textarea
          name="message"
          required
          rows={5}
          className={`mt-1.5 ${inputCls}`}
          placeholder="İşleminizin detaylarını kısaca anlatın…"
        />
      </label>
      {recaptchaSiteKey && (
        <>
          <Script
            src="https://www.google.com/recaptcha/api.js?render=explicit&hl=tr"
            strategy="afterInteractive"
            onLoad={() => setScriptReady(true)}
          />
          <div ref={captchaBox} />
        </>
      )}
      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Gönderiliyor…" : "Mesajı Gönder"}
      </button>
    </form>
  );
}

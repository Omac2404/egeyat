"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cerez-onay";

// Sitenin altında ince çerez bilgilendirme barı; kabul edilince bir daha çıkmaz
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-800 bg-navy-950/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <p className="text-xs text-navy-100 sm:text-sm">
          Sitemiz, düzgün çalışması için yalnızca zorunlu çerezleri kullanır.
          Detaylar için{" "}
          <Link
            href="/cerez-politikasi"
            className="font-semibold text-orange-400 underline-offset-2 hover:underline"
          >
            Çerez Politikamızı
          </Link>{" "}
          inceleyebilirsiniz.
        </p>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, "1");
            setVisible(false);
          }}
          className="shrink-0 rounded-lg bg-orange-600 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-orange-700 sm:text-sm"
        >
          Kabul Et
        </button>
      </div>
    </div>
  );
}

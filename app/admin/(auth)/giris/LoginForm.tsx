"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { login, type LoginState } from "@/app/actions/auth";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "";
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {}
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />
      <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
        Kullanıcı Adı
        <input
          type="text"
          name="username"
          required
          autoComplete="username"
          className="rounded-lg border border-line px-3 py-2 text-base outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
        Şifre
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="rounded-lg border border-line px-3 py-2 text-base outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </label>
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-navy-800 px-4 py-2.5 font-semibold text-white transition hover:bg-navy-900 disabled:opacity-60"
      >
        {pending ? "Giriş yapılıyor…" : "Giriş yap"}
      </button>
    </form>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Yönetici Girişi",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-1 text-xl font-bold text-navy-900">Ege Yatçılık</h1>
        <p className="mb-6 text-sm text-muted">Yönetim paneli girişi</p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}

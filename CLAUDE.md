# Ege Yatçılık

Kurumsal site + yönetim paneli. Türkçe içerik, Türkçe URL'ler (`/admin/giris`, `/admin/tekneler`).

## Stack

Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4 (`@theme` token'ları `app/globals.css` içinde), Drizzle ORM + PostgreSQL (postgres.js), bcryptjs.

Referans proje: `C:\Projeler\ali-ozel` (sanegitim.com) — auth ve panel kalıpları oradan alındı.

## Kurallar

- Auth: middleware yalnızca iyimser cookie kontrolü yapar; gerçek doğrulama `requireUser`/`requireAdmin` (lib/auth/session.ts) ile panel layout'unda ve her server action'da.
- Session token'ın sha256 hash'i DB'de tutulur, ham token yalnızca cookie'de.
- DB komutları: `npm run db:generate` → `db:migrate` → `db:seed` (admin kullanıcısı .env'den).
- Yerel Postgres: `docker compose up -d` (port 5433).
- Yorumlar ve kullanıcıya görünen tüm metinler Türkçe.

# Ege Yatçılık

Ege Yatçılık web sitesi — mavi yolculuk, tekne kiralama ve yat turları. Özel yazılım: kurumsal site + yönetim paneli.

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS 4**
- **PostgreSQL** + Drizzle ORM
- Oturum tabanlı admin auth (bcryptjs + httpOnly cookie, token hash'i DB'de)
- Docker ile deploy (standalone output)

## Geliştirme

```bash
# 1. Bağımlılıklar
npm install

# 2. Ortam değişkenleri
cp .env.example .env   # değerleri düzenle

# 3. Veritabanı (Docker)
docker compose up -d

# 4. Şema + ilk admin
npm run db:generate
npm run db:migrate
npm run db:seed

# 5. Geliştirme sunucusu
npm run dev
```

Site: http://localhost:3000 — Admin panel: http://localhost:3000/admin

## Dizin yapısı

```
app/
  (site)/        # Kamuya açık sayfalar
  admin/
    (auth)/giris # Panel girişi
    (panel)/     # Korumalı panel sayfaları
  actions/       # Server actions
db/              # Drizzle şema + seed
lib/auth/        # Oturum, şifre, rate-limit
```

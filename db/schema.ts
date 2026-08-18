import {
  pgTable,
  pgEnum,
  serial,
  text,
  boolean,
  timestamp,
  date,
  uuid,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";
import type { AnnouncementBlock } from "@/lib/content/announcements";
import type { Service, ServiceSection } from "@/lib/content/services";

// ---------- Enums ----------

export const roleEnum = pgEnum("role", ["admin", "editor"]);
export const submissionKindEnum = pgEnum("submission_kind", [
  "contact",
  "rezervasyon",
]);

// ---------- Auth ----------

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").notNull().default("editor"),
  // Editör rolü için erişilebilir panel sekmeleri (admin tümüne erişir)
  permissions: jsonb("permissions").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const sessions = pgTable("sessions", {
  // Cookie'deki ham token'ın sha256 hex hash'i — DB dökümü session çalmaya yetmez
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------- Site ayarları (key-value) ----------

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

// ---------- Form gönderimleri (iletişim / rezervasyon talebi) ----------

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  kind: submissionKindEnum("kind").notNull().default("contact"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  meta: jsonb("meta").$type<Record<string, string>>(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------- Duyurular (panelden yönetilir) ----------

export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  date: date("date", { mode: "string" }).notNull(),
  summary: text("summary").notNull().default(""),
  blocks: jsonb("blocks").$type<AnnouncementBlock[]>().notNull().default([]),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

// ---------- Hizmet sayfaları (panelden yönetilir) ----------

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  shortTitle: text("short_title").notNull().default(""),
  // components/site/Icon.tsx içindeki isimlerden biri
  icon: text("icon").$type<Service["icon"]>().notNull().default("anchor"),
  summary: text("summary").notNull().default(""),
  intro: text("intro").notNull().default(""),
  // Detay sayfasındaki hizmet görselleri (en fazla 3, slider), boş → yer tutucu
  images: jsonb("images").$type<string[]>().notNull().default([]),
  sections: jsonb("sections").$type<ServiceSection[]>().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

// ---------- Mevzuat belgeleri (panelden yönetilir) ----------

export const mevzuat = pgTable("mevzuat", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  // null → dış bağlantı yok
  href: text("href"),
  // Yüklenen belgenin public yolu (/belgeler/...), null → dosya yok
  filePath: text("file_path"),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

// ---------- Faydalı bağlantılar (mevzuat sayfası yan paneli) ----------

export const usefulLinks = pgTable("useful_links", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  href: text("href").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

// ---------- Tekneler / turlar — tasarım direktifleriyle detaylanacak ----------

export const boats = pgTable("boats", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  summary: text("summary").notNull().default(""),
  description: text("description").notNull().default(""),
  capacity: integer("capacity"),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

import {
  pgTable,
  pgEnum,
  serial,
  text,
  boolean,
  timestamp,
  uuid,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";

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

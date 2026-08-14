import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { services } from "@/db/schema";

// Sitede görünen (yayında olan) hizmetler, sıraya göre
export function getPublishedServices() {
  return db
    .select()
    .from(services)
    .where(eq(services.published, true))
    .orderBy(asc(services.sortOrder), asc(services.id));
}

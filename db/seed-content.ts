import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import {
  announcements as announcementsTable,
  mevzuat,
  services as servicesTable,
} from "./schema";
import { usefulLinks as usefulLinksTable } from "./schema";
import { announcements as staticAnnouncements } from "../lib/content/announcements";
import { mevzuatList, usefulLinks } from "../lib/content/mevzuat";
import { services as staticServices } from "../lib/content/services";

// Statik içeriği DB'ye taşır ve test kullanıcısını oluşturur.
// Tekrar çalıştırmak güvenlidir: var olan kayıtlara dokunmaz.
async function main() {
  const client = postgres(process.env.DATABASE_URL!, { max: 1 });
  const db = drizzle(client);

  for (const a of staticAnnouncements) {
    await db
      .insert(announcementsTable)
      .values({
        slug: a.slug,
        title: a.title,
        date: a.date,
        summary: a.summary,
        blocks: a.blocks,
        published: true,
      })
      .onConflictDoNothing({ target: announcementsTable.slug });
  }
  console.log(`${staticAnnouncements.length} duyuru işlendi`);

  const existing = await db.select({ id: mevzuat.id }).from(mevzuat).limit(1);
  if (existing.length === 0) {
    let order = 0;
    for (const m of mevzuatList) {
      await db.insert(mevzuat).values({
        title: m.title,
        href: m.href,
        sortOrder: order++,
      });
    }
    console.log(`${mevzuatList.length} mevzuat kaydı eklendi`);
  } else {
    console.log("Mevzuat tablosu dolu, atlandı");
  }

  const existingLinks = await db
    .select({ id: usefulLinksTable.id })
    .from(usefulLinksTable)
    .limit(1);
  if (existingLinks.length === 0) {
    let linkOrder = 0;
    for (const l of usefulLinks) {
      await db.insert(usefulLinksTable).values({
        title: l.title,
        href: l.href,
        sortOrder: linkOrder++,
      });
    }
    console.log(`${usefulLinks.length} faydalı bağlantı eklendi`);
  } else {
    console.log("Faydalı bağlantılar tablosu dolu, atlandı");
  }

  let serviceOrder = 0;
  for (const s of staticServices) {
    await db
      .insert(servicesTable)
      .values({
        slug: s.slug,
        title: s.title,
        shortTitle: s.shortTitle,
        icon: s.icon,
        summary: s.summary,
        intro: s.intro,
        sections: s.sections,
        sortOrder: serviceOrder++,
        published: true,
      })
      .onConflictDoNothing({ target: servicesTable.slug });
  }
  console.log(`${staticServices.length} hizmet işlendi`);

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

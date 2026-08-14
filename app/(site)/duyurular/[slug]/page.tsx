import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { formatDate } from "@/lib/content/announcements";
import { PageHero } from "@/components/site/PageHero";
import { Icon } from "@/components/site/Icon";

export const dynamic = "force-dynamic";

async function getAnnouncement(slug: string) {
  const rows = await db
    .select()
    .from(announcements)
    .where(and(eq(announcements.slug, slug), eq(announcements.published, true)))
    .limit(1);
  return rows[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const item = await getAnnouncement((await params).slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = await getAnnouncement((await params).slug);
  if (!item) notFound();

  return (
    <>
      <PageHero
        title={item.title}
        subtitle={formatDate(item.date)}
        crumbs={[
          { href: "/duyurular", label: "Duyurular" },
          { label: item.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16">
        <div className="space-y-6">
          {item.blocks.map((block, i) => {
            if (block.type === "p") {
              return (
                <p key={i} className="leading-relaxed text-muted">
                  {block.text}
                </p>
              );
            }
            if (block.type === "table") {
              return (
                <div
                  key={i}
                  className="overflow-x-auto rounded-2xl border border-line"
                >
                  <table className="w-full text-sm">
                    {block.caption && (
                      <caption className="bg-navy-900 px-4 py-3 text-left font-bold text-white">
                        {block.caption}
                      </caption>
                    )}
                    <thead>
                      <tr className="bg-navy-50 text-left text-navy-900">
                        {block.head.map((h) => (
                          <th key={h} className="px-4 py-3 font-bold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r} className="border-t border-line">
                          {row.map((cell, c) => (
                            <td
                              key={c}
                              className={`px-4 py-3 ${
                                c === row.length - 1
                                  ? "font-semibold text-navy-900"
                                  : "text-muted"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            return (
              <a
                key={i}
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 font-bold text-white transition hover:bg-orange-700"
              >
                {block.label}
                <Icon name="external" className="size-4" />
              </a>
            );
          })}
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <Link
            href="/duyurular"
            className="inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-orange-600"
          >
            <Icon name="arrow" className="size-4 rotate-180" />
            Tüm duyurulara dön
          </Link>
        </div>
      </article>
    </>
  );
}

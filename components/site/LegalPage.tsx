import { PageHero } from "@/components/site/PageHero";
import { Icon } from "@/components/site/Icon";
import {
  parseLegalContent,
  type LegalPageDoc,
} from "@/lib/legal-settings";

// KVKK, gizlilik ve çerez sayfalarının ortak şablonu (içerik panelden yönetilir)
export function LegalPage({ doc }: { doc: LegalPageDoc }) {
  const blocks = parseLegalContent(doc.content);

  return (
    <>
      <PageHero
        title={doc.title}
        subtitle={doc.subtitle}
        crumbs={[{ label: doc.title }]}
      />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="space-y-5">
          {blocks.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="pt-4 text-lg font-bold text-navy-900 first:pt-0"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} className="space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-muted">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-600" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="leading-relaxed text-muted">
                {block.text}
              </p>
            );
          })}
        </div>

        {doc.file && (
          <a
            href={doc.file}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 font-bold text-white transition hover:bg-orange-700"
          >
            <Icon name="doc" className="size-4" />
            Belgeyi İndir
          </a>
        )}
      </section>
    </>
  );
}

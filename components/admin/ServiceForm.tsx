"use client";

import { useRef, useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import type { ServiceSection } from "@/lib/content/services";
import { saveService, type SaveServiceState } from "@/app/actions/hizmetler";

type Initial = {
  id?: number;
  title: string;
  shortTitle: string;
  summary: string;
  intro: string;
  images?: string[];
  published: boolean;
  sections: ServiceSection[];
};

const MAX_IMAGES = 3;

type EditableSection = {
  title: string;
  description: string;
  items: string[];
};

const emptyInitial: Initial = {
  title: "",
  shortTitle: "",
  summary: "",
  intro: "",
  published: true,
  sections: [{ title: "", items: [] }],
};

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";
const smallBtnCls =
  "rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-navy-700 transition hover:border-orange-500 hover:text-orange-600";

export function ServiceForm({ initial }: { initial?: Initial }) {
  const init = initial ?? emptyInitial;
  const [sections, setSections] = useState<EditableSection[]>(
    init.sections.map((s) => ({
      title: s.title,
      description: s.description ?? "",
      items: s.items.length > 0 ? s.items : [""],
    }))
  );
  const [state, formAction, pending] = useActionState<
    SaveServiceState,
    FormData
  >(saveService, {});
  // Mevcut görsellerden formda tutulmaya devam edenler
  const [keptImages, setKeptImages] = useState<string[]>(init.images ?? []);
  // Yeni seçilen görseller: dosyalar gizli inputlarda durur, burada önizlemeleri tutulur
  const fileInput0 = useRef<HTMLInputElement>(null);
  const fileInput1 = useRef<HTMLInputElement>(null);
  const fileInput2 = useRef<HTMLInputElement>(null);
  const fileInputs = [fileInput0, fileInput1, fileInput2];
  const [newImages, setNewImages] = useState<
    { slot: number; url: string; name: string }[]
  >([]);
  const totalImages = keptImages.length + newImages.length;

  const pickImage = () => {
    const free = [0, 1, 2].find(
      (i) => !newImages.some((n) => n.slot === i)
    );
    if (free !== undefined) fileInputs[free].current?.click();
  };

  const onImagePicked = (slot: number, file: File | undefined) => {
    if (!file) return;
    setNewImages((prev) => [
      ...prev.filter((n) => n.slot !== slot),
      { slot, url: URL.createObjectURL(file), name: file.name },
    ]);
  };

  const removeNewImage = (slot: number) => {
    const input = fileInputs[slot].current;
    if (input) input.value = "";
    setNewImages((prev) => {
      const item = prev.find((n) => n.slot === slot);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((n) => n.slot !== slot);
    });
  };
  // Sürükle-bırak: taşınan madde ve üzerinde durulan hedef
  const [drag, setDrag] = useState<{ sec: number; idx: number } | null>(null);
  const [dragOver, setDragOver] = useState<{ sec: number; idx: number } | null>(
    null
  );

  // Tamamen boş bırakılan bölümler kayda dahil edilmez
  const serialized = JSON.stringify(
    sections
      .map((s) => ({
        title: s.title.trim(),
        description: s.description.trim() || undefined,
        items: s.items.map((t) => t.trim()).filter(Boolean),
      }))
      .filter((s) => s.title || s.description || s.items.length > 0)
  );

  const setSection = (i: number, patch: Partial<EditableSection>) =>
    setSections((prev) =>
      prev.map((s, j) => (j === i ? { ...s, ...patch } : s))
    );

  const moveSection = (i: number, dir: -1 | 1) =>
    setSections((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  return (
    <form action={formAction} className="max-w-5xl space-y-6">
      {init.id && <input type="hidden" name="id" value={init.id} />}
      <input type="hidden" name="sections" value={serialized} />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-4 rounded-2xl border border-line bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
          Başlık
          <input
            type="text"
            name="title"
            required
            defaultValue={init.title}
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
          Kısa Başlık (kompakt alanlarda görünür)
          <input
            type="text"
            name="shortTitle"
            required
            defaultValue={init.shortTitle}
            className={inputCls}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
        Özet (kartlarda ve sayfa başlığında görünür)
        <textarea
          name="summary"
          required
          rows={2}
          defaultValue={init.summary}
          className={inputCls}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
        Giriş Metni (detay sayfasının ilk paragrafı)
        <textarea
          name="intro"
          required
          rows={3}
          defaultValue={init.intro}
          className={inputCls}
        />
      </label>
      </div>

      {/* Hizmet görselleri kartı (en fazla 3 slot, sitede slider olarak döner) */}
      <div className="space-y-3 rounded-2xl border border-line bg-white p-5">
        <p className="text-sm font-bold text-navy-900">
          Hizmet Görselleri{" "}
          <span className="font-medium text-navy-400">
            ({totalImages}/{MAX_IMAGES})
          </span>
        </p>
        <input type="hidden" name="keepImages" value={JSON.stringify(keptImages)} />
        {/* Dosyalar bu gizli inputlarda taşınır; kaydete basınca yüklenir */}
        {fileInputs.map((ref, i) => (
          <input
            key={i}
            ref={ref}
            type="file"
            name="images"
            accept=".png,.jpg,.jpeg,.webp,.svg"
            className="hidden"
            onChange={(e) => onImagePicked(i, e.target.files?.[0])}
          />
        ))}
        <div className="grid grid-cols-3 gap-2.5">
          {keptImages.map((img) => (
            <div key={img} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt="Hizmet görseli"
                className="aspect-square w-full rounded-xl border border-line object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  setKeptImages((prev) => prev.filter((p) => p !== img))
                }
                title="Görseli kaldır"
                className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white shadow transition hover:bg-red-700"
              >
                ×
              </button>
            </div>
          ))}
          {newImages
            .slice()
            .sort((a, b) => a.slot - b.slot)
            .map((n) => (
              <div key={n.slot} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={n.url}
                  alt={n.name}
                  title={n.name}
                  className="aspect-square w-full rounded-xl border-2 border-dashed border-orange-300 object-cover"
                />
                <span className="absolute bottom-1 left-1 rounded bg-orange-600/90 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  Yeni
                </span>
                <button
                  type="button"
                  onClick={() => removeNewImage(n.slot)}
                  title="Görseli kaldır"
                  className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white shadow transition hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          {totalImages < MAX_IMAGES && (
            <button
              type="button"
              onClick={pickImage}
              className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line bg-navy-50/40 text-navy-400 transition hover:border-orange-400 hover:text-orange-600"
            >
              <span className="text-xl leading-none">+</span>
              <span className="text-[10px] font-semibold">Görsel Ekle</span>
            </button>
          )}
        </div>
        <p className="text-xs text-navy-400">
          En fazla {MAX_IMAGES} görsel; &quot;Yeni&quot; etiketli görseller
          kaydete basınca yüklenir. Sitede slider olarak gösterilir.
        </p>
      </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-bold text-navy-900">Bölümler</p>
        {sections.map((sec, i) => (
          <div
            key={i}
            className="rounded-xl border border-line bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-400">
                Bölüm {i + 1}
              </span>
              <span className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => moveSection(i, -1)}
                  className={smallBtnCls}
                  aria-label="Yukarı taşı"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(i, 1)}
                  className={smallBtnCls}
                  aria-label="Aşağı taşı"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSections((prev) => prev.filter((_, j) => j !== i))
                  }
                  className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Kaldır
                </button>
              </span>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={sec.title}
                onChange={(e) => setSection(i, { title: e.target.value })}
                className={inputCls}
                placeholder="Bölüm başlığı (örn. Özel Tekne)"
              />
              <textarea
                rows={2}
                value={sec.description}
                onChange={(e) =>
                  setSection(i, { description: e.target.value })
                }
                className={inputCls}
                placeholder="Bölüm açıklaması (opsiyonel)"
              />
              <div className="rounded-lg border border-line bg-navy-50/40 p-3">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-navy-400">
                  Maddeler
                </p>
                <div className="space-y-2">
                  {sec.items.map((item, k) => (
                    <div
                      key={k}
                      onDragOver={(e) => {
                        if (drag?.sec === i) {
                          e.preventDefault();
                          setDragOver({ sec: i, idx: k });
                        }
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (drag && drag.sec === i && drag.idx !== k) {
                          setSection(i, {
                            items: (() => {
                              const next = [...sec.items];
                              const [moved] = next.splice(drag.idx, 1);
                              next.splice(k, 0, moved);
                              return next;
                            })(),
                          });
                        }
                        setDrag(null);
                        setDragOver(null);
                      }}
                      className={`flex items-center gap-2 rounded-lg transition ${
                        dragOver?.sec === i && dragOver.idx === k
                          ? "ring-2 ring-orange-400"
                          : ""
                      } ${drag?.sec === i && drag.idx === k ? "opacity-50" : ""}`}
                    >
                      <span
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.effectAllowed = "move";
                          setDrag({ sec: i, idx: k });
                        }}
                        onDragEnd={() => {
                          setDrag(null);
                          setDragOver(null);
                        }}
                        title="Sürükleyerek sırala"
                        className="flex w-10 shrink-0 cursor-grab items-center justify-end gap-1 text-xs font-bold text-navy-400 active:cursor-grabbing"
                      >
                        <span className="select-none tracking-tighter">⠿</span>
                        {k + 1}.
                      </span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          setSection(i, {
                            items: sec.items.map((x, j) =>
                              j === k ? e.target.value : x
                            ),
                          })
                        }
                        className={inputCls}
                        placeholder="Madde metni"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSection(i, {
                            items: sec.items.filter((_, j) => j !== k),
                          })
                        }
                        className="shrink-0 rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Sil
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSection(i, { items: [...sec.items, ""] })
                  }
                  className={`${smallBtnCls} mt-3`}
                >
                  + Madde Ekle
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setSections((prev) => [
              ...prev,
              { title: "", description: "", items: [""] },
            ])
          }
          className={smallBtnCls}
        >
          + Bölüm Ekle
        </button>
      </div>

      <div className="space-y-4 rounded-2xl border border-line bg-white p-5">
      <label className="flex items-center gap-2 text-sm font-medium text-navy-900">
        <input
          type="checkbox"
          name="published"
          defaultChecked={init.published}
          className="size-4 accent-orange-600"
        />
        Yayında (işaret kaldırılırsa sitede görünmez)
      </label>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-700 disabled:opacity-60"
        >
          {pending ? "Kaydediliyor…" : "Kaydet"}
        </button>
        <Link
          href="/admin/hizmetler"
          className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-navy-700 transition hover:border-orange-500"
        >
          Vazgeç
        </Link>
      </div>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import type { AnnouncementBlock } from "@/lib/content/announcements";
import {
  saveAnnouncement,
  type SaveAnnouncementState,
} from "@/app/actions/duyurular";

type Initial = {
  id?: number;
  title: string;
  date: string;
  summary: string;
  published: boolean;
  blocks: AnnouncementBlock[];
};

const emptyInitial: Initial = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  summary: "",
  published: true,
  blocks: [{ type: "p", text: "" }],
};

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";
const smallBtnCls =
  "rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-navy-700 transition hover:border-orange-500 hover:text-orange-600";

export function AnnouncementForm({ initial }: { initial?: Initial }) {
  const init = initial ?? emptyInitial;
  const [blocks, setBlocks] = useState<AnnouncementBlock[]>(init.blocks);
  const [state, formAction, pending] = useActionState<
    SaveAnnouncementState,
    FormData
  >(saveAnnouncement, {});

  const setBlock = (i: number, block: AnnouncementBlock) =>
    setBlocks((prev) => prev.map((b, j) => (j === i ? block : b)));

  const removeBlock = (i: number) =>
    setBlocks((prev) => prev.filter((_, j) => j !== i));

  const moveBlock = (i: number, dir: -1 | 1) =>
    setBlocks((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const addBlock = (block: AnnouncementBlock) =>
    setBlocks((prev) => [...prev, block]);

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      {init.id && <input type="hidden" name="id" value={init.id} />}
      <input type="hidden" name="blocks" value={JSON.stringify(blocks)} />

      <div className="space-y-4 rounded-2xl border border-line bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
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
          Tarih
          <input
            type="date"
            name="date"
            required
            defaultValue={init.date}
            className={inputCls}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-navy-900">
        Özet (listelerde görünür)
        <textarea
          name="summary"
          required
          rows={2}
          defaultValue={init.summary}
          className={inputCls}
        />
      </label>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-bold text-navy-900">İçerik</p>
        {blocks.map((block, i) => (
          <div
            key={i}
            className="rounded-xl border border-line bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-400">
                {block.type === "p"
                  ? "Paragraf"
                  : block.type === "table"
                    ? "Tablo"
                    : "Bağlantı"}
              </span>
              <span className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => moveBlock(i, -1)}
                  className={smallBtnCls}
                  aria-label="Yukarı taşı"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(i, 1)}
                  className={smallBtnCls}
                  aria-label="Aşağı taşı"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(i)}
                  className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Kaldır
                </button>
              </span>
            </div>

            {block.type === "p" && (
              <textarea
                rows={3}
                value={block.text}
                onChange={(e) => setBlock(i, { ...block, text: e.target.value })}
                className={inputCls}
                placeholder="Paragraf metni"
              />
            )}

            {block.type === "link" && (
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={block.label}
                  onChange={(e) =>
                    setBlock(i, { ...block, label: e.target.value })
                  }
                  className={inputCls}
                  placeholder="Buton yazısı"
                />
                <input
                  type="url"
                  value={block.href}
                  onChange={(e) =>
                    setBlock(i, { ...block, href: e.target.value })
                  }
                  className={inputCls}
                  placeholder="https://..."
                />
              </div>
            )}

            {block.type === "table" && (
              <div className="space-y-3">
                <input
                  type="text"
                  value={block.caption ?? ""}
                  onChange={(e) =>
                    setBlock(i, { ...block, caption: e.target.value })
                  }
                  className={inputCls}
                  placeholder="Tablo başlığı (opsiyonel)"
                />
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        {block.head.map((h, c) => (
                          <th key={c} className="p-1">
                            <input
                              type="text"
                              value={h}
                              onChange={(e) =>
                                setBlock(i, {
                                  ...block,
                                  head: block.head.map((x, k) =>
                                    k === c ? e.target.value : x
                                  ),
                                })
                              }
                              className={`${inputCls} font-semibold`}
                              placeholder={`Sütun ${c + 1}`}
                            />
                          </th>
                        ))}
                        <th className="w-16" />
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, c) => (
                            <td key={c} className="p-1">
                              <input
                                type="text"
                                value={cell}
                                onChange={(e) =>
                                  setBlock(i, {
                                    ...block,
                                    rows: block.rows.map((rw, rk) =>
                                      rk === r
                                        ? rw.map((x, ck) =>
                                            ck === c ? e.target.value : x
                                          )
                                        : rw
                                    ),
                                  })
                                }
                                className={inputCls}
                              />
                            </td>
                          ))}
                          <td className="p-1 text-center">
                            <button
                              type="button"
                              onClick={() =>
                                setBlock(i, {
                                  ...block,
                                  rows: block.rows.filter((_, rk) => rk !== r),
                                })
                              }
                              className="text-xs font-semibold text-red-600 hover:underline"
                            >
                              Sil
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setBlock(i, {
                        ...block,
                        rows: [...block.rows, block.head.map(() => "")],
                      })
                    }
                    className={smallBtnCls}
                  >
                    + Satır
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setBlock(i, {
                        ...block,
                        head: [...block.head, ""],
                        rows: block.rows.map((r) => [...r, ""]),
                      })
                    }
                    className={smallBtnCls}
                  >
                    + Sütun
                  </button>
                  {block.head.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setBlock(i, {
                          ...block,
                          head: block.head.slice(0, -1),
                          rows: block.rows.map((r) => r.slice(0, -1)),
                        })
                      }
                      className={smallBtnCls}
                    >
                      − Sütun
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => addBlock({ type: "p", text: "" })}
            className={smallBtnCls}
          >
            + Paragraf
          </button>
          <button
            type="button"
            onClick={() =>
              addBlock({
                type: "table",
                caption: "",
                head: ["", ""],
                rows: [["", ""]],
              })
            }
            className={smallBtnCls}
          >
            + Tablo
          </button>
          <button
            type="button"
            onClick={() => addBlock({ type: "link", href: "", label: "" })}
            className={smallBtnCls}
          >
            + Bağlantı
          </button>
        </div>
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
          href="/admin/duyurular"
          className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-navy-700 transition hover:border-orange-500"
        >
          Vazgeç
        </Link>
      </div>
      </div>
    </form>
  );
}

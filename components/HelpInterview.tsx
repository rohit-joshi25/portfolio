"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  laravelInterviewQuestions,
  interviewCategories,
  type Kind,
  type Level,
} from "@/data/laravel-interview";

const levels: Array<Level | "all"> = ["all", "basic", "intermediate", "advanced"];
const kinds: Array<Kind | "all"> = ["all", "conceptual", "coding"];

export default function HelpInterview() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<Level | "all">("all");
  const [kind, setKind] = useState<Kind | "all">("all");
  const [category, setCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return laravelInterviewQuestions.filter((item) => {
      if (level !== "all" && item.level !== level) return false;
      if (kind !== "all" && item.kind !== kind) return false;
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      return (
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.code?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [search, level, kind, category]);

  const activeFilters =
    level === "all" && kind === "all" && category === "all"
      ? "All"
      : [
          level !== "all" ? level : null,
          kind !== "all" ? (kind === "conceptual" ? "non-coding" : "coding") : null,
          category !== "all" ? category : null,
        ]
          .filter(Boolean)
          .join(" · ");

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="mb-6 flex items-end justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Laravel interview
          </h1>
          <p className="text-sm text-zinc-500">
            {filtered.length} / {laravelInterviewQuestions.length}
          </p>
        </header>

        <div className="sticky top-0 z-20 mb-5 border-b border-zinc-200 bg-white py-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-blue-600"
          />

          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            className="mt-2 flex w-full items-center justify-between rounded-md border border-zinc-300 px-3 py-2 text-left text-sm md:hidden"
            aria-expanded={filtersOpen}
          >
            <span>
              <span className="font-medium">Filters</span>
              <span className="text-zinc-500"> — {activeFilters}</span>
            </span>
            <span className={filtersOpen ? "rotate-180" : ""}>▾</span>
          </button>

          <div
            className={`${filtersOpen ? "mt-3 flex" : "hidden"} flex-col gap-2 md:mt-3 md:flex`}
          >
            <FilterRow label="Level">
              {levels.map((item) => (
                <Chip key={item} active={level === item} onClick={() => setLevel(item)}>
                  {item}
                </Chip>
              ))}
            </FilterRow>
            <FilterRow label="Type">
              {kinds.map((item) => (
                <Chip key={item} active={kind === item} onClick={() => setKind(item)}>
                  {item === "conceptual" ? "non-coding" : item}
                </Chip>
              ))}
            </FilterRow>
            <FilterRow label="Topic">
              <Chip active={category === "all"} onClick={() => setCategory("all")}>
                all
              </Chip>
              {interviewCategories.map((item) => (
                <Chip
                  key={item}
                  active={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </Chip>
              ))}
            </FilterRow>
            {(level !== "all" || kind !== "all" || category !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setLevel("all");
                  setKind("all");
                  setCategory("all");
                }}
                className="self-start text-sm text-blue-700 hover:underline md:hidden"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="divide-y divide-zinc-200 border-t border-zinc-200">
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-zinc-500">No matches.</p>
          )}

          {filtered.map((item, index) => {
            const open = openId === item.id;
            return (
              <article key={item.id} className="bg-white">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full items-start gap-3 py-4 text-left"
                >
                  <span className="w-8 shrink-0 pt-0.5 text-sm tabular-nums text-blue-700">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-1 block text-xs text-zinc-500">
                      {item.level} · {item.kind === "conceptual" ? "non-coding" : "coding"} · {item.category}
                    </span>
                    <span className="block text-[15px] font-medium leading-snug text-zinc-900">
                      {item.q}
                    </span>
                  </span>
                  <span className="text-zinc-400">{open ? "–" : "+"}</span>
                </button>

                {open && (
                  <div className="pb-5 pl-0 sm:pl-11">
                    <AnswerBody text={item.a} />
                    {item.code && (
                      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-md border border-zinc-200 bg-zinc-50 p-3 text-[13px] leading-6 text-zinc-800">
                        <code>{item.code}</code>
                      </pre>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="w-12 shrink-0 text-xs text-zinc-500">{label}</span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1 text-xs capitalize ${
        active
          ? "border-blue-700 bg-blue-700 text-white"
          : "border-zinc-300 bg-white text-zinc-700 hover:border-blue-400"
      }`}
    >
      {children}
    </button>
  );
}

function AnswerBody({ text }: { text: string }) {
  const blocks = parseAnswer(text);

  return (
    <div className="space-y-3 text-[15px] leading-7 text-zinc-800">
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return <p key={i}>{block.text}</p>;
        }
        return (
          <ol key={i} className="space-y-3">
            {block.items.map((item, j) => (
              <li key={j} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white">
                  {j + 1}
                </span>
                <span className="min-w-0 flex-1 pt-px">{item}</span>
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}

function parseAnswer(text: string): Array<
  { type: "p"; text: string } | { type: "steps"; items: string[] }
> {
  const stepCount = text.match(/\d+\)\s/g)?.length ?? 0;
  const chunks = text
    .split(/(?=\b(?:Interview tip|Fix|Reason|Remember|Note):)/i)
    .map((s) => s.trim())
    .filter(Boolean);

  if (stepCount < 2) {
    return chunks.map((chunk) => ({ type: "p", text: chunk }));
  }

  const blocks: Array<{ type: "p"; text: string } | { type: "steps"; items: string[] }> = [];

  for (const chunk of chunks) {
    if ((chunk.match(/\d+\)\s/g)?.length ?? 0) < 2) {
      blocks.push({ type: "p", text: chunk });
      continue;
    }

    const parts = chunk.split(/(?=\d+\)\s)/);
    const intro = parts[0]?.trim();
    if (intro && !/^\d+\)/.test(intro)) {
      blocks.push({ type: "p", text: intro });
    }

    const items = parts
      .map((p) => p.trim())
      .filter((p) => /^\d+\)/.test(p))
      .map((p) => p.replace(/^\d+\)\s*/, "").trim())
      .filter(Boolean);

    if (items.length) {
      blocks.push({ type: "steps", items });
    }
  }

  return blocks;
}

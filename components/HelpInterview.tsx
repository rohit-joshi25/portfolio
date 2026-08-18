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

const levelStyle: Record<Level, string> = {
  basic: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  intermediate: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  advanced: "bg-rose-500/15 text-rose-300 border-rose-500/30",
};

const kindStyle: Record<Kind, string> = {
  conceptual: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  coding: "bg-violet-500/15 text-violet-300 border-violet-500/30",
};

export default function HelpInterview() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<Level | "all">("all");
  const [kind, setKind] = useState<Kind | "all">("all");
  const [category, setCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);

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

  const counts = useMemo(() => {
    const all = laravelInterviewQuestions.length;
    const coding = laravelInterviewQuestions.filter((i) => i.kind === "coding").length;
    const conceptual = all - coding;
    return { all, coding, conceptual };
  }, []);

  return (
    <div className="min-h-screen bg-black-100 text-white-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-purple">
            Private prep · /help
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Laravel interview sheet
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white-200 sm:text-base">
            ~1 year Backend / Laravel role: basic → advanced, conceptual + coding.
            Click a question to reveal the answer. Direct URL only — not linked from the
            homepage.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-white-200">
            <span>{counts.all} questions</span>
            <span>·</span>
            <span>{counts.conceptual} conceptual</span>
            <span>·</span>
            <span>{counts.coding} coding</span>
            <span>·</span>
            <span>{filtered.length} showing</span>
          </div>
        </header>

        <div className="sticky top-0 z-20 -mx-4 mb-6 border-b border-white/10 bg-black-100/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions, answers, code..."
            className="mb-3 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white outline-none ring-purple/40 placeholder:text-white/40 focus:ring-2"
          />

          <div className="flex flex-col gap-3">
            <FilterRow label="Level">
              {levels.map((item) => (
                <Chip
                  key={item}
                  active={level === item}
                  onClick={() => setLevel(item)}
                >
                  {item}
                </Chip>
              ))}
            </FilterRow>
            <FilterRow label="Type">
              {kinds.map((item) => (
                <Chip
                  key={item}
                  active={kind === item}
                  onClick={() => setKind(item)}
                >
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
          </div>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <p className="rounded-2xl border border-white/10 p-8 text-center text-white-200">
              No questions match that filter.
            </p>
          )}

          {filtered.map((item, index) => {
            const open = openId === item.id;
            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[rgb(4,7,29)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full items-start gap-3 px-4 py-4 text-left sm:px-5"
                >
                  <span className="mt-0.5 w-8 shrink-0 text-sm font-semibold text-purple">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-2 flex flex-wrap gap-2">
                      <Badge className={levelStyle[item.level]}>{item.level}</Badge>
                      <Badge className={kindStyle[item.kind]}>
                        {item.kind === "conceptual" ? "non-coding" : "coding"}
                      </Badge>
                      <Badge className="border-white/15 bg-white/5 text-white-200">
                        {item.category}
                      </Badge>
                    </span>
                    <span className="block text-sm font-semibold text-white sm:text-base">
                      {item.q}
                    </span>
                  </span>
                  <span className="mt-1 text-white-200">{open ? "−" : "+"}</span>
                </button>

                {open && (
                  <div className="border-t border-white/10 px-4 py-4 sm:px-5 sm:pl-[3.75rem]">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-white-200">
                      {item.a}
                    </p>
                    {item.code && (
                      <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 text-xs leading-relaxed text-blue-100">
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
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-14 shrink-0 text-xs uppercase tracking-wide text-white/40">
        {label}
      </span>
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
      className={`rounded-full border px-3 py-1 text-xs capitalize transition ${
        active
          ? "border-purple/60 bg-purple/20 text-white"
          : "border-white/10 bg-white/5 text-white-200 hover:border-white/25"
      }`}
    >
      {children}
    </button>
  );
}

function Badge({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${className}`}>
      {children}
    </span>
  );
}

"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { categoryLabels, getEventYear } from "@/content";
import type { EventCategory, EventRecord } from "@/content/types";
import { cn } from "@/lib/utils";
import { EventCard } from "./EventCard";

/** Asymmetric 12-column rhythm. */
const slots = [
  { col: "lg:col-span-7", aspect: "landscape", offset: "" },
  { col: "lg:col-span-4 lg:col-start-9", aspect: "portrait", offset: "lg:mt-32" },
  { col: "lg:col-span-5 lg:col-start-2", aspect: "square", offset: "" },
  { col: "lg:col-span-5 lg:col-start-8", aspect: "landscape", offset: "lg:mt-24" },
  { col: "lg:col-span-8", aspect: "wide", offset: "" },
  { col: "lg:col-span-4", aspect: "portrait", offset: "lg:mt-40" },
] as const;

type Props = {
  events: EventRecord[];
  categories: EventCategory[];
  years: number[];
};

export function EventsIndex({ events, categories, years }: Props) {
  const [category, setCategory] = useState<EventCategory | "all">("all");
  const [year, setYear] = useState<number | "all">("all");

  const visible = useMemo(
    () =>
      events.filter(
        (e) => (category === "all" || e.category === category) && (year === "all" || getEventYear(e) === year),
      ),
    [events, category, year],
  );

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-smoke py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>
            All
          </Chip>
          {categories.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {categoryLabels[c]}
            </Chip>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="year" className="eyebrow text-ash">
            Year
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="rounded-full border border-smoke bg-transparent px-4 py-2 text-sm text-bone outline-none transition-colors focus:border-bone"
          >
            <option value="all" className="bg-ink">
              All years
            </option>
            {years.map((y) => (
              <option key={y} value={y} className="bg-ink">
                {y}
              </option>
            ))}
          </select>
          <span className="font-mono text-xs text-ash" aria-live="polite">
            {visible.length.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      <LayoutGroup>
        <motion.ul layout className="mt-16 grid gap-x-8 gap-y-20 lg:grid-cols-12 lg:gap-y-28">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((e, i) => {
              const s = slots[i % slots.length];
              return (
                <motion.li
                  key={e.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(s.col, s.offset)}
                >
                  <EventCard
                    event={e}
                    aspect={s.aspect}
                    index={i + 1}
                    priority={i < 2}
                    showSummary={s.aspect !== "portrait"}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    titleClassName={s.aspect === "wide" || s.aspect === "landscape" ? "md:text-display-md" : undefined}
                  />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      {visible.length === 0 && (
        <p className="py-24 text-center font-display text-display-sm text-ash">Nothing matches those filters yet.</p>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-colors duration-500",
        active ? "border-bone bg-bone text-ink" : "border-smoke text-bone/80 hover:border-bone/60",
      )}
    >
      {children}
    </button>
  );
}

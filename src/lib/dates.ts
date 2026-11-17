/**
 * Date helpers. All event dates in content are ISO 8601 strings with an
 * explicit offset, so arithmetic is unambiguous regardless of visitor timezone.
 */

export type DateParts = {
  day: string;
  month: string;
  monthShort: string;
  year: string;
  weekday: string;
  time: string;
};

export function toDate(iso: string) {
  return new Date(iso);
}

export function formatDateParts(iso: string, timeZone?: string): DateParts {
  const d = toDate(iso);
  const opts = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone, ...o }).format(d);
  return {
    day: opts({ day: "2-digit" }),
    month: opts({ month: "long" }),
    monthShort: opts({ month: "short" }),
    year: opts({ year: "numeric" }),
    weekday: opts({ weekday: "long" }),
    time: opts({ hour: "2-digit", minute: "2-digit", hour12: false }),
  };
}

export function formatLongDate(iso: string, timeZone?: string) {
  const p = formatDateParts(iso, timeZone);
  return `${p.weekday}, ${p.day} ${p.month} ${p.year}`;
}

export function formatTimeRange(startIso: string, endIso: string, timeZone?: string) {
  const s = formatDateParts(startIso, timeZone);
  const e = formatDateParts(endIso, timeZone);
  return `${s.time} – ${e.time}`;
}

export function formatDateRange(startIso: string, endIso: string, timeZone?: string) {
  const s = formatDateParts(startIso, timeZone);
  const e = formatDateParts(endIso, timeZone);
  if (s.day === e.day && s.month === e.month && s.year === e.year) {
    return `${s.day} ${s.month} ${s.year}`;
  }
  if (s.month === e.month && s.year === e.year) {
    return `${s.day}–${e.day} ${s.month} ${s.year}`;
  }
  return `${s.day} ${s.monthShort} – ${e.day} ${e.monthShort} ${e.year}`;
}

export function isFuture(iso: string, now = Date.now()) {
  return toDate(iso).getTime() > now;
}

export type Remaining = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function remainingUntil(iso: string, now = Date.now()): Remaining {
  const total = Math.max(0, toDate(iso).getTime() - now);
  const seconds = Math.floor(total / 1000);
  return {
    total,
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

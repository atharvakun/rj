/**
 * Content loaders.
 *
 * Components import from here, never from the data files directly. To wire a
 * CMS later, make these functions async and fetch instead of reading the
 * local arrays. Signatures are intentionally CMS-friendly.
 */
import { pastEvents, upcomingEvents } from "./events";
import type { EventCategory, EventRecord } from "./types";

export { site } from "./site";
export { about } from "./about";
export { awards } from "./awards";
export type * from "./types";

export const allEvents: EventRecord[] = [...upcomingEvents, ...pastEvents];

export const categoryLabels: Record<EventCategory, string> = {
  festival: "Festival",
  concert: "Concert",
  "performing-arts": "Performing arts",
  community: "Community",
  exhibition: "Exhibition",
  celebration: "Celebration",
  awards: "Award ceremony",
};

const byStartAsc = (a: EventRecord, b: EventRecord) =>
  new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();
const byStartDesc = (a: EventRecord, b: EventRecord) => -byStartAsc(a, b);

/** Events that have not yet ended, soonest first. */
export function getUpcomingEvents(now: number = Date.now()) {
  return allEvents.filter((e) => new Date(e.endsAt).getTime() > now).sort(byStartAsc);
}

/** Events that have ended, most recent first. */
export function getPastEvents(now: number = Date.now()) {
  return allEvents.filter((e) => new Date(e.endsAt).getTime() <= now).sort(byStartDesc);
}

export function getNextEvent(now: number = Date.now()) {
  return getUpcomingEvents(now)[0] ?? null;
}

export function getEventBySlug(slug: string) {
  return allEvents.find((e) => e.slug === slug) ?? null;
}

export function getAllSlugs() {
  return allEvents.map((e) => e.slug);
}

export function isUpcoming(event: EventRecord, now: number = Date.now()) {
  return new Date(event.endsAt).getTime() > now;
}

export function isLive(event: EventRecord, now: number = Date.now()) {
  return new Date(event.startsAt).getTime() <= now && new Date(event.endsAt).getTime() > now;
}

export function getEventYear(event: EventRecord) {
  return new Date(event.startsAt).getFullYear();
}

/** Same category first, then most recent, excluding the event itself. */
export function getRelatedEvents(event: EventRecord, limit = 3) {
  const others = allEvents.filter((e) => e.slug !== event.slug);
  const same = others.filter((e) => e.category === event.category).sort(byStartDesc);
  const rest = others.filter((e) => e.category !== event.category).sort(byStartDesc);
  return [...same, ...rest].slice(0, limit);
}

/** Previous / next in chronological order, for event-to-event navigation. */
export function getAdjacentEvents(event: EventRecord) {
  const sorted = [...allEvents].sort(byStartDesc);
  const i = sorted.findIndex((e) => e.slug === event.slug);
  return {
    newer: i > 0 ? sorted[i - 1] : null,
    older: i < sorted.length - 1 ? sorted[i + 1] : null,
  };
}

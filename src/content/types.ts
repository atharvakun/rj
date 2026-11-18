/**
 * Content model.
 *
 * Everything the organisation might want to change lives in `src/content/*`.
 * These types are deliberately CMS-shaped so a headless CMS (Sanity, Payload,
 * Contentful, a database…) can be dropped in later by swapping the loaders in
 * `src/content/index.ts` without touching any component.
 */

export type ImageAsset = {
  /** Absolute URL or `/public` path. */
  src: string;
  alt: string;
  /** Intrinsic dimensions help Next.js reserve layout space and pick sizes. */
  width?: number;
  height?: number;
  /** CSS object-position, e.g. "50% 30%". Defaults to centre. */
  position?: string;
};

export type VideoAsset = {
  /** Direct MP4/WebM URL. YouTube/Vimeo can be added via `embedUrl`. */
  src?: string;
  embedUrl?: string;
  poster: ImageAsset;
  title: string;
  duration?: string;
};

export type EventCategory =
  | "festival"
  | "concert"
  | "performing-arts"
  | "community"
  | "exhibition"
  | "celebration"
  | "awards";

export type Venue = {
  name: string;
  address?: string;
  city: string;
  country?: string;
  mapUrl?: string;
};

export type Memory = {
  quote: string;
  name: string;
  role?: string;
};

export type EventRecord = {
  slug: string;
  title: string;
  /** Short editorial subtitle / strapline. */
  strapline?: string;
  category: EventCategory;
  /** ISO 8601 with offset, e.g. "2027-03-20T18:00:00+05:30". */
  startsAt: string;
  endsAt: string;
  /** IANA zone used for display, e.g. "Asia/Kolkata". */
  timeZone: string;
  venue: Venue;
  summary: string;
  /** Paragraphs for the event detail page. */
  body: string[];
  cover: ImageAsset;
  /** Optional alternative tall poster for the upcoming showcase. */
  poster?: ImageAsset;
  gallery: ImageAsset[];
  videos: VideoAsset[];
  memories: Memory[];
  /** Highlights such as "3 stages", "40 artists". */
  facts?: { label: string; value: string }[];
  /** Registration / ticket / enquiry link. Falls back to the contact form. */
  registrationUrl?: string;
  /** Optional accent colour override for this event (CSS colour). */
  accent?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  kind: "attendee" | "client" | "partner";
  photo?: ImageAsset;
};

export type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  note?: string;
};

export type TeamMember = {
  /** Leave undefined until the person has confirmed; the card then reads “to be confirmed”. */
  name?: string;
  role: string;
  /** One line on what the role does, or a short bio. */
  blurb?: string;
  photo?: ImageAsset;
};

export type SocialLink = {
  label: string;
  href: string;
  handle?: string;
};

export type NavLink = {
  label: string;
  href: string;
};

import type { NavLink, SocialLink } from "./types";

/**
 * ORGANISATION & BRAND
 * --------------------------------------------------------------------------
 * Rajasthan Puraskar Samaj: a community organisation of people of Rajasthani
 * origin settled in Maharashtra. Contact details, socials and the legal line
 * are PLACEHOLDERS until the Samaj supplies them. Colours live in
 * `globals.css` (`--color-ember` etc.).
 */
export const site = {
  name: "Rajasthan Puraskar Samaj",
  /** Short form for tight spaces (favicon, mobile). */
  shortName: "RPS",
  /** Rendered in the wordmark. */
  wordmark: "Rajasthan Puraskar Samaj",
  /** Small descriptor shown beneath / beside the wordmark and in metadata. */
  descriptor: "Honouring Rajasthanis in Maharashtra",
  tagline: "From Rajasthan. For Maharashtra.",
  description:
    "A samaj of people with roots in Rajasthan and lives in Maharashtra. We honour those among us who have achieved distinction in their fields, and we gather through the year to celebrate where we come from.",
  url: "https://atharvakun.github.io/rj",
  locale: "en",
  /** Used for schema.org / Open Graph. Keep in sync with `public/og.jpg` once supplied. */
  ogImage: "/og.jpg",
  /** Base region for the footer / about. */
  base: "Maharashtra, India",

  /** The traditional Rajasthani greeting used in the opening sequence. */
  greeting: {
    native: "पधारो म्हारे देस",
    roman: "Padharo mhare des",
    meaning: "Welcome to our land",
  },

  /**
   * Optional logo image. When `src` is set it replaces the typographic wordmark.
   */
  logo: {
    src: undefined as string | undefined,
    width: 160,
    height: 32,
  },

  /** PLACEHOLDER contact details. Replace before launch. */
  contact: {
    email: "hello@example.com",
    phone: "+91 00000 00000",
    phoneHref: "tel:+910000000000",
    address: ["Registered office: to be confirmed", "Mumbai / Pune", "Maharashtra, India"],
    hours: "Mon – Sat, 10:00 – 19:00 IST",
  },

  /** PLACEHOLDER social links. Point these at the Samaj's real profiles. */
  socials: [
    { label: "Instagram", href: "https://instagram.com", handle: "@rajasthanpuraskarsamaj" },
    { label: "Facebook", href: "https://facebook.com", handle: "Rajasthan Puraskar Samaj" },
    { label: "YouTube", href: "https://youtube.com", handle: "Rajasthan Puraskar Samaj" },
  ] satisfies SocialLink[],

  /** Single-page navigation: every item is a section of the home page. */
  nav: [
    { label: "About", href: "/#about" },
    { label: "Events", href: "/#events" },
    { label: "Awards", href: "/#awards" },
    { label: "Contact", href: "/#contact" },
  ] satisfies NavLink[],

  /** Footer legal line. */
  legal: "Photography shown is temporary placeholder imagery.",
} as const;

export type SiteConfig = typeof site;

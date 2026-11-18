import type { NavLink, SocialLink } from "./types";

/**
 * ORGANISATION & BRAND
 * --------------------------------------------------------------------------
 * Rajasthan Bhushan Puraskar Samiti, Pune: a committee of people of Rajasthani
 * origin settled in Maharashtra, which confers the Rajasthan Bhushan Puraskar.
 * Name, taglines and logo are the client's (from the award invitation).
 * Contact details, socials and the legal line are PLACEHOLDERS until the
 * Samiti supplies them. Colours live in `globals.css` (`--color-ember` etc.).
 */
export const site = {
  name: "Rajasthan Bhushan Puraskar Samiti",
  /** Short form for tight spaces (favicon, mobile). */
  shortName: "RBPS",
  /** Rendered beside the medallion in the wordmark. */
  wordmark: "Rajasthan Bhushan Puraskar Samiti",
  /** Small descriptor shown beneath / beside the wordmark and in metadata. */
  descriptor: "Honouring Excellence · Inspiring Tomorrow",
  /** The Samiti's own four words, from the invitation. */
  tagline: "People · Culture · Excellence · Rajasthan",
  /** Line from the foot of the invitation; used as a closing motto. */
  motto: "A legacy of people. A pride for Rajasthan.",
  /** The award the Samiti confers. */
  award: {
    name: "Rajasthan Bhushan Puraskar",
    strapline: "Honouring excellence, inspiring tomorrow",
  },
  description:
    "Rajasthan Bhushan Puraskar Samiti is a Pune-based committee of people with roots in Rajasthan and lives in Maharashtra. Each year it confers the Rajasthan Bhushan Puraskar on those among us who have achieved distinction in their fields, and gathers the community to celebrate where we come from.",
  url: "https://atharvakun.github.io/rj",
  locale: "en",
  /** Used for schema.org / Open Graph. Keep in sync with `public/og.jpg` once supplied. */
  ogImage: "/og.jpg",
  /** Base region for the footer / about. */
  base: "Pune, Maharashtra, India",

  /** The traditional Rajasthani greeting used in the opening sequence. */
  greeting: {
    native: "पधारो म्हारे देस",
    roman: "Padharo mhare des",
    meaning: "Welcome to our land",
  },

  /**
   * The Samiti's medallion (map of Rajasthan, turbaned figure, laurels, the
   * "Pune, Maharashtra" ribbon). `public/brand/logo.png` is cut out of the
   * 2026 invitation artwork at 342 × 311 px: replace it with the original
   * vector or high-resolution file from the Samiti when available. Paths are
   * resolved through `asset()` so they work under a base path.
   */
  logo: {
    src: "/brand/logo.png",
    width: 342,
    height: 311,
  },

  /** PLACEHOLDER contact details. Replace before launch. */
  contact: {
    email: "hello@example.com",
    phone: "+91 00000 00000",
    phoneHref: "tel:+910000000000",
    address: ["Registered office: to be confirmed", "Pune", "Maharashtra, India"],
    hours: "Mon – Sat, 10:00 – 19:00 IST",
  },

  /** PLACEHOLDER social links. Point these at the Samiti's real profiles. */
  socials: [
    { label: "Instagram", href: "https://instagram.com", handle: "@rajasthanbhushanpuraskar" },
    { label: "Facebook", href: "https://facebook.com", handle: "Rajasthan Bhushan Puraskar Samiti" },
    { label: "YouTube", href: "https://youtube.com", handle: "Rajasthan Bhushan Puraskar Samiti" },
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

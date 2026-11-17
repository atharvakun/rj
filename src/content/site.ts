import type { NavLink, SocialLink } from "./types";

/**
 * ORGANISATION & BRAND
 * --------------------------------------------------------------------------
 * Temporary identity. Replace names, copy, colours and contact details here;
 * the whole site reads from this object. Colours are also exposed as CSS
 * variables in `globals.css` (`--color-ember` etc.) — change both to rebrand.
 */
export const site = {
  /** Placeholder organisation name. Not a real company. */
  name: "Ensemble",
  /** Rendered in the wordmark; keep short. */
  wordmark: "Ensemble",
  /** Small descriptor shown beneath / beside the wordmark. */
  descriptor: "Cultural festivals & events",
  /** Longer tagline used in the hero and metadata. */
  tagline: "Gatherings worth remembering.",
  description:
    "An organisation that designs and produces cultural festivals, live performances and community celebrations.",
  url: "https://atharvakun.github.io/rj",
  locale: "en",
  /** Used for schema.org / Open Graph. Keep in sync with `public/og.jpg` once supplied. */
  ogImage: "/og.jpg",
  foundedYear: 2016,
  /** Base city for the footer / about. */
  base: "Pune, India",

  /**
   * Optional logo image. When `src` is set it replaces the typographic wordmark.
   * Supply a light and dark version if needed.
   */
  logo: {
    src: undefined as string | undefined,
    width: 160,
    height: 32,
  },

  contact: {
    email: "hello@example.com",
    phone: "+91 00000 00000",
    phoneHref: "tel:+910000000000",
    address: ["Studio 4, Placeholder Lane", "Pune 411001", "India"],
    hours: "Mon – Sat, 10:00 – 19:00 IST",
  },

  socials: [
    { label: "Instagram", href: "https://instagram.com", handle: "@ensemble" },
    { label: "YouTube", href: "https://youtube.com", handle: "Ensemble" },
    { label: "LinkedIn", href: "https://linkedin.com", handle: "Ensemble" },
  ] satisfies SocialLink[],

  nav: [
    { label: "Upcoming", href: "/upcoming" },
    { label: "Experiences", href: "/events" },
    { label: "About", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],

  /** Footer legal line. */
  legal: "All photography shown is temporary placeholder imagery.",
} as const;

export type SiteConfig = typeof site;

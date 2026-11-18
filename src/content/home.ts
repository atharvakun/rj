import type { VideoAsset } from "./types";
import { photos } from "./photos";

/**
 * SITE COPY & MEDIA — placeholder content, edit freely.
 * Keyed by page / section. Each top-level page reads its header copy from `pages`.
 * Imagery comes from `photos.ts` (temporary, credited placeholders).
 */
export const home = {
  hero: {
    eyebrow: "Cultural festivals, concerts & community events",
    /** The last `emphasisWords` words are set in italic display type. */
    headline: "Gatherings worth remembering.",
    emphasisWords: 1,
    intro:
      "We design and produce festivals, performances and celebrations that bring people together, and stay with them long after the lights go down.",
    cta: { label: "Explore experiences", href: "/events" },
    image: photos.hero,
    /**
     * Optional ambient loop over the photograph. Supply `{ src, title, poster }`
     * with the organisation's own footage; left unset, the hero uses the still.
     */
    video: undefined as VideoAsset | undefined,
  },

  /** Home: compact teaser for the next event. */
  next: {
    eyebrow: "Next up",
    cta: "All upcoming",
  },

  /** Home: manifesto strip leading to the About page. */
  statement: {
    eyebrow: "Why we do it",
    cta: "Read our story",
  },

  /** Home: directory of the site's pages. */
  directory: {
    eyebrow: "Explore",
    title: "Find your way around.",
    items: [
      { href: "/upcoming", title: "Upcoming", blurb: "Dates, venues and a live countdown to the next gathering.", image: photos.dirUpcoming },
      { href: "/events", title: "Experiences", blurb: "A cinematic archive of festivals, concerts and small rituals.", image: photos.dirEvents },
      { href: "/about", title: "About", blurb: "Who we are, what we believe and the people behind the work.", image: photos.dirAbout },
      { href: "/testimonials", title: "Testimonials", blurb: "What audiences, artists and partners said afterwards.", image: photos.dirTestimonials },
      { href: "/contact", title: "Contact", blurb: "Commission a festival, a programme or a celebration.", image: photos.dirContact },
    ],
  },

  /** Page headers for the inner pages. */
  pages: {
    upcoming: {
      eyebrow: "Upcoming",
      title: "Save the dates.",
      intro: "Everything announced so far, soonest first, with a live countdown. Register interest and we will keep you posted.",
    },
    events: {
      eyebrow: "Archive",
      title: "Experiences",
    },
    about: {
      eyebrow: "About us",
      title: "Made for the crowd.",
      intro: "A production studio making festivals, concerts and community celebrations. Our story, our philosophy and the people behind the work.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What they said afterwards.",
      intro: "Words from audiences, artists, venues and partners. Placeholder quotes until real, permissioned ones replace them.",
    },
    credits: {
      eyebrow: "Credits",
      title: "Photography",
      intro: "The photographs on this site are temporary placeholders from Wikimedia Commons, used under the licences listed here, until the organisation's own imagery replaces them.",
    },
  },

  upcoming: {
    eyebrow: "What is next",
    comingSoonTitle: "The next one is taking shape.",
    comingSoonBody:
      "We are planning our next gathering now. Leave your details and you will be the first to know when dates are announced.",
  },

  archive: {
    eyebrow: "Our experiences",
    title: "An archive of nights worth keeping.",
    intro: "Festivals, concerts, exhibitions and small rituals, from the last few years.",
    allEyebrow: "Browse everything",
    allTitle: "Every gathering, by kind and year.",
  },

  impact: {
    eyebrow: "The numbers",
    title: "Measured in people, not posts.",
    note: "Illustrative figures. Replace with verified numbers before launch.",
    marquee: ["Culture", "Community", "Creativity", "Celebration", "Memory"],
  },

  testimonials: {
    eyebrow: "People",
    title: "What they said afterwards.",
  },

  testimonialsWall: {
    eyebrow: "All voices",
    title: "Every word, in one place.",
    note: "Placeholder testimonials. Replace with real, permissioned quotes before launch.",
  },

  about: {
    eyebrow: "Our manifesto",
  },

  contact: {
    eyebrow: "Work with us",
    title: "Let us make something worth remembering.",
    body: "Festivals, cultural programmes, brand experiences and community events. Tell us what you are imagining and we will reply within two working days.",
    eventTypes: ["Festival", "Concert or live performance", "Exhibition", "Community event", "Corporate or brand experience", "Something else"],
  },
} as const;

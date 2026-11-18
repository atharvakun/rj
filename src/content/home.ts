import type { VideoAsset } from "./types";
import { photos, type CreditedImage } from "./photos";

/**
 * HOME PAGE COPY & MEDIA — placeholder content, edit freely.
 * The site is a single scrolling page; each key below is one section.
 * Imagery comes from `photos.ts` (temporary, credited placeholders).
 */
export const home = {
  /** Opening sequence: fort gate, elephant and camel, then the greeting. */
  intro: {
    welcome: "Welcome to",
    skip: "Skip intro",
  },

  hero: {
    eyebrow: "A samaj of Rajasthanis in Maharashtra",
    /** The last `emphasisWords` words are set in italic display type. */
    headline: "Honouring the Rajasthanis who made Maharashtra home.",
    emphasisWords: 2,
    intro:
      "We are a community with roots in Rajasthan and lives in Maharashtra. Each year we recognise those among us whose work, service and craft have made a difference, and through the year we gather to celebrate where we come from.",
    cta: { label: "Nominate someone", href: "/?purpose=nomination#contact" },
    secondary: { label: "About the awards", href: "/#awards" },
    image: photos.hero,
    /**
     * Optional ambient loop over the photograph. Supply `{ src, title, poster }`
     * with the Samaj's own footage; left unset, the hero uses the still.
     */
    video: undefined as VideoAsset | undefined,
  },

  /** Photo strip beneath the hero: many Rajasthan images in slow motion. */
  strip: {
    eyebrow: "Where we come from",
    title: "Desert, colour, music, and a long road to the coast.",
    rows: [
      [photos.fl_cover, photos.ag_cover, photos.ln_cover, photos.of_cover, photos.dirContact, photos.bh_g4],
      [photos.dirUpcoming, photos.fl_g5, photos.rr_cover, photos.dirEvents, photos.of_g1, photos.fl_g3],
    ] as CreditedImage[][],
  },

  about: {
    eyebrow: "About the Samaj",
  },

  events: {
    eyebrow: "Upcoming events",
    comingSoonTitle: "The next gathering is taking shape.",
    comingSoonBody: "Dates for the next Samaroh and festival gatherings will appear here. Leave your details and you will be the first to know.",
    alsoComing: "Also on the calendar",
    countdown: "Counting down",
    detailsCta: "Event details",
    registerCta: "Register interest",
  },

  contact: {
    eyebrow: "Get in touch",
    title: "Nominate, join, or simply say namaste.",
    body: "Nominate someone for the Puraskar, ask about membership, volunteer at a gathering, or propose a partnership. We reply to every message.",
    /** Options for the “reason for writing” field; `nomination` is pre-selected from the awards links. */
    purposes: [
      { value: "nomination", label: "Nominate someone for the Puraskar" },
      { value: "membership", label: "Join the Samaj" },
      { value: "event", label: "Attend or ask about an event" },
      { value: "volunteer", label: "Volunteer" },
      { value: "partner", label: "Partner or sponsor" },
      { value: "other", label: "Something else" },
    ],
    nominationTemplate:
      "I would like to nominate ______ for the Rajasthan Puraskar.\n\nTheir roots in Rajasthan:\nTheir work in Maharashtra:\nWhy it matters:\n",
  },

  /** Page header for the credits page. */
  pages: {
    credits: {
      eyebrow: "Credits",
      title: "Photography",
      intro:
        "The photographs on this site are temporary placeholders from Wikimedia Commons, used under the licences listed here, until the Samaj's own imagery replaces them.",
    },
  },
} as const;

import type { ImageAsset, VideoAsset } from "./types";

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1200`;

/**
 * SITE COPY & MEDIA — placeholder content, edit freely.
 * Keyed by page / section. Each top-level page reads its header copy from `pages`.
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
    image: {
      src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=2000",
      alt: "Festival crowd facing a stage bathed in warm orange light",
      position: "50% 45%",
    } as ImageAsset,
    /** Optional ambient loop. Remove `video` to use the photograph alone. */
    video: {
      src: "https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4",
      title: "Ambient festival footage",
      poster: {
        src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=2000",
        alt: "Festival crowd facing a stage bathed in warm orange light",
      },
    } as VideoAsset | undefined,
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
      {
        href: "/upcoming",
        title: "Upcoming",
        blurb: "Dates, venues and a live countdown to the next gathering.",
        image: { src: photo("1501281668745-f7f57925c3b4"), alt: "Hands raised in a crowd under stage light" } as ImageAsset,
      },
      {
        href: "/events",
        title: "Experiences",
        blurb: "A cinematic archive of festivals, concerts and small rituals.",
        image: { src: photo("1468234847176-28606331216a"), alt: "Stage lights sweeping over a concert audience" } as ImageAsset,
      },
      {
        href: "/about",
        title: "About",
        blurb: "Who we are, what we believe and the people behind the work.",
        image: { src: photo("1523580494863-6f3031224c94"), alt: "People gathered at an outdoor evening event" } as ImageAsset,
      },
      {
        href: "/testimonials",
        title: "Testimonials",
        blurb: "What audiences, artists and partners said afterwards.",
        image: { src: photo("1511578314322-379afb476865"), alt: "Festival crowd at dusk with lights overhead" } as ImageAsset,
      },
      {
        href: "/contact",
        title: "Contact",
        blurb: "Commission a festival, a programme or a celebration.",
        image: { src: photo("1504609813442-a8924e83f76e"), alt: "Confetti falling over a crowd at night" } as ImageAsset,
      },
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

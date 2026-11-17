import type { ImageAsset, TeamMember } from "./types";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1800`;

/** PLACEHOLDER copy and team. */
export const about = {
  /** Scroll-highlighted manifesto. Keep it to two or three sentences. */
  manifesto:
    "We make gatherings. Festivals, concerts, exhibitions and small rituals for neighbourhoods, built on the belief that a crowd, well cared for, becomes a community for a night.",

  who: {
    title: "Who we are",
    body: "A production studio of programmers, designers, technicians and hosts. We started with a single riverside evening and have been making rooms for people to meet in ever since.",
  },
  philosophy: {
    title: "Our philosophy",
    body: "Culture is not something an audience consumes. It is something a crowd does together. We design for participation: short queues, long tables, sightlines for everyone and endings worth staying for.",
  },
  mission: {
    title: "Our mission",
    body: "To make cultural experiences that are generous, well-crafted and open, and to leave every place and every partner better than we found them.",
  },
  special: {
    title: "What makes it different",
    points: [
      "Programmes built around place, not formats imported from elsewhere.",
      "Production standards from touring stages, applied to community lawns.",
      "A crew that stays until the last guest has left.",
      "Honest ticketing, real food and a welcome for every age.",
    ],
  },

  images: {
    primary: {
      src: photo("1549451371-64aa98a6f660"),
      alt: "Warm stage lights over a festival crowd",
      position: "50% 40%",
    } as ImageAsset,
    secondary: {
      src: photo("1511379938547-c1f69419868d"),
      alt: "Guitars and instruments in a sunlit studio",
    } as ImageAsset,
    tertiary: {
      src: photo("1485872299829-c673f5194813"),
      alt: "Hands holding drinks together in a crowd",
    } as ImageAsset,
  },

  team: [
    { name: "Placeholder name", role: "Founder & Creative Director" },
    { name: "Placeholder name", role: "Head of Production" },
    { name: "Placeholder name", role: "Programme Curator" },
    { name: "Placeholder name", role: "Community & Partnerships" },
  ] satisfies TeamMember[],
};

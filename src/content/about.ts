import type { TeamMember } from "./types";
import { photos } from "./photos";

/**
 * ABOUT THE SAMITI
 * --------------------------------------------------------------------------
 * PLACEHOLDER copy, written from the brief, for the Samiti to correct. Team
 * names are deliberately left unconfirmed: no real person is named here until
 * the office-bearers approve it. Imagery from `photos.ts`.
 */
export const about = {
  /** Scroll-highlighted manifesto. Keep it to two or three sentences. */
  manifesto:
    "A samaj is a society of people who look after one another. Ours is made of families who left Rajasthan for Maharashtra, built their lives here, and never stopped belonging to both.",

  who: {
    title: "Who we are",
    body: "Rajasthan Bhushan Puraskar Samiti is a committee formed in Pune by Rajasthanis settled across Maharashtra. It began with a simple thought: the achievements of our people here deserve to be recognised, first of all, by their own community.",
  },
  mission: {
    title: "What we do",
    body: "Each year we honour people of Rajasthani origin living in Maharashtra who have achieved distinction in business, education, the arts, medicine, public service and other fields. Between ceremonies, we gather: for Gangaur and Teej, for Holi and Diwali, and for the plain pleasure of being among our own.",
  },
  values: {
    title: "How we go about it",
    points: [
      "Recognition earned, never bought. Nominations are open; the jury is drawn from the community.",
      "Two homes, one samaj. Every gathering honours Rajasthan and Maharashtra alike.",
      "Open to all Rajasthanis: every district, language, faith and generation.",
      "The next generation in the room, always.",
    ],
  },

  images: {
    primary: photos.aboutPrimary,
    secondary: photos.aboutSecondary,
    tertiary: photos.aboutTertiary,
  },

  team: {
    eyebrow: "The team",
    title: "The people behind the Samiti",
    note: "Office-bearers and committee members will be named here once confirmed by the Samiti.",
    /** `name` left undefined renders a “to be confirmed” card. Add `photo` to show a portrait. */
    members: [
      { role: "President", blurb: "Leads the Samiti and chairs the general body." },
      { role: "Vice President", blurb: "Stands in for the President and leads outreach." },
      { role: "General Secretary", blurb: "Runs the office, the calendar and correspondence." },
      { role: "Treasurer", blurb: "Keeps the accounts and publishes them to members." },
      { role: "Awards Committee Chair", blurb: "Convenes the jury and oversees nominations." },
      { role: "Cultural Secretary", blurb: "Programmes the festivals and gatherings." },
      { role: "Youth Wing Lead", blurb: "Brings the next generation into the work." },
      { role: "Media & Communications", blurb: "Tells the community what is happening." },
    ] satisfies TeamMember[],
  },
};

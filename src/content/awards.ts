/**
 * THE PURASKAR (AWARDS)
 * --------------------------------------------------------------------------
 * PLACEHOLDER structure for the Samiti to confirm: categories, eligibility and
 * process. No honourees are listed: nobody is named as an award recipient
 * until the Samiti confirms a real list.
 */
export type AwardCategory = {
  key: string;
  /** Devanagari word shown above the title. */
  native: string;
  title: string;
  body: string;
};

export const awards = {
  eyebrow: "The Puraskar",
  title: "Recognition from one's own people.",
  intro:
    "The Rajasthan Bhushan Puraskar honours people of Rajasthani origin who have settled in Maharashtra and achieved distinction in their field. Anyone may nominate. Honourees are chosen by a jury of the Samiti and felicitated at the annual Rajasthan Bhushan Puraskar evening.",

  categories: [
    {
      key: "udyog",
      native: "उद्योग",
      title: "Business & Enterprise",
      body: "Founders, traders and industrialists whose enterprise has created work and worth in Maharashtra.",
    },
    {
      key: "shiksha",
      native: "शिक्षा",
      title: "Education & Research",
      body: "Teachers, scholars and the builders of schools and institutions.",
    },
    {
      key: "kala",
      native: "कला",
      title: "Arts, Culture & Literature",
      body: "Writers, musicians, artists and those who keep Rajasthani culture alive far from home.",
    },
    {
      key: "seva",
      native: "सेवा",
      title: "Social Service",
      body: "People whose work for others has reached well beyond their own community.",
    },
    {
      key: "chikitsa",
      native: "चिकित्सा",
      title: "Medicine & Health",
      body: "Doctors, nurses and health workers who have given a lifetime of care.",
    },
    {
      key: "yuva",
      native: "युवा",
      title: "Young Achiever",
      body: "Under thirty-five, and already making a mark in any field.",
    },
    {
      key: "jeevan",
      native: "जीवन गौरव",
      title: "Lifetime Contribution",
      body: "A life's work that has shaped the community and the state it lives in.",
    },
  ] satisfies AwardCategory[],

  eligibility: {
    title: "Who can be nominated",
    points: [
      "Roots in Rajasthan: born there, or from a family that came from there.",
      "Settled in Maharashtra, with their main work or service here.",
      "Distinction in their field that others can vouch for.",
      "Anyone may nominate, including themselves. Nominations are kept confidential.",
    ],
  },

  process: {
    title: "How it works",
    steps: [
      { step: "Nominate", body: "Send a short note about the person, their work and why it matters, using the form below." },
      { step: "Review", body: "A jury drawn from the Samiti considers every nomination against the same published criteria." },
      { step: "Announce", body: "Honourees are told privately first, then announced to the community." },
      { step: "Samaroh", body: "Awards are presented at the annual Rajasthan Bhushan Puraskar evening, before family, friends and the whole community." },
    ],
  },

  honourees: {
    eyebrow: "Honourees",
    note: "The first honourees will be announced after the first Puraskar evening and listed here with their permission.",
  },

  cta: { label: "Nominate someone", href: "/contact?purpose=nomination" },
} as const;

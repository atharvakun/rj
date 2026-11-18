import type { EventRecord } from "./types";
import { photos } from "./photos";

/**
 * EVENTS
 * --------------------------------------------------------------------------
 * PLACEHOLDER PROGRAMME. Dates, venues and details below are illustrative and
 * must be confirmed by the Samiti before launch; venues are marked “to be
 * confirmed” on purpose. Dates are ISO 8601 with an explicit offset;
 * `timeZone` drives how they are displayed. Upcoming / past is decided at
 * build time, so redeploy after an event ends.
 *
 * Imagery is temporary (see `photos.ts` for sources and credits).
 */

const tbc = (city: "Mumbai" | "Pune", hint: string) => ({
  name: `${hint} (venue to be confirmed)`,
  city,
  country: "India",
});

export const upcomingEvents: EventRecord[] = [
  {
    slug: "nomination-open-house-2026",
    title: "Nomination Open House",
    strapline: "An evening to understand the Puraskar, meet the committee and ask anything.",
    category: "community",
    startsAt: "2026-12-13T17:00:00+05:30",
    endsAt: "2026-12-13T20:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: tbc("Pune", "Community hall"),
    summary:
      "Before nominations close for the 2027 Puraskar, the awards committee hosts an informal open house: how the categories work, what a strong nomination looks like, and tea with the people who will read them.",
    body: [
      "Nominating someone is simple, but people often hesitate: is my uncle's forty-year practice distinguished enough? Does a young founder count? This evening answers those questions in person.",
      "Members of the awards committee walk through each category, the eligibility rules and the timeline, then stay for questions. Bring a name you have in mind, or just come to listen.",
      "Open to all. No registration is needed, but telling us you are coming helps us plan the tea.",
    ],
    cover: photos.dirTestimonials,
    gallery: [photos.aboutTertiary, photos.ms_g3, photos.dirAbout],
    videos: [],
    memories: [],
    facts: [
      { label: "Entry", value: "Free" },
      { label: "Language", value: "Hindi · Marwari · Marathi" },
      { label: "Hours", value: "3" },
    ],
  },
  {
    slug: "rajasthan-bhushan-puraskar-2027",
    title: "Rajasthan Bhushan Puraskar 2027",
    strapline: "The annual awards evening of the Samiti.",
    category: "awards",
    startsAt: "2027-02-07T18:00:00+05:30",
    endsAt: "2027-02-07T21:30:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: tbc("Mumbai", "Auditorium"),
    summary:
      "One evening a year, the community gathers to honour its own: Rajasthanis who built lives in Maharashtra and achieved distinction in business, education, the arts, medicine, service and more.",
    body: [
      "The Samaroh is the heart of the Samiti's year. Honourees in each category are felicitated on stage before their families, friends and the wider community, with a citation read for each.",
      "The evening opens with folk music from Rajasthan and closes with dinner. Dress is festive; many guests wear traditional Rajasthani attire.",
      "Attendance is by invitation to members, honourees' guests and partners. If you would like to be there, register interest below and the office will be in touch.",
    ],
    cover: photos.ms_cover,
    poster: photos.wl_poster,
    gallery: [photos.ms_g1, photos.ms_g2, photos.ms_g5, photos.ns_v, photos.bh_g6, photos.ms_g6],
    videos: [],
    memories: [],
    facts: [
      { label: "Categories", value: "7" },
      { label: "Nominations close", value: "15 Jan" },
      { label: "Entry", value: "By invitation" },
    ],
  },
  {
    slug: "gangaur-utsav-2027",
    title: "Gangaur Utsav",
    strapline: "Spring, Gauri and Isar, and the women of the Samiti leading the procession.",
    category: "festival",
    startsAt: "2027-04-10T16:00:00+05:30",
    endsAt: "2027-04-10T21:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: tbc("Mumbai", "Community grounds"),
    summary:
      "Gangaur is Rajasthan's festival of spring and of marriage, carried by its women. The Samiti's Gangaur Utsav brings the procession, the songs and the ghoomar to Maharashtra for an evening.",
    body: [
      "Families bring their Gauri and Isar idols for a shared procession, followed by ghoomar, folk songs and a traditional meal.",
      "Children's and newcomers' corners explain the rituals for those who have grown up far from them. Everyone is welcome, Rajasthani or not.",
    ],
    cover: photos.of_g4,
    gallery: [photos.ln_g2, photos.dirEvents, photos.aboutPrimary, photos.of_g5],
    videos: [],
    memories: [],
    facts: [
      { label: "Entry", value: "Free" },
      { label: "Procession", value: "17:30" },
      { label: "Dinner", value: "Included" },
    ],
  },
  {
    slug: "teej-milan-2027",
    title: "Teej Milan",
    strapline: "Monsoon swings, mehndi and the songs of Sawan.",
    category: "celebration",
    startsAt: "2027-08-07T17:00:00+05:30",
    endsAt: "2027-08-07T21:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: tbc("Pune", "Banquet lawns"),
    summary:
      "A monsoon get-together for members and their families: swings under the trees, mehndi, ghewar, and Teej songs sung the way they are at home.",
    body: [
      "Teej Milan is the Samiti's most relaxed evening of the year. Come in green, bring the children, and stay for the kavi sammelan after dinner.",
    ],
    cover: photos.wl_cover,
    gallery: [photos.dirUpcoming, photos.ln_g1, photos.ag_g3, photos.rr_g3],
    videos: [],
    memories: [],
    facts: [
      { label: "Entry", value: "Members" },
      { label: "Dress", value: "Green" },
      { label: "Dinner", value: "Included" },
    ],
  },
];

export const pastEvents: EventRecord[] = [
  {
    slug: "rajasthan-diwas-2026",
    title: "Rajasthan Diwas 2026",
    strapline: "The state's founding day, celebrated a thousand kilometres away.",
    category: "celebration",
    startsAt: "2026-03-30T18:00:00+05:30",
    endsAt: "2026-03-30T21:30:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: tbc("Mumbai", "Auditorium"),
    summary:
      "On 30 March the Samiti marked Rajasthan Diwas with an evening of Kathak and folk performance, a talk on the state's history and a Rajasthani dinner.",
    body: [
      "Rajasthan Diwas commemorates the formation of the state in 1949. The Samiti's evening paired classical and folk dance with a short talk on how Rajasthani families came to Maharashtra, and why they stayed.",
    ],
    cover: photos.ln_cover,
    gallery: [photos.ln_g3, photos.ln_g4, photos.ln_g5, photos.ln_g6, photos.ns_cover, photos.ns_g1],
    videos: [],
    memories: [],
  },
  {
    slug: "holi-milan-2026",
    title: "Holi Milan 2026",
    strapline: "Colour, phaag and gujiya for the whole samaj.",
    category: "festival",
    startsAt: "2026-03-07T10:00:00+05:30",
    endsAt: "2026-03-07T14:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: tbc("Mumbai", "Community grounds"),
    summary:
      "A morning of colour and phaag songs in the Rajasthani way, with dhol, gulal and a long lunch.",
    body: [
      "Holi Milan is where many members first meet each other. Families came in white and left in every colour, after dhol, folk songs and a shared Rajasthani lunch.",
    ],
    cover: photos.ag_cover,
    gallery: [photos.ag_g1, photos.ag_g2, photos.ag_g4, photos.ag_g5, photos.ag_g6, photos.rr_g2],
    videos: [],
    memories: [],
  },
  {
    slug: "diwali-sneh-milan-2025",
    title: "Diwali Sneh Milan 2025",
    strapline: "Lamps, rangoli and a first gathering of the Samiti.",
    category: "community",
    startsAt: "2025-10-25T18:00:00+05:30",
    endsAt: "2025-10-25T21:30:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: tbc("Pune", "Banquet hall"),
    summary:
      "A post-Diwali evening of greetings, rangoli, lamps and dinner, where the idea of an annual Puraskar was first shared with members.",
    body: [
      "Sneh Milan means a meeting of affection. Families exchanged Diwali greetings, children made rangoli, and the committee presented the idea of a yearly award for Rajasthanis in Maharashtra.",
    ],
    cover: photos.rr_cover,
    gallery: [photos.rr_g1, photos.fl_g4, photos.of_g6, photos.rr_g5, photos.rr_g6, photos.bh_g2],
    videos: [],
    memories: [],
  },
];

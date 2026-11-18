import type { EventRecord } from "./types";
import { photos } from "./photos";

/**
 * EVENTS
 * --------------------------------------------------------------------------
 * PLACEHOLDER CONTENT. None of these events are real. Replace the records
 * below with the organisation's actual programme. Dates are ISO 8601 with an
 * explicit offset; `timeZone` drives how they are displayed.
 *
 * Imagery is temporary (see `photos.ts` for sources and credits). Swap each
 * reference for client photography; every component uses `object-fit: cover`
 * with the `position` hint, so any aspect ratio works. Video clips are generic
 * placeholder footage from Pexels.
 */

const clip = (id: string, fps = 25) =>
  `https://videos.pexels.com/video-files/${id}/${id}-hd_1920_1080_${fps}fps.mp4`;

export const upcomingEvents: EventRecord[] = [
  {
    slug: "winter-lights-festival-2027",
    title: "Winter Lights Festival",
    strapline: "Three nights of music, fire and open air by the river.",
    category: "festival",
    startsAt: "2027-01-22T18:00:00+05:30",
    endsAt: "2027-01-24T23:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: {
      name: "Riverside Grounds",
      address: "Mula-Mutha Riverfront",
      city: "Pune",
      country: "India",
      mapUrl: "https://maps.google.com/?q=Pune",
    },
    summary:
      "Our flagship winter gathering returns with two stages, a lantern walk along the water and a late-night programme of folk, electronic and classical crossover.",
    body: [
      "Winter Lights began as a single evening of music beside the river. Over the years it has grown into a three-night festival that still keeps its first promise: warmth in the coldest week of the year, made by people standing close together.",
      "This edition brings an open-air main stage, a tented second stage for intimate sets and a kilometre-long lantern walk designed with local craftspeople. Food comes from twenty independent kitchens; the bar pours regional producers only.",
      "Day tickets and three-night passes are both available. Children under twelve enter free with a ticket-holding adult.",
    ],
    cover: photos.wl_cover,
    poster: photos.wl_poster,
    gallery: [],
    videos: [],
    memories: [],
    facts: [
      { label: "Stages", value: "2" },
      { label: "Artists", value: "40+" },
      { label: "Nights", value: "3" },
    ],
    registrationUrl: undefined,
  },
  {
    slug: "open-studio-weekend-2027",
    title: "Open Studio Weekend",
    strapline: "Two days inside the workshops of thirty makers.",
    category: "community",
    startsAt: "2027-03-13T11:00:00+05:30",
    endsAt: "2027-03-14T20:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: {
      name: "The Old Mill Halls",
      address: "Lower Parel",
      city: "Mumbai",
      country: "India",
    },
    summary:
      "A free, walk-in weekend of open workshops, talks and shared tables with printmakers, weavers, luthiers and ceramicists from across the region.",
    body: [
      "Open Studio Weekend turns a former mill into a working village of studios. Visitors move between rooms where makers are mid-process: ink still wet, kilns still warm.",
      "Short talks run on the hour. A long communal lunch is served both days, cooked by a rotating group of home cooks.",
    ],
    cover: photos.os_cover,
    gallery: [],
    videos: [],
    memories: [],
    facts: [
      { label: "Studios", value: "30" },
      { label: "Talks", value: "16" },
      { label: "Entry", value: "Free" },
    ],
  },
];

export const pastEvents: EventRecord[] = [
  {
    slug: "monsoon-sound-2026",
    title: "Monsoon Sound",
    strapline: "A coastal festival built for rain.",
    category: "festival",
    startsAt: "2026-07-17T16:00:00+05:30",
    endsAt: "2026-07-19T23:30:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: { name: "Chapora Headland", city: "Goa", country: "India" },
    summary:
      "Two stages on a headland above the sea, a programme spanning coastal folk and bass music, and a crowd that learned to dance in the rain.",
    body: [
      "Monsoon Sound was designed around weather most festivals avoid. Stages were built under sailcloth, walkways were raised and the whole site was lit to look its best when wet.",
      "Across three days, forty-two acts played to an audience that arrived in raincoats and left barefoot. The final night closed with a brass band leading the crowd down to the beach.",
    ],
    cover: photos.ms_cover,
    gallery: [photos.ms_g1, photos.ms_g2, photos.ms_g3, photos.ms_g4, photos.ms_g5, photos.ms_g6],
    videos: [
      {
        title: "Main stage, night two",
        src: clip("2022395", 30),
        poster: photos.ms_v,
        duration: "0:28",
      },
    ],
    memories: [
      { quote: "It rained for six hours straight and nobody left. I have never seen a crowd that happy.", name: "Placeholder attendee", role: "Three-day pass" },
      { quote: "The brass band walking us down to the water at the end is something I will tell people about for years.", name: "Placeholder attendee" },
    ],
    facts: [
      { label: "Acts", value: "42" },
      { label: "Attendance", value: "9,000" },
      { label: "Rainfall", value: "211 mm" },
    ],
  },
  {
    slug: "long-night-of-dance-2026",
    title: "The Long Night of Dance",
    strapline: "Dusk to dawn across five stages of movement.",
    category: "performing-arts",
    startsAt: "2026-03-07T18:30:00+05:30",
    endsAt: "2026-03-08T05:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: { name: "Bangalore Palace Grounds", city: "Bengaluru", country: "India" },
    summary:
      "Classical, contemporary and street forms sharing one night, programmed so the audience could wander between stages until sunrise.",
    body: [
      "The Long Night of Dance placed a corps de ballet and a breaking crew within a hundred metres of each other and let the audience decide where to stand.",
      "Twenty-six companies performed across five stages. A single, continuous soundtrack was composed to bridge the gaps between them, so the night never fell silent.",
    ],
    cover: photos.ln_cover,
    gallery: [photos.ln_g1, photos.ln_g2, photos.ln_g3, photos.ln_g4, photos.ln_g5, photos.ln_g6],
    videos: [
      {
        title: "Rehearsal, the warehouse stage",
        src: clip("2795745"),
        poster: photos.ln_v,
        duration: "0:19",
      },
    ],
    memories: [
      { quote: "At four in the morning there were still a thousand people watching a kathak soloist in silence.", name: "Placeholder attendee" },
      { quote: "Production, lighting and sound were the best our company has worked with.", name: "Placeholder company director", role: "Participating company" },
    ],
    facts: [
      { label: "Companies", value: "26" },
      { label: "Stages", value: "5" },
      { label: "Hours", value: "10.5" },
    ],
  },
  {
    slug: "rooftop-ramble-2025",
    title: "Rooftop Ramble",
    strapline: "A neighbourhood festival spread across eleven rooftops.",
    category: "community",
    startsAt: "2025-11-15T15:00:00+05:30",
    endsAt: "2025-11-16T22:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: { name: "Fort District", city: "Mumbai", country: "India" },
    summary:
      "Residents opened their roofs for a weekend of small concerts, shared meals and sunset conversations, connected by a walking route through the old city.",
    body: [
      "Rooftop Ramble asked a simple question: what if a festival had no site? Eleven buildings agreed to host, and a walking route stitched them together.",
      "Each roof held something different: a string quartet, a supper for sixty, a poetry open mic, a children's workshop. Visitors moved on foot and met neighbours they had never spoken to.",
    ],
    cover: photos.rr_cover,
    gallery: [photos.rr_g1, photos.rr_g2, photos.rr_g3, photos.rr_g4, photos.rr_g5, photos.rr_g6],
    videos: [
      {
        title: "Dust and light, roof seven",
        src: clip("3045163"),
        poster: photos.rr_v,
        duration: "0:15",
      },
    ],
    memories: [
      { quote: "I have lived in this building for nine years and met my upstairs neighbours at the quartet on our own roof.", name: "Placeholder resident" },
    ],
    facts: [
      { label: "Rooftops", value: "11" },
      { label: "Walking route", value: "3.2 km" },
      { label: "Suppers served", value: "640" },
    ],
  },
  {
    slug: "night-signal-2025",
    title: "Night Signal",
    strapline: "One stage. One night. No headliners.",
    category: "concert",
    startsAt: "2025-08-23T19:00:00+05:30",
    endsAt: "2025-08-24T02:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: { name: "Shaniwar Wada Lawns", city: "Pune", country: "India" },
    summary:
      "A single-stage concert where the running order was kept secret until each act walked on, and the crowd came for the room rather than the name.",
    body: [
      "Night Signal removed the poster. Ticket buyers knew the venue, the date and the promise of seven acts. Nothing else.",
      "The format rewarded trust. Sets ran back to back on a revolving stage, and the loudest reaction of the night went to an unsigned trio playing their fourth show.",
    ],
    cover: photos.ns_cover,
    gallery: [photos.ns_g1, photos.ns_g2, photos.ns_g3, photos.ns_g4, photos.ns_g5, photos.ns_g6],
    videos: [
      {
        title: "Set four",
        src: clip("2022396", 30),
        poster: photos.ns_v,
        duration: "0:22",
      },
    ],
    memories: [
      { quote: "Not knowing who was next made every walk-on feel like a reveal. Genuinely the best concert format I have experienced.", name: "Placeholder attendee" },
    ],
    facts: [
      { label: "Acts", value: "7" },
      { label: "Capacity", value: "3,500" },
      { label: "Sold out in", value: "4 days" },
    ],
  },
  {
    slug: "blue-hour-sessions-2024",
    title: "Blue Hour Sessions",
    strapline: "Jazz, supper and the last light of the day.",
    category: "concert",
    startsAt: "2024-12-06T18:00:00+05:30",
    endsAt: "2024-12-08T23:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: { name: "The Imperial Ballroom", city: "New Delhi", country: "India" },
    summary:
      "Three evenings of seated jazz for two hundred guests, each paired with a long table dinner and timed to begin as the sun went down.",
    body: [
      "Blue Hour Sessions was built around a single table and a single stage. Guests ate together, then turned their chairs.",
      "Nine ensembles played across the three nights. The menu changed to match the music: a Konkani supper for the coastal quartet, a Punjabi feast for the brass night.",
    ],
    cover: photos.bh_cover,
    gallery: [photos.bh_g1, photos.bh_g2, photos.bh_g3, photos.bh_g4, photos.bh_g5, photos.bh_g6],
    videos: [
      {
        title: "Ink and brass, visual interlude",
        src: clip("1943483"),
        poster: photos.bh_v,
        duration: "0:17",
      },
    ],
    memories: [
      { quote: "Dinner, strangers, a double bass. I did not want it to end.", name: "Placeholder guest" },
      { quote: "Our partners asked for this format to be repeated before the first night was over.", name: "Placeholder partner", role: "Hospitality partner" },
    ],
    facts: [
      { label: "Ensembles", value: "9" },
      { label: "Seats", value: "200" },
      { label: "Courses", value: "5" },
    ],
  },
  {
    slug: "afterglow-2024",
    title: "Afterglow",
    strapline: "An electronic music night in a working warehouse.",
    category: "festival",
    startsAt: "2024-09-14T20:00:00+05:30",
    endsAt: "2024-09-15T06:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: { name: "Dock 9", city: "Hyderabad", country: "India" },
    summary:
      "Ten hours, three rooms and a light installation built from four hundred metres of LED tube, in a warehouse that went back to work on Monday.",
    body: [
      "Afterglow was a one-night transformation. A functioning distribution warehouse became three rooms of sound, each with its own light language.",
      "The main room ran a tunnel of programmable tube lighting designed with a local studio. By morning the floor was clear and the forklifts were back.",
    ],
    cover: photos.ag_cover,
    gallery: [photos.ag_g1, photos.ag_g2, photos.ag_g3, photos.ag_g4, photos.ag_g5, photos.ag_g6],
    videos: [
      {
        title: "Room one, visual system",
        src: clip("3163534", 30),
        poster: photos.ag_v,
        duration: "0:12",
      },
    ],
    memories: [
      { quote: "The light tunnel alone was worth the ticket. I have not stopped talking about it.", name: "Placeholder attendee" },
    ],
    facts: [
      { label: "Rooms", value: "3" },
      { label: "LED tube", value: "400 m" },
      { label: "Hours", value: "10" },
    ],
  },
  {
    slug: "open-frame-2023",
    title: "Open Frame",
    strapline: "A ten-day exhibition of work made in public.",
    category: "exhibition",
    startsAt: "2023-11-03T10:00:00+05:30",
    endsAt: "2023-11-12T20:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: { name: "Currency Building", city: "Kolkata", country: "India" },
    summary:
      "Eighteen artists worked live in a heritage hall for ten days. The exhibition was the process, and the closing night showed what remained.",
    body: [
      "Open Frame inverted the gallery. Visitors arrived to empty walls on day one and watched them fill, speaking to the artists as they worked.",
      "Evenings carried talks and a small film programme projected onto the unfinished work. The closing night drew the largest single-day attendance in the venue's recent history.",
    ],
    cover: photos.of_cover,
    gallery: [photos.of_g1, photos.of_g2, photos.of_g3, photos.of_g4, photos.of_g5, photos.of_g6],
    videos: [
      {
        title: "Closing night projection",
        src: clip("1943483"),
        poster: photos.of_v,
        duration: "0:17",
      },
    ],
    memories: [
      { quote: "Watching a painting arrive over ten days changed how I look at finished work.", name: "Placeholder visitor" },
    ],
    facts: [
      { label: "Artists", value: "18" },
      { label: "Days", value: "10" },
      { label: "Visitors", value: "22,000" },
    ],
  },
  {
    slug: "first-light-2023",
    title: "First Light",
    strapline: "A dawn celebration on the first day of the year.",
    category: "celebration",
    startsAt: "2023-01-01T05:00:00+05:30",
    endsAt: "2023-01-01T11:00:00+05:30",
    timeZone: "Asia/Kolkata",
    venue: { name: "Nahargarh Ridge", city: "Jaipur", country: "India" },
    summary:
      "A free, early-morning gathering on a hill above the city: choirs, a sunrise set and breakfast for everyone who made the climb.",
    body: [
      "First Light began before dawn. A thousand people walked up the ridge in the dark, guided by lanterns, and waited together for the sun.",
      "Two choirs sang as the light came, followed by a single ambient set as the city woke below. Breakfast was served from the back of three trucks.",
    ],
    cover: photos.fl_cover,
    gallery: [photos.fl_g1, photos.fl_g2, photos.fl_g3, photos.fl_g4, photos.fl_g5, photos.fl_g6],
    videos: [
      {
        title: "Sunrise set",
        src: clip("2022395", 30),
        poster: photos.fl_v,
        duration: "0:28",
      },
    ],
    memories: [
      { quote: "Cold, dark, a thousand strangers and then the sun. Best start to a year I have had.", name: "Placeholder attendee" },
    ],
    facts: [
      { label: "Climb", value: "1.4 km" },
      { label: "Choirs", value: "2" },
      { label: "Breakfasts", value: "1,100" },
    ],
  },
];

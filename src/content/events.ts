import type { EventRecord } from "./types";

/**
 * EVENTS
 * --------------------------------------------------------------------------
 * PLACEHOLDER CONTENT. None of these events are real. Replace the records
 * below with the organisation's actual programme. Dates are ISO 8601 with an
 * explicit offset; `timeZone` drives how they are displayed.
 *
 * Imagery is temporary (Unsplash). Swap `src` for client photography; every
 * component uses `object-fit: cover` with the `position` hint, so any aspect
 * ratio works.
 */

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1800`;
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
    cover: {
      src: photo("1549451371-64aa98a6f660"),
      alt: "Festival crowd under warm orange stage lights at night",
      position: "50% 40%",
    },
    poster: {
      src: photo("1524368535928-5b5e00ddc76b"),
      alt: "Crowd silhouettes in front of a brightly lit outdoor stage",
      position: "50% 50%",
    },
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
    cover: {
      src: photo("1544928147-79a2dbc1f389"),
      alt: "Group of people working together at a long craft table seen from above",
      position: "50% 50%",
    },
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
    cover: {
      src: photo("1506157786151-b8491531f063"),
      alt: "Festival crowd with raised hands facing a violet-lit main stage",
      position: "50% 45%",
    },
    gallery: [
      { src: photo("1514525253161-7a46d19cd819"), alt: "Lasers and confetti over a packed festival crowd" },
      { src: photo("1459749411175-04bf5292ceea"), alt: "Crowd silhouettes against golden stage lights" },
      { src: photo("1563841930606-67e2bce48b78"), alt: "Blue-lit stage structure at dusk" },
      { src: photo("1540039155733-5bb30b53aa14"), alt: "Audience with raised arms in warm stage haze" },
      { src: photo("1492684223066-81342ee5ff30"), alt: "Confetti falling over a night-time crowd" },
      { src: photo("1514533212735-5df27d970db0"), alt: "Large LED screen behind a dancing crowd" },
    ],
    videos: [
      {
        title: "Main stage, night two",
        src: clip("2022395", 30),
        poster: { src: photo("1533174072545-7a4b6ad7a6c3"), alt: "Crowd beneath falling lights" },
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
    cover: {
      src: photo("1508807526345-15e9b5f4eaff"),
      alt: "Ballet dancers in white tutus mid-performance on a dark stage",
      position: "50% 30%",
    },
    gallery: [
      { src: photo("1547153760-18fc86324498"), alt: "Dancer in yellow mid-leap against a grey backdrop" },
      { src: photo("1503095396549-807759245b35"), alt: "Silhouetted figures in front of a red curtain" },
      { src: photo("1540575467063-178a50c2df87"), alt: "Audience watching a performance in low light" },
      { src: photo("1540324155974-7523202daa3f"), alt: "Dancer arching back on a pier at sunset" },
      { src: photo("1507838153414-b4b713384a76"), alt: "Close-up of an open musical score" },
      { src: photo("1514320291840-2e0a9bf2a9ae"), alt: "Empty stage with a single spotlight and drum kit" },
    ],
    videos: [
      {
        title: "Rehearsal, the warehouse stage",
        src: clip("2795745"),
        poster: { src: photo("1478147427282-58a87a120781"), alt: "Hands raised in a dark room" },
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
    cover: {
      src: photo("1517457373958-b7bdd4587205"),
      alt: "Crowd on a rooftop under string lights at dusk",
      position: "50% 50%",
    },
    gallery: [
      { src: photo("1485872299829-c673f5194813"), alt: "Hands holding drinks in a crowd" },
      { src: photo("1472653431158-6364773b2a56"), alt: "Friends watching a garden stage" },
      { src: photo("1511988617509-a57c8a288659"), alt: "Four friends dancing in warm afternoon light" },
      { src: photo("1531058020387-3be344556be6"), alt: "Crowd gathered in a bright hall" },
      { src: photo("1527529482837-4698179dc6ce"), alt: "Guests raising glasses at a long dinner table" },
      { src: photo("1515169067868-5387ec356754"), alt: "People talking around a table at a small gathering" },
    ],
    videos: [
      {
        title: "Dust and light, roof seven",
        src: clip("3045163"),
        poster: { src: photo("1519750783826-e2420f4d687f"), alt: "Soft bokeh lights" },
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
    cover: {
      src: photo("1501386761578-eac5c94b800a"),
      alt: "Joyful crowd faces lit from the stage at a concert",
      position: "50% 35%",
    },
    gallery: [
      { src: photo("1499364615650-ec38552f4f34"), alt: "Band on stage under sweeping blue lights" },
      { src: photo("1526478806334-5fd488fcaabc"), alt: "Guitarist silhouetted in orange haze" },
      { src: photo("1598387993441-a364f854c3e1"), alt: "Guitarist mid-song in teal and amber light" },
      { src: photo("1516450360452-9312f5e86fc7"), alt: "Crowd in pink light facing a stage" },
      { src: photo("1504680177321-2e6a879aac86"), alt: "DJ booth seen from the back of a dark hall" },
      { src: photo("1475721027785-f74eccf877e2"), alt: "Microphone in front of a blurred crowd" },
    ],
    videos: [
      {
        title: "Set four",
        src: clip("2022396", 30),
        poster: { src: photo("1545128485-c400e7702796"), alt: "Crowd in deep red light" },
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
    cover: {
      src: photo("1511192336575-5a79af67a629"),
      alt: "Close-up of hands playing a brass trumpet",
      position: "50% 50%",
    },
    gallery: [
      { src: photo("1470019693664-1d202d2c0907"), alt: "Hands on an upright piano in black and white" },
      { src: photo("1516280440614-37939bbacd81"), alt: "Microphone in warm low light" },
      { src: photo("1552566626-52f8b828add9"), alt: "Restaurant interior with warm lamps" },
      { src: photo("1519225421980-715cb0215aed"), alt: "Long dinner table set with flowers" },
      { src: photo("1518972559570-7cc1309f3229"), alt: "Mixing console with glowing faders" },
      { src: photo("1429962714451-bb934ecdc4ec"), alt: "Audience making heart shapes with their hands" },
    ],
    videos: [
      {
        title: "Ink and brass, visual interlude",
        src: clip("1943483"),
        poster: { src: photo("1521334884684-d80222895322"), alt: "Soft coloured light" },
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
    cover: {
      src: photo("1496337589254-7e19d01cec44"),
      alt: "DJ performing in front of a crowd under smoke and purple light",
      position: "50% 40%",
    },
    gallery: [
      { src: photo("1470225620780-dba8ba36b745"), alt: "Hands on DJ decks in violet light" },
      { src: photo("1566737236500-c8ac43014a67"), alt: "Tunnel of magenta light tubes above a crowd" },
      { src: photo("1574391884720-bbc3740c59d1"), alt: "Silhouettes walking through a hazy club" },
      { src: photo("1545128485-c400e7702796"), alt: "Crowd in deep red light" },
      { src: photo("1505236858219-8359eb29e329"), alt: "Confetti over a packed dance floor" },
      { src: photo("1522158637959-30385a09e0da"), alt: "Beams of white light over a crowd in black and white" },
    ],
    videos: [
      {
        title: "Room one, visual system",
        src: clip("3163534", 30),
        poster: { src: photo("1566737236500-c8ac43014a67"), alt: "Light tunnel" },
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
    cover: {
      src: photo("1536924940846-227afb31e2a5"),
      alt: "Thick blue and orange paint strokes on a canvas",
      position: "50% 50%",
    },
    gallery: [
      { src: photo("1513364776144-60967b0f800f"), alt: "Paintbrush loaded with red paint" },
      { src: photo("1508997449629-303059a039c0"), alt: "Visitors inside a grand hall with market stalls" },
      { src: photo("1560439514-4e9645039924"), alt: "Dense crowd in a hall seen from above" },
      { src: photo("1535016120720-40c646be5580"), alt: "Projector beam in a red room" },
      { src: photo("1508700115892-45ecd05ae2ad"), alt: "Neon sign on a brick wall" },
      { src: photo("1505373877841-8d25f7d46678"), alt: "Audience watching a presentation in a hall" },
    ],
    videos: [
      {
        title: "Closing night projection",
        src: clip("1943483"),
        poster: { src: photo("1535016120720-40c646be5580"), alt: "Projector beam" },
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
    cover: {
      src: photo("1533174072545-7a4b6ad7a6c3"),
      alt: "Crowd beneath a shower of falling light",
      position: "50% 50%",
    },
    gallery: [
      { src: photo("1493225457124-a3eb161ffa5f"), alt: "Performer raising a hand in smoke and light" },
      { src: photo("1478147427282-58a87a120781"), alt: "Hands raised in a dark room" },
      { src: photo("1464207687429-7505649dae38"), alt: "Group watching a sunrise from a hilltop" },
      { src: photo("1524601500432-1e1a4c71d692"), alt: "Friends making heart shapes in a field" },
      { src: photo("1513151233558-d860c5398176"), alt: "Confetti against a turquoise background" },
      { src: photo("1530103862676-de8c9debad1d"), alt: "Colourful balloons" },
    ],
    videos: [
      {
        title: "Sunrise set",
        src: clip("2022395", 30),
        poster: { src: photo("1464207687429-7505649dae38"), alt: "Hilltop sunrise" },
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

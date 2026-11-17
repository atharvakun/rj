# Ensemble — cultural festival & events website

A production-quality marketing site for a cultural events organisation, built with Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger + SplitText, Framer Motion and Lenis.

> **Placeholder identity and content.** "Ensemble" is a temporary name. All events, people, quotes, statistics and photographs are placeholders and must be replaced before launch. Nothing here describes a real organisation.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start
```

Node 20+ recommended. Fonts load from Google Fonts at build time; temporary photography loads from Unsplash and sample clips from Pexels (both allow-listed in `next.config.ts`).

## Where things live

```
src/
  content/            ← everything editable, no presentation code
    site.ts           organisation, brand name, contact, socials, nav
    home.ts           home page copy and hero media
    events.ts         upcoming + past events (dates, venue, gallery, videos, memories)
    testimonials.ts   attendee / client / partner quotes
    stats.ts          impact figures
    about.ts          manifesto, story blocks, team
    types.ts          the content model (CMS-shaped)
    index.ts          loaders: getUpcomingEvents(), getPastEvents(), getEventBySlug()…
  styles/fonts.ts     the three typefaces (swap here)
  app/globals.css     design tokens (colours, type scale, easing), base styles
  components/
    layout/           navigation, footer, smooth scroll, page transitions, cursor, preloader
    motion/           TextReveal, RevealImage, Counter, Parallax, Stagger
    ui/               Button, Magnetic, Logo, Eyebrow, Marquee, TransitionLink
    home/             Hero, NextUp, Statement, Directory, UpcomingEvent, ExperiencesArchive, Impact, Testimonials, TestimonialsWall, About, Contact
    events/           EventHero, Gallery (+ lightbox), VideoHighlights, Countdown, EventCard, EventsIndex…
  app/
    page.tsx                home: hero, next event teaser, manifesto, page directory
    upcoming/page.tsx       next event showcase with live countdown + other announced dates
    events/page.tsx         cinematic horizontal archive + full grid with filters
    about/page.tsx          manifesto, story, philosophy, mission, team, impact numbers
    testimonials/page.tsx   carousel + wall of every quote
    contact/page.tsx        enquiry form, email, phone, studio, socials
    events/[slug]/page.tsx  event detail template (static params from content)
    sitemap.ts, robots.ts, icon.svg
  .github/workflows/deploy.yml  static export → GitHub Pages
```

## Rebranding (no redesign required)

1. **Name & copy** — `src/content/site.ts` (`name`, `wordmark`, `descriptor`, `tagline`, contact, socials, nav).
2. **Logo** — set `site.logo.src` to an image to replace the typographic wordmark, or edit the `Mark` SVG in `src/components/ui/Logo.tsx`.
3. **Colours** — the `:root` tokens at the top of `src/app/globals.css` (`--color-ink`, `--color-bone`, `--color-ember`, …). Components reference tokens only.
4. **Type** — `src/styles/fonts.ts`. The fluid type scale lives in `globals.css` under `@theme`.
5. **Favicon** — `src/app/icon.svg`. Add `public/og.jpg` for social previews.

## Updating events

Add or edit records in `src/content/events.ts`. The site derives everything from dates:

- An event is **upcoming** until `endsAt` passes; it then moves to the archive automatically. Pages revalidate hourly (`revalidate = 3600`), so no rebuild is needed for the switch.
- The **countdown** is computed from `startsAt` in the browser and shows "Happening now" between start and end.
- Set `registrationUrl` to send the primary CTA to a ticketing page. Without it, the CTA opens the enquiry form pre-filled with the event name.
- `gallery`, `videos`, `memories`, `facts` are all optional. Videos accept a direct `src` (mp4/webm) or an `embedUrl` (YouTube/Vimeo).
- If no upcoming events exist, the home page shows a "coming soon" panel with the most recent experience.

Every image is an `ImageAsset` (`src`, `alt`, optional `position` for `object-position`). Components use `object-fit: cover`, so any aspect ratio works; use `position` to keep faces in frame.

## Deployment (GitHub Pages)

The site is a **static export** (`output: "export"` in `next.config.ts`), so it runs on any static host. Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with `NEXT_PUBLIC_BASE_PATH=/<repo>` and publishes the `out/` folder to GitHub Pages. For a custom domain or a `<user>.github.io` repository the base path is left empty automatically.

Live: https://atharvakun.github.io/rj/

Because there is no server, "upcoming" versus "past" is decided when the site is built. Re-run the workflow (or push) after an event passes to move it into the archive; the countdown itself is live in the browser.

To build the export locally: `NEXT_PUBLIC_BASE_PATH=/rj npm run build` then serve `out/` under `/rj/`.

## Enquiry form

The form validates client-side, ignores honeypot submissions and then either:

1. POSTs JSON to `NEXT_PUBLIC_ENQUIRY_ENDPOINT` if it is set at build time (Formspree, Basin, Getform, a webhook…). On GitHub Actions, set a repository variable named `ENQUIRY_ENDPOINT`.
2. Otherwise opens the visitor's email app with the enquiry drafted to `site.contact.email`.

See `.env.example`.

## Motion system

A single motion language is defined in `src/lib/gsap.ts` (easing, durations, stagger). Section treatments differ on purpose:

| Section | Treatment |
| --- | --- |
| Preloader | Counter + wordmark, once per session; curtain lifts into the hero |
| Hero | Slit clip-path image reveal, staggered word entrance, scroll-driven scale + parallax, nav drop-in |
| Upcoming | Sticky poster with parallax, masked line reveals, hairline-drawn meta grid, flip-digit countdown |
| Archive | Pinned horizontal scroll (desktop) with container-driven parallax, drag-to-explore mapped to page scroll, native swipe on mobile, category filters |
| Impact | Drifting outlined marquee, hairlines drawing in, counters |
| Testimonials | Directional slide carousel, autoplay with pause/visibility awareness, swipe, keyboard |
| About | Pinned manifesto with scroll-scrubbed word emphasis, scroll-scaled imagery, parallax |
| Contact | Word-split headline, magnetic email link, form states |
| Footer | Sticky reveal beneath the last section |
| Routes | Curtain wipe (`TransitionProvider`) + per-route entrance (`template.tsx`) |

Desktop extras: custom cursor with contextual labels (`data-cursor-label`), magnetic buttons, scroll progress bar. All of it respects `prefers-reduced-motion` (Lenis, cursor and reveals switch off; content is always visible without JavaScript).

## Connecting a CMS later

Components never import data files directly, only the loaders in `src/content/index.ts`. To integrate Sanity, Payload, Contentful or a database, make those loaders async and fetch, keeping the `EventRecord` shape (or map to it). No component changes are required.

## Accessibility & performance notes

- Semantic landmarks, skip link, focus-visible styles, `aria-pressed` filters, dialog semantics on lightbox/video/menu, live region for the countdown.
- `next/image` with `sizes` everywhere, AVIF/WebP, priority only on hero media.
- Animations use transforms, opacity and clip-path only; ScrollTriggers are scoped and cleaned up via `useGSAP`.
- No horizontal overflow: `overflow-x: clip` on body plus contained tracks.

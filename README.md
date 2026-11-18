# Rajasthan Puraskar Samaj — website

A single-page site for a community organisation (samaj) of people of Rajasthani origin settled in Maharashtra, which honours members who have achieved distinction in their fields and gathers the community through the year. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger + SplitText, Framer Motion and Lenis, exported statically to GitHub Pages.

> **Placeholder content.** The organisation name is the client's. Everything else (events, dates, venues, team roles, award categories, contact details, photographs) is placeholder copy written from the brief and must be confirmed or replaced by the Samaj before launch. No real person is named as a team member or award recipient anywhere on the site.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static export to out/)
```

Node 20+ recommended. Fonts load from Google Fonts at build time; temporary photography loads from Wikimedia Commons (credited on `/credits`, sourced in `src/content/photos.ts`).

## The page

```
/                 gate intro → hero → where we come from → about + team → upcoming events → the awards → contact
/events/[slug]    detail page per event (static params from content)
/credits          photo credits, generated from photos.ts
```

The navigation links are section anchors (`/#about`, `/#events`, `/#awards`, `/#contact`); the current section is underlined as you scroll. Event pages link back to the sections, and "Register interest" on an event page lands on the contact form with the message pre-filled.

### Opening sequence

`src/components/intro/GateIntro.tsx`: a fort wall with a cusped gateway rises against the dusk, an elephant and a camel walk in to flank it, the doors swing open on the greeting (पधारो म्हारे देस · Welcome to · Rajasthan Puraskar Samaj), then the camera passes through the gate into the hero. It plays once per browser session, has a **Skip intro** button, and never plays for `prefers-reduced-motion` or for deep links to a section. The silhouettes are free Wikimedia Commons SVGs (CC0 / public domain, noted in `silhouettes.ts`).

## Where things live

```
src/
  content/            ← everything editable, no presentation code
    site.ts           name, greeting, contact, socials, nav
    home.ts           hero, photo strip, section copy, contact purposes
    about.ts          manifesto, story blocks, values, team roles
    awards.ts         award categories, eligibility, process
    events.ts         upcoming + past events (dates, venue, gallery)
    photos.ts         placeholder photography with credits
    types.ts          the content model (CMS-shaped)
    index.ts          loaders: getUpcomingEvents(), getPastEvents(), getEventBySlug()…
  styles/fonts.ts     the typefaces (Fraunces, Manrope, JetBrains Mono, Tiro Devanagari Hindi)
  app/globals.css     design tokens (colours, type scale, easing), base styles
  components/
    intro/            GateIntro + silhouettes
    layout/           navigation (section spy), footer, smooth scroll, page transitions, cursor
    motion/           TextReveal, RevealImage, Parallax, Stagger
    ui/               Button, Magnetic, Logo, Eyebrow, Marquee, TransitionLink, ArchDefs (the arch clip path)
    home/             Hero, PhotoStrip, About (with team), UpcomingEvent, Awards, Contact, EnquiryForm
    events/           EventHero, Gallery (+ lightbox), VideoHighlights, Countdown, EventCard…
  .github/workflows/deploy.yml  static export → GitHub Pages
```

## Editing content

- **Team** — `about.ts` → `team.members`. Each entry has a `role`; add `name`, `blurb` and a `photo` once the person has confirmed. Cards without a name read "Name to be confirmed".
- **Awards** — `awards.ts`: categories (with the Devanagari word shown above each title), eligibility points and the four-step process. Honourees are not listed until the Samaj confirms a real list.
- **Events** — `events.ts`. An event is **upcoming** until `endsAt` passes. Because the site is static, upcoming / past is decided at build time: push or re-run the workflow after an event to move it into the past. Venues are deliberately marked "to be confirmed". Set `registrationUrl` to send the primary CTA to a ticketing page; without it the CTA opens the contact form pre-filled.
- **Contact** — `site.ts` → `contact` and `socials` (placeholders), `home.ts` → `contact.purposes` for the "reason for writing" options.
- **Photos** — replace entries in `photos.ts` with the Samaj's own images (keep `alt` honest). The `/credits` page and footer link exist because the placeholders are Creative Commons; remove them once no CC images remain.

## Rebranding

1. **Name & copy** — `src/content/site.ts`.
2. **Logo** — set `site.logo.src` to an image, or edit the arch `Mark` in `src/components/ui/Logo.tsx` (`ArchDefs.tsx` holds the shared arch path).
3. **Colours** — the `:root` tokens at the top of `src/app/globals.css`. The site is white-first: `ink` is "the surface" and `bone` "the type", so stage sections are white with charcoal text, `theme-paper` sections are warm ivory, and anything that must stay dark (gate intro, hero, image overlays, footer, menus) adds the `theme-dark` class, which swaps the same tokens to the cinematic dark palette. `--color-ember` is the kesariya accent, `--color-gold` the metallic; `night` / `day` never change. The gate scene's sandstone palette is local to `GateIntro.tsx`.
4. **Type** — `src/styles/fonts.ts`.
5. **Favicon** — `src/app/icon.svg`. Add `public/og.jpg` for social previews.

## Deployment (GitHub Pages)

The site is a **static export** (`output: "export"` in `next.config.ts`). Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with `NEXT_PUBLIC_BASE_PATH=/<repo>` and publishes `out/` to GitHub Pages. For a custom domain or a `<user>.github.io` repository the base path is left empty automatically.

Live: https://atharvakun.github.io/rj/

To build the export locally: `NEXT_PUBLIC_BASE_PATH=/rj npm run build` then serve `out/` under `/rj/`.

## Contact form

The form validates client-side, ignores honeypot submissions and then either:

1. POSTs JSON to `NEXT_PUBLIC_ENQUIRY_ENDPOINT` if it is set at build time (Formspree, Basin, Getform, a webhook…). On GitHub Actions, set a repository variable named `ENQUIRY_ENDPOINT`.
2. Otherwise opens the visitor's email app with the message drafted to `site.contact.email`.

`?purpose=nomination#contact` pre-selects "Nominate someone" and drops in a nomination template; `?event=<slug>#contact` pre-fills an attendance request. See `.env.example`.

## Motion system

A single motion language is defined in `src/lib/gsap.ts` (easing, durations, stagger).

| Section | Treatment |
| --- | --- |
| Intro | Fort gate scene: wall rises, animals walk in, doors swing open in 3D, greeting rises, zoom through the opening (masked out of the wall) |
| Hero | Slit clip-path image reveal, staggered word entrance, scroll-driven scale + parallax, nav drop-in |
| Where we come from | Two counter-rotating photo marquees, nudged by scroll; hover pauses |
| About | Pinned manifesto with scroll-scrubbed word emphasis, scroll-scaled imagery, arch-shaped team tiles |
| Upcoming | Sticky poster with parallax, masked line reveals, flip-digit countdown |
| Awards | Sticky intro with rotating seal, staggered category list |
| Contact | Word-split headline, magnetic email link, form states |
| Footer | Sticky reveal beneath the last section |
| Routes | Curtain wipe (`TransitionProvider`) + per-route entrance (`template.tsx`); anchors scroll smoothly, including across pages |

Desktop extras: custom cursor with contextual labels, magnetic buttons, scroll progress bar. All of it respects `prefers-reduced-motion`.

## Connecting a CMS later

Components never import data files directly, only the loaders in `src/content/index.ts`. To integrate Sanity, Payload, Contentful or a database, make those loaders async and fetch, keeping the `EventRecord` shape (or map to it).

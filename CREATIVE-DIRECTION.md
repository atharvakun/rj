# Creative direction

## Three directions explored

**A. Cinematic Festival** — full-bleed night photography, warm stage light, oversized type, slow atmospheric transitions. Strength: immediate emotional pull; the photography does the talking. Risk: every dark festival site looks the same; type can become decoration.

**B. Experimental Editorial** — asymmetric grids, oversized titles that overlap imagery, variable aspect ratios, mono labels, choreographed rather than uniform motion. Strength: memorable, feels authored. Risk: can tip into noise and hurt legibility for event information.

**C. Contemporary Cultural** — warm neutrals, generous whitespace, sophisticated layouts, photographic storytelling in daylight. Strength: trust and warmth; reads well for clients. Risk: safe; the first screen does not stop anyone scrolling.

## The chosen system: "Cinematic Editorial"

The site alternates between two stages, like a festival site alternates between night and day:

- **Stage (A):** a warm near-black (`#0b0a09`, not pure black) carries the hero, upcoming event, archive, testimonials and contact. Photography is full-bleed, grain-textured and lit from below by a gradient scrim.
- **Paper (C):** a bone colour (`#f3ede3`) carries the impact and about sections, giving the eye rest and the organisation a daylight, trustworthy voice.
- **Editorial structure (B)** governs both: a 12-column grid used asymmetrically, titles that overlap images, mono eyebrows, hairlines instead of boxes, and variable image proportions in the archive and galleries.

One hot accent, **ember** (`#e4552b`), appears sparingly: the italic word in the headline, the cursor when it has something to say, the primary CTA, the scroll-progress line. A quiet **gold** is reserved for future use.

## Typography

- **Fraunces** (variable; optical size 144, soft 30, wonk on) for display. It is a serif with a pulse: slightly warped, confident at 13rem, humane at 1.5rem. Italic is used for one emphasised word only.
- **Manrope** for interface text and body copy.
- **JetBrains Mono**, uppercase and tracked, for eyebrows, counters and metadata. It anchors the editorial register and gives dates and numbers a production-sheet feel.

Fluid scale: `display-xl` (3.5–13rem), `display-lg`, `display-md`, `display-sm`, `lead`, `eyebrow`.

## Photography

Designed around images, not around boxes. Every image surface is `object-fit: cover` with a per-image focal hint, so client photography can replace placeholders without layout changes. Temporary images were chosen for authenticity: real crowds, performers mid-movement, backstage detail, community tables. No stock-poster compositions, no stereotyped cultural motifs.

## Motion language

Three principles:

1. **Reveal by uncovering.** Images arrive through clip-path (slit, up, left, right) and settle with a slow scale; text arrives through line masks. Nothing fades in from nowhere.
2. **Scroll is a timeline.** Hero media scales away, the archive pins and travels sideways, the manifesto fills word by word, hairlines draw in. Scrub is used where the scroll position should feel like a hand on a dial.
3. **Each section has one idea.** The upcoming event is about anticipation (sticky poster, flip-digit countdown). The archive is about exploration (drag, horizontal parallax). Impact is about weight (counters, hairlines). Testimonials are about voice (large quotation, directional slides).

Easing: `expo.out` for entrances, `power4.inOut` for clip-path wipes, `[0.76, 0, 0.24, 1]` for curtains. Durations 0.4s (micro) / 1.1s (reveal) / 1.4s (scene).

Reduced motion switches off smooth scrolling, the cursor, pinning and reveals; the site remains fully readable and navigable.

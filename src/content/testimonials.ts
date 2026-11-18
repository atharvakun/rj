import type { Testimonial } from "./types";
import { photos } from "./photos";

/** PLACEHOLDER testimonials. Replace with real, permissioned quotes. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "I came for one evening and stayed for all three. Nothing felt staged, everything felt considered. It is the first festival where I have wanted to thank the people who made it.",
    name: "Placeholder attendee",
    role: "Winter Lights, three-night pass",
    kind: "attendee",
  },
  {
    quote:
      "They treated a brief about a corporate anniversary as if it were a festival commission. Our people are still talking about it a year later.",
    name: "Placeholder client",
    role: "Head of Culture, placeholder company",
    kind: "client",
    photo: photos.testimonialClient,
  },
  {
    quote:
      "The sound was mixed for the audience, not for the stage. As a performer, that tells you everything about who you are working with.",
    name: "Placeholder artist",
    role: "Performer, The Long Night of Dance",
    kind: "partner",
  },
  {
    quote:
      "Accessible, well-signed, kind staff, real food. The small things were right, which is why the big moments landed.",
    name: "Placeholder attendee",
    role: "Monsoon Sound",
    kind: "attendee",
  },
  {
    quote:
      "We have hosted many productions in our venue. This team left it cleaner than they found it and the neighbours sent thank-you notes.",
    name: "Placeholder venue manager",
    role: "Heritage venue, Kolkata",
    kind: "client",
  },
  {
    quote:
      "Rooftop Ramble changed how our street feels. People wave now.",
    name: "Placeholder resident",
    role: "Fort District, Mumbai",
    kind: "attendee",
  },
];

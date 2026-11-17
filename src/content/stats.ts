import type { Stat } from "./types";
import { site } from "./site";

/**
 * IMPACT FIGURES — PLACEHOLDER VALUES.
 * These are illustrative and must be replaced with the organisation's
 * verified numbers before launch. "Years" is derived from `site.foundedYear`.
 */
export const stats: Stat[] = [
  { label: "Festivals & events produced", value: 48, suffix: "" },
  { label: "People welcomed", value: 120000, suffix: "+" },
  { label: "Cities", value: 14 },
  {
    label: "Years of making gatherings",
    value: new Date().getFullYear() - site.foundedYear,
  },
];

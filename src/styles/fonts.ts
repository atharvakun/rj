/**
 * Typography — swap fonts here without touching components.
 * Each font exposes a CSS variable consumed by `globals.css`.
 */
import { Fraunces, Manrope, JetBrains_Mono, Tiro_Devanagari_Hindi } from "next/font/google";

export const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-display",
  display: "swap",
});

export const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

/** Devanagari for the greeting and award names; pairs with the Fraunces display face. */
export const devanagari = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-devanagari",
  display: "swap",
});

export const fontClassNames = `${display.variable} ${sans.variable} ${mono.variable} ${devanagari.variable}`;

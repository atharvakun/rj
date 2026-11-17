import { getPastEvents, getUpcomingEvents } from "@/content";
import { Hero } from "@/components/home/Hero";
import { NextUp } from "@/components/home/NextUp";
import { Statement } from "@/components/home/Statement";
import { Directory } from "@/components/home/Directory";

/** Upcoming / past is decided at build time (static export); redeploy to refresh it. */

export default function HomePage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <>
      <Hero next={upcoming[0] ?? null} />
      <NextUp event={upcoming[0] ?? null} fallback={past[0] ?? null} />
      <Statement />
      <Directory />
    </>
  );
}

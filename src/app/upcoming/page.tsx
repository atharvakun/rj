import type { Metadata } from "next";
import { getPastEvents, getUpcomingEvents } from "@/content";
import { home } from "@/content/home";
import { pad2 } from "@/lib/utils";
import { PageHeader } from "@/components/layout/PageHeader";
import { UpcomingEvent } from "@/components/home/UpcomingEvent";

export const metadata: Metadata = {
  title: "Upcoming",
  description: "Dates, venues, times and a live countdown for our next festivals, concerts and community events.",
};

/** Upcoming / past is decided at build time (static export); redeploy to refresh it. */

export default function UpcomingPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();
  const { eyebrow, title, intro } = home.pages.upcoming;

  return (
    <div className="theme-stage">
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} className="pb-0 md:pb-0">
        <p className="mt-6 font-mono text-xs text-ash">
          {pad2(upcoming.length)} {upcoming.length === 1 ? "event" : "events"} announced
        </p>
      </PageHeader>
      <UpcomingEvent events={upcoming} fallback={past[0] ?? null} className="pt-16 md:pt-24" />
    </div>
  );
}

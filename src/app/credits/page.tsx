import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { home } from "@/content/home";
import { photos } from "@/content/photos";
import { pad2 } from "@/lib/utils";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stagger } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Sources and licences for the placeholder photography used on this site.",
};

export default function CreditsPage() {
  const { eyebrow, title, intro } = home.pages.credits;
  const entries = Object.values(photos);
  // Group by photographer so each person is credited once, with all their images listed.
  const byArtist = new Map<string, typeof entries>();
  for (const p of entries) {
    const list = byArtist.get(p.credit.artist) ?? [];
    list.push(p);
    byArtist.set(p.credit.artist, list);
  }
  const artists = [...byArtist.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="theme-stage">
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} className="pb-0 md:pb-0">
        <p className="mt-6 font-mono text-xs text-ash">
          {pad2(entries.length)} photographs · {pad2(artists.length)} photographers
        </p>
      </PageHeader>
      <div className="container-x pb-32 pt-16 md:pt-24">
        <Stagger as="ul" className="border-t border-smoke" selector=":scope > li" y={16}>
          {artists.map(([artist, list]) => (
            <li key={artist} className="grid gap-4 border-b border-smoke py-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                <p className="font-medium">{artist}</p>
                <p className="mt-1 text-sm text-ash">{[...new Set(list.map((p) => p.credit.licence))].join(" · ")}</p>
              </div>
              <ul className="space-y-2 md:col-span-8">
                {list.map((p) => (
                  <li key={p.credit.page} className="text-sm text-bone/80">
                    <a href={p.credit.page} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1.5">
                      {p.credit.title.replace(/\.(jpe?g|png)$/i, "")}
                      <ExternalLink className="h-3 w-3 shrink-0 text-ash" strokeWidth={1.75} />
                    </a>
                    <span className="text-ash"> · {p.credit.licence}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Stagger>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ash">
          Images are served at reduced size from Wikimedia Commons and may have been cropped to fit. CC BY-SA images remain under
          their original licence. Replace them with the organisation&apos;s own photography before launch.
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { site } from "@/content";
import { home } from "@/content/home";
import { PageHeader } from "@/components/layout/PageHeader";
import { About } from "@/components/home/About";
import { Impact } from "@/components/home/Impact";

export const metadata: Metadata = {
  title: "About",
  description: `${site.description} Our story, philosophy, mission and team.`,
};

export default function AboutPage() {
  const { eyebrow, title, intro } = home.pages.about;
  return (
    <div className="theme-paper">
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} tone="paper" className="pb-0 md:pb-0">
        <p className="mt-6 font-mono text-xs text-clay">
          {site.base} · since {site.foundedYear}
        </p>
      </PageHeader>
      <About />
      <Impact />
    </div>
  );
}

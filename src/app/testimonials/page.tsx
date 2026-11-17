import type { Metadata } from "next";
import { testimonials } from "@/content";
import { home } from "@/content/home";
import { pad2 } from "@/lib/utils";
import { PageHeader } from "@/components/layout/PageHeader";
import { Testimonials } from "@/components/home/Testimonials";
import { TestimonialsWall } from "@/components/home/TestimonialsWall";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What audiences, artists, venues and partners said after our festivals, concerts and community events.",
};

export default function TestimonialsPage() {
  const { eyebrow, title, intro } = home.pages.testimonials;
  return (
    <div className="theme-stage">
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} className="pb-0 md:pb-0">
        <p className="mt-6 font-mono text-xs text-ash">{pad2(testimonials.length)} voices</p>
      </PageHeader>
      <Testimonials heading={false} />
      <TestimonialsWall />
    </div>
  );
}

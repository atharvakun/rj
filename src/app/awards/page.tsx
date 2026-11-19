import type { Metadata } from "next";
import { home } from "@/content/home";
import { Awards } from "@/components/home/Awards";

export const metadata: Metadata = {
  title: home.pages.awards.title,
  description: home.pages.awards.description,
};

export default function AwardsPage() {
  return <Awards standalone />;
}

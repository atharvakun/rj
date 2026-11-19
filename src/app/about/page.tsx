import type { Metadata } from "next";
import { home } from "@/content/home";
import { About } from "@/components/home/About";

export const metadata: Metadata = {
  title: home.pages.about.title,
  description: home.pages.about.description,
};

export default function AboutPage() {
  return <About standalone />;
}

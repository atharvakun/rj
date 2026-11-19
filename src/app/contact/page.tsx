import type { Metadata } from "next";
import { home } from "@/content/home";
import { Contact } from "@/components/home/Contact";

export const metadata: Metadata = {
  title: home.pages.contact.title,
  description: home.pages.contact.description,
};

/** `?purpose=nomination` and `?event=<slug>` pre-fill the form (see EnquiryForm). */
export default function ContactPage() {
  return <Contact standalone />;
}

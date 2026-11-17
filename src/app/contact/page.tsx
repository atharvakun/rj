import type { Metadata } from "next";
import { Contact } from "@/components/home/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Commission a festival, a cultural programme, a brand experience or a community event. Email, phone and enquiry form.",
};

export default function ContactPage() {
  return <Contact headingAs="h1" />;
}

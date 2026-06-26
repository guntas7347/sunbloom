import OathsClient from "@/Components/OathsClient";
import { getAllOathDocs, getAllOathFaqs } from "@/lib/firebase/oath";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commissioner of Oaths Edmonton | Fast & Same-Day Services starting at $20",
  description: "Commissioner of Oaths Edmonton™ provides same-day, professional Commissioner for Oaths services in Edmonton, Alberta starting at $20. Text/Call (587) 336-3343 or book your Commissioner of Oaths appointment online today.",
};

export default async function OathsPage() {
  const docs = await getAllOathDocs();
  const faqs = await getAllOathFaqs();

  return <OathsClient initialDocs={docs} initialFaqs={faqs} />;
}

import { unstable_cache } from "next/cache";
import { getAllOathDocs, getAllOathFaqs } from "./oath";

export const getCachedOathDocs = unstable_cache(
  async () => getAllOathDocs(),
  ["oath-docs"],
  {
    tags: ["oath-docs"],
    revalidate: 3600,
  }
);

export const getCachedOathFaqs = unstable_cache(
  async () => getAllOathFaqs(),
  ["oath-faqs"],
  {
    tags: ["oath-faqs"],
    revalidate: 3600,
  }
);

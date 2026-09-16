import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServiceAliasPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/services/${slug}`);
}

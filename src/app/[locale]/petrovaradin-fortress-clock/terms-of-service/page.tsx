import { redirect } from 'next/navigation';

// Legacy URL: use the actively translated terms page for each locale.
export default async function LegacyTerms({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/terms-of-service`);
}

import { redirect } from 'next/navigation';

// Legacy URL: use the actively translated privacy page for each locale.
export default async function LegacyPrivacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/privacy-policy`);
}

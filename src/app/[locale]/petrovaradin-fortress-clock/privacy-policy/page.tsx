import { redirect } from 'next/navigation';
import { localPath } from '@/lib/site';

// Legacy URL: use the actively translated privacy page for each locale.
export default async function LegacyPrivacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(localPath(locale, '/privacy-policy'));
}

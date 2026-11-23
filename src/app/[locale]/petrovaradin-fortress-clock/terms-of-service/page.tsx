import { redirect } from 'next/navigation';
import { localPath } from '@/lib/site';

// Legacy URL: use the actively translated terms page for each locale.
export default async function LegacyTerms({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(localPath(locale, '/terms-of-service'));
}

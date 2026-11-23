import { redirect } from 'next/navigation';
import { localPath } from '@/lib/site';

export default async function LegacyAttraction({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(localPath(locale, '/st-naum-monastery-ohrid'));
}

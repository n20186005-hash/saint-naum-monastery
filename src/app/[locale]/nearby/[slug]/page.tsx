import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import NearbyGuidePage, { guideMetadata } from '@/components/NearbyGuidePage';
import { guideSlugs, hasGuide } from '@/lib/nearby';
import { isLocale } from '@/lib/site';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  return guideMetadata(locale, slug);
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !hasGuide(slug)) notFound();
  setRequestLocale(locale);
  return <NearbyGuidePage locale={locale} slug={slug} />;
}

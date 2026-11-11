import { setRequestLocale } from 'next-intl/server';
import NearbyGuidePage, { guideMetadata } from '@/components/NearbyGuidePage';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return guideMetadata(locale, 'saint-naum-springs');
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NearbyGuidePage locale={locale} slug="saint-naum-springs" />;
}

import { setRequestLocale } from 'next-intl/server';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import PetrovaradinHero from '@/components/PetrovaradinHero';
import PetrovaradinIntro from '@/components/PetrovaradinIntro';
import PetrovaradinBasicInfo from '@/components/PetrovaradinBasicInfo';
import PetrovaradinHoursSection from '@/components/PetrovaradinHoursSection';
import PetrovaradinTicketsSection from '@/components/PetrovaradinTicketsSection';
import PetrovaradinTransportSection from '@/components/PetrovaradinTransportSection';
import PetrovaradinInfoSection from '@/components/PetrovaradinInfoSection';
import PetrovaradinRouteSection from '@/components/PetrovaradinRouteSection';
import PetrovaradinPhotoSpotsSection from '@/components/PetrovaradinPhotoSpotsSection';
import PetrovaradinGallery from '@/components/PetrovaradinGallery';
import PetrovaradinReviews from '@/components/PetrovaradinReviews';
import PetrovaradinMapEmbed from '@/components/PetrovaradinMapEmbed';

export default async function PetrovaradinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      <Header />
      <main>
        <PetrovaradinHero locale={locale} />
        <PetrovaradinIntro />
        <PetrovaradinBasicInfo />
        <PetrovaradinHoursSection />
        <PetrovaradinTicketsSection />
        <PetrovaradinTransportSection />
        <PetrovaradinInfoSection />
        <PetrovaradinRouteSection />
        <PetrovaradinPhotoSpotsSection />
        <PetrovaradinGallery />
        <PetrovaradinReviews />
        <PetrovaradinMapEmbed />
      </main>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return {
    title: messages.meta.title,
    description: messages.meta.description,
  };
}

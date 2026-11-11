import { notFound } from 'next/navigation';
import { isLocale, metadataFor } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return metadataFor(locale, '', messages.meta.title, messages.meta.description);
}
export default function MonasteryAliasLayout({ children }: { children: React.ReactNode }) { return children; }

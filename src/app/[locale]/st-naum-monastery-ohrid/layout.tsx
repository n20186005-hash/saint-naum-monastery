import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// The parent locale layout owns the document and translation provider.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const base = 'https://www.saintnaummonastery.com';
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${base}/${locale === 'zh' ? '' : 'en/'}st-naum-monastery-ohrid`,
      languages: {
        en: `${base}/en/st-naum-monastery-ohrid`,
        zh: `${base}/st-naum-monastery-ohrid`,
        'x-default': `${base}/en/st-naum-monastery-ohrid`,
      },
    },
  };
}

export default function StNaumLayout({ children }: { children: React.ReactNode }) {
  return children;
}

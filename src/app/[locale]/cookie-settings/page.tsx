import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://www.saintnaummonastery.com';
  const enUrl = `${baseUrl}/en/cookie-settings`;
  const zhUrl = `${baseUrl}/cookie-settings`;

  return {
    alternates: {
      canonical: locale === 'en' ? enUrl : zhUrl,
      languages: {
        'en': enUrl,
        'zh': zhUrl,
        'x-default': enUrl,
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}

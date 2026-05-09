import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { headers } from 'next/headers';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = (requested && routing.locales.includes(requested as any))
    ? requested
    : routing.defaultLocale;

  // 加载通用翻译
  const messages = {
    ...(await import(`../messages/${locale}.json`)).default,
  };

  const headersList = await headers();
  const referer = headersList.get('referer') || '';
  const pathname = headersList.get('x-middleware-request-url') || headersList.get('x-invoke-path') || referer || '';

  // 根据 URL 路径加载对应的景点翻译
  if (pathname.includes('petrovaradin-fortress-clock')) {
    Object.assign(messages, (await import(`../messages/petrovaradin.${locale}.json`)).default);
  }

  return {
    locale,
    messages,
  };
});

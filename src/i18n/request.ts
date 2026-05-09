import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale, request }) => {
  const requested = await requestLocale;
  const locale = (requested && routing.locales.includes(requested as any))
    ? requested
    : routing.defaultLocale;

  // 加载通用翻译
  const messages = {
    ...(await import(`../messages/${locale}.json`)).default,
  };

  // 根据 URL 路径加载对应的景点翻译
  const url = request?.url || '';
  if (url.includes('st-naum-monastery-ohrid')) {
    Object.assign(messages, (await import(`../messages/st-naum-monastery-ohrid.${locale}.json`)).default);
  } else {
    Object.assign(messages, (await import(`../messages/petrovaradin.${locale}.json`)).default);
  }

  return {
    locale,
    messages,
  };
});

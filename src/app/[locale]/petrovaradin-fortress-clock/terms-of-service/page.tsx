import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isLocale, localPath } from '@/lib/site';
export { generateMetadata } from '../../terms-of-service/page';

const copy = {
  "zh": {
    "title": "服务条款",
    "updated": "最后更新：2026年5月",
    "sections": [
      {
        "heading": "1. 接受条款",
        "body": "通过访问和使用本网站，您同意受这些服务条款的约束。如果您不同意条款的任何部分，则不得访问该服务。"
      },
      {
        "heading": "2. 服务使用",
        "body": "本网站是一个独立的第三方旅游资讯项目。提供的信息仅供一般参考。您同意负责任且合法地使用本网站。"
      },
      {
        "heading": "3. 知识产权",
        "body": "本网站上的所有内容（包括文本、图像和徽标）均为网站所有者的财产（另有说明的除外）。严禁未经授权的使用、复制或分发。"
      },
      {
        "heading": "4. 责任限制",
        "body": "对于因使用或无法使用本网站或其中包含的信息而导致的任何直接、间接、附带或后果性损害，我们概不负责。"
      }
    ]
  },
  "en": {
    "title": "Terms of Service",
    "updated": "Last updated: May 2026",
    "sections": [
      {
        "heading": "1. Acceptance of terms",
        "body": "By accessing and using this website, you agree to be bound by these terms of service. If you disagree with any part of the terms, you may not access the service."
      },
      {
        "heading": "2. Use of the service",
        "body": "This website is an independent third-party travel information project. Its information is provided for general reference. You agree to use this website responsibly and lawfully."
      },
      {
        "heading": "3. Intellectual property",
        "body": "All content on this website, including text, images and logos, belongs to the website owner unless otherwise stated. Unauthorized use, copying or distribution is prohibited."
      },
      {
        "heading": "4. Limitation of liability",
        "body": "We accept no liability for any direct, indirect, incidental or consequential damage arising from the use of, or inability to use, this website or the information it contains."
      }
    ]
  }
};

export default async function RetainedPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const policy = copy[locale];
  return (
    <div className="min-h-screen py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-2">{policy.title}</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>{policy.updated}</p>
        {policy.sections.map((section) => <section key={section.heading} className="mb-8">
          <h2 className="font-semibold text-xl mb-3">{section.heading}</h2>
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{section.body}</p>
        </section>)}
        <a href={localPath(locale, '/petrovaradin-fortress-clock')} className="inline-flex items-center gap-2 text-sm mt-4" style={{ color: 'var(--accent)' }}>← {locale === 'zh' ? '返回首页' : 'Back to home'}</a>
      </div>
    </div>
  );
}

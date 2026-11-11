import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isLocale, localPath } from '@/lib/site';
export { generateMetadata } from '../../privacy-policy/page';

const copy = {
  "zh": {
    "title": "隐私政策",
    "updated": "最后更新：2026年5月",
    "sections": [
      {
        "heading": "1. 信息收集",
        "body": "我们通常不会主动收集用户的个人可识别信息。您透过联系表单或电子邮件提供的任何信息将被严格保密。"
      },
      {
        "heading": "2. 信息使用",
        "body": "我们收集的信息仅用于提供、维护和改进我们的服务，以及与您沟通。我们不会将您的个人信息出售或分享给第三方用于营销目的。"
      },
      {
        "heading": "3. Cookie 与追踪技术",
        "body": "我们使用 Cookie 和类似的追踪技术来追踪我们网站上的活动并保存某些信息。您可以指示您的浏览器拒绝所有 Cookie 或在发送 Cookie 时进行提示。"
      },
      {
        "heading": "4. 数据安全",
        "body": "您数据的安全性对我们很重要。我们努力使用商业上可接受的方式来保护您的个人数据，但任何互联网传输方法都无法保证100%安全。"
      }
    ]
  },
  "en": {
    "title": "Privacy Policy",
    "updated": "Last updated: May 2026",
    "sections": [
      {
        "heading": "1. Information collection",
        "body": "We generally do not actively collect personally identifiable information. Any information you provide through a contact form or email will be kept strictly confidential."
      },
      {
        "heading": "2. Use of information",
        "body": "Information we collect is used only to provide, maintain and improve our services and to communicate with you. We do not sell or share your personal information with third parties for marketing purposes."
      },
      {
        "heading": "3. Cookies and tracking technologies",
        "body": "We use cookies and similar tracking technologies to track activity on our website and retain certain information. You can instruct your browser to refuse all cookies or notify you when a cookie is being sent."
      },
      {
        "heading": "4. Data security",
        "body": "The security of your data matters to us. We use commercially acceptable methods to protect your personal data, but no method of internet transmission can guarantee complete security."
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

import { setRequestLocale } from 'next-intl/server';

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          隐私政策
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>最后更新：2026年5月</p>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>1. 信息收集</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              我们通常不会主动收集用户的个人可识别信息。您透过联系表单或电子邮件提供的任何信息将被严格保密。
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>2. 信息使用</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              我们收集的信息仅用于提供、维护和改进我们的服务，以及与您沟通。我们不会将您的个人信息出售或分享给第三方用于营销目的。
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>3. Cookie 与追踪技术</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              我们使用 Cookie 和类似的追踪技术来追踪我们网站上的活动并保存某些信息。您可以指示您的浏览器拒绝所有 Cookie 或在发送 Cookie 时进行提示。
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>4. 数据安全</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              您数据的安全性对我们很重要。我们努力使用商业上可接受的方式来保护您的个人数据，但任何互联网传输方法都无法保证100%安全。
            </p>
          </section>
        </div>
        
        <div className="mt-12">
          <a href="/petrovaradin-fortress-clock" className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--accent)' }}>
            ← 返回首页
          </a>
        </div>
      </div>
    </div>
  );
}

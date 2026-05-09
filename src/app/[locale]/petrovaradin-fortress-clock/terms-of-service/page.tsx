import { setRequestLocale } from 'next-intl/server';

export default async function TermsOfServicePage({
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
          服务条款
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>最后更新：2026年5月</p>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>1. 接受条款</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              通过访问和使用本网站，您同意受这些服务条款的约束。如果您不同意条款的任何部分，则不得访问该服务。
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>2. 服务使用</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              本网站是一个独立的第三方旅游资讯项目。提供的信息仅供一般参考。您同意负责任且合法地使用本网站。
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>3. 知识产权</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              本网站上的所有内容（包括文本、图像和徽标）均为网站所有者的财产（另有说明的除外）。严禁未经授权的使用、复制或分发。
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>4. 责任限制</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              对于因使用或无法使用本网站或其中包含的信息而导致的任何直接、间接、附带或后果性损害，我们概不负责。
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

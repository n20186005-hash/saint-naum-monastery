'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

export default function TransportSection() {
  const t = useTranslations('transport');

  const transportOptions = [
    {
      key: 'metro',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="3" width="16" height="16" rx="2"/>
          <line x1="4" y1="11" x2="20" y2="11"/>
          <line x1="8" y1="15" x2="8" y2="19"/>
          <line x1="16" y1="15" x2="16" y2="19"/>
          <circle cx="8.5" cy="7" r="1"/>
          <circle cx="15.5" cy="7" r="1"/>
        </svg>
      ),
    },
    {
      key: 'train',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="3" width="16" height="16" rx="2"/>
          <path d="M4 11h16"/>
          <path d="M12 3v8"/>
          <path d="M8 19l-2 3"/>
          <path d="M18 22l-2-3"/>
          <circle cx="8" cy="15" r="1"/>
          <circle cx="16" cy="15" r="1"/>
        </svg>
      ),
    },
    {
      key: 'bus',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 6v6"/>
          <path d="M16 6v6"/>
          <path d="M2 12h20"/>
          <path d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
          <circle cx="7" cy="19" r="2"/>
          <circle cx="17" cy="19" r="2"/>
        </svg>
      ),
    },
    {
      key: 'taxi',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 16H9v-2h5"/>
          <path d="M5 8l2.5 8h9L19 8"/>
          <path d="M5 8V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/>
          <circle cx="7.5" cy="17.5" r="1.5"/>
          <circle cx="16.5" cy="17.5" r="1.5"/>
        </svg>
      ),
    },
    {
      key: 'rideshare',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <circle cx="6" cy="18" r="2"/>
          <circle cx="18" cy="18" r="2"/>
          <path d="M12 6v4"/>
          <path d="M9 6V4"/>
          <path d="M15 6V4"/>
        </svg>
      ),
    },
    {
      key: 'cycling',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="5.5" cy="17.5" r="3.5"/>
          <circle cx="18.5" cy="17.5" r="3.5"/>
          <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transportOptions.map((option) => (
            <TransportCard
              key={option.key}
              icon={option.icon}
              title={t(option.key as any)}
              description={t(`${option.key}Desc` as any)}
            />
          ))}
        </div>

        {/* Additional routes */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransportCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            }
            title={t('fromStation')}
            description={t('fromStationDesc')}
          />
          <TransportCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            }
            title={t('fromNyhavn')}
            description={t('fromNyhavnDesc')}
          />
        </div>
      </div>
    </section>
  );
}

function TransportCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div
      className="rounded-xl p-5 flex gap-4"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      </div>
    </div>
  );
}

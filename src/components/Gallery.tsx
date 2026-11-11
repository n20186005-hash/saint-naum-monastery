'use client';

import { useTranslations, useMessages, useLocale } from 'next-intl';
import { useState, useRef, useEffect, useCallback } from 'react';

type Photo = { src: string; alt: string };
export default function Gallery() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const messages = useMessages() as unknown as { gallery?: { photos?: Photo[] } };
  const photos = messages.gallery?.photos || [];
  const [page, setPage] = useState(0);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const size = 9;
  const count = Math.ceil(photos.length / size);
  const text = locale === 'zh'
    ? { open: '查看大图', close: '关闭照片浏览器', previous: '上一张照片', next: '下一张照片', previousPage: '上一组照片', nextPage: '下一组照片', dialog: '照片浏览器', page: '组' }
    : { open: 'Open photo', close: 'Close photo viewer', previous: 'Previous photo', next: 'Next photo', previousPage: 'Previous gallery page', nextPage: 'Next gallery page', dialog: 'Photo viewer', page: 'Page' };
  const previous = useCallback(() => setIndex((i) => (i + photos.length - 1) % photos.length), [photos.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % photos.length), [photos.length]);
  useEffect(() => {
    if (!open || !dialog.current) return;
    const element = dialog.current;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      element.close();
      document.body.style.overflow = priorOverflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);
  if (!photos.length) return null;
  return (
    <>
      <section id="gallery" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2">{t('title')}</h2>
          <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
          <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {photos.slice(page * size, (page + 1) * size).map((photo, i) => (
              <button type="button" key={photo.src} className={`gallery-item photo-tile ${i === 0 ? 'photo-featured' : ''}`}
                aria-label={text.open + ': ' + photo.alt} aria-haspopup="dialog"
                onClick={(event) => { trigger.current = event.currentTarget; setIndex(page * size + i); setOpen(true); }}>
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          {count > 1 && <div className="flex items-center justify-center gap-5 mt-6">
            <button type="button" className="photo-page-control" aria-label={text.previousPage} onClick={() => setPage((p) => (p + count - 1) % count)}>←</button>
            <span aria-live="polite" className="text-sm">{text.page} {page + 1} / {count}</span>
            <button type="button" className="photo-page-control" aria-label={text.nextPage} onClick={() => setPage((p) => (p + 1) % count)}>→</button>
          </div>}
          <div className="text-center mt-6"><a href="https://maps.app.goo.gl/s8JhZaSRJxDGzAvX6" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>{t('viewAll')}</a></div>
        </div>
      </section>
      {open && <dialog ref={dialog} className="photo-dialog" aria-label={text.dialog}
        onCancel={() => setOpen(false)} onClose={() => setOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
          if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
        }}>
        <button ref={closeButton} type="button" className="photo-close" aria-label={text.close} onClick={() => setOpen(false)}>×</button>
        <figure className="photo-figure"><img src={photos[index].src} alt={photos[index].alt} /><figcaption aria-live="polite">{photos[index].alt} · {index + 1} / {photos.length}</figcaption></figure>
        <div className="photo-actions"><button type="button" aria-label={text.previous} onClick={previous}>←</button><button type="button" aria-label={text.next} onClick={next}>→</button></div>
      </dialog>}
    </>
  );
}

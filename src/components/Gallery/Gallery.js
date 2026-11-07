import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import SectionAnchor from '../common/SectionAnchor';
import { galleryItems } from '../../data/galleryData';

const MOBILE_INITIAL = 8;

const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const Tile = ({ item, index, lang, t, onOpen, hiddenOnMobile }) => {
  const videoRef = useRef(null);
  const alt = item.alt[lang];

  // Desktop nicety: muted inline preview while hovering a video tile.
  const startPreview = () => {
    const v = videoRef.current;
    if (!v || !canHover()) return;
    v.muted = true;
    if (!v.src) v.src = item.src;
    v.play().catch(() => {});
  };
  const stopPreview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <li className={hiddenOnMobile ? 'hidden md:block' : ''}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        onMouseEnter={item.type === 'video' ? startPreview : undefined}
        onMouseLeave={item.type === 'video' ? stopPreview : undefined}
        aria-label={`${item.type === 'video' ? t.gallery.playVideo : t.gallery.openImage}: ${alt}`}
        className="group relative block w-full aspect-[4/5] overflow-hidden bg-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary"
      >
        <img
          src={item.type === 'video' ? item.poster : item.src}
          srcSet={item.type === 'image' ? `${item.src} 800w, ${item.srcLarge} 1600w` : undefined}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.type === 'video' && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {item.type === 'video' && (
          <span className="absolute bottom-3 left-3 flex items-center justify-center w-11 h-11 rounded-full bg-primary text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
          </span>
        )}
      </button>
    </li>
  );
};

const Lightbox = ({ index, lang, t, onClose, onPrev, onNext }) => {
  const item = galleryItems[index];
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchX = useRef(null);

  useEffect(() => {
    closeRef.current && closeRef.current.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'Tab' && dialogRef.current) {
        // Keep focus inside the dialog.
        const nodes = dialogRef.current.querySelectorAll('button, video[controls]');
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx > 0) onPrev();
    else onNext();
  };

  const navBtn =
    'flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-primary hover:text-black text-white transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary';

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt[lang]}
      className="fixed inset-0 z-[100] flex flex-col bg-black"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <span className="font-display text-lg font-bold tracking-widest tabular-nums">
          {index + 1} / {galleryItems.length}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t.gallery.close} className={navBtn}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div
        className="relative flex-1 flex items-center justify-center px-4 pb-6 min-h-0"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {item.type === 'video' ? (
          <video
            key={item.src}
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="max-h-full max-w-full object-contain shadow-2xl"
          />
        ) : (
          <img
            key={item.srcLarge}
            src={item.srcLarge}
            alt={item.alt[lang]}
            className="max-h-full max-w-full object-contain shadow-2xl"
          />
        )}

        <button
          type="button"
          onClick={onPrev}
          aria-label={t.gallery.previous}
          className={`${navBtn} absolute left-4 top-1/2 -translate-y-1/2 hidden sm:flex`}
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={t.gallery.next}
          className={`${navBtn} absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex`}
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      <p className="px-4 pb-5 text-center text-slate-300 text-sm">{item.alt[lang]}</p>
    </div>
  );
};

const Gallery = ({ t }) => {
  const lang = t.nav.home === 'Home' ? 'en' : 'de';
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const lastTrigger = useRef(null);

  const open = (i) => {
    lastTrigger.current = document.activeElement;
    setOpenIndex(i);
  };
  const close = useCallback(() => {
    setOpenIndex(null);
    lastTrigger.current && lastTrigger.current.focus && lastTrigger.current.focus();
  }, []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length),
    []
  );
  const next = useCallback(() => setOpenIndex((i) => (i + 1) % galleryItems.length), []);

  return (
    <section id="gallery" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-3 text-primary font-display text-xl font-bold tracking-widest uppercase">
            <Camera className="w-6 h-6" />
            <span>{t.gallery.eyebrow}</span>
            <SectionAnchor id="gallery" />
          </div>
          <h2 className="text-white font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tighter">
            {t.gallery.title}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t.gallery.subtitle}</p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {galleryItems.map((item, i) => (
            <Tile
              key={i}
              item={item}
              index={i}
              lang={lang}
              t={t}
              onOpen={open}
              hiddenOnMobile={!showAll && i >= MOBILE_INITIAL}
            />
          ))}
        </ul>

        {galleryItems.length > MOBILE_INITIAL && (
          <div className="mt-8 flex justify-center md:hidden">
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              aria-expanded={showAll}
              className="bg-primary hover:bg-primary-dark text-black px-8 py-3 font-display text-lg font-bold uppercase tracking-wider transition-colors"
            >
              {showAll ? t.gallery.showLess : t.gallery.showAll}
            </button>
          </div>
        )}
      </div>

      {openIndex !== null && (
        <Lightbox index={openIndex} lang={lang} t={t} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
};

export default Gallery;

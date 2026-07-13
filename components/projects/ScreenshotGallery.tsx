'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ProjectShowcaseMedia } from '@/data/projects';
import { PhoneFrame } from './PhoneFrame';

export function ScreenshotGallery({ screenshots }: { screenshots: ProjectShowcaseMedia['screenshots'] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % screenshots.length);
  }, [screenshots.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  return (
    <section className="mt-16">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            Screenshots
          </span>
          <h2 className="font-display mt-3 text-2xl sm:text-3xl font-normal text-slate-900 dark:text-slate-50">
            Inside the app
          </h2>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {activeIndex + 1} / {screenshots.length}
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
        {screenshots.map((shot, i) => (
          <button
            key={shot.src}
            onClick={() => {
              setActiveIndex(i);
              setLightboxOpen(true);
            }}
            className="flex-shrink-0 snap-start w-[180px] sm:w-[200px] transition-transform hover:-translate-y-1"
          >
            <PhoneFrame src={shot.src} alt={shot.alt} />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            screenshots={screenshots}
            index={activeIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  screenshots,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  screenshots: ProjectShowcaseMedia['screenshots'];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const current = screenshots[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot gallery"
    >
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="relative max-w-sm w-[90vw]"
      >
        <div className="relative rounded-[2rem] overflow-hidden border border-slate-700 bg-black shadow-2xl">
          <div className="relative aspect-[9/19.5] w-full">
            <Image src={current.src} alt={current.alt} fill className="object-cover" sizes="90vw" />
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 rounded-full h-10 w-10 flex items-center justify-center bg-slate-900 text-white hover:bg-slate-800"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <button
          onClick={onPrev}
          className="absolute top-1/2 -translate-y-1/2 -left-12 rounded-full h-10 w-10 flex items-center justify-center bg-slate-900/80 text-white hover:bg-slate-900"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={onNext}
          className="absolute top-1/2 -translate-y-1/2 -right-12 rounded-full h-10 w-10 flex items-center justify-center bg-slate-900/80 text-white hover:bg-slate-900"
          aria-label="Next screenshot"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <p className="mt-4 text-center text-sm text-white/80">{current.alt}</p>
        <p className="text-center text-xs text-white/50 mt-1">
          {index + 1} / {screenshots.length}
        </p>
      </motion.div>
    </motion.div>
  );
}

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { type Testimonial, type TestimonialCategory, categoryLabels } from '@/data/testimonials';
import { cn } from '@/lib/utils';

interface Props {
  testimonials: Testimonial[];
}

type Filter = 'all' | TestimonialCategory;

const STACK_DEPTH = 4;

export function TestimonialsClient({ testimonials }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const availableCategories = useMemo(() => {
    const set = new Set<TestimonialCategory>();
    testimonials.forEach((t) => set.add(t.category));
    return Array.from(set);
  }, [testimonials]);

  const filtered = useMemo(
    () => (filter === 'all' ? testimonials : testimonials.filter((t) => t.category === filter)),
    [filter, testimonials],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  const next = useCallback(() => {
    setActiveIndex((i) => (filtered.length === 0 ? 0 : (i + 1) % filtered.length));
  }, [filtered.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) =>
      filtered.length === 0 ? 0 : (i - 1 + filtered.length) % filtered.length,
    );
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, lightboxOpen]);

  const totalVisible = Math.min(filtered.length, STACK_DEPTH);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          All ({testimonials.length})
        </FilterButton>
        {availableCategories.map((cat) => {
          const count = testimonials.filter((t) => t.category === cat).length;
          return (
            <FilterButton key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
              {categoryLabels[cat]} ({count})
            </FilterButton>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 py-10">
          No testimonials in this category yet.
        </div>
      ) : (
        <div className="relative max-w-2xl mx-auto">
          <div className="relative aspect-[3/2] [perspective:1200px]">
            {filtered.map((t, idx) => {
              const depth = (idx - activeIndex + filtered.length) % filtered.length;
              return (
                <StackCard
                  key={t.id}
                  testimonial={t}
                  depth={depth}
                  totalVisible={totalVisible}
                  isHidden={depth >= STACK_DEPTH}
                  onOpenLightbox={() => setLightboxOpen(true)}
                  onNext={next}
                  onPrev={prev}
                />
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:border-brand-500 dark:hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="px-3 text-xs font-semibold tabular-nums min-w-[70px] text-center">
              <span className="text-brand-600 dark:text-brand-400">{activeIndex + 1}</span>
              <span className="text-slate-400 dark:text-slate-500"> / {filtered.length}</span>
            </div>

            <button
              onClick={next}
              className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-brand-600 hover:bg-brand-700 text-white transition-colors shadow-md shadow-brand-600/25"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {filtered.length <= 12 && (
            <div className="mt-5 flex items-center justify-center gap-1.5 flex-wrap">
              {filtered.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === activeIndex
                      ? 'w-6 bg-brand-600'
                      : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600',
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <p className="mt-10 text-center text-xs text-slate-500 dark:text-slate-400">
        Want to see the full list on Upwork?{' '}
        <a
          href="https://www.upwork.com/freelancers/~016a2653ba2eb2f93c"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 underline underline-offset-2"
        >
          Visit my Upwork profile
        </a>
      </p>

      <AnimatePresence>
        {lightboxOpen && filtered[activeIndex] && (
          <Lightbox
            current={filtered[activeIndex]}
            indexLabel={`${activeIndex + 1} / ${filtered.length}`}
            onClose={() => setLightboxOpen(false)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function StackCard({
  testimonial,
  depth,
  totalVisible,
  isHidden,
  onOpenLightbox,
  onNext,
  onPrev,
}: {
  testimonial: Testimonial;
  depth: number;
  totalVisible: number;
  isHidden: boolean;
  onOpenLightbox: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const isTop = depth === 0;
  const visualDepth = Math.min(depth, Math.max(totalVisible - 1, 0));
  const offsetY = visualDepth * 16;
  const scale = 1 - visualDepth * 0.05;
  const opacity = isHidden ? 0 : Math.max(0.4, 1 - visualDepth * 0.22);
  const zIndex = isHidden ? 0 : 50 - visualDepth;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (!isTop) return;
    const swipeDistance = Math.abs(info.offset.x);
    const swipeVelocity = Math.abs(info.velocity.x);
    if (swipeDistance > 90 || swipeVelocity > 500) {
      if (info.offset.x < 0) onNext();
      else onPrev();
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{ y: offsetY, scale, opacity, zIndex }}
      transition={{ type: 'spring', stiffness: 240, damping: 30, mass: 0.9 }}
      style={{ position: 'absolute', inset: 0, transformOrigin: 'top center' }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.35}
      whileDrag={{ scale: 1.01 }}
      onDragEnd={handleDragEnd}
      aria-hidden={!isTop}
    >
      <button
        type="button"
        onClick={isTop ? onOpenLightbox : undefined}
        disabled={!isTop}
        tabIndex={isTop ? 0 : -1}
        aria-label={isTop ? `Open testimonial: ${testimonial.alt}` : undefined}
        className={cn(
          'group relative block h-full w-full rounded-2xl overflow-hidden border',
          'bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950',
          'shadow-[0_24px_60px_-22px_rgba(15,23,42,0.35)] dark:shadow-[0_24px_60px_-22px_rgba(0,0,0,0.7)]',
          isTop
            ? 'cursor-zoom-in border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-colors'
            : 'cursor-default border-slate-200/70 dark:border-slate-800/70 pointer-events-none',
        )}
      >
        <div className="absolute inset-3 sm:inset-4">
          <Image
            src={testimonial.image}
            alt={testimonial.alt}
            fill
            sizes="(min-width: 768px) 640px, 92vw"
            className="object-contain select-none pointer-events-none drop-shadow-sm"
            priority={isTop}
            draggable={false}
          />
        </div>

        {isTop && (
          <>
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-white/95 text-slate-900 backdrop-blur-md shadow-sm">
                {categoryLabels[testimonial.category]}
              </span>
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 right-3 z-10 inline-flex items-center justify-center h-9 w-9 rounded-full bg-brand-600 text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
              <ZoomIn className="h-4 w-4" />
            </div>
          </>
        )}
      </button>
    </motion.div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all',
        active
          ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
          : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500',
      )}
    >
      {children}
    </button>
  );
}

function Lightbox({
  current,
  indexLabel,
  onClose,
  onPrev,
  onNext,
}: {
  current: Testimonial;
  indexLabel: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
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
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[110] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 260 }}
        className="relative max-w-5xl w-[92vw] max-h-[90vh] rounded-2xl overflow-hidden bg-white dark:bg-slate-950 shadow-2xl"
      >
        <div className="relative w-full h-[80vh]">
          <Image
            src={current.image}
            alt={current.alt}
            fill
            className="object-contain"
            sizes="95vw"
          />
        </div>
        <div className="absolute top-3 right-3">
          <button
            onClick={onClose}
            className="rounded-full h-10 w-10 flex items-center justify-center bg-slate-900/80 text-white hover:bg-slate-900"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={onPrev}
          className="absolute top-1/2 -translate-y-1/2 left-3 rounded-full h-10 w-10 flex items-center justify-center bg-slate-900/80 text-white hover:bg-slate-900"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={onNext}
          className="absolute top-1/2 -translate-y-1/2 right-3 rounded-full h-10 w-10 flex items-center justify-center bg-slate-900/80 text-white hover:bg-slate-900"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/95 text-slate-900 backdrop-blur-md">
            {categoryLabels[current.category]}
          </span>
          <span className="text-xs text-white/70">{indexLabel}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { type Testimonial, type TestimonialCategory, categoryLabels } from '@/data/testimonials';
import { cn } from '@/lib/utils';

interface Props {
  testimonials: Testimonial[];
}

type Filter = 'all' | TestimonialCategory;

export function TestimonialsClient({ testimonials }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const availableCategories = useMemo(() => {
    const set = new Set<TestimonialCategory>();
    testimonials.forEach((t) => set.add(t.category));
    return Array.from(set);
  }, [testimonials]);

  const filtered = useMemo(
    () => (filter === 'all' ? testimonials : testimonials.filter((t) => t.category === filter)),
    [filter, testimonials],
  );

  return (
    <>
      {/* Filter tabs */}
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

      {/* Grid */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((t, idx) => (
            <motion.button
              layout
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10"
              aria-label={`Open testimonial: ${t.alt}`}
            >
              <Image
                src={t.image}
                alt={t.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                <span className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-white/95 text-slate-900 backdrop-blur-md">
                  {categoryLabels[t.category]}
                </span>
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-brand-600 text-white">
                  <ZoomIn className="h-4 w-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() =>
              setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))
            }
            onNext={() =>
              setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))
            }
          />
        )}
      </AnimatePresence>
    </>
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
        'px-4 py-2 rounded-full text-sm font-medium transition-all',
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
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: Testimonial[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const current = items[index];

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
        {items.length > 1 && (
          <>
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
          </>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/95 text-slate-900 backdrop-blur-md">
            {categoryLabels[current.category]}
          </span>
          <span className="text-xs text-white/70">
            {index + 1} / {items.length}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

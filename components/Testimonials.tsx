import { getAvailableTestimonials } from '@/lib/testimonials';
import { TestimonialsClient } from '@/components/TestimonialsClient';
import { FolderUp } from 'lucide-react';

export function Testimonials() {
  const available = getAvailableTestimonials();

  return (
    <section
      id="testimonials"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            Real words · Upwork verified
          </span>
          <h2 className="font-display mt-4 text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 dark:text-slate-50 leading-tight">
            Clients whose projects <span className="text-accent-emerald">actually shipped</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Screenshots pulled straight from my Upwork profile, spanning software engineering, SEO, content
            writing, and blog writing engagements going back to 2020.
          </p>
        </div>

        {available.length === 0 ? (
          <EmptyTestimonialState />
        ) : (
          <TestimonialsClient testimonials={available} />
        )}
      </div>
    </section>
  );
}

function EmptyTestimonialState() {
  return (
    <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-700 text-center">
      <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 flex items-center justify-center">
        <FolderUp className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
        Add your testimonial screenshots
      </h3>
      <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400">
        Drop your Upwork testimonial images into{' '}
        <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[12px]">
          public/testimonials/
        </code>{' '}
        using the filenames referenced in{' '}
        <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[12px]">
          data/testimonials.ts
        </code>{' '}
        — the gallery will auto-populate when they&apos;re detected.
      </p>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
        Tip: Filenames like <code>software-engineering-1.png</code>, <code>seo-2.png</code>, etc.
      </p>
    </div>
  );
}

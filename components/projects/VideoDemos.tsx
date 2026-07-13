'use client';

import { useState } from 'react';
import type { ProjectShowcaseMedia } from '@/data/projects';
import { PhoneFrame } from './PhoneFrame';
import { cn } from '@/lib/utils';

export function VideoDemos({ videos }: { videos: ProjectShowcaseMedia['videos'] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (videos.length <= 1) return null;

  const active = videos[activeIndex];

  return (
    <section className="mt-16">
      <div className="mb-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          Screen recordings
        </span>
        <h2 className="font-display mt-3 text-2xl sm:text-3xl font-normal text-slate-900 dark:text-slate-50">
          See it in motion
        </h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {videos.map((video, i) => (
          <button
            key={video.src}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all',
              activeIndex === i
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-brand-500',
            )}
          >
            {video.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-6 sm:p-8 flex justify-center">
          <PhoneFrame
            key={active.src}
            videoSrc={active.src}
            poster={active.poster}
            autoPlay
            loop
            muted
          />
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="font-medium text-slate-900 dark:text-slate-100 mb-2">{active.label}</p>
          <p>
            Tap a demo above to switch recordings. Videos play muted — unmute from your browser controls if
            needed.
          </p>
        </div>
      </div>
    </section>
  );
}

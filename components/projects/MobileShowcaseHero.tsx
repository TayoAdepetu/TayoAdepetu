'use client';

import type { Project } from '@/data/projects';
import { PhoneFrame } from './PhoneFrame';

export function MobileShowcaseHero({ project }: { project: Project }) {
  const showcase = project.showcase;
  const primaryVideo = showcase?.videos[0];
  const highlights = showcase?.highlights ?? [];

  return (
    <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          Mobile App
        </span>
        <h1 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 dark:text-slate-50 leading-tight">
          {project.name}
        </h1>
        <p className="mt-3 text-base font-medium text-brand-700 dark:text-brand-400">{project.tagline}</p>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
          {project.description}
        </p>

        {highlights.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-5 text-[13px] text-slate-500 dark:text-slate-400">{project.role} · {project.year}</p>
      </div>

      <div className="relative">
        <PhoneFrame
          videoSrc={primaryVideo?.src}
          poster={primaryVideo?.poster ?? showcase?.cover}
          src={!primaryVideo ? showcase?.cover : undefined}
          alt={`${project.name} demo`}
          autoPlay
          loop
          muted
          priority
          className="animate-float motion-reduce:animate-none"
        />
      </div>
    </div>
  );
}

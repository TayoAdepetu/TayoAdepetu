'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Smartphone } from 'lucide-react';
import type { Project } from '@/data/projects';
import { PhoneFrame } from './PhoneFrame';

const categoryLabels: Record<string, string> = {
  mobile: 'Mobile App',
};

export function MobileProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const cardImages = project.showcase?.cardImages;
  const fallback = project.showcase?.cover ?? project.image;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/10"
    >
      <div className="relative bg-slate-50/80 dark:bg-slate-900/40 px-4 sm:px-6 pt-8 pb-4">
        <div className="flex items-end justify-center gap-3 sm:gap-5">
          {cardImages ? (
            <>
              <PhoneFrame
                src={cardImages[0]}
                alt={`${project.name} app screen 1`}
                priority={index < 2}
                className="w-full max-w-[200px] -rotate-6 group-hover:-rotate-3 transition-transform motion-reduce:transform-none"
              />
              <PhoneFrame
                src={cardImages[1]}
                alt={`${project.name} app screen 2`}
                priority={index < 2}
                className="w-full max-w-[200px] rotate-6 translate-y-2 group-hover:rotate-3 transition-transform motion-reduce:transform-none"
              />
            </>
          ) : (
            <PhoneFrame
              src={fallback}
              alt={`${project.name} app screenshot`}
              priority={index < 2}
              className="group-hover:animate-float motion-reduce:animate-none"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-[11px] font-semibold">
            <Smartphone className="h-3 w-3" />
            {categoryLabels[project.category] ?? project.category}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">{project.year}</span>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{project.name}</h3>
        <p className="mt-1 text-[13px] font-medium text-brand-700 dark:text-brand-400">{project.tagline}</p>
        <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">{project.role}</div>
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors"
          >
            View showcase
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

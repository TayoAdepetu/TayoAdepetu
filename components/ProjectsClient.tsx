'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Code2 } from 'lucide-react';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

type Filter = 'all' | Project['category'];

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'fintech', label: 'FinTech' },
  { id: 'ai', label: 'AI' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'erp', label: 'ERP / POS' },
];

const categoryLabels: Record<Project['category'], string> = {
  web: 'Web',
  mobile: 'Mobile',
  fintech: 'FinTech',
  ai: 'AI',
  marketplace: 'Marketplace',
  erp: 'ERP / POS',
};

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {FILTERS.map((f) => {
          const count = f.id === 'all' ? projects.length : projects.filter((p) => p.category === f.id).length;
          if (f.id !== 'all' && count === 0) return null;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                filter === f.id
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500',
              )}
            >
              {f.label} ({count})
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-semibold">
                  {categoryLabels[project.category]}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{project.year}</span>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                {project.name}
                {project.status === 'archived' && (
                  <span className="text-[10px] uppercase tracking-wider font-medium text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">
                    Archived
                  </span>
                )}
              </h3>

              <p className="mt-1 text-sm font-medium text-brand-700 dark:text-brand-400">
                {project.tagline}
              </p>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate pr-2">{project.role}</div>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors flex-shrink-0"
                  >
                    Visit
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold flex-shrink-0">
                    <Code2 className="h-3.5 w-3.5" />
                    Case study
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

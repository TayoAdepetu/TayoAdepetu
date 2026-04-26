'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ExternalLink, ArrowRight, Code2 } from 'lucide-react';
import { projects } from '@/data/projects';

const categoryLabels: Record<string, string> = {
  web: 'Web App',
  mobile: 'Mobile App',
  fintech: 'FinTech',
  ai: 'AI',
  marketplace: 'Marketplace',
  erp: 'ERP / POS',
};

export function Projects() {
  // Show a curated selection on the homepage — full list on /projects
  const featured = projects.filter((p) => p.featured || ['learnstar', 'ranie-erp', 'dotman-communication'].includes(p.id));

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
              Selected work
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
              Products I&apos;ve <span className="text-gradient-brand">shipped</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              From enterprise project management to AI insurance claims to multi-farm agribusiness ops — here&apos;s
              a slice of the 35+ projects I&apos;ve delivered.
            </p>
          </div>
          <Link
            href="/projects"
            className="self-start sm:self-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-semibold">
                  {categoryLabels[project.category] ?? project.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{project.year}</span>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 flex items-center gap-2">
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

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400">{project.role}</div>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors"
                  >
                    Visit project
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                    <Code2 className="h-3.5 w-3.5" />
                    Case study
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

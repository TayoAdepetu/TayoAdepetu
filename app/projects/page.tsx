import type { Metadata } from 'next';
import { ProjectsClient } from '@/components/ProjectsClient';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected work by Tayo Adepetu — enterprise project management, AI claims processing, fintech payment rails, farm management, e-learning, hospitality ERP, and escrow-powered marketplaces.',
};

export default function ProjectsPage() {
  return (
    <main className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
            Projects
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
            A selection of work I&apos;ve <span className="text-gradient-brand">built and shipped</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
            Across enterprise systems, fintech, AI, hospitality, and marketplaces — here are the projects I&apos;ve
            led or contributed to over the last 4+ years.
          </p>
        </div>

        <ProjectsClient projects={projects} />
      </div>
    </main>
  );
}

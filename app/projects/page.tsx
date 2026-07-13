import type { Metadata } from 'next';
import { ProjectsClient } from '@/components/ProjectsClient';
import { PageHeader } from '@/components/PageHeader';
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
        <PageHeader
          label="Projects"
          title={
            <>
              A selection of work I&apos;ve{' '}
              <span className="text-brand-600 dark:text-brand-400">built and shipped</span>
            </>
          }
          description="Across enterprise systems, fintech, AI, hospitality, and marketplaces — here are the projects I've led or contributed to over the last 4+ years."
        />

        <ProjectsClient projects={projects} />
      </div>
    </main>
  );
}

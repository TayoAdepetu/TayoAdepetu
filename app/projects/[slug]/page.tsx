import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { projects } from '@/data/projects';
import { getShowcaseProjectSlugs } from '@/data/mobile-showcases';
import { site } from '@/data/site';
import { MobileShowcaseHero } from '@/components/projects/MobileShowcaseHero';
import { ScreenshotGallery } from '@/components/projects/ScreenshotGallery';
import { VideoDemos } from '@/components/projects/VideoDemos';
import { ProjectShowcaseCta } from '@/components/projects/ProjectShowcaseCta';

export async function generateStaticParams() {
  return getShowcaseProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project?.showcase) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.name} — Mobile App Showcase`,
    description: project.description,
    openGraph: {
      title: `${project.name} — Mobile App Showcase`,
      description: project.description,
      images: [{ url: new URL(project.showcase.cover, site.url).toString() }],
    },
  };
}

export default async function ProjectShowcasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug && p.showcase);

  if (!project?.showcase) {
    notFound();
  }

  return (
    <main className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <article className="max-w-6xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-10 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to projects
        </Link>

        <MobileShowcaseHero project={project} />
        <ScreenshotGallery screenshots={project.showcase.screenshots} />
        <VideoDemos videos={project.showcase.videos} />
        <ProjectShowcaseCta />
      </article>
    </main>
  );
}

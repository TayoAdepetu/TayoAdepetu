import type { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { ArticleCard } from '@/components/ArticleCard';
import { PageHeader } from '@/components/PageHeader';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes from Tayo Adepetu on freelancing, SEO, software engineering, and the craft of shipping products people actually use.',
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <main className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          label="Writing"
          title={
            <>
              My <span className="text-brand-600 dark:text-brand-400">Articles</span>
            </>
          }
          description="Freelancing, SEO, software engineering, and the small lessons I pick up while shipping software. No fluff. No listicles."
        />

        {articles.length === 0 ? (
          <div className="p-10 rounded-2xl bg-white dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-700 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              No posts yet. Add MDX files to{' '}
              <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">content/articles/</code> and
              they&apos;ll show up here.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

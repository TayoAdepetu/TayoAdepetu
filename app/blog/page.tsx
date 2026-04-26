import type { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { ArticleCard } from '@/components/ArticleCard';
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
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
            Blog
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
            Notes <span className="text-gradient-brand">from the field</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
            Freelancing, SEO, software engineering, and the small lessons I pick up while shipping software. No
            fluff. No listicles.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="p-10 rounded-2xl bg-white dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-700 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              No posts yet. Add MDX files to <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">content/articles/</code> and they&apos;ll show up here.
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

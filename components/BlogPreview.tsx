import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { ArticleCard } from './ArticleCard';
import { ArrowRight, BookOpen } from 'lucide-react';

export function BlogPreview() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <section id="blog" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
              From the blog
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
              Notes from the field
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Freelancing, SEO, product engineering, and the lessons I pick up shipping software in public.
            </p>
          </div>
          <Link
            href="/blog"
            className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="p-10 rounded-2xl bg-white dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-700 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              New posts coming soon. Add MDX files to <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">content/articles/</code>.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

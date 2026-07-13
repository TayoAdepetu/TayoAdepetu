import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';

function formatTopic(tag: string) {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

function formatYear(date: string) {
  return new Date(date).getFullYear();
}

export function BlogPreview() {
  const articles = getAllArticles().slice(0, 5);

  return (
    <section id="blog" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 dark:text-slate-50 leading-tight">
              My Articles
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Freelancing, SEO, product engineering, and the lessons I pick up shipping software in public.
            </p>
          </div>
          <Link
            href="/blog"
            className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 transition-colors"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="py-10 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="mx-auto mb-4 h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              New posts coming soon. Add MDX files to{' '}
              <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">content/articles/</code>.
            </p>
          </div>
        ) : (
          <ol className="border-t border-slate-200 dark:border-slate-800">
            {articles.map((article, i) => (
              <li key={article.slug} className="border-b border-slate-200 dark:border-slate-800">
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex items-baseline gap-4 sm:gap-6 py-6 sm:py-7 hover:bg-slate-50/80 dark:hover:bg-slate-900/30 -mx-3 px-3 rounded-lg transition-colors"
                >
                  <span className="flex-shrink-0 w-8 text-sm font-mono tabular-nums text-slate-400 dark:text-slate-500 pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors leading-tight">
                    {article.title}
                  </span>
                  <span className="hidden sm:inline flex-shrink-0 text-[11px] text-slate-500 dark:text-slate-400">
                    {formatTopic(article.tags[0] ?? 'Notes')} · {formatYear(article.date)}
                  </span>
                  <ArrowUpRight className="flex-shrink-0 h-3.5 w-3.5 text-slate-300 dark:text-slate-600 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

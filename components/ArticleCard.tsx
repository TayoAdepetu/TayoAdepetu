import Link from 'next/link';
import { ArticleFrontmatter } from '@/lib/mdx';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export function ArticleCard({ article }: { article: ArticleFrontmatter }) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group relative flex flex-col p-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/10"
    >
      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {formattedDate}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {article.readTime}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
        {article.title}
      </h3>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed flex-1">
        {article.excerpt}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all">
          Read
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

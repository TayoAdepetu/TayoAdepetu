import Link from 'next/link';
import { ArticleFrontmatter } from '@/lib/mdx';
import { Calendar, Clock } from 'lucide-react';

export function ArticleCard({ article }: { article: ArticleFrontmatter }) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all hover:shadow-md"
    >
      <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
        {article.title}
      </h3>
      
      <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
        {article.excerpt}
      </p>
      
      <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500 mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {formattedDate}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {article.readTime}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}


import { getAllArticles } from '@/lib/mdx';
import { ArticleCard } from './ArticleCard';

export function Articles() {
  const articles = getAllArticles();

  if (articles.length === 0) {
    return (
      <section id="articles" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">
            Articles
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Articles coming soon. Check back later for insights on freelancing, career growth, and tech.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">
          Articles
        </h2>
        
        <div className="space-y-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}


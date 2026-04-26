import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getArticleBySlugSafe, getArticleSlugs } from '@/lib/mdx';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlugSafe(slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.excerpt,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.excerpt,
      type: 'article',
      publishedTime: article.frontmatter.date,
      authors: ['Tayo Adepetu'],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlugSafe(slug);

  if (!article) {
    notFound();
  }

  const { frontmatter, content } = article;

  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-50 leading-tight">
            {frontmatter.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-5">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {frontmatter.readTime}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
          <MDXRemote source={content} />
        </div>
      </article>
    </main>
  );
}

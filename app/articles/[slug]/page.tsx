import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const { frontmatter } = getArticleBySlug(slug);
    return {
      title: `${frontmatter.title} - Tayo Adepetu`,
      description: frontmatter.excerpt,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.excerpt,
        type: 'article',
        publishedTime: frontmatter.date,
        authors: ['Tayo Adepetu'],
      },
    };
  } catch {
    return {
      title: 'Article Not Found - Tayo Adepetu',
    };
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const { frontmatter, content } = getArticleBySlug(slug);

    const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <main className="min-h-screen py-20 px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/#articles"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to articles
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              {frontmatter.title}
            </h1>

            <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400 mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {frontmatter.readTime}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
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
  } catch (error) {
    notFound();
  }
}


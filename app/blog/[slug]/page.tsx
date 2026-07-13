import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'mdx/types';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getArticleBySlugSafe, getArticleSlugs } from '@/lib/mdx';
import { site } from '@/data/site';

const mdxComponents: MDXComponents = {
  img: ({ src, alt }) => {
    if (!src || typeof src !== 'string') return null;

    return (
      <figure className="my-10 not-prose">
        <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
          <Image
            src={src}
            alt={alt ?? ''}
            width={1200}
            height={675}
            className="w-full h-auto"
            sizes="(min-width: 768px) 768px, 100vw"
          />
        </div>
        {alt ? (
          <figcaption className="mt-2.5 text-center text-xs text-slate-500 dark:text-slate-400">{alt}</figcaption>
        ) : null}
      </figure>
    );
  },
};

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
      images: article.frontmatter.coverImage
        ? [{ url: new URL(article.frontmatter.coverImage, site.url).toString() }]
        : undefined,
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
          className="inline-flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to blog
        </Link>

        <header className="mb-10">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal mb-3.5 text-slate-900 dark:text-slate-50 leading-tight">
            {frontmatter.title}
          </h1>

          <div className="flex items-center gap-3.5 text-[12.5px] text-slate-500 dark:text-slate-400 mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {frontmatter.readTime}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-8">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {frontmatter.coverImage ? (
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <Image
                src={frontmatter.coverImage}
                alt={frontmatter.coverImageAlt ?? frontmatter.title}
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
                sizes="(min-width: 768px) 768px, 100vw"
              />
            </div>
          ) : null}
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </article>
    </main>
  );
}

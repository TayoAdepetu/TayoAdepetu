import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleImage {
  src: string;
  alt: string;
}

export interface ArticleFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  slug: string;
  coverImage?: string;
  coverImageAlt?: string;
  images?: ArticleImage[];
}

export interface ArticleData {
  frontmatter: ArticleFrontmatter;
  content: string;
}

function articlePathForSlug(slug: string): string | null {
  const mdxPath = path.join(articlesDirectory, `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) return mdxPath;

  const mdPath = path.join(articlesDirectory, `${slug}.md`);
  if (fs.existsSync(mdPath)) return mdPath;

  return null;
}

export function getArticleSlugs(): string[] {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      return [];
    }

    return fs
      .readdirSync(articlesDirectory)
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
      .map((file) => file.replace(/\.(mdx|md)$/, ''));
  } catch {
    return [];
  }
}

/**
 * Throws if the article cannot be found. Prefer getArticleBySlugSafe in pages.
 */
export function getArticleBySlug(slug: string): ArticleData {
  const realSlug = slug.replace(/\.(mdx|md)$/, '');
  const fullPath = articlePathForSlug(realSlug);

  if (!fullPath) {
    throw new Error(`Article not found: ${realSlug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: {
      ...data,
      slug: realSlug,
    } as ArticleFrontmatter,
    content,
  };
}

/**
 * Safe variant — returns null instead of throwing.
 */
export function getArticleBySlugSafe(slug: string): ArticleData | null {
  try {
    return getArticleBySlug(slug);
  } catch {
    return null;
  }
}

export function getAllArticles(): ArticleFrontmatter[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => {
      const { frontmatter } = getArticleBySlug(slug);
      return frontmatter;
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  return articles;
}

export type TestimonialCategory =
  | 'software-engineering'
  | 'seo'
  | 'content-writing'
  | 'blog-writing';

export interface Testimonial {
  id: string;
  image: string;
  alt: string;
  category: TestimonialCategory;
  year?: string;
}

/**
 * Upwork testimonial screenshots.
 *
 * To add more, drop the image into `/public/testimonials/` and append an entry below.
 * Filenames are just conventions — any path under /public works.
 */
export const testimonials: Testimonial[] = [
  // Software Engineering testimonials
  {
    id: 'se-01',
    image: '/testimonials/software-engineering-1.png',
    alt: 'Upwork testimonial on a software engineering project',
    category: 'software-engineering',
  },
  {
    id: 'se-02',
    image: '/testimonials/software-engineering-2.png',
    alt: 'Upwork testimonial on a software engineering project',
    category: 'software-engineering',
  },
  {
    id: 'se-03',
    image: '/testimonials/software-engineering-3.png',
    alt: 'Upwork testimonial on a software engineering project',
    category: 'software-engineering',
  },
  {
    id: 'se-04',
    image: '/testimonials/software-engineering-4.png',
    alt: 'Upwork testimonial on a software engineering project',
    category: 'software-engineering',
  },

  // SEO testimonials
  {
    id: 'seo-01',
    image: '/testimonials/seo-1.png',
    alt: 'Upwork testimonial on an SEO engagement',
    category: 'seo',
  },
  {
    id: 'seo-02',
    image: '/testimonials/seo-2.png',
    alt: 'Upwork testimonial on an SEO engagement',
    category: 'seo',
  },
  {
    id: 'seo-03',
    image: '/testimonials/seo-3.png',
    alt: 'Upwork testimonial on an SEO engagement',
    category: 'seo',
  },

  // Content writing testimonials
  {
    id: 'cw-01',
    image: '/testimonials/content-writing-1.png',
    alt: 'Upwork testimonial on a content writing project',
    category: 'content-writing',
  },
  {
    id: 'cw-02',
    image: '/testimonials/content-writing-2.png',
    alt: 'Upwork testimonial on a content writing project',
    category: 'content-writing',
  },

  // Blog writing testimonials
  {
    id: 'bw-01',
    image: '/testimonials/blog-writing-1.png',
    alt: 'Upwork testimonial on a blog writing project',
    category: 'blog-writing',
  },
  {
    id: 'bw-02',
    image: '/testimonials/blog-writing-2.png',
    alt: 'Upwork testimonial on a blog writing project',
    category: 'blog-writing',
  },
];

export const categoryLabels: Record<TestimonialCategory, string> = {
  'software-engineering': 'Software Engineering',
  seo: 'SEO',
  'content-writing': 'Content Writing',
  'blog-writing': 'Blog Writing',
};

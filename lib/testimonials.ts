import fs from 'fs';
import path from 'path';
import { testimonials as declared, type Testimonial } from '@/data/testimonials';

const testimonialsDir = path.join(process.cwd(), 'public', 'testimonials');

/**
 * Returns only the testimonials whose images actually exist on disk.
 * Falls back to all declared testimonials at build time if scanning fails.
 */
export function getAvailableTestimonials(): Testimonial[] {
  try {
    if (!fs.existsSync(testimonialsDir)) return [];
    const files = new Set(fs.readdirSync(testimonialsDir));
    return declared.filter((t) => {
      const basename = t.image.split('/').pop();
      return basename ? files.has(basename) : false;
    });
  } catch {
    return [];
  }
}

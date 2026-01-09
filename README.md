# Tayo Adepetu Portfolio

A minimalist, modern personal website built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- ✨ Clean, minimalist design with dark/light mode
- 📝 MDX-powered blog for articles
- 🎨 Fully responsive and mobile-friendly
- ⚡ Optimized for performance
- 🔍 SEO-ready with proper meta tags
- ♿ Accessible design (WCAG AA compliant)

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Content:** MDX for articles
- **Deployment:** Ready for Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd my-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
my-portfolio/
├── app/                      # Next.js app directory
│   ├── articles/[slug]/     # Individual article pages
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Projects.tsx        # Projects showcase
│   ├── Articles.tsx        # Articles listing
│   ├── Contact.tsx         # Contact section
│   ├── ThemeProvider.tsx   # Theme context provider
│   └── ThemeToggle.tsx     # Dark/light mode toggle
├── content/
│   └── articles/           # MDX article files
├── data/
│   └── projects.ts         # Projects data
├── lib/
│   └── mdx.ts             # MDX utilities
└── public/
    ├── images/            # Image assets
    └── resume.pdf         # Resume file
```

## Adding Content

### Adding a New Article

1. Create a new MDX file in `content/articles/`:

```mdx
---
title: "Your Article Title"
date: "2024-01-15"
excerpt: "Brief description of your article"
readTime: "5 min read"
tags: ["tag1", "tag2"]
---

# Your Article Title

Your article content here...
```

2. The article will automatically appear on the homepage and be accessible at `/articles/your-file-name`

### Adding a New Project

Edit `data/projects.ts` and add a new project object:

```typescript
{
  id: 'project-id',
  name: 'Project Name',
  description: 'Project description',
  tags: ['Next.js', 'TypeScript'],
  link: 'https://project-url.com',
  status: 'active',
}
```

## Customization

### Update Personal Information

1. **Social Links:** Edit `components/Hero.tsx` to update GitHub, LinkedIn, Twitter, and email links
2. **About Section:** Modify `components/About.tsx` to reflect your bio
3. **Profile Photo:** Replace `public/images/profile.jpg` with your photo
4. **Resume:** Replace `public/resume.pdf` with your resume

### Color Scheme

The site uses a monochromatic color scheme defined in `app/globals.css`. You can modify:

- Light mode: `--background: #ffffff` and `--foreground: #171717`
- Dark mode: `--background: #0a0a0a` and `--foreground: #ededed`

### Typography

The site uses Inter font. To change it, update `app/layout.tsx`:

```typescript
import { YourFont } from "next/font/google";
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`

## Performance

The site is optimized for performance:

- Next.js Image component for optimized images
- Server Components for reduced JavaScript
- Tailwind CSS for minimal CSS bundle
- MDX compiled at build time

Target metrics:
- Load time: < 2 seconds
- Lighthouse score: > 90 across all metrics

## License

This project is open source and available under the MIT License.

## Contact

For questions or feedback, reach out to [tayo@tayoadepetu.com](mailto:tayo@tayoadepetu.com).

---

Built with ❤️ using Next.js and TypeScript

# Customization Guide

This guide helps you personalize the portfolio to match your brand and preferences.

## Quick Customization Checklist

- [ ] Update personal information
- [ ] Add profile photo
- [ ] Update social media links
- [ ] Replace resume PDF
- [ ] Update projects data
- [ ] Write your About section
- [ ] Customize color scheme (optional)
- [ ] Add your articles

## Personal Information

### 1. Site Metadata

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Software Engineer",
  description: "Your personal description",
  keywords: ["Your Name", "Your Skills"],
  // ... update other fields
};
```

### 2. Hero Section

Edit `components/Hero.tsx`:

```typescript
// Update name
<h1>Your Name</h1>

// Update title
<p>Your Professional Title</p>

// Update tagline
<p>Your personal tagline here</p>

// Update social links
<a href="https://github.com/yourusername">
<a href="https://linkedin.com/in/yourusername">
<a href="https://twitter.com/yourusername">
<a href="mailto:your@email.com">
```

### 3. About Section

Edit `components/About.tsx` to tell your story:

```typescript
export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2>About Me</h2>
        <div className="space-y-6">
          <p>Your bio here...</p>
          {/* Add more paragraphs */}
        </div>
      </div>
    </section>
  );
}
```

### 4. Contact Information

Edit `components/Contact.tsx`:

```typescript
<a href="mailto:your@email.com">
  Send me an email
</a>
```

## Visual Assets

### Profile Photo

1. Prepare your photo:
   - Recommended size: 400x400 pixels or larger
   - Square aspect ratio (1:1)
   - Professional appearance
   - Good lighting and contrast

2. Save as `public/images/profile.jpg`

3. Supported formats: JPG, PNG, WebP

### Resume

1. Prepare your resume PDF
2. Replace `public/resume.pdf`
3. Ensure file size < 5MB for fast downloads

### Favicon

1. Create your favicon:
   - Use a tool like [Favicon.io](https://favicon.io)
   - Or use your initials/logo

2. Replace `app/favicon.ico`

## Projects

Edit `data/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 'unique-project-id',
    name: 'Project Name',
    description: 'Brief description (1-2 sentences)',
    tags: ['Technology', 'Framework', 'Tool'],
    link: 'https://project-url.com', // optional
    github: 'https://github.com/user/repo', // optional
    status: 'active', // or 'archived'
  },
  // Add more projects
];
```

### Project Guidelines

- **Keep descriptions concise**: 1-2 sentences maximum
- **Use relevant tags**: List key technologies
- **Active vs. Archived**: Mark completed/discontinued projects as archived
- **Links**: Include live site or GitHub repo when available

## Color Scheme

The site uses CSS variables for easy theme customization.

Edit `app/globals.css`:

### Option 1: Pure Monochrome (Default)

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### Option 2: Monochrome with Blue Accent

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --accent: #3b82f6;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
    --accent: #60a5fa;
  }
}
```

Then update buttons and links to use `--accent`:

```css
.accent-button {
  background-color: var(--accent);
}
```

### Option 3: Warm Monochrome

```css
:root {
  --background: #fafaf9;
  --foreground: #292524;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #1c1917;
    --foreground: #e7e5e4;
  }
}
```

### Custom Accent Color

To add an accent color throughout:

1. Define variable in `globals.css`:
```css
:root {
  --accent: #your-color;
}
```

2. Update components to use it:
```typescript
className="bg-[var(--accent)] hover:bg-[var(--accent)]/90"
```

## Typography

### Change Font

The site uses Inter by default. To change:

Edit `app/layout.tsx`:

```typescript
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

// In the body tag
className={`${roboto.variable} antialiased`}
```

Update `app/globals.css`:

```css
@theme inline {
  --font-sans: var(--font-roboto), system-ui, sans-serif;
}
```

### Font Sizes

Edit `app/globals.css` to adjust text sizes:

```css
/* Make body text larger */
body {
  font-size: 18px;
}

/* Adjust heading sizes */
h1 {
  font-size: 4rem; /* Larger hero heading */
}
```

## Layout & Spacing

### Max Width

Change content max-width in components:

```typescript
// Current: max-w-4xl
// Options: max-w-3xl (narrower), max-w-5xl (wider)
<div className="max-w-5xl mx-auto">
```

### Section Spacing

Adjust padding in section components:

```typescript
// Current: py-20
// Increase: py-24 or py-32
// Decrease: py-16 or py-12
<section className="py-24 px-6">
```

## Articles

### Article Template

Create new articles in `content/articles/`:

```mdx
---
title: "Your Article Title"
date: "2024-01-15"
excerpt: "Brief description for listings and SEO (1-2 sentences)"
readTime: "5 min read"
tags: ["tag1", "tag2", "tag3"]
---

# Your Article Title

Introduction paragraph...

## Section Heading

Content here...

### Subsection

More content...

## Conclusion

Final thoughts...
```

### Styling Article Content

Edit prose styles in `app/globals.css`:

```css
.prose {
  /* Customize article typography */
  font-size: 1.125rem;
  line-height: 1.75;
}

.prose h2 {
  /* Customize heading 2 */
  margin-top: 2.5em;
}
```

## Components

### Add New Sections

To add a new section to the homepage:

1. Create component in `components/YourSection.tsx`
2. Import and add to `app/page.tsx`:

```typescript
import { YourSection } from "@/components/YourSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <YourSection /> {/* Add here */}
      <Projects />
      <Articles />
      <Contact />
    </main>
  );
}
```

### Modify Existing Components

All components are in `components/` directory:

- `Hero.tsx` - Top section with photo and intro
- `About.tsx` - Biography section
- `Projects.tsx` - Project showcase
- `Articles.tsx` - Article listings
- `Contact.tsx` - Contact form/link
- `ThemeToggle.tsx` - Dark/light mode button

Edit any component to match your needs.

## Animations

The site includes subtle fade-in animations. To customize:

Edit `app/globals.css`:

```css
/* Adjust animation duration */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px); /* Adjust slide distance */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Change timing */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out; /* Adjust duration */
}
```

To add animations to components:

```typescript
<div className="animate-fade-in-up">
  {/* Content */}
</div>
```

## Footer

Edit the footer in `app/layout.tsx`:

```typescript
<footer className="py-8 px-6 text-center">
  <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
  {/* Add more footer content */}
</footer>
```

## Social Links

### Add More Social Platforms

Edit `components/Hero.tsx`:

```typescript
import { Youtube, Instagram } from 'lucide-react';

// Add new links
<a href="https://youtube.com/@yourchannel">
  <Youtube className="h-6 w-6" />
</a>
<a href="https://instagram.com/yourusername">
  <Instagram className="h-6 w-6" />
</a>
```

Available icons: [Lucide Icons](https://lucide.dev/icons/)

## SEO Customization

### Homepage Meta Tags

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Your Title",
  description: "Your description (150-160 characters)",
  keywords: ["keyword1", "keyword2"],
  openGraph: {
    title: "Your Name",
    description: "Your description",
    images: ['/images/og-image.jpg'], // Add OG image
  },
};
```

### Article Meta Tags

Meta tags are auto-generated from article frontmatter in `app/articles/[slug]/page.tsx`.

To customize, edit the `generateMetadata` function.

## Advanced Customization

### Add Newsletter Signup

Integrate with services like:
- ConvertKit
- Mailchimp
- Buttondown

### Add Comments

Use:
- [Giscus](https://giscus.app) (GitHub discussions)
- [Utterances](https://utteranc.es) (GitHub issues)

### Add Search

For article search, consider:
- Algolia
- Fuse.js (client-side search)

---

Need help with customization? Check the [README.md](README.md) or reach out!


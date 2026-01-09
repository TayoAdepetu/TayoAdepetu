# Tayo Adepetu Portfolio Website

## Project Overview
A minimalist, modern personal website serving as the central hub for Tayo Adepetu's professional presence. The site showcases software engineering work, freelancing insights, and ongoing projects.

**Domain:** tayoadepetu.com

## Design Philosophy
- **Aesthetic:** Minimalist, professional, clean
- **Color Scheme:** Monochromatic (black, white, grays) with subtle accent color option
- **Typography:** Modern, readable sans-serif fonts
- **Layout:** Single-page focused with minimal navigation
- **Responsive:** Mobile-first approach

## Core Features

### Homepage
The homepage is the primary and main page, containing:

1. **Hero Section**
   - Professional photo of Tayo
   - Name and primary title: "Software Engineer"
   - Brief tagline capturing multifaceted identity (engineer, writer, mentor, builder)
   - Social links: GitHub, LinkedIn, Twitter, Email
   - Link to downloadable resume

2. **About Section**
   - Short bio highlighting:
     - Top Rated Plus on Upwork
     - Former Content Writer turned Software Engineer
     - Economics graduate from Obafemi Awolowo University
     - Mentor to freelancers
     - Plans: ICAN certification, writing on economics/startups/tech

3. **Projects Section**
   - Grid/list of current and past projects:
     - **MyMoneyFlowAI** - Context-aware money flow management for freelancers and tax compliance
     - **FeedAfrica** - Sustainable farming platform with LinkedIn-style networking, HR tools, and farm management
     - **BizGrowthHackerz** - Nigerian freelancer-client marketplace (archived/failed project - optional to include)
   - Each project card includes:
     - Project name
     - Brief description (1-2 sentences)
     - External link to live site or GitHub (if available)
     - Tech stack tags (optional)

4. **Articles Section**
   - List of published articles (manually managed, no CMS)
   - Each article shows:
     - Title
     - Publication date
     - Brief excerpt (1-2 sentences)
     - Read time estimate
     - Click to open individual article page
   - Topics focus on: freelancing, career growth, Upwork strategies, tech transition

5. **Contact Section**
   - Simple "Get in Touch" section
   - Email link (opens default mail client)
   - Optional: Simple contact form (name, email, message)

### Article Pages
- Individual page for each article
- Clean, readable layout optimized for long-form content
- Markdown support for article content
- Navigation back to homepage
- Article metadata: date, read time, tags
- Share buttons (optional)

## Technical Requirements

### Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Content:** No CMS - articles stored as MDX/Markdown files in the repository
- **Deployment:** Vercel (recommended) or Netlify

### Features
- **Dark/Light Mode:** Toggle between themes, with system preference detection
- **SEO Optimization:** Meta tags, Open Graph, structured data
- **Performance:** Optimized images, lazy loading
- **Analytics:** Optional integration (Google Analytics or Vercel Analytics)
- **Accessibility:** WCAG AA compliant

### Content Management
- Articles stored in `/content/articles/` as MDX or Markdown files
- Each article file includes frontmatter:
  ```markdown
  ---
  title: "Article Title"
  date: "2024-01-15"
  excerpt: "Brief description"
  readTime: "5 min read"
  tags: ["freelancing", "upwork", "career"]
  ---
  ```
- Projects defined in a simple `/data/projects.ts` file or JSON

## Site Structure
```
/
├── app/
│   ├── page.tsx              # Homepage
│   ├── articles/
│   │   └── [slug]/
│   │       └── page.tsx      # Individual article pages
│   ├── layout.tsx            # Root layout with theme provider
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Articles.tsx
│   ├── Contact.tsx
│   ├── ThemeToggle.tsx
│   └── ArticleCard.tsx
├── content/
│   └── articles/
│       ├── article-1.mdx
│       ├── article-2.mdx
│       └── ...
├── data/
│   └── projects.ts
├── public/
│   ├── images/
│   │   └── profile.jpg
│   └── resume.pdf
└── lib/
    └── mdx.ts                # MDX parsing utilities
```

## Design Notes

### Color Palette Options

**Option 1: Pure Monochrome**
- Background (light): #FFFFFF
- Background (dark): #0A0A0A
- Text (light): #171717
- Text (dark): #E5E5E5
- Accent: #404040 / #A3A3A3

**Option 2: Monochrome with Blue Accent**
- Same as Option 1 but with subtle blue accent (#3B82F6) for links/CTAs

**Option 3: Warm Monochrome**
- Slight warm tint to grays (beige undertones)
- Creates softer, more approachable feel

### Typography
- Headings: Inter, SF Pro Display, or similar modern sans-serif
- Body: Inter, System UI, or similar readable sans-serif
- Code blocks (if needed): JetBrains Mono, Fira Code

### Layout Inspiration
- Single-page scroll with smooth transitions
- Generous whitespace
- Clear visual hierarchy
- Subtle animations (fade-in, slide-up on scroll)

## Content Guidelines

### Tone of Voice
- Professional yet approachable
- Authoritative on technical topics
- Mentorship-oriented when discussing freelancing
- Authentic and personal in bio

### Article Topics (Examples)
- "From Content Writer to Top Rated Plus Engineer: My Upwork Journey"
- "How to Win Your First 5 Clients on Upwork"
- "Tax Management for Freelancers: Why Context Matters"
- "Building in Public: Lessons from FeedAfrica"
- "Why I'm Pursuing ICAN as a Software Engineer"

## Development Phases

### Phase 1: Foundation
- Set up Next.js project with TypeScript and Tailwind
- Implement dark/light mode toggle
- Create homepage layout with all sections
- Add social links and navigation

### Phase 2: Content
- Set up MDX processing for articles
- Create article listing component
- Build individual article page template
- Add 2-3 sample articles

### Phase 3: Polish
- Optimize images and performance
- Add animations and transitions
- Implement SEO best practices
- Test responsive design across devices
- Deploy to production

### Phase 4: Enhancements (Post-Launch)
- Analytics integration
- Newsletter signup (optional)
- Article search/filter (if article count grows)
- RSS feed for articles

## Success Criteria
- Load time under 2 seconds
- Mobile-friendly and responsive
- Lighthouse score > 90 across all metrics
- Clear representation of Tayo's multifaceted professional identity
- Easy for Tayo to add new articles by simply creating MDX files
- Professional enough for clients, approachable enough for mentees

## Notes for Cursor AI
- Prioritize clean, maintainable code
- Use semantic HTML
- Implement proper TypeScript types
- Follow Next.js 14+ best practices (App Router, Server Components)
- Keep dependencies minimal
- Make dark mode seamless with no flash on load
- Ensure all external links open in new tabs
- Profile image should be optimized (Next.js Image component)
- Articles should be easily added by creating new MDX files without touching code
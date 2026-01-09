# Deployment Guide

This guide will help you deploy your portfolio to production.

## Prerequisites

- GitHub account
- Vercel or Netlify account
- Custom domain (optional but recommended)

## Deploy to Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Portfolio website"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will automatically detect Next.js settings
5. Click "Deploy"

### Step 3: Configure Domain

1. In your Vercel project settings, go to "Domains"
2. Add your custom domain: `tayoadepetu.com`
3. Follow Vercel's DNS configuration instructions
4. Add both `tayoadepetu.com` and `www.tayoadepetu.com`

### Environment Variables (if needed)

If you add analytics or other services later:

1. Go to Project Settings → Environment Variables
2. Add variables like:
   - `NEXT_PUBLIC_GA_ID` for Google Analytics
   - `NEXT_PUBLIC_ANALYTICS_ID` for Vercel Analytics

## Deploy to Netlify

### Step 1: Push to GitHub

Same as Vercel Step 1 above.

### Step 2: Import to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

### Step 3: Configure Domain

1. Go to Site Settings → Domain management
2. Add custom domain: `tayoadepetu.com`
3. Follow DNS configuration instructions

## Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] Dark/light mode toggle works
- [ ] All sections are visible (Hero, About, Projects, Articles, Contact)
- [ ] Articles page loads (`/articles/[slug]`)
- [ ] All internal links work
- [ ] External links open in new tabs
- [ ] Resume download works
- [ ] Social links are correct
- [ ] Mobile responsiveness
- [ ] Page load speed (should be < 2 seconds)

## Performance Optimization

### Enable Compression

Both Vercel and Netlify automatically enable:
- Gzip/Brotli compression
- Image optimization
- Edge caching

### Check Lighthouse Score

1. Open your deployed site
2. Open Chrome DevTools (F12)
3. Go to "Lighthouse" tab
4. Run audit for Performance, Accessibility, Best Practices, SEO
5. Aim for scores > 90 in all categories

### Monitor Analytics

#### Vercel Analytics

```bash
npm install @vercel/analytics
```

Then add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

// Inside your layout component
<Analytics />
```

#### Google Analytics

Add to `.env.local`:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Create `lib/analytics.ts` and integrate Google Analytics.

## Updating Content

### Adding New Articles

1. Create MDX file in `content/articles/`
2. Commit and push to GitHub
3. Vercel/Netlify will automatically redeploy

### Updating Projects

1. Edit `data/projects.ts`
2. Commit and push to GitHub
3. Automatic redeployment

## Troubleshooting

### Build Fails

Check the build logs for errors. Common issues:

- Missing dependencies: Run `npm install` locally first
- TypeScript errors: Run `npm run build` locally to catch them
- MDX parsing errors: Verify MDX frontmatter syntax

### Images Not Loading

- Ensure images are in `public/images/`
- Check file paths (case-sensitive)
- Verify Next.js Image component configuration

### Articles Not Appearing

- Check MDX frontmatter format
- Ensure file extension is `.mdx`
- Verify `content/articles/` directory exists
- Check build logs for MDX parsing errors

## Custom Domain Setup

### DNS Configuration for `tayoadepetu.com`

#### For Vercel:

Add these DNS records at your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### For Netlify:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: [your-site-name].netlify.app
```

## SSL Certificate

Both Vercel and Netlify automatically provision and renew SSL certificates via Let's Encrypt. Your site will be served over HTTPS.

## Monitoring

### Uptime Monitoring

Consider using:
- [UptimeRobot](https://uptimerobot.com) (free)
- [Pingdom](https://pingdom.com)
- Vercel's built-in monitoring

### Error Tracking

For production error monitoring:
- [Sentry](https://sentry.io)
- [LogRocket](https://logrocket.com)

## Continuous Deployment

Both platforms offer automatic deployments:

- **Production**: Pushes to `main` branch trigger production deployment
- **Preview**: Pull requests create preview deployments
- **Rollback**: Easy rollback to previous deployments from dashboard

## Next Steps After Deployment

1. **Submit to search engines**
   - Google Search Console
   - Bing Webmaster Tools

2. **Add sitemap** (automatic with Next.js)
   - Available at `/sitemap.xml`

3. **Set up analytics**
   - Track visitor behavior
   - Monitor popular content

4. **Enable comments** (optional)
   - Use services like Disqus or Giscus for article comments

5. **Add newsletter** (optional)
   - ConvertKit, Mailchimp, or Buttondown integration

---

Your portfolio is now live! 🎉

For questions or issues, refer to:
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)


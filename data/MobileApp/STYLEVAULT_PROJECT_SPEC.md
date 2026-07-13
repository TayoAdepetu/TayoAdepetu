# StyleVault MVP Project Agreement & Scope of Work

Prepared For: Bolarinwa Famose

Prepared By: Tayo Adepetu

Project: StyleVault – AI-Powered Smart Wardrobe Organizer & Personal Stylist

Version: 1.0

---

# 1. Project Overview

StyleVault is an AI-powered mobile application designed to help users digitize, organize, and maximize the value of their wardrobes through intelligent clothing analysis and personalized outfit recommendations.

The objective of this engagement is to design, develop, test, and deploy a production-ready MVP (Minimum Viable Product) that validates the core concept and establishes a scalable foundation for future development.

The MVP will include:

- Mobile Application (Android & iOS)
- Backend API & Database
- AI Clothing Recognition
- AI Outfit Recommendation Engine
- Marketing Website
- Administrative Dashboard
- Deployment & Launch Support

---

# 2. Project Scope

## Mobile Application

### User Authentication

Features:

- User registration
- User login
- Password reset
- JWT-based authentication
- User profile management

---

### Wardrobe Management

Features:

- Upload clothing images
- Add clothing items manually
- Edit clothing details
- Delete clothing items
- Categorize wardrobe items

---

### AI Clothing Recognition & Auto-Tagging

Features:

- AI-powered image analysis
- Automatic clothing classification
- Color detection
- Pattern identification
- Style categorization
- Formality assessment
- Seasonal suitability detection

All AI-generated tags remain editable by users.

---

### Outfit Recommendation Engine

Features:

- Occasion-based outfit recommendations
- Weather-aware outfit recommendations
- Personalized outfit generation
- Outfit explanations
- Saved outfits and favorites

Supported occasions include:

- Casual
- Work
- Business Meetings
- Events
- Travel
- Social Gatherings

---

### Analytics & Insights

Features:

- Most worn items
- Least worn items
- Wardrobe composition overview
- Usage insights

---

# Backend API & Infrastructure

The backend will provide:

- Authentication services
- User management services
- Wardrobe management APIs
- AI integration services
- Analytics services
- Weather integration services

Technology Stack:

- NestJS
- PostgreSQL
- JWT Authentication

---

# Marketing Website

The MVP includes a lightweight marketing website designed to support launch and user acquisition.

Features:

- Landing page
- Product overview
- Key features section
- Download links (App Store & Google Play)
- Contact form

The website is intended to serve as a marketing and distribution channel and is not intended to function as a separate web application.

---

# Administrative Dashboard

The MVP includes a lightweight administrative dashboard.

Included Features:

- User management
- User activity overview
- Basic platform statistics
- AI usage monitoring
- Basic content moderation tools

The administrative dashboard is intended for operational oversight and basic platform management.

Advanced enterprise administration features such as role management, audit logs, advanced analytics, support ticketing, or workflow automation are not included in this MVP.

---

# 3. AI Implementation Strategy

## Clothing Recognition Workflow

1. User uploads a clothing image.
2. Image is analyzed using Gemini Vision or OpenAI Vision.
3. AI extracts:

   - Clothing type
   - Color
   - Pattern
   - Style category
   - Formality level
   - Seasonal suitability

4. Structured metadata is stored in the database.

Expected Accuracy:

- Category Recognition: 85–95%
- Color Detection: 95%+
- Pattern Recognition: 80–90%

Actual performance may vary depending on image quality, lighting conditions, and background complexity.

All AI-generated tags can be edited manually by users.

---

## Outfit Recommendation Workflow

Outfit recommendations will be generated using DeepSeek based on:

- User wardrobe inventory
- Occasion
- Weather conditions
- Style preferences

The system architecture will support future migration between AI providers if operational requirements change.

---

## Estimated AI Operating Costs

AI operating costs are usage-based.

Current projections indicate:

- Clothing analysis: approximately ₦1–₦10 per analyzed item
- Outfit generation: typically less than ₦5 per generation

Actual costs will vary depending on user behavior, AI provider pricing, and system usage volume.

---

# 4. Project Timeline & Milestones

Total Estimated Duration: 6 Weeks

All UI work must follow `FRONTEND_SKILLS/FRONTEND.md`. Each week below includes a **Frontend compliance** subsection citing the applicable rules, deliverables, and acceptance criteria.

---

## Week 1 – Foundation

Deliverables:

- Backend architecture setup
- Database design
- Authentication system
- Cloud storage setup

Frontend compliance (`FRONTEND_SKILLS/FRONTEND.md`):

- Rule 3 — scaffold the React Native / Expo mobile app with NativeWind and TypeScript
- Rule 5 — create design token files (`colors`, `typography`, `spacing`, `radii`, `shadows`)
- Rule 4 — scaffold the design-system page with token swatches and initial button/card samples
- Rule 8 — research and document font choices for StyleVault (fashion, personal styling, mobile-first); record rationale on the design-system page
- Rule 10 & 11 — define primary, accent, neutral, and semantic colors in tokens (restrained, premium palette)
- Rule 12 — establish the 8px spacing scale in tokens
- Rule 18 — document mobile-first layout conventions on the design-system page

Acceptance criteria:

- Token files exist and are the single source of truth for styling
- Design-system page renders live button and card samples from shared components
- Font and color decisions are documented with product-specific rationale

---

## Week 2 – Wardrobe Management

Deliverables:

- Clothing upload workflows
- Wardrobe management
- Image storage integration
- Categorization structure

Frontend compliance (`FRONTEND_SKILLS/FRONTEND.md`):

- Rule 6 — build wardrobe screens from shared components (Card, Button, Input, EmptyState); no one-off markup
- Rule 29 — clothing upload and manual entry forms: minimal fields, clear labels, inline validation
- Rule 17 — design for real content: long item names, missing images, large wardrobes, slow uploads
- Rule 31 — empty wardrobe, upload-in-progress, and error states implemented
- Rule 9 — clear hierarchy on wardrobe list and item detail (primary action: add/upload)
- Rule 26 — accessible labels, focus states, and contrast on all form controls
- Rule 4 — update design-system page with form controls, wardrobe cards, and empty-state samples

Acceptance criteria:

- All wardrobe UI uses tokens and shared components
- Empty, loading, and error states are polished — no dead space
- Design-system page reflects new components shipped this week

---

## Week 3 – AI Clothing Recognition

Deliverables:

- Vision model integration
- Auto-tagging workflows
- Metadata extraction
- Manual correction tools

Frontend compliance (`FRONTEND_SKILLS/FRONTEND.md`):

- Rule 33 — reuse existing wardrobe components and patterns before adding new UI
- Rule 31 — skeleton loaders and processing states while AI analyzes images
- Rule 17 — editable tag UI handles long labels, many tags, and correction flows gracefully
- Rule 25 — one primary action per section (e.g. confirm tags vs. secondary edit)
- Rule 6 — manual correction tools built from shared Input, Badge, and Button variants
- Rule 4 — update design-system page with loading/skeleton and tag-editing samples

Acceptance criteria:

- AI processing states feel responsive and intentional (Rule 21 — subtle motion where appropriate)
- Tag correction UI remains readable and uncluttered on mobile
- No new styling literals introduced outside token files

---

## Week 4 – Outfit Recommendation Engine

Deliverables:

- DeepSeek integration
- Recommendation workflows
- Saved outfits
- Style matching logic

Frontend compliance (`FRONTEND_SKILLS/FRONTEND.md`):

- Rule 9 — strong visual hierarchy on recommendation screens (outfit hero, supporting details, actions)
- Rule 25 — one primary CTA per section (e.g. save outfit, get new recommendation)
- Rule 31 — loading skeletons while outfits generate; empty state when no recommendations match
- Rule 21 — subtle motion on outfit reveal and save confirmations
- Rule 6 — outfit cards and saved-outfit lists use shared Card and list components
- Rule 17 — layouts handle varied outfit sizes, long explanations, and missing wardrobe items
- Rule 4 — update design-system page with outfit card variants and recommendation-state samples

Acceptance criteria:

- Recommendation flow is mobile-first and thumb-friendly (Rule 18)
- Saved outfits and favorites reuse the same card patterns as live recommendations
- Design-system page documents outfit-related components

---

## Week 5 – Analytics, Website & Admin Dashboard

Deliverables:

- Weather integration
- Analytics implementation
- Marketing website
- Administrative dashboard

Frontend compliance (`FRONTEND_SKILLS/FRONTEND.md`):

- Rule 2 — marketing website on Next.js, TailwindCSS, shadcn/ui, TypeScript
- Rule 6 & 7 — admin dashboard and marketing site built from shared components; shadcn customized with StyleVault tokens
- Rule 27 — dashboard prioritizes key metrics, then actions, then secondary analytics
- Rule 28 — avoid card overload on analytics and admin views; group related content cleanly
- Rule 30 — admin user-management tables: readable spacing, sticky headers, accessible filters
- Rule 15 & 16 — marketing site stays minimal and restrained; depth used subtly
- Rule 10 & 11 — brand colors used sparingly on marketing CTAs; neutrals dominate surfaces
- Rule 4 — update design-system page with stat cards, charts, table, and marketing-section samples

Acceptance criteria:

- Marketing website and admin dashboard share the same token source as the mobile app where applicable
- Dashboard does not feel card-heavy or overloaded (Rule 28)
- Design-system page is current with all major web and dashboard components

---

## Week 6 – Testing & Deployment

Deliverables:

- QA testing
- Bug fixes
- Performance optimization
- Security review
- Deployment preparation
- Store submission preparation

Frontend compliance (`FRONTEND_SKILLS/FRONTEND.md`):

- Rule 39 — verify every interface is responsive, accessible, scalable, and production-ready
- Rule 19 — manually verify mobile responsiveness: spacing, overflow, typography scaling, tap targets
- Rule 26 — accessibility pass: contrast, keyboard/focus, screen-reader labels
- Rule 36 — audit for hardcoded colors, fonts, or spacing; all styling must flow from token files
- Rule 4 — final design-system page review: all tokens, components, and branding docs in sync with shipped UI
- Rule 41 & 42 — UI meets startup-ready, premium quality bar (Linear/Stripe-level polish)

Acceptance criteria:

- No visual regressions on mobile, web, or dashboard
- Design-system page accurately reflects the production codebase
- App Store and marketing screenshots reflect the documented brand system

---

# 5. Commercial Terms

Project Fee:

₦2,000,000

Payment Schedule:

### Milestone 1

40% (₦800,000)

Due upon agreement execution and project commencement.

---

### Milestone 2

30% (₦600,000)

Due upon successful completion and demonstration of:

- Wardrobe Management
- AI Clothing Recognition
- Auto-Tagging Functionality

Expected around Week 3.

---

### Milestone 3

30% (₦600,000)

Due upon delivery of:

- Production-ready MVP
- Testing completion
- Deployment documentation

Expected around Week 6.

---

# 6. Client Responsibilities

The Client agrees to provide timely feedback and approvals throughout development.

The Client may provide:

- Branding assets
- Product feedback
- Content revisions
- Platform account access where applicable

Delays in approvals or feedback may impact delivery timelines.

---

# 7. Branding & Design

To avoid delays, development may begin before final branding assets are available.

As part of this engagement, branding support will be provided at no additional cost.

This includes:

- Logo refinement (if required)
- Color palette recommendations
- Typography selection
- Basic visual identity guidance

A designer may be engaged during development to support branding activities while product development continues in parallel.

Client feedback will be incorporated throughout the process.

---

# 8. App Store & Google Play Publishing

Two publishing options are available.

## Option A – Developer Accounts Managed by Tayo Adepetu

The application may initially be published using existing developer accounts managed by Tayo Adepetu.

Advantages:

- No additional account registration fees
- Faster publishing process
- Reduced administrative overhead

---

## Option B – Client-Owned Developer Accounts

The Client may choose to create and own dedicated developer accounts.

Typical Costs:

Google Play Developer Account:

- One-time fee of approximately $25

Apple Developer Account:

- Approximately $99 per year

Advantages:

- Full ownership of publishing accounts
- Direct long-term control of applications
- Greater independence for future updates

Any account registration fees remain the responsibility of the Client.

---

# 9. Hosting & Infrastructure

The recommended hosting environment is a Hetzner VPS.

Two deployment options are available.

## Option A – Shared Infrastructure

The project may initially be hosted on infrastructure managed by Tayo Adepetu.

Estimated Cost:

- Approximately $5/month contribution

Advantages:

- Lower startup costs
- Faster deployment

---

## Option B – Dedicated Client Infrastructure

The Client may create a dedicated Hetzner account.

Typical Cost:

- Approximately $5–$20/month depending on server requirements

Advantages:

- Full ownership
- Independent billing
- Easier future scaling

Infrastructure costs are separate from development fees.

---

# 10. Domain Registration

A domain name will be acquired for the project.

Recommended Provider:

- Cloudflare Registrar

Estimated Cost:

- Approximately $10–$15 annually depending on domain availability and extension.

The Client will be responsible for domain registration costs.

Assistance with acquisition and configuration will be provided.

---

# 11. Content Creation

Initial content for the marketing website and app store listings will be provided as part of this engagement at no additional cost.

This includes:

- Product descriptions
- Feature descriptions
- Marketing copy
- Store listing content

The Client may request reasonable revisions throughout development.

---

# 12. Communication & Project Governance

Development Methodology:

- Agile development process
- Weekly milestone reviews
- Incremental feature demonstrations

Communication:

- Weekly progress reports
- Shared project tracker
- Direct communication channel

---

# 13. Security & Data Privacy

Security measures include:

- JWT authentication
- Password encryption
- Secure API access controls
- Protected image storage
- Secure handling of AI credentials
- Environment variable protection

---

# 14. Source Code Ownership

Upon full payment of all project fees:

- The Client receives ownership of all custom-developed source code.
- The Client receives access to repositories and deployment documentation.

Third-party services remain subject to their respective licenses and terms.

---

# 15. Warranty & Post-Launch Support

The project includes:

- 30-day post-launch warranty period
- Bug fixes for issues discovered during normal usage
- Stability and reliability improvements

New features, enhancements, or scope changes are excluded and may be handled under separate agreements.

---

# 16. Acceptance

This document represents the agreed scope, deliverables, timeline, commercial terms, and project expectations for the StyleVault MVP.

Any additions or modifications outside the scope described herein may require separate estimation, scheduling, and approval.

Two tiny next steps on your end
Profile photo — drop yours at public/images/profile.jpg. Until then, the hero shows a clean blue "TA" placeholder with a hint.
Testimonial screenshots — save your Upwork screenshots into public/testimonials/ using these filenames (or update data/testimonials.ts to match whatever you use):
software-engineering-1.png … software-engineering-4.png
seo-1.png … seo-3.png
content-writing-1.png, content-writing-2.png
blog-writing-1.png, blog-writing-2.png
Any file that doesn't exist is silently skipped — the gallery auto-populates as you add them. You can add more testimonials any time by appending entries to data/testimonials.ts.

Optional: to send real emails from the contact form, install resend, set RESEND_API_KEY and CONTACT_TO_EMAIL env vars, and uncomment the block in app/api/contact/route.ts — the code is already there and commented.

Design system

Blue primary (--brand-50 → --brand-950) exposed as bg-brand-600, text-brand-700, etc.
Dark mode preserved end-to-end.
Subtle animated background glows, grid pattern, gradient text, float, pulse, and shimmer animations.
Entrance animations via motion (successor to framer-motion) — fade-in-up on scroll, staggered grids, spring pop modals.
Lightbox, marquee-ready animations, keyboard-dismissable modals, body-scroll locking.


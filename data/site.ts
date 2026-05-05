export const site = {
  name: 'Tayo Adepetu',
  title: 'Software Engineer & SEO Specialist',
  email: 'thetayoadepetu@gmail.com',
  phone: '+234 703 037 0756',
  location: 'Ibadan, Nigeria — serving clients globally',
  url: 'https://tayoadepetu.com',

  bio: 'Full-stack Software Engineer with 4+ years shipping production software, and a former copywriter & SEO specialist with receipts dating back to 2020. I help individuals and businesses — in Nigeria and globally (US, UK, Australia) — take products from conceptualisation to launch, and rank them on Google.',

  social: {
    upwork: 'https://www.upwork.com/freelancers/~016a2653ba2eb2f93c',
    github: 'https://github.com/TayoAdepetu',
    linkedin: 'https://www.linkedin.com/in/tayo-adepetu',
    twitter: 'https://twitter.com/tayoadepetu',
  },

  upworkStats: {
    completedProjects: '35+',
    successRate: '100%',
    rank: 'Top-rated Plus',
    yearsOnUpwork: '6+',
    deliveryTime: '5–7 weeks',
  },

  audience: [
    'Nigeria',
    'United States',
    'United Kingdom',
    'Australia',
    'Canada',
    'Germany',
    'Global',
  ],
} as const;

export type SiteConfig = typeof site;

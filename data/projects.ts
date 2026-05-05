export interface Project {
  id: string;
  /** Cover shown on project cards (path under /public). */
  image: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  link?: string;
  github?: string;
  status: 'active' | 'archived' | 'case-study';
  featured?: boolean;
  category: 'web' | 'mobile' | 'fintech' | 'ai' | 'marketplace' | 'erp';
}

export const projects: Project[] = [
  {
    id: 'mymoneyflowai',
    image: '/images/projects/mymoneyflowai.png',
    name: 'MyMoneyFlowAI',
    tagline: 'AI money-flow & tax compliance for freelancers',
    description:
      'Context-aware money flow management platform for freelancers featuring intelligent tax compliance, financial tracking, and AI-driven insights.',
    role: 'Founder & Lead Engineer',
    year: '2025',
    tags: ['Next.js', 'TypeScript', 'AI', 'FinTech'],
    link: 'https://mymoneyflowai.com',
    status: 'active',
    featured: true,
    category: 'ai',
  },
  {
    id: 'feedafrica',
    image: '/images/projects/feedafrica.png',
    name: 'FeedAfrica',
    tagline: 'Sustainable farming network + HR + farm ops',
    description:
      'Sustainable farming platform with LinkedIn-style networking, comprehensive HR tools, and advanced farm management systems built for African agribusinesses.',
    role: 'Founder & Lead Engineer',
    year: '2025',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'AgTech'],
    link: 'https://feedafrica.africa',
    status: 'active',
    featured: true,
    category: 'web',
  },
  {
    id: 'thealtermeai',
    image: '/images/projects/thealtermeai.png',
    name: 'TheAlterMeAI',
    tagline: 'Intelligent engagement system for creators, founders, and social media managers',
    description:
      'Your own Knowledge Vault + AI generate fast, valuable posts and replies — and a DM-Assist that knows your business turns conversations into leads. All under your control. No spam, no growth hacks.',
    role: 'Full-stack Developer & Founder· TheAlterMeAI',
    year: '2026',
    tags: ['NextJS', 'TypeScript', 'React'],
    status: 'active',
    featured: true,
    link: 'https://thealtermeai.com',
    category: 'ai',
  },
  {
    id: 'piahealth',
    image: '/images/projects/piahealth.png',
    name: 'PiaHealth',
    tagline: 'AI-powered insurance claims processing',
    description:
      'Contributed to PiaHealth\'s AI-driven insurance claims processing system — automating document review, extraction, and decisioning for a faster, fairer claims pipeline.',
    role: 'Full-stack Developer · Laramate GmbH',
    year: '2025',
    tags: ['AI', 'Laravel', 'InsurTech', 'Document AI'],
    status: 'active',
    featured: true,
    link: 'https://pia-health.de',
    category: 'ai',
  },
  {
    id: 'matrix-agromonitor',
    image: '/images/projects/matrix-agromonitor.svg',
    name: 'Matrix AgroMonitor',
    tagline: 'Multi-farm cost, yield & revenue tracking',
    description:
      'Led full-cycle development of a farm management system that lets Matrix AgroMonitor run multiple farms (cooperatives & clusters) across Nigerian states — tracking input usage, yield, costs, and revenue in one place.',
    role: 'Full-stack Developer',
    year: '2024',
    tags: ['React', 'Laravel', 'AgTech', 'Analytics'],
    status: 'case-study',
    category: 'web',
  },
  {
    id: 'learnstar',
    image: '/images/projects/learnstar.png',
    name: 'Learnstar',
    tagline: 'Subscription-based celebrity course platform',
    description:
      'Subscription e-learning platform with secure video streaming, payment processing, and user management. Grew to support 400+ active learners.',
    role: 'Full-stack Developer',
    year: '2024',
    tags: ['Laravel', 'Blade', 'Video Streaming', 'Payments'],
    status: 'active',
    featured: true,
    link: 'https://www.learnstar.co',
    category: 'web',
  },
  {
    id: 'ranie-erp',
    image: '/images/projects/ranie-erp.png',
    name: 'Ranie ERP & POS',
    tagline: 'Warehouse + retail ERP that lifted revenue 30%',
    description:
      'Built ERP and POS systems for multi-location warehouse and retail operations. Inventory, invoicing, and sales analytics modules that improved operational efficiency and contributed to ~30% revenue growth.',
    role: 'Full-stack Developer',
    year: '2024',
    tags: ['Laravel', 'POS', 'Inventory', 'Analytics'],
    status: 'active',
    link: 'https://erp.ranie.com.ng',
    featured: true,
    category: 'erp',
  },
  {
    id: 'violets-hotel',
    image: '/images/projects/violets-hotel.svg',
    name: 'TheViolets Hotel System',
    tagline: 'Integrated hotel + restaurant management',
    description:
      'Integrated hotel and restaurant management system: booking, POS, inventory, and HR modules. Integrated with Microsoft Dynamics for financial reporting — contributed to a 35% operational efficiency gain.',
    role: 'Full-stack Developer',
    year: '2024',
    tags: ['CodeIgniter', 'Hospitality', 'POS', 'Microsoft Dynamics'],
    status: 'active',
    link: 'https://theviolets.com',
    category: 'erp',
  },
  {
    id: 'dotman-communication',
    image: '/images/projects/dotman-communication.png',
    name: 'Dotman Wallet',
    tagline: 'Flexible airtime, data & bills payment platform',
    description:
      'Backend systems and React Native features for a bills-payment platform. Built a multi-provider API switching layer so the admin can fail over between airtime/data providers when prices change or one goes down.',
    role: 'Web & Mobile Engineer',
    year: '2024',
    tags: ['Laravel', 'React Native', 'Paystack', 'Monnify'],
    status: 'active',
    featured: true,
    link: 'https://dotmanwallet.com',
    category: 'fintech',
  },
  {
    id: 'makarioworks',
    image: '/images/projects/makarioworks.svg',
    name: 'MakarioWorks CMS',
    tagline: 'Custom CMS with Stripe + Paystack + Cloudinary',
    description:
      'Backend services and a custom CMS using Laravel and MySQL, with Stripe and Paystack payment rails and Cloudinary-powered media management.',
    role: 'Backend Engineer',
    year: '2024',
    tags: ['Laravel', 'CMS', 'Stripe', 'Cloudinary'],
    status: 'case-study',
    category: 'web',
  },
  {
    id: 'glt-business',
    image: '/images/projects/glt-business.svg',
    name: 'GLT Business',
    tagline: 'Church business unit + guest house booking',
    description:
      'Volunteer-built backend systems for a church business unit, including the main website and a guest house booking platform with Paystack, Cloudinary, and Gmail SMTP.',
    role: 'Backend Engineer (Volunteer)',
    year: '2023–2024',
    tags: ['Laravel', 'Bookings', 'Paystack'],
    status: 'case-study',
    category: 'web',
  },
  {
    id: 'bizgrowthhackerz',
    image: '/images/projects/bizgrowthhackerz.svg',
    name: 'BizGrowthHackerz',
    tagline: 'Nigerian freelancer-client marketplace with escrow',
    description:
      'Nigerian freelancer-client marketplace with Monnify-powered escrow, JWT auth, role-based access, and Firebase real-time chat. A deep learning experience in building trust-first marketplaces.',
    role: 'Full-stack Web Developer',
    year: '2022–2023',
    tags: ['Vue.js', 'Nuxt.js', 'Laravel', 'Monnify', 'Firebase'],
    status: 'archived',
    category: 'marketplace',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

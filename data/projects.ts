export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  status: 'active' | 'archived';
}

export const projects: Project[] = [
  {
    id: 'mymoneyflowai',
    name: 'MyMoneyFlowAI',
    description: 'Context-aware money flow management platform for freelancers, featuring intelligent tax compliance and financial tracking.',
    tags: ['Next.js', 'TypeScript', 'AI', 'FinTech'],
    link: 'https://mymoneyflowai.com',
    status: 'active',
  },
  {
    id: 'feedafrica',
    name: 'FeedAfrica',
    description: 'Sustainable farming platform with LinkedIn-style networking, comprehensive HR tools, and advanced farm management systems.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'AgTech'],
    link: 'https://feedafrica.app',
    status: 'active',
  },
  {
    id: 'bizgrowthhackerz',
    name: 'BizGrowthHackerz',
    description: 'Nigerian freelancer-client marketplace designed to connect local talent with businesses. A valuable learning experience in building marketplaces.',
    tags: ['Next.js', 'TypeScript', 'Marketplace'],
    status: 'archived',
  },
];


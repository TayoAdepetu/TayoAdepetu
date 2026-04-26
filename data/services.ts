export interface Service {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  icon:
    | 'smartphone'
    | 'globe'
    | 'puzzle'
    | 'sparkles'
    | 'message-circle'
    | 'search'
    | 'shield';
  highlights: string[];
  features: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  tech: string[];
  idealFor: string[];
  timeline: string;
  startingFrom?: string;
}

export const services: Service[] = [
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    shortName: 'Mobile Apps',
    tagline: 'Cross-platform apps that feel native on every screen.',
    summary:
      'I design and build iOS and Android apps using React Native and TypeScript — fast, reliable, and ready for the app stores. From MVP validation to full-featured products with payments, offline mode, and push notifications.',
    icon: 'smartphone',
    highlights: [
      'iOS + Android from a single codebase',
      'Offline-first architecture',
      'Payment & subscription ready',
      'App Store + Play Store deployment',
    ],
    features: [
      {
        title: 'Native-grade UX',
        description:
          'Smooth 60fps animations, platform-aware navigation, and gestures that feel at home on both iOS and Android.',
      },
      {
        title: 'Secure auth & payments',
        description:
          'Biometrics, social logins, and verified payment rails via Stripe, Paystack, Flutterwave, or Monnify.',
      },
      {
        title: 'Offline support',
        description:
          'Background sync, cache strategies, and conflict resolution — your users never get blocked by bad networks.',
      },
      {
        title: 'Store submission',
        description:
          "I'll handle the Apple and Google store submission, review feedback, and post-launch updates.",
      },
    ],
    process: [
      {
        step: '01',
        title: 'Discovery',
        description: 'We clarify the problem, users, and success metrics. You leave with a written product brief.',
      },
      {
        step: '02',
        title: 'Design',
        description: 'High-fidelity screens and a clickable prototype for sign-off before any code is written.',
      },
      {
        step: '03',
        title: 'Build',
        description: 'Two-week sprints with demo videos so you always see progress — never a black box.',
      },
      {
        step: '04',
        title: 'Launch',
        description: 'Store submission, analytics, crash reporting, and a 30-day post-launch support window.',
      },
    ],
    tech: ['React Native', 'TypeScript', 'Expo', 'Firebase', 'Stripe', 'Paystack', 'Laravel API'],
    idealFor: ['Startups validating an MVP', 'SMEs digitising field operations', 'Agencies reselling mobile work'],
    timeline: '5–7 weeks from kickoff to launch',
  },
  {
    slug: 'website-development',
    name: 'Website Development',
    shortName: 'Websites',
    tagline: 'Fast, SEO-ready websites and web apps that convert.',
    summary:
      'From marketing sites to full SaaS dashboards — built on Next.js, TypeScript, and Laravel. I ship websites that score high on Lighthouse, rank well on Google, and scale with your business.',
    icon: 'globe',
    highlights: [
      'Next.js + TypeScript (App Router)',
      '90+ Lighthouse scores',
      'CMS or headless',
      'SEO baked in from day one',
    ],
    features: [
      {
        title: 'Conversion-first design',
        description: 'Landing pages and flows tuned for sign-ups, sales, and demo bookings — not just looks.',
      },
      {
        title: 'Performance obsessed',
        description: 'Edge rendering, image optimisation, and streaming — pages load in under a second.',
      },
      {
        title: 'Full-stack web apps',
        description:
          'Auth, billing, dashboards, admin panels, role-based access. I build the whole thing, end to end.',
      },
      {
        title: 'CMS you can actually use',
        description: 'Headless CMS or a custom Laravel admin so your team can publish without calling a developer.',
      },
    ],
    process: [
      { step: '01', title: 'Strategy', description: 'Goals, audience, content map, and conversion plan.' },
      { step: '02', title: 'Design', description: 'Wireframes to polished UI in Figma, reviewed together.' },
      { step: '03', title: 'Build', description: 'Clean code, automated tests, and CI/CD from day one.' },
      { step: '04', title: 'Ship', description: 'Domain, DNS, SSL, analytics, and handover docs.' },
    ],
    tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Laravel', 'PostgreSQL', 'MySQL', 'Vercel'],
    idealFor: ['Founders launching an MVP', 'Businesses rebranding their web presence', 'SaaS teams needing a marketing site'],
    timeline: '4–6 weeks for marketing sites, 6–10 weeks for web apps',
  },
  {
    slug: 'chrome-extension-development',
    name: 'Chrome Extension Development',
    shortName: 'Chrome Extensions',
    tagline: 'Browser extensions that live where your users work.',
    summary:
      'Productivity tools, AI copilots, scrapers, and workflow automations — I ship polished Chrome extensions with clean UX and secure background services. Manifest V3 ready.',
    icon: 'puzzle',
    highlights: [
      'Manifest V3 compliant',
      'Secure background + content scripts',
      'OAuth / API integrations',
      'Chrome Web Store submission',
    ],
    features: [
      {
        title: 'Polished popup UI',
        description: 'React-powered popups and side panels that match your brand and feel instant.',
      },
      {
        title: 'Deep integrations',
        description: 'Hook into Gmail, LinkedIn, Notion, Slack — or your own API with OAuth handled cleanly.',
      },
      {
        title: 'AI-powered actions',
        description: 'Summarise pages, extract data, or trigger automations using OpenAI, Anthropic, or your own models.',
      },
      {
        title: 'Safe by default',
        description: 'Strict permission scoping, sandboxed storage, and privacy-first design to pass store review.',
      },
    ],
    process: [
      { step: '01', title: 'Scope', description: 'We map every permission, page, and user flow.' },
      { step: '02', title: 'Prototype', description: 'Working spike within a week to de-risk tricky APIs.' },
      { step: '03', title: 'Build', description: 'Polished UI, tests, and store-ready assets.' },
      { step: '04', title: 'Launch', description: 'Submission, review feedback, and auto-update pipeline.' },
    ],
    tech: ['Manifest V3', 'React', 'TypeScript', 'Chrome APIs', 'OpenAI / Anthropic', 'OAuth 2.0'],
    idealFor: ['SaaS teams adding in-browser features', 'Creators shipping productivity tools', 'Growth teams needing lead scrapers'],
    timeline: '3–5 weeks for a polished v1',
  },
  {
    slug: 'ai-powered-software-development',
    name: 'AI-powered Software Development',
    shortName: 'AI Software',
    tagline: 'Ship AI products that actually work in production.',
    summary:
      'I build AI-enabled software that goes beyond the demo — chatbots, document processing, RAG systems, AI agents, and insurance-grade claims automation. Grounded in real engineering, not prompt magic.',
    icon: 'sparkles',
    highlights: [
      'LLM + RAG systems',
      'Document understanding',
      'Agent workflows',
      'Evaluation + guardrails',
    ],
    features: [
      {
        title: 'Retrieval-augmented answers',
        description: 'Your data, safely indexed and grounded so the model actually cites the right source.',
      },
      {
        title: 'Agents that take actions',
        description: 'Tool-calling agents that file tickets, update records, send emails — with human-in-the-loop when it matters.',
      },
      {
        title: 'Document automation',
        description: 'OCR, extraction, and validation for invoices, claims, KYC — built on the same stack used in PiaHealth.',
      },
      {
        title: 'Evaluation & observability',
        description: 'Dashboards for prompt versioning, accuracy tracking, cost, and latency — so you can improve with data.',
      },
    ],
    process: [
      { step: '01', title: 'Use case design', description: 'We pick the 1–2 workflows AI will genuinely move the needle on.' },
      { step: '02', title: 'Data + grounding', description: 'Ingest pipelines, chunking strategy, and evaluation set.' },
      { step: '03', title: 'Build', description: 'Prompt + tool design, UI, and production-grade infra.' },
      { step: '04', title: 'Operate', description: 'Monitoring, feedback loops, and ongoing tuning.' },
    ],
    tech: ['OpenAI', 'Anthropic', 'Next.js', 'Python', 'LangChain', 'Pinecone / pgvector', 'Laravel'],
    idealFor: ['Ops teams drowning in documents', 'Support teams wanting a smart assistant', 'Founders building an AI-first product'],
    timeline: '6–8 weeks for a production-ready MVP',
  },
  {
    slug: 'whatsapp-software-development',
    name: 'WhatsApp Software Development',
    shortName: 'WhatsApp Apps',
    tagline: 'Commerce, support, and automation — right inside WhatsApp.',
    summary:
      'Meet your customers where they already are. I build WhatsApp Cloud API bots, commerce flows, appointment booking, and broadcast systems that drive real revenue.',
    icon: 'message-circle',
    highlights: [
      'WhatsApp Cloud API',
      'Commerce + payments inside chat',
      'AI-assisted replies',
      'CRM + broadcast automation',
    ],
    features: [
      {
        title: 'Conversational commerce',
        description: 'Catalog browsing, cart, and checkout — all inside the chat, with Paystack / Flutterwave / Stripe.',
      },
      {
        title: 'Smart support bots',
        description: 'GPT-powered responses with graceful handoff to a human when the bot is out of its depth.',
      },
      {
        title: 'Booking & reminders',
        description: 'Automated appointment booking, reminders, and rescheduling — perfect for clinics, salons, and services.',
      },
      {
        title: 'Broadcasts that convert',
        description: 'Opt-in lists, segmentation, and campaign templates approved through the official WhatsApp API.',
      },
    ],
    process: [
      { step: '01', title: 'Use case mapping', description: 'Where does WhatsApp fit in your customer journey?' },
      { step: '02', title: 'Flow design', description: 'We storyboard every conversation and edge case.' },
      { step: '03', title: 'Build', description: 'Official Meta Business setup, bot engine, and admin dashboard.' },
      { step: '04', title: 'Launch & iterate', description: 'Go-live support, analytics, and content playbooks.' },
    ],
    tech: ['WhatsApp Cloud API', 'Node.js', 'Laravel', 'OpenAI', 'Paystack', 'Redis'],
    idealFor: ['E-commerce brands', 'Clinics and service businesses', 'Support teams scaling without headcount'],
    timeline: '3–5 weeks for a launch-ready bot',
  },
  {
    slug: 'local-and-global-seo',
    name: 'Local and Global SEO Services',
    shortName: 'SEO Services',
    tagline: 'Rank higher in Lagos, London, New York — wherever your customers search.',
    summary:
      'Before I became an engineer, I spent years as a copywriter and SEO specialist. I blend that experience with technical SEO depth — on-page, off-page, local, and content — to move real business metrics.',
    icon: 'search',
    highlights: [
      'Technical + on-page SEO',
      'Local SEO for Nigeria & global markets',
      'Content strategy & writing',
      'Link-building & digital PR',
    ],
    features: [
      {
        title: 'Technical SEO audit',
        description: 'Core Web Vitals, crawl issues, schema, indexation — I find and fix everything slowing your site down.',
      },
      {
        title: 'Local SEO',
        description: 'Google Business Profile, local citations, and review strategy for businesses serving Lagos, Abuja, London, NYC, Sydney.',
      },
      {
        title: 'Content that ranks',
        description: 'Keyword research, briefs, and long-form articles written by someone who has ranked articles for years.',
      },
      {
        title: 'Authority building',
        description: 'Guest posts, digital PR, and editorial link acquisition — no spammy PBNs, ever.',
      },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Technical, on-page, content, and backlink audit with a prioritised action list.' },
      { step: '02', title: 'Strategy', description: 'Target keywords, topical clusters, and a 90-day roadmap.' },
      { step: '03', title: 'Execute', description: 'Monthly on-page fixes, content production, and outreach.' },
      { step: '04', title: 'Report', description: 'Monthly dashboard showing rankings, traffic, leads, and revenue impact.' },
    ],
    tech: ['Ahrefs', 'Google Search Console', 'GA4', 'Screaming Frog', 'Surfer SEO', 'Next.js SEO stack'],
    idealFor: ['Local businesses in Nigeria', 'SaaS founders in the US / UK / AU', 'E-commerce brands scaling organic traffic'],
    timeline: 'Ongoing — first wins in 4–8 weeks',
  },
  {
    slug: 'escrow-powered-apps',
    name: 'Escrow-powered Mobile and Web Apps',
    shortName: 'Escrow Apps',
    tagline: 'Trust-first marketplaces where buyers and sellers get paid safely.',
    summary:
      'I build marketplace and service-booking apps with built-in escrow — funds held safely, released on milestone, with dispute resolution baked in. Proven in production with BizGrowthHackerz and Monnify.',
    icon: 'shield',
    highlights: [
      'Milestone-based escrow',
      'KYC & verified identities',
      'Dispute workflows',
      'Monnify / Paystack / Stripe',
    ],
    features: [
      {
        title: 'Secure fund holding',
        description: 'Integrated with regulated providers so you never touch the money — reducing risk and compliance load.',
      },
      {
        title: 'Milestone releases',
        description: 'Buyers release funds on approval; sellers get paid on delivery; everyone sleeps well.',
      },
      {
        title: 'Verified identities',
        description: 'BVN / NIN, passport, and address verification with providers like Dojah, Smile ID, or Onfido.',
      },
      {
        title: 'Dispute resolution',
        description: 'Admin console, evidence uploads, and workflows designed with real ops teams in mind.',
      },
    ],
    process: [
      { step: '01', title: 'Marketplace design', description: 'Roles, permissions, fees, and trust mechanics.' },
      { step: '02', title: 'Payments & escrow', description: 'Integration with Monnify / Paystack / Stripe + compliance checks.' },
      { step: '03', title: 'Build', description: 'Buyer app, seller app, admin dashboard — mobile and web.' },
      { step: '04', title: 'Launch', description: 'Gradual rollout, fraud monitoring, and dispute ops playbook.' },
    ],
    tech: ['Laravel', 'React Native', 'Next.js', 'Monnify', 'Paystack', 'Stripe', 'Firebase', 'PostgreSQL'],
    idealFor: ['Marketplaces', 'Service-booking platforms', 'Freelance / gig-economy apps'],
    timeline: '8–12 weeks for a production-ready v1',
  },
];

export const iconKeyToService = services.reduce<Record<string, Service>>((acc, s) => {
  acc[s.slug] = s;
  return acc;
}, {});

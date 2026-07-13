export interface MobileShowcaseData {
  cover: string;
  cardImages: [string, string];
  screenshots: { src: string; alt: string }[];
  videos: { src: string; poster?: string; label: string }[];
  highlights: string[];
}

function screenshots(slug: string, labels: string[]) {
  return labels.map((alt, i) => ({
    src: `/images/mobile/${slug}/screenshots/${String(i + 1).padStart(2, '0')}.png`,
    alt,
  }));
}

export const mobileShowcases: Record<string, MobileShowcaseData> = {
  stylevault: {
    cover: '/images/mobile/stylevault/cover.png',
    cardImages: [
      '/images/mobile/stylevault/card-1.png',
      '/images/mobile/stylevault/card-2.png',
    ],
    screenshots: screenshots('stylevault', [
      'StyleVault wardrobe home screen',
      'StyleVault clothing upload flow',
      'StyleVault AI auto-tagging results',
      'StyleVault wardrobe item detail',
      'StyleVault outfit recommendation screen',
      'StyleVault saved outfits view',
      'StyleVault occasion-based styling',
      'StyleVault wardrobe analytics overview',
    ]),
    videos: [
      {
        src: '/images/mobile/stylevault/videos/demo-1.mp4',
        poster: '/images/mobile/stylevault/videos/demo-1-poster.jpg',
        label: 'Wardrobe & AI tagging',
      },
      {
        src: '/images/mobile/stylevault/videos/demo-2.mp4',
        poster: '/images/mobile/stylevault/videos/demo-2-poster.jpg',
        label: 'Outfit recommendations',
      },
    ],
    highlights: [
      'End-to-end MVP: React Native app, NestJS API, PostgreSQL, admin dashboard, and marketing site',
      'AI clothing recognition with editable auto-tags via Gemini/OpenAI Vision',
      'Occasion and weather-aware outfit engine powered by DeepSeek',
    ],
  },
  enuraxhealth: {
    cover: '/images/mobile/enuraxhealth/cover.png',
    cardImages: [
      '/images/mobile/enuraxhealth/card-1.png',
      '/images/mobile/enuraxhealth/card-2.png',
    ],
    screenshots: screenshots('enuraxhealth', [
      'EnuraxHealth onboarding and welcome screen',
      'EnuraxHealth professional discovery home',
      'EnuraxHealth specialty search and filters',
      'EnuraxHealth professional profile view',
      'EnuraxHealth appointment booking flow',
      'EnuraxHealth consultation scheduling screen',
      'EnuraxHealth messaging interface',
      'EnuraxHealth account and settings screen',
    ]),
    videos: [
      {
        src: '/images/mobile/enuraxhealth/videos/demo-1.mp4',
        poster: '/images/mobile/enuraxhealth/videos/demo-1-poster.jpg',
        label: 'Discovery & profiles',
      },
      {
        src: '/images/mobile/enuraxhealth/videos/demo-2.mp4',
        poster: '/images/mobile/enuraxhealth/videos/demo-2-poster.jpg',
        label: 'Booking flow',
      },
      {
        src: '/images/mobile/enuraxhealth/videos/demo-3.mp4',
        poster: '/images/mobile/enuraxhealth/videos/demo-3-poster.jpg',
        label: 'Consultation experience',
      },
    ],
    highlights: [
      'Full-stack telemedicine marketplace: mobile app, NestJS API, Prisma, and admin tooling',
      'Professional profiles, search, booking, payments, and in-app consultations',
      'AI-assisted patient routing with medical disclaimers — guidance, not diagnosis',
    ],
  },
};

export function getShowcaseForProject(slug: string) {
  return mobileShowcases[slug] ?? null;
}

export function getShowcaseProjectSlugs() {
  return Object.keys(mobileShowcases);
}
